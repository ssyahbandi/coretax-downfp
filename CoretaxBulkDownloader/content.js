class CoretaxBulkDownloader {
    constructor() {
        this.successCount = 0;
        this.failedRows = [];
        this.selectedRows = [];
        this.init();
    }

    init() {
        // Tampilkan peringatan risiko hukum (sekali saja)
        chrome.storage.local.get(['hideWarning'], (result) => {
            if (!result.hideWarning) {
                this.showWarningModal();
            } else {
                this.createDownloadPanel();
            }
        });
    }

    showWarningModal() {
        const modal = document.createElement('div');
        modal.className = 'filter-modal';
        modal.innerHTML = `
            <div class="filter-modal-content">
                <h2>Peringatan</h2>
                <p>Otomatisasi unduhan mungkin melanggar kebijakan Coretax dan dapat menyebabkan pemblokiran akun. Lanjutkan?</p>
                <label><input type="checkbox" id="dontShowAgain"> Jangan tampilkan lagi</label>
                <div>
                    <button onclick="this.closest('.filter-modal').remove(); new CoretaxBulkDownloader().createDownloadPanel();">Lanjutkan</button>
                    <button onclick="this.closest('.filter-modal').remove();" style="background-color: #e63946;">Batal</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('#dontShowAgain').addEventListener('change', (e) => {
            chrome.storage.local.set({ hideWarning: e.target.checked });
        });
    }

    createDownloadPanel() {
        const panel = document.createElement('div');
        panel.className = 'download-panel';

        const selectAllBtn = document.createElement('button');
        selectAllBtn.className = 'select-all-btn';
        selectAllBtn.textContent = 'Pilih Semua';
        selectAllBtn.addEventListener('click', () => this.selectAllRows());

        const filterBtn = document.createElement('button');
        filterBtn.className = 'filter-btn';
        filterBtn.textContent = 'Filter Dokumen';
        filterBtn.addEventListener('click', () => this.showFilterModal());

        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'download-btn';
        downloadBtn.textContent = 'Download Dokumen';
        downloadBtn.addEventListener('click', () => this.startDownload());

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = '<div class="progress-fill"></div>';

        panel.appendChild(selectAllBtn);
        panel.appendChild(filterBtn);
        panel.appendChild(downloadBtn);
        panel.appendChild(progressBar);
        document.body.appendChild(panel);

        this.progressBar = progressBar.querySelector('.progress-fill');
    }

    selectAllRows() {
        const rows = document.querySelectorAll('table tbody tr');
        rows.forEach(row => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox) checkbox.checked = true;
        });
    }

    showFilterModal() {
        const modal = document.createElement('div');
        modal.className = 'filter-modal';
        modal.innerHTML = `
            <div class="filter-modal-content">
                <h2>Filter Dokumen</h2>
                <label for="filterDate">Tanggal (contoh: 2025-03):</label>
                <input type="text" id="filterDate" placeholder="Masukkan tanggal">
                <label for="filterBuyer">Nama Pembeli:</label>
                <input type="text" id="filterBuyer" placeholder="Masukkan nama pembeli">
                <div>
                    <button onclick="new CoretaxBulkDownloader().applyFilter(this.closest('.filter-modal'));">Terapkan</button>
                    <button onclick="this.closest('.filter-modal').remove();" style="background-color: #e63946;">Batal</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    applyFilter(modal) {
        const filterDate = modal.querySelector('#filterDate').value;
        const filterBuyer = modal.querySelector('#filterBuyer').value.toLowerCase();
        const rows = document.querySelectorAll('table tbody tr');
        this.selectedRows = Array.from(rows).filter(row => {
            const dateCell = row.querySelector('td:nth-child(7)'); // Asumsi kolom tanggal
            const buyerCell = row.querySelector('td:nth-child(4)'); // Asumsi kolom pembeli
            const date = dateCell?.innerText.trim() || '';
            const buyer = buyerCell?.innerText.trim().toLowerCase() || '';
            return (!filterDate || date.includes(filterDate)) &&
                   (!filterBuyer || buyer.includes(filterBuyer));
        });
        modal.remove();
        this.selectFilteredRows();
    }

    selectFilteredRows() {
        const rows = document.querySelectorAll('table tbody tr');
        rows.forEach(row => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = this.selectedRows.includes(row);
            }
        });
    }

    async startDownload() {
        const rows = document.querySelectorAll('table tbody tr');
        const selectedRows = Array.from(rows).filter(row => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            return checkbox && checkbox.checked;
        });

        if (selectedRows.length === 0) {
            this.showSummaryModal('Harap pilih setidaknya satu dokumen.');
            return;
        }

        this.successCount = 0;
        this.failedRows = [];
        let idx = 0;

        const processBatch = async () => {
            if (idx >= selectedRows.length) {
                this.showSummaryModal();
                this.saveHistory();
                return;
            }

            const batchSize = await new Promise(resolve => {
                chrome.storage.local.get(['parallelDownloads'], (result) => {
                    resolve(result.parallelDownloads || 3);
                });
            });

            const batch = selectedRows.slice(idx, idx + batchSize);
            await Promise.all(batch.map(async (row) => {
                try {
                    const downloadBtn = row.querySelector('button, a');
                    if (downloadBtn && downloadBtn.innerText.toLowerCase().includes('unduh')) {
                        downloadBtn.click();
                        this.successCount++;
                    } else {
                        this.failedRows.push(row);
                    }
                } catch (error) {
                    this.failedRows.push(row);
                }
            }));

            idx += batchSize;
            this.updateProgress(idx, selectedRows.length);

            const delay = await new Promise(resolve => {
                chrome.storage.local.get(['downloadDelay'], (result) => {
                    resolve(result.downloadDelay || 1000);
                });
            });
            setTimeout(processBatch, delay + Math.random() * 500); // Penundaan acak
        };

        processBatch();
    }

    updateProgress(current, total) {
        const percentage = (current / total) * 100;
        this.progressBar.style.width = `${percentage}%`;
    }

    showSummaryModal(message) {
        const modal = document.createElement('div');
        modal.className = 'summary-modal';
        modal.innerHTML = `
            <div class="summary-modal-content">
                <h2>Ringkasan Unduhan</h2>
                ${message ? `<p>${message}</p>` : `
                    <p>Berhasil: ${this.successCount} dokumen</p>
                    <p>Gagal: ${this.failedRows.length} dokumen</p>
                `}
                <button onclick="this.closest('.summary-modal').remove();">Tutup</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    saveHistory() {
        chrome.storage.local.get(['downloadHistory'], (result) => {
            const history = result.downloadHistory || [];
            history.push({
                timestamp: new Date().toISOString(),
                success: this.successCount,
                failed: this.failedRows.length
            });
            if (history.length > 10) history.shift(); // Simpan maksimum 10 entri
            chrome.storage.local.set({ downloadHistory: history });
        });
    }
}

new CoretaxBulkDownloader();
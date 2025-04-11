class SimpleDocDownloader {
    constructor() {
        this.createUI();
    }

    // Bikin tombol download dan progress bar
    createUI() {
        // Tombol "Download Dokumen"
        const button = document.createElement('button');
        button.textContent = 'Download Dokumen';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.left = '20px';
        button.style.zIndex = '10000';
        button.style.padding = '10px';
        button.style.backgroundColor = '#28a745'; // Hijau
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.addEventListener('click', () => this.startDownload());
        document.body.appendChild(button);

        // Progress bar
        const progressBar = document.createElement('div');
        progressBar.style.position = 'fixed';
        progressBar.style.bottom = '60px';
        progressBar.style.left = '20px';
        progressBar.style.width = '200px';
        progressBar.style.height = '20px';
        progressBar.style.backgroundColor = '#ddd'; // Abu-abu
        progressBar.style.borderRadius = '5px';
        progressBar.style.overflow = 'hidden';

        const progressFill = document.createElement('div');
        progressFill.style.height = '100%';
        progressFill.style.width = '0%'; // Mulai dari 0
        progressFill.style.backgroundColor = '#28a745';
        progressFill.style.transition = 'width 0.3s ease'; // Animasi halus
        progressBar.appendChild(progressFill);
        document.body.appendChild(progressBar);

        this.progressFill = progressFill;
    }

    // Mulai proses download
    async startDownload() {
        // Ambil semua baris di tabel
        const rows = document.querySelectorAll('table.p-datatable-table tbody tr');
        const selectedRows = Array.from(rows).filter(row => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            return checkbox && checkbox.checked;
        });

        // Kalo nggak ada yang dipilih
        if (selectedRows.length === 0) {
            alert('Harap pilih setidaknya satu dokumen.');
            return;
        }

        const total = selectedRows.length;
        let completed = 0;

        // Loop buat unduh tiap dokumen
        for (const row of selectedRows) {
            const downloadBtn = row.querySelector('button#DownloadButton') || 
                               row.querySelector('button[aria-label*="unduh"], button[aria-label*="download"]') || 
                               row.querySelector('button[title*="unduh"], button[title*="download"]');
            if (downloadBtn) {
                downloadBtn.click(); // Klik tombol unduh
                completed++;
                const percentage = (completed / total) * 100;
                this.progressFill.style.width = `${percentage}%`; // Update progress bar
                await this.sleep(1000); // Jeda 1 detik
            } else {
                console.log('Tombol unduh nggak ketemu di baris ini.');
                row.style.border = '2px solid red'; // Tandain baris yang gagal
            }
        }

        // Kasih tau kalo udah selesai
        alert(`Unduhan selesai. ${completed} dari ${total} dokumen berhasil diunduh.`);
    }

    // Fungsi buat jeda
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Jalankan ekstensinya
new SimpleDocDownloader();
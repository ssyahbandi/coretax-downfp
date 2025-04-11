# Coretax Bulk Downloader

**Coretax Bulk Downloader** adalah ekstensi Chrome yang dirancang untuk membantu pengguna mengunduh dokumen pajak (faktur dan bukti potong) secara massal dari situs Coretax (`coretaxdjp.pajak.go.id`). Ekstensi ini dilengkapi dengan fitur tambahan seperti filter dokumen, pengaturan unduhan paralel, dan riwayat unduhan, untuk memberikan pengalaman pengguna yang lebih baik.

⚠️ **Peringatan**: Ekstensi ini bukan aplikasi resmi Coretax atau instansi pemerintah. Otomatisasi unduhan mungkin melanggar kebijakan situs Coretax dan dapat menyebabkan pemblokiran akun. Gunakan dengan risiko Anda sendiri (DYOR - Do Your Own Research).

## Fitur Utama
- **Unduhan Massal**: Mengotomatiskan unduhan dokumen pajak dengan sekali klik.
- **Filter Dokumen**: Filter dokumen berdasarkan tanggal atau nama pembeli sebelum unduhan.
- **Unduhan Paralel**: Atur jumlah dokumen yang diunduh secara bersamaan (1-5) untuk efisiensi.
- **Progres Bar**: Lihat progres unduhan secara real-time dengan animasi.
- **Riwayat Unduhan**: Simpan riwayat unduhan (berhasil/gagal) untuk referensi di masa depan.
- **Peringatan Interaktif**: Peringatan risiko hukum dengan opsi "Jangan tampilkan lagi".

## Instalasi
1. **Unduh Proyek**:
   - Unduh repositori ini sebagai ZIP atau klon menggunakan Git:
   
   git clone https://github.com/ssyahbandi/coretax-downfp
   
   - Ekstrak file ZIP jika diperlukan.

2. **Muat Ekstensi di Chrome**:
	- Buka Chrome dan masuk ke `chrome://extensions/`.
	- Aktifkan "Developer mode" di pojok kanan atas.
	- Klik tombol "Load unpacked" dan pilih folder proyek `CoretaxBulkDownloader`.

3. **Verifikasi**:
	- Pastikan ekstensi muncul di daftar ekstensi Chrome dengan nama "Coretax Bulk Downloader".

## Penggunaan
1. **Buka Situs Coretax**:
	- Navigasikan ke salah satu halaman berikut di situs Coretax:
	- `https://coretaxdjp.pajak.go.id/e-invoice-portal/`
	- `https://coretaxdjp.pajak.go.id/withholding-slips-portal/`
	- `https://coretaxdjp.pajak.go.id/returnsheets-portal/`

2. **Atur Pengaturan (Opsional)**:
	- Klik ikon ekstensi di toolbar Chrome untuk membuka popup.
	- Atur jumlah unduhan paralel (1-5) dan penundaan (dalam milidetik) sesuai kebutuhan.
	- Klik "Simpan Pengaturan".

3. **Filter Dokumen (Opsional)**:
	- Di halaman Coretax, klik tombol "Filter Dokumen" di panel ekstensi.
	- Masukkan tanggal (contoh: `2025-03`) atau nama pembeli untuk memfilter dokumen.
	- Klik "Terapkan" untuk memilih dokumen yang sesuai.

4. **Pilih Dokumen**:
	- Centang dokumen yang ingin diunduh secara manual, atau klik tombol "Pilih Semua" untuk memilih semua dokumen di halaman.

5. **Mulai Unduhan**:
	- Klik tombol "Download Dokumen" di panel ekstensi.
	- Progres unduhan akan ditampilkan melalui progres bar.
	- Setelah selesai, ringkasan unduhan (berhasil/gagal) akan muncul dalam modal.

6. **Lihat Riwayat**:
	- Buka popup ekstensi untuk melihat riwayat unduhan terbaru.
	- Klik "Hapus Riwayat" untuk membersihkan riwayat jika diperlukan.

## Tangkapan Layar 

*(Tambahkan tangkapan layar jika diperlukan, misalnya:)*
- Panel unduhan di halaman Coretax.
- Popup pengaturan dan riwayat.
- Modal filter dokumen.

## Peringatan Risiko

- **Bukan Aplikasi Resmi**: Ekstensi ini tidak berafiliasi dengan Coretax atau Direktorat Jenderal Pajak. Penggunaan ekstensi ini sepenuhnya merupakan tanggung jawab pengguna.
- **Potensi Pemblokiran Akun**: Coretax mungkin melarang otomatisasi unduhan. Penggunaan ekstensi ini dapat menyebabkan pemblokiran akun atau tindakan hukum dari pihak berwenang.
- **Perubahan Situs**: Jika Coretax memperbarui struktur situsnya, ekstensi ini mungkin tidak berfungsi dengan baik. Laporkan masalah ke pengembang untuk perbaikan.

## Kompatibilitas

- Ekstensi ini dirancang untuk bekerja dengan situs Coretax pada April 2025. Perubahan pada situs mungkin memengaruhi fungsionalitas.
- Hanya diuji pada Chrome. Dukungan untuk browser lain (misalnya, Firefox) belum tersedia.

## Kontribusi
Proyek ini dibuat untuk keperluan pribadi dan saat ini tidak menerima kontribusi. Namun, jika Anda memiliki saran atau menemukan bug, silakan hubungi saya (lihat bagian Kontak di bawah).

## Lisensi
Ekstensi ini dilisensikan di bawah [MIT License](LICENSE). Anda bebas untuk memodifikasi dan menggunakan kode ini sesuai kebutuhan, selama mematuhi ketentuan lisensi.

## Kontak
Jika Anda memiliki pertanyaan, saran, atau laporan bug, silakan hubungi saya melalui email:  
📧 [syahbandi@example.com](mailto:syahbandi@example.com)

## Pengembang
Dibuat oleh Syahbandi, April 2025.

---

**Penafian**: Saya bukan pengacara. Jika Anda memiliki kekhawatiran hukum terkait penggunaan ekstensi ini, silakan konsultasikan dengan profesional hukum.

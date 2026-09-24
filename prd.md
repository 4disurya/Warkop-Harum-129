# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Warkop Harum 129

**STATUS: DRAFT SEMENTARA**

| | |
| --- | --- |
| **Nama Produk** | Warkop Harum 129 |
| **Versi Dokumen** | v0.1 (Detailed PRD) |
| **Disusun oleh** | Tim Pengembang AI |
| **Untuk** | Pemilik Produk / Klien |
| **Tanggal** | 24 September 2026 |
| **Tech Stack Terkunci** | Single HTML5 + Vue.js 3 CDN + Tailwind CSS CDN + Google Apps Script REST API + Google Sheets |

---

# 1. Problem Statements

Kondisi operasional Warkop Harum 129 saat ini masih sangat bergantung pada proses konvensional yang bersifat manual dan terfragmentasi. Pelanggan seringkali harus mengantre atau memanggil pelayan berkali-kali hanya untuk mendapatkan menu, sementara pencatatan pesanan dilakukan di atas kertas yang rentan hilang, basah, atau salah baca. Tidak adanya standarisasi dalam pencatatan preferensi pelanggan, seperti tingkat kemanisan kopi atau suhu minuman, sering kali menyebabkan terjadinya *human error* dalam penyajian yang berujung pada ketidakpuasan pelanggan dan pemborosan bahan baku.

Dampak negatif dari masalah ini sangat signifikan terhadap skalabilitas dan profitabilitas bisnis. Secara finansial, pemilik warkop kesulitan melakukan rekonsiliasi data harian karena catatan penjualan tersebar di berbagai lembaran kertas yang tidak terorganisir, sehingga potensi kebocoran pendapatan sangat tinggi. Dari sisi pengalaman pelanggan, waktu tunggu yang lama (latensi pemesanan) menurunkan tingkat perputaran meja (*table turnover rate*), yang secara langsung membatasi jumlah pelanggan yang bisa dilayani pada jam sibuk. Tanpa data yang akurat, pemilik juga tidak dapat mengidentifikasi produk *best-seller* atau mengatur stok logistik dengan efisien.

Solusi yang ditawarkan adalah pengembangan aplikasi pemesanan berbasis web-mobile (PWA-ready) yang memungkinkan digitalisasi *end-to-end* pada proses pemesanan. Dengan aplikasi ini, pelanggan dapat mengakses menu secara mandiri melalui perangkat mereka, melakukan kustomisasi pesanan secara presisi, dan mengirimkan pesanan langsung ke unit penyajian melalui integrasi pesan instan. Sistem ini tidak hanya memindahkan proses fisik ke digital, tetapi juga mengotomatisasi kalkulasi total tagihan dan pengarsipan data transaksi ke dalam basis data berbasis *cloud* secara *real-time*.

Nilai tambah utama dari Warkop Harum 129 dibandingkan metode tradisional adalah transparansi dan kecepatan. Aplikasi ini dirancang dengan filosofi "Mobile-First" yang mengutamakan aksesibilitas bagi semua kalangan, termasuk pengguna senior, melalui antarmuka yang kontras dan tipografi yang ergonomis. Dengan memanfaatkan ekosistem Google Workspace sebagai *backend*, solusi ini menawarkan biaya operasional (OpEx) yang hampir nol bagi pemilik warkop, namun memberikan kapabilitas analisis data setara kafe modern, menciptakan keunggulan kompetitif yang kuat di pasar warung kopi lokal.

# 2. Goals & Success Metrics

| Goal Statement | Measurable Metric (dengan angka spesifik) | Target Timeframe |
| --- | --- | --- |
| Meningkatkan efisiensi waktu pemesanan pelanggan | Penurunan waktu dari buka menu hingga kirim pesanan menjadi < 120 detik | 1 Bulan setelah rilis |
| Digitalisasi total catatan penjualan harian | 100% transaksi tercatat otomatis di Google Sheets tanpa input manual ulang | Real-time sejak hari ke-1 |
| Mengurangi tingkat kesalahan penyajian pesanan | Penurunan komplain salah pesanan (misal: gula/tidak gula) sebesar 90% | 2 Bulan setelah rilis |
| Meningkatkan volume penjualan menu unggulan | Kenaikan penjualan menu "Best Seller" sebesar 15% melalui visual menu yang menarik | 3 Bulan setelah rilis |
| Optimalisasi penggunaan meja (Table Turnover) | Peningkatan perputaran pelanggan per meja sebesar 20% pada jam sibuk | 3 Bulan setelah rilis |

# 3. Target Users

| Role Name | Description | Primary Needs | Pain Points | Most Used Features |
| --- | --- | --- | --- | --- |
| **Pelanggan** | Pengunjung warkop dari berbagai usia (remaja hingga lansia) | Pemesanan cepat, kejelasan harga, kustomisasi rasa, tanpa harus menunggu pelayan | Malas memanggil pelayan, bingung total harga, pesanan sering salah | Katalog Menu, Custom Note, Keranjang, Kirim WhatsApp |
| **Pemilik (Bos Warkop)** | Pengelola bisnis yang memantau performa harian | Laporan penjualan rapi, tahu stok yang laku, kontrol harga menu | Rekap manual melelahkan, data penjualan sering hilang, tidak tahu profit pasti | Dashboard Penjualan (Sheets), Manajemen Menu |
| **Penjaga Warkop (Barista/Server)** | Staf operasional yang menyiapkan pesanan | Instruksi pesanan yang jelas dan terstruktur | Lupa detail pesanan pelanggan, tulisan tangan pesanan tidak terbaca | Notifikasi Pesanan Masuk (WA), Daftar Cek Pesanan |

# 4. User Stories

| ID | User Story | Acceptance Criteria | Priority |
| --- | --- | --- | --- |
| US-01 | Sebagai Pelanggan, saya ingin melihat foto menu yang menarik sehingga saya tertarik untuk membeli. | 1. Gambar dimuat cepat. 2. Resolusi gambar tajam di layar mobile. | MVP |
| US-02 | Sebagai Pelanggan, saya ingin memilih kategori menu (Kopi/Teh/Kue) agar pencarian lebih cepat. | 1. Terdapat filter kategori. 2. Transisi antar kategori mulus. | MVP |
| US-03 | Sebagai Pelanggan, saya ingin menambahkan catatan khusus (misal: tanpa gula) pada tiap item. | 1. Tersedia kolom input teks di tiap item. 2. Catatan muncul di ringkasan pesanan. | MVP |
| US-04 | Sebagai Pelanggan, saya ingin memasukkan nama dan nomor meja agar pesanan tidak tertukar. | 1. Validasi input nama tidak boleh kosong. 2. Pilihan nomor meja tersedia. | MVP |
| US-05 | Sebagai Pelanggan, saya ingin melihat total harga secara real-time saat menambah item. | 1. Kalkulasi otomatis saat jumlah item berubah. 2. Menampilkan subtotal dan total akhir. | MVP |
| US-06 | Sebagai Pelanggan, saya ingin mengirim pesanan via WhatsApp ke penjaga warkop. | 1. Format pesan WA rapi dan terbaca. 2. Link WA otomatis terbuka dengan teks pesanan. | MVP |
| US-07 | Sebagai Pemilik, saya ingin setiap pesanan tersimpan otomatis di Google Sheets. | 1. Data masuk ke baris baru secara kronologis. 2. Mencakup nama, meja, detail item, dan total. | MVP |
| US-08 | Sebagai Pelanggan, saya ingin melihat label harga yang jelas di samping nama menu. | 1. Format mata uang Rupiah yang benar. 2. Ukuran font harga mudah dibaca. | MVP |
| US-09 | Sebagai Pelanggan, saya ingin menambah atau mengurangi jumlah item di keranjang dengan mudah. | 1. Tombol +/- yang responsif. 2. Opsi hapus item dari keranjang. | MVP |
| US-10 | Sebagai Pemilik, saya ingin melihat statistik menu mana yang paling laku di Google Sheets. | 1. Terdapat kolom jumlah terjual per item. 2. Data dapat difilter berdasarkan tanggal. | MVP |
| US-11 | Sebagai Pelanggan, saya ingin antarmuka aplikasi memiliki kontras warna yang baik. | 1. Rasio kontras teks memenuhi standar aksesibilitas. 2. Ukuran tombol minimal 44x44px. | MVP |

# 5. User Flow

### 5.1 Alur Utama: Pemesanan Pelanggan (Happy Path)
1. **Action:** Pelanggan membuka URL aplikasi/scan QR.
   - **Description:** Sistem memuat halaman katalog menu menggunakan Vue.js.
   - **Output:** Tampilan daftar menu dengan foto dan harga.
2. **Action:** Pelanggan memilih menu dan mengatur kustomisasi.
   - **Description:** Klik tombol "+" dan mengisi kolom catatan (opsional).
   - **Decision:** Jika stok habis (flag di Sheets), tombol tambah dinonaktifkan.
3. **Action:** Pelanggan membuka Keranjang Belanja.
   - **Description:** Meninjau daftar pesanan dan total harga.
4. **Action:** Pelanggan mengisi Identitas.
   - **Description:** Input Nama dan Nomor Meja pada form yang tersedia.
5. **Action:** Pelanggan menekan tombol "Kirim Pesanan".
   - **Description:** Sistem menjalankan dua fungsi: (1) Kirim data ke Google Apps Script API, (2) Generate link WhatsApp.
   - **Output:** Data tersimpan di Google Sheets dan aplikasi WhatsApp terbuka dengan pesan terformat.

### 5.2 Alur Alternatif: Perubahan Pesanan Sebelum Kirim
1. **Action:** Pelanggan berada di halaman Keranjang.
2. **Action:** Pelanggan mengurangi jumlah item menjadi 0.
   - **Description:** Sistem memberikan konfirmasi penghapusan item.
   - **Output:** Item dihapus dari daftar dan total harga diperbarui otomatis.

# 6. Functional Requirements

| Feature ID | Feature Name | Detailed Description | Inputs | Outputs | Validation Rules | Data Structure (Sheets) |
| --- | --- | --- | --- | --- | --- | --- |
| FR-01 | Catalog Engine | Menampilkan menu dari database Sheets secara dinamis. | API Request ke GAS | List Object Menu | Harus ada Nama, Harga, Kategori | `id, nama, kategori, harga, foto_url, status_stok` |
| FR-02 | Cart System | Mengelola penyimpanan sementara pesanan di sisi klien. | Klik User (Add/Remove) | Array of Objects (Cart) | Minimal 1 item untuk checkout | N/A (Local State) |
| FR-03 | Order Submission | Mengirim data pesanan ke backend dan WhatsApp. | Nama, No Meja, Cart Object | Success Status & WA Redirect | Nama min. 3 karakter, Meja harus diisi | `timestamp, order_id, nama_pelanggan, no_meja, detail_pesanan, total_bayar` |
| FR-04 | Dynamic Pricing | Menghitung total biaya termasuk logika kustomisasi jika ada. | Harga Item * Qty | Integer Total Harga | Tidak boleh bernilai negatif | N/A |
| FR-05 | Admin Dashboard | Spreadsheet yang berfungsi sebagai CMS dan laporan. | Data dari FR-03 | Grafik & Tabel Penjualan | Auto-timestamp pada setiap baris | `sheet_sales, sheet_inventory, sheet_settings` |

# 7. Non-Functional Requirements

### UX/Design
- **Mobile-First:** Layout wajib responsif untuk layar 360px hingga 430px (lebar smartphone umum).
- **Accessibility:** Ukuran font utama minimal 16px; font judul 20px+.
- **Touch Targets:** Tombol interaktif minimal berukuran 44x44 pixel untuk mencegah salah tekan.
- **Visual Feedback:** Efek *ripple* atau perubahan warna saat tombol ditekan.
- **Loading State:** Menampilkan *skeleton screen* saat data menu sedang diambil dari API.
- **Color Palette:** Menggunakan skema warna hangat (cokelat/krem) dengan kontras teks hitam/putih yang tajam.

### Performance
- **Load Time:** Halaman pertama harus interaktif dalam < 2.5 detik pada jaringan 4G.
- **Bundle Size:** Karena menggunakan CDN, total ukuran aset (HTML/JS/CSS) tidak boleh melebihi 500KB.
- **API Latency:** Respon Google Apps Script untuk simpan data maksimal 3 detik.

### Security
- **Input Sanitization:** Membersihkan input nama dan catatan dari karakter HTML/Script berbahaya (XSS Protection).
- **Rate Limiting:** Limitasi pengiriman pesanan dari IP yang sama (maksimal 5 pesanan per 10 menit) untuk mencegah spam.
- **Data Privacy:** Tidak menyimpan data sensitif pelanggan (seperti lokasi GPS atau file pribadi).

### Compatibility
- **Browser Support:** Wajib berjalan sempurna di Chrome Mobile, Safari (iOS), dan Samsung Internet.
- **OS Support:** Android 8.0+ dan iOS 12+.

### Technical Constraints
- **Stateless:** Aplikasi tidak memiliki sistem login (sessionless) untuk kecepatan akses.
- **Concurrency:** Google Sheets memiliki limitasi penulisan simultan; sistem harus menangani antrean via Google Apps Script `LockService`.
- **Storage:** Limitasi penyimpanan Google Sheets (5 juta sel) harus dipantau secara berkala oleh pemilik.

# 8. Scope

## 8.1 In Scope (MVP)
| Feature | Description | Reason for Priority |
| --- | --- | --- |
| Digital Menu | Katalog produk dengan foto dan kategori. | Kebutuhan dasar untuk mengganti menu fisik. |
| Cart & Custom Note | Sistem keranjang dengan input catatan khusus. | Mengurangi kesalahan komunikasi pesanan (misal: gula). |
| WhatsApp Integration | Pengiriman ringkasan pesanan ke nomor penjaga. | Cara paling cepat dan murah untuk notifikasi real-time. |
| Google Sheets Sync | Penyimpanan otomatis data penjualan. | Memenuhi tujuan utama perapian catatan keuangan. |
| Mobile-Only UI | Antarmuka khusus smartphone. | Fokus pada perilaku pengguna di warkop yang menggunakan HP. |

## 8.2 Out of Scope (Phase 2)
| Feature | Description | Reason for Delay |
| --- | --- | --- |
| Payment Gateway | Integrasi Midtrans/Xendit untuk bayar langsung. | Menghindari kompleksitas biaya admin dan verifikasi akun di awal. |
| User Authentication | Sistem login pelanggan dengan nomor HP/Google. | Mempercepat *user journey* (pelanggan ingin langsung pesan). |
| Inventory Management | Pengurangan stok bahan baku otomatis (misal: gramasi kopi). | Membutuhkan logika backend yang jauh lebih kompleks. |
| Multi-outlet Support | Pengelolaan lebih dari satu cabang warkop. | Fokus saat ini adalah validasi model bisnis di satu lokasi. |
| PWA Installation | Fitur "Add to Home Screen" dengan offline mode. | Fokus pada stabilitas web-view standar terlebih dahulu. |
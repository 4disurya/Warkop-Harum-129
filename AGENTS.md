# AGENTS.md — Warkop Harum 129

## Overview
Aplikasi pemesanan menu digital: katalog → keranjang → checkout ke Google Apps Script/Sheets + notifikasi WhatsApp untuk **Warkop Harum 129**.

**Isi repo (verified):**
- `public/index.html` — seluruh FE (Vue 3 CDN + Tailwind CDN, ~1400 baris)
- `backend/Code.gs` + `appsscript.json` + `.clasp.json` — backend GAS
- `prd.md` — kebutuhan produk; `design.md` — token visual (primary `#D35400`, background `#EBEBEB`)

**TIDAK ada di repo:** `package.json`, `firebase.json`, `.firebaserc`, `.github/`, `scripts/`, test, linter, build step. Saat ini juga belum ter-init sebagai git repo. Verifikasi FE = buka `public/index.html` secara statis.

## ID Deployment
- **Script ID (verified di `.clasp.json`):** `1itsHplwnK5JhaoFW5o2f21eKa7JHAbUKYIr3HBYxGR4oYBPAuaU_6UdJ`
- **Dev (verified di `index.html` GAS_URL):** `AKfycbwITc_iXn5hZf5wkNWidS1cjZSZ8ApvXGLS1wiDJ2JKFSsHqFPASSXqS_utoA29D1P-`
- **Prod (hanya dari file ini, tidak ada di config):** `AKfycbwi-R70T_IMICAO-FVYf4afxrwejCrwA-ouTi95PBRVwETK1fez6XcmfgwXKxnOy3fF`
- **Firebase project (sumber sama):** `warkop-harum-129` — https://warkop-harum-129.web.app
- **Drive backup (sumber sama):** https://drive.google.com/drive/folders/15uibPg8N9YS_gxO1xcZsIDRxLkBMzR6U

**JANGAN** jalankan `clasp deploy` tanpa `--deploymentId` (hindari spam deployment baru).

## Perintah
- Tidak ada `npm run dev` / test / lint — tidak ada build tool.
- Jalankan FE statis, atau `firebase serve` **setelah** `firebase init hosting` (dir `public/`) — `firebase.json` belum ada.
- `clasp login` sekali; **jalankan clasp dari folder `backend/`** (`.clasp.json` ada di sana, `rootDir` kosong).
- Update BE: edit lokal → `clasp push` → `clasp deploy --deploymentId {DEV} --description "Dev Update"` → uji Dev → ulangi dengan `{PROD}`.
- Setup otomatis sekali: jalankan `setup()` di `Code.gs` (via `clasp run` / editor GAS) — membuat folder Drive **`Warkop Harum 129`**, spreadsheet DB `Warkop Harum 129 — DB` di dalamnya (ID → Script Properties `SPREADSHEET_ID`), semua sheet, dan seed menu. Tanpa `setup()`, `getSpreadsheet_()` tetap auto-create folder + sheet pada request pertama.

## 1. Tech Stack
- FE: Single-file HTML5 + Vue 3 CDN + Tailwind CDN; BE: GAS (CLASP); DB: Google Sheets; Hosting: Firebase.
- **DILARANG:** React, Angular, Vite, Webpack, Node backend, Python, file `.vue` / `.js` terpisah, dependensi npm tambahan.

## 2. Frontend Rules (Strict Single File)
- Semua markup, CSS, komponen, routing, API call wajib di **satu** `public/index.html`. Jangan pecah kecuali user minta langsung.
- Routing hash manual (`#/`, `#/keranjang`, `#/sukses`, `#/admin`) — lihat computed `route` di `index.html`.
- Komponen = JS object + `template: \`...\``.
- API wajib **native `fetch()`**, selalu `redirect: 'follow'` (GAS selalu 302).
- POST ke GAS wajib `Content-Type: 'text/plain;charset=utf-8'` + `JSON.stringify` (hindari preflight CORS). Bungkus `try/catch` + `.json()`.
- `USE_MOCK` (top of script, `index.html:697`): biarkan `true` kecuali diminta go-live. Format mock wajib identik dengan respon backend.
- `GAS_URL` sekarang menunjuk endpoint **Dev**.
- UI ikuti `design.md` (tema oranye/abu mobile food-tech — bukan dark mode); Tailwind config inline di `index.html`.

## 3. Backend Rules (GAS)
- Sinkronisasi hanya via `clasp push` — **dilarang** edit via Web Editor GAS.
- Respon wajib JSON via `jsonOut_()` → `ContentService.createTextOutput(...).setMimeType(JSON)`.
- Semua tulis Sheet wajib lewat `withLock_()` / `LockService` (NFR `prd.md`).
- API surface:
  - GET `?action=` → `menus` | `orders` | `stats` | `health`
  - POST body `{action: ...}` → `submit_order` | `menu_save` | `menu_delete` | `set_payment`
- Auth: mutasi admin wajib `admin_key === 'harum129'` (`CONFIG.ADMIN_PASSWORD`; dipantul juga di FE `ADMIN_PASSWORD`). `submit_order` tidak butuh admin, tapi di-rate-limit 5 order / 10 menit per `client_id`.
- **Gotcha nama sheet:** order disimpan di sheet **`sales`** (bukan `orders`); sheet lain: `menus`, `stats`. Sheet dibuat otomatis via `PropertiesService` `SPREADSHEET_ID`.
- Foto `data:image` → otomatis diupload ke Drive, kembalikan URL publik (limit sel 50k char) — `saveDataUrlToDrive_`.

## 4. Protokol Modifikasi (Strict)
1. Scope ketat: hanya baris/fungsi yang diminta eksplisit. Dilarang refactor file tak terkait.
2. Append-only preferred: tambah fungsi baru tanpa menimpa yang stabil.
3. Jangan pecah `index.html` tanpa instruksi langsung user.
4. Struktur dasar berubah → minta izin dulu.
5. Commit: `{type}: {description}` dengan `feat` | `fix` | `chore` | `docs` (bila user minta commit).

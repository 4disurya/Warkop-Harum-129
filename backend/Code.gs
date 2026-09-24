/**
 * Warkop Harum 129 — Backend Google Apps Script
 * Sinkronisasi: clasp push (DILARANG edit via Web Editor)
 *
 * Bootstrap otomatis:
 *  - Folder Drive "Warkop Harum 129" dibuat bila belum ada
 *  - Spreadsheet DB dibuat di folder tsb (pindah otomatis bila masih di root Drive)
 *
 * Sheets:
 *  - menus : id, nama, kategori, harga, foto_url, status_stok, rating
 *  - sales : timestamp, order_id, nama_pelanggan, no_meja, detail_pesanan,
 *            subtotal, service_fee, total_bayar, status_pembayaran
 *  - stats : id, nama, terjual
 */

var CONFIG = {
  ADMIN_PASSWORD: 'harum129',
  DRIVE_FOLDER_NAME: 'Warkop Harum 129',
  SPREADSHEET_NAME: 'Warkop Harum 129 — DB',
  SHEET_MENUS: 'menus',
  SHEET_ORDERS: 'sales',
  SHEET_STATS: 'stats',
  RATE_LIMIT_MAX: 5,
  RATE_LIMIT_WINDOW_MS: 10 * 60 * 1000,
  LOCK_WAIT_MS: 8000,
};

var MENU_HEADERS = ['id', 'nama', 'kategori', 'harga', 'foto_url', 'status_stok', 'rating'];
var ORDER_HEADERS = [
  'timestamp',
  'order_id',
  'nama_pelanggan',
  'no_meja',
  'detail_pesanan',
  'subtotal',
  'service_fee',
  'total_bayar',
  'status_pembayaran',
];

var DEFAULT_MENUS = [
  { id: 'M001', nama: 'Kopi Susu Aren', kategori: 'Kopi', harga: 18000, foto_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop', status_stok: 'tersedia', rating: 4.9 },
  { id: 'M002', nama: 'Americano', kategori: 'Kopi', harga: 15000, foto_url: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&h=400&fit=crop', status_stok: 'tersedia', rating: 4.8 },
  { id: 'M003', nama: 'Cappuccino', kategori: 'Kopi', harga: 20000, foto_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop', status_stok: 'tersedia', rating: 4.7 },
  { id: 'M004', nama: 'Es Kopi Gula Batu', kategori: 'Kopi', harga: 19000, foto_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=400&fit=crop', status_stok: 'habis', rating: 4.6 },
  { id: 'M005', nama: 'Teh Tarik', kategori: 'Teh', harga: 12000, foto_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop', status_stok: 'tersedia', rating: 4.8 },
  { id: 'M006', nama: 'Es Teh Manis', kategori: 'Teh', harga: 8000, foto_url: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400&h=400&fit=crop', status_stok: 'tersedia', rating: 4.5 },
  { id: 'M007', nama: 'Lemon Tea', kategori: 'Teh', harga: 14000, foto_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop', status_stok: 'tersedia', rating: 4.6 },
  { id: 'M008', nama: 'Matcha Latte', kategori: 'Teh', harga: 20000, foto_url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop', status_stok: 'tersedia', rating: 4.9 },
  { id: 'M009', nama: 'Pisang Goreng', kategori: 'Kue', harga: 10000, foto_url: 'https://images.unsplash.com/photo-1630409346699-7940c4d8115e?w=400&h=400&fit=crop', status_stok: 'tersedia', rating: 4.7 },
  { id: 'M010', nama: 'Roti Bakar Coklat', kategori: 'Kue', harga: 15000, foto_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop', status_stok: 'tersedia', rating: 4.8 },
  { id: 'M011', nama: 'Kue Lapis', kategori: 'Kue', harga: 9000, foto_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop', status_stok: 'tersedia', rating: 4.5 },
  { id: 'M012', nama: 'Donat Gula', kategori: 'Kue', harga: 7000, foto_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop', status_stok: 'tersedia', rating: 4.6 },
];

// ===== HTTP entrypoints =====

function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || '';
    if (action === 'menus') return jsonOut_({ success: true, data: getMenus_() });
    if (action === 'orders') return jsonOut_({ success: true, data: getOrders_() });
    if (action === 'stats') return jsonOut_({ success: true, data: getStats_() });
    if (action === 'health') return jsonOut_({ success: true, message: 'Warkop Harum 129 API OK' });
    return jsonOut_({ success: false, message: 'Unknown action: ' + action });
  } catch (err) {
    return jsonOut_({ success: false, message: String(err && err.message ? err.message : err) });
  }
}

function doPost(e) {
  try {
    var body = parseBody_(e);
    if (!body) return jsonOut_({ success: false, message: 'Invalid body' });

    var action = String(body.action || '');
    if (action === 'submit_order') return jsonOut_(submitOrder_(body));
    if (action === 'menu_save') return jsonOut_(saveMenu_(body));
    if (action === 'menu_delete') return jsonOut_(deleteMenu_(body));
    if (action === 'set_payment') return jsonOut_(setPayment_(body));
    return jsonOut_({ success: false, message: 'Unknown action: ' + action });
  } catch (err) {
    return jsonOut_({ success: false, message: String(err && err.message ? err.message : err) });
  }
}

// ===== Actions =====

function submitOrder_(body) {
  if (!isAdmin_(body)) return { success: false, message: 'Unauthorized' };

  // Rate limit per client (PRD: max 5 / 10 menit)
  var clientId = String(body.client_id || 'anon');
  if (!checkRateLimit_(clientId)) {
    return { success: false, message: 'Terlalu banyak pesanan. Coba lagi nanti.' };
  }

  var nama = sanitize_(body.nama_pelanggan);
  var noMeja = sanitize_(body.no_meja);
  if (nama.length < 3) return { success: false, message: 'Nama minimal 3 karakter.' };
  if (!noMeja) return { success: false, message: 'Nomor meja wajib diisi.' };

  var total = Number(body.total_bayar);
  var subtotal = Number(body.subtotal);
  var serviceFee = Number(body.service_fee || 0);
  if (!isFinite(total) || total < 0 || !isFinite(subtotal) || subtotal < 0) {
    return { success: false, message: 'Total tidak valid.' };
  }

  var orderId = 'ORD' + String(Date.now()).slice(-8);
  var row = {
    timestamp: body.timestamp || new Date().toISOString(),
    order_id: orderId,
    nama_pelanggan: nama,
    no_meja: noMeja,
    detail_pesanan: String(body.detail_pesanan || '[]'),
    subtotal: Math.round(subtotal),
    service_fee: Math.round(serviceFee),
    total_bayar: Math.round(total),
    status_pembayaran: 'belum',
  };

  withLock_(function () {
    var ss = getSpreadsheet_();
    var sh = ensureSheet_(ss, CONFIG.SHEET_ORDERS, ORDER_HEADERS);
    var values = ORDER_HEADERS.map(function (h) { return row[h] === undefined ? '' : row[h]; });
    sh.appendRow(values);
    updateSoldStats_(ss, body.items || []);
  });

  return { success: true, order_id: orderId, message: 'Pesanan tersimpan' };
}

function saveMenu_(body) {
  if (!isAdmin_(body)) return { success: false, message: 'Unauthorized' };
  var item = body.item;
  if (!item || !item.id) return { success: false, message: 'Item tidak valid.' };

  var nama = sanitize_(item.nama);
  if (nama.length < 2) return { success: false, message: 'Nama wajib diisi.' };
  var harga = Number(item.harga);
  if (!isFinite(harga) || harga < 0) return { success: false, message: 'Harga tidak valid.' };

  var foto = String(item.foto_url || '');
  // data:image → simpan ke Drive, kembalikan URL publik (hindari limit sel 50k char)
  if (foto.indexOf('data:image') === 0) {
    foto = saveDataUrlToDrive_(foto, item.id);
  }

  var normalized = {
    id: String(item.id),
    nama: nama,
    kategori: sanitize_(item.kategori) || 'Kopi',
    harga: Math.round(harga),
    foto_url: foto,
    status_stok: item.status_stok === 'habis' ? 'habis' : 'tersedia',
    rating: Number(item.rating) || 4.5,
  };

  withLock_(function () {
    var ss = getSpreadsheet_();
    var sh = ensureSheet_(ss, CONFIG.SHEET_MENUS, MENU_HEADERS);
    var data = sh.getDataRange().getValues();
    var idx = -1;
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === normalized.id) {
        idx = i;
        break;
      }
    }
    var values = MENU_HEADERS.map(function (h) { return normalized[h]; });
    if (idx >= 0) {
      sh.getRange(idx + 1, 1, 1, MENU_HEADERS.length).setValues([values]);
    } else {
      sh.appendRow(values);
    }
  });

  return { success: true, data: getMenus_() };
}

function deleteMenu_(body) {
  if (!isAdmin_(body)) return { success: false, message: 'Unauthorized' };
  var id = String(body.id || '');
  if (!id) return { success: false, message: 'ID kosong.' };

  withLock_(function () {
    var ss = getSpreadsheet_();
    var sh = ensureSheet_(ss, CONFIG.SHEET_MENUS, MENU_HEADERS);
    var data = sh.getDataRange().getValues();
    for (var i = data.length - 1; i >= 1; i--) {
      if (String(data[i][0]) === id) {
        sh.deleteRow(i + 1);
      }
    }
  });

  return { success: true, data: getMenus_() };
}

function setPayment_(body) {
  if (!isAdmin_(body)) return { success: false, message: 'Unauthorized' };
  var orderId = String(body.order_id || '');
  var status = body.status === 'lunas' ? 'lunas' : 'belum';
  if (!orderId) return { success: false, message: 'order_id kosong.' };

  withLock_(function () {
    var ss = getSpreadsheet_();
    var sh = ensureSheet_(ss, CONFIG.SHEET_ORDERS, ORDER_HEADERS);
    var statusCol = ORDER_HEADERS.indexOf('status_pembayaran') + 1;
    var idCol = ORDER_HEADERS.indexOf('order_id') + 1;
    var data = sh.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][idCol - 1]) === orderId) {
        sh.getRange(i + 1, statusCol).setValue(status);
        break;
      }
    }
  });

  return { success: true, data: getOrders_() };
}

// ===== Readers =====

function getMenus_() {
  var ss = getSpreadsheet_();
  var sh = ensureSheet_(ss, CONFIG.SHEET_MENUS, MENU_HEADERS);

  function readRows_() {
    var data = sh.getDataRange().getValues();
    var out = [];
    for (var i = 1; i < data.length; i++) {
      if (!data[i][0]) continue;
      // buang baris header yang tersalin sebagai data (sheet korup)
      if (isHeaderRow_(data[i], MENU_HEADERS)) continue;
      out.push({
        id: String(data[i][0]),
        nama: String(data[i][1]),
        kategori: String(data[i][2]),
        harga: Number(data[i][3]) || 0,
        foto_url: String(data[i][4]),
        status_stok: String(data[i][5] || 'tersedia'),
        rating: Number(data[i][6]) || 0,
      });
    }
    return out;
  }

  var out = readRows_();
  if (!out.length) {
    // bersihkan bawah header → seed DEFAULT_MENUS
    withLock_(function () {
      var last = sh.getLastRow();
      if (last > 1) sh.deleteRows(2, last - 1);
      var rows = DEFAULT_MENUS.map(function (m) {
        return MENU_HEADERS.map(function (h) { return m[h]; });
      });
      if (rows.length) sh.getRange(2, 1, rows.length, MENU_HEADERS.length).setValues(rows);
    });
    out = readRows_();
  }
  return out;
}

function getOrders_() {
  var ss = getSpreadsheet_();
  var sh = ensureSheet_(ss, CONFIG.SHEET_ORDERS, ORDER_HEADERS);
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < data.length; i++) {
    if (!data[i][1]) continue;
    out.push({
      timestamp: toIso_(data[i][0]),
      order_id: String(data[i][1]),
      nama_pelanggan: String(data[i][2]),
      no_meja: String(data[i][3]),
      detail_pesanan: String(data[i][4]),
      subtotal: Number(data[i][5]) || 0,
      service_fee: Number(data[i][6]) || 0,
      total_bayar: Number(data[i][7]) || 0,
      status_pembayaran: String(data[i][8] || 'belum'),
    });
  }
  out.sort(function (a, b) {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  return out;
}

/** Best-seller & rekap (US-10 / FR-05). */
function getStats_() {
  var ss = getSpreadsheet_();
  var sh = ensureSheet_(ss, CONFIG.SHEET_STATS, ['id', 'nama', 'terjual']);
  var data = sh.getDataRange().getValues();
  var items = [];
  for (var i = 1; i < data.length; i++) {
    if (!data[i][0]) continue;
    items.push({
      id: String(data[i][0]),
      nama: String(data[i][1]),
      terjual: Number(data[i][2]) || 0,
    });
  }
  items.sort(function (a, b) { return b.terjual - a.terjual; });

  var orders = getOrders_();
  var totalUtang = 0;
  var omzet = 0;
  for (var j = 0; j < orders.length; j++) {
    omzet += orders[j].total_bayar;
    if (orders[j].status_pembayaran !== 'lunas') totalUtang += orders[j].total_bayar;
  }
  return { best_sellers: items, omzet: omzet, total_utang: totalUtang, jumlah_order: orders.length };
}

// ===== Sheets / infra =====

/** Folder Drive aplikasi (buat bila belum ada). */
function getAppFolder_() {
  var name = CONFIG.DRIVE_FOLDER_NAME;
  var it = DriveApp.getFoldersByName(name);
  if (it.hasNext()) return it.next();
  return DriveApp.createFolder(name);
}

/** Cari parent folder dari file; null bila di root / di luar folder aplikasi. */
function getFileParentId_(file) {
  var parents = file.getParents();
  while (parents.hasNext()) {
    return parents.next().getId();
  }
  return null;
}

/** Pindahkan file ke folder aplikasi bila belum di dalamnya. */
function moveToAppFolder_(file) {
  var folder = getAppFolder_();
  if (getFileParentId_(file) === folder.getId()) return folder;
  file.moveTo(folder);
  return folder;
}

/**
 * Ambil/buat spreadsheet DB — otomatis simpan di folder Drive
 * "Warkop Harum 129". ID disimpan di Script Properties.
 */
function getSpreadsheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SPREADSHEET_ID');
  if (id) {
    try {
      var ss = SpreadsheetApp.openById(id);
      // pindah sekali ke folder aplikasi bila belum
      if (props.getProperty('SPREADSHEET_IN_FOLDER') !== '1') {
        moveToAppFolder_(DriveApp.getFileById(id));
        props.setProperty('SPREADSHEET_IN_FOLDER', '1');
      }
      return ss;
    } catch (err) {
      props.deleteProperty('SPREADSHEET_ID');
      props.deleteProperty('SPREADSHEET_IN_FOLDER');
    }
  }
  var created = SpreadsheetApp.create(CONFIG.SPREADSHEET_NAME);
  moveToAppFolder_(DriveApp.getFileById(created.getId()));
  props.setProperty('SPREADSHEET_ID', created.getId());
  props.setProperty('SPREADSHEET_IN_FOLDER', '1');
  return created;
}

function ensureSheet_(ss, name, headers) {
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
  }
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    return sh;
  }
  // perbaiki baris 1 bila kosong / bukan headers
  var first = sh.getRange(1, 1, 1, headers.length).getValues()[0];
  var empty = first.every(function (v) { return v === '' || v === null; });
  if (empty) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function isHeaderRow_(row, headers) {
  for (var i = 0; i < headers.length; i++) {
    if (String(row[i] === undefined ? '' : row[i]) !== String(headers[i])) return false;
  }
  return true;
}

function updateSoldStats_(ss, items) {
  if (!items || !items.length) return;
  var sh = ensureSheet_(ss, CONFIG.SHEET_STATS, ['id', 'nama', 'terjual']);
  var map = {};
  var data = sh.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0]) map[String(data[i][0])] = { row: i + 1, nama: data[i][1], terjual: Number(data[i][2]) || 0 };
  }
  for (var k = 0; k < items.length; k++) {
    var it = items[k];
    var id = String(it.id || '');
    if (!id) continue;
    var qty = Number(it.qty) || 0;
    if (map[id]) {
      map[id].terjual += qty;
      sh.getRange(map[id].row, 3).setValue(map[id].terjual);
      if (it.nama) {
        sh.getRange(map[id].row, 2).setValue(it.nama);
      }
    } else {
      sh.appendRow([id, it.nama || '', qty]);
    }
  }
}

function withLock_(fn) {
  var lock = LockService.getScriptLock();
  var ok = lock.tryLock(CONFIG.LOCK_WAIT_MS);
  if (!ok) throw new Error('Server sibuk, coba lagi.');
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

function isAdmin_(body) {
  // submit_order pelanggan tidak butuh admin; mutasi admin wajib key
  var action = String(body.action || '');
  if (action === 'submit_order') return true;
  return String(body.admin_key || '') === CONFIG.ADMIN_PASSWORD;
}

function checkRateLimit_(clientId) {
  var cache = CacheService.getScriptCache();
  var key = 'rl_' + clientId;
  var raw = cache.get(key);
  var count = raw ? parseInt(raw, 10) : 0;
  if (count >= CONFIG.RATE_LIMIT_MAX) return false;
  cache.put(key, String(count + 1), Math.ceil(CONFIG.RATE_LIMIT_WINDOW_MS / 1000));
  return true;
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) return null;
  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    return null;
  }
}

function jsonOut_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function sanitize_(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .trim();
}

function toIso_(v) {
  if (v instanceof Date) return v.toISOString();
  var d = new Date(v);
  return isNaN(d.getTime()) ? String(v) : d.toISOString();
}

/** Simpan base64 image ke Drive → URL publik (cell Sheets max 50k char). */
function saveDataUrlToDrive_(dataUrl, id) {
  var m = /^data:(image\/(?:jpeg|jpg|png|webp|gif));base64,([A-Za-z0-9+/=\s]+)$/.exec(dataUrl);
  if (!m) return dataUrl;
  var contentType = m[1].replace('jpg', 'jpeg');
  var bytes = Utilities.base64Decode(m[2].replace(/\s/g, ''));
  var ext = contentType.split('/')[1];
  if (ext === 'jpeg') ext = 'jpg';
  var blob = Utilities.newBlob(bytes, contentType, 'menu_' + sanitize_(id) + '_' + Date.now() + '.' + ext);
  var file = DriveApp.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return 'https://drive.google.com/uc?export=view&id=' + file.getId();
}

/**
 * Bootstrap sekali jalan — jalankan via `clasp run setup` atau editor GAS.
 * Otomatis: folder Drive → spreadsheet (pindah ke folder bila perlu) → sheet → seed menu.
 */
function setup() {
  var folder = getAppFolder_();
  var ss = getSpreadsheet_();
  moveToAppFolder_(DriveApp.getFileById(ss.getId()));

  ensureSheet_(ss, CONFIG.SHEET_MENUS, MENU_HEADERS);
  ensureSheet_(ss, CONFIG.SHEET_ORDERS, ORDER_HEADERS);
  ensureSheet_(ss, CONFIG.SHEET_STATS, ['id', 'nama', 'terjual']);
  getMenus_(); // seed / perbaiki DEFAULT_MENUS

  var out = {
    success: true,
    folder_name: folder.getName(),
    folder_url: folder.getUrl(),
    spreadsheet_name: ss.getName(),
    spreadsheet_url: ss.getUrl(),
  };
  Logger.log('Folder Drive: ' + out.folder_url);
  Logger.log('Spreadsheet DB: ' + out.spreadsheet_url);
  return out;
}

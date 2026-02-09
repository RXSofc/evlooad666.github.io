# GitHub Repository Creator

Web aplikasi untuk membuat GitHub repository dan upload multiple file sekaligus dengan token dan username tersimpan aman di backend.

## 🔐 Keamanan

Token GitHub dan username Anda sudah tersimpan di backend (`server.js`), sehingga lebih aman dan tidak terekspos di frontend.

## 📋 Cara Instalasi

### 1. Install Dependencies

```bash
npm install
```

Ini akan menginstall:
- `express` - Web framework
- `multer` - Handle file upload
- `cors` - Cross-Origin Resource Sharing
- `node-fetch` - HTTP request ke GitHub API

### 2. Jalankan Backend Server

```bash
npm start
```

Atau untuk development (auto-restart):

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

### 3. Buka Frontend

Buka file `frontend.html` di browser Anda (double click atau buka dengan browser)

## 🚀 Cara Menggunakan

1. **Isi Form:**
   - Nama repository (wajib)
   - Deskripsi (opsional)
   - Centang "Private Repository" jika ingin repo private

2. **Upload File:**
   - Pilih file yang mau diupload
   - Tentukan path untuk setiap file (opsional)
     - Contoh: `src/index.js` → file akan masuk ke folder `src`
     - Kosongkan → file akan di root folder
   - Klik "Tambah File Lainnya" untuk upload lebih banyak file

3. **Klik "Buat Repository & Upload File"**

4. **Tunggu Proses Selesai** - Anda akan dapat link ke repository yang baru dibuat!

## 📁 Struktur File

```
├── frontend.html       # Web interface (buka di browser)
├── server.js          # Backend server (Node.js + Express)
├── package.json       # Dependencies
└── README.md          # Dokumentasi ini
```

## 🔧 Konfigurasi

Jika ingin mengubah token atau username, edit file `server.js`:

```javascript
const GITHUB_TOKEN = 'your-github-token-here';
const GITHUB_USERNAME = 'your-username-here';
```

## ⚠️ Catatan Penting

1. **Jangan share token GitHub Anda** ke siapapun
2. **Jangan commit file `server.js`** ke public repository jika ada token di dalamnya
3. Token memiliki akses penuh ke repository Anda, jaga kerahasiaannya
4. Backend harus berjalan terlebih dahulu sebelum menggunakan frontend

## 🐛 Troubleshooting

**Error: "Pastikan backend server sudah berjalan!"**
- Jalankan `npm start` di terminal terlebih dahulu

**Error: "Gagal membuat repository"**
- Pastikan nama repository belum digunakan
- Cek apakah token masih valid

**File tidak terupload**
- Periksa path file (jangan gunakan karakter khusus)
- Pastikan ukuran file tidak terlalu besar (max 100MB per file)

## 📞 Support

Jika ada masalah, periksa console log di:
- Browser (F12 → Console) untuk frontend
- Terminal untuk backend

## 🎉 Fitur

✅ Token dan username tersimpan aman di backend  
✅ Upload multiple file sekaligus  
✅ Custom path untuk setiap file  
✅ Support folder/subfolder  
✅ Private/Public repository option  
✅ Real-time progress indicator  
✅ Auto-generate link ke repository

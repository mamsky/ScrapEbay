# 📦 Scraping Product dari eBay

Proyek ini adalah aplikasi **Node.js** sederhana yang digunakan untuk melakukan **web scraping** produk dari eBay.  
Aplikasi ini mengambil **nama produk**, **harga**, dan **deskripsi** (dari halaman detail) menggunakan **Express**, **Axios**, dan **Cheerio**.

---

[Scraping Ebay](./src/video/demo.gif)

---

## 📂 Struktur Folder

```
scraping-product/
│
├── src/
│   ├── app.js                # File utama server Express
│   └── utils/
│       ├── scrapProduk.js    # Fungsi untuk scraping daftar produk
│       └── scrapDetails.js   # Fungsi untuk scraping detail/deskripsi produk
│
├── .gitignore
├── package.json
└── package-lock.json
```

---

## 🚀 Fitur

- Scraping daftar produk dari halaman eBay
- Mengambil **Nama Produk**
- Mengambil **Harga Produk**
- Mengambil **Deskripsi Produk** dari halaman detail
- Mengembalikan hasil dalam format **JSON**
- Membatasi hasil maksimal **20 produk**

---

## 📦 Instalasi

1. **Clone repository**

   ```bash
   git clone https://github.com/username/scraping-product.git
   cd scraping-product
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Jalankan server**

   ```bash
   npm start
   ```

4. Server akan berjalan di:
   ```
   http://localhost:4000
   ```

---

## 🔍 Penggunaan

Kirim **GET request** ke endpoint `/` dengan query `url` yang berisi link halaman produk eBay.

**Contoh:**

```bash
curl "http://localhost:4000/?url=https://www.ebay.com/sch/i.html?_nkw=nike&_pgn=1"
```

**Response:**

```json
[
  {
    "Name": "Nike Air Max 90",
    "Price": "$120.00",
    "Description": "Sepatu olahraga klasik dengan desain modern..."
  },
  ...
]
```

---

## ⚙ Teknologi yang Digunakan

- [Node.js](https://nodejs.org/) - Runtime JavaScript
- [Express](https://expressjs.com/) - Framework Web
- [Axios](https://axios-http.com/) - HTTP Client
- [Cheerio](https://cheerio.js.org/) - HTML Parser untuk scraping

---

## ⚠ Catatan

- Pastikan URL yang digunakan merupakan halaman pencarian produk eBay yang valid.
- Struktur HTML pada halaman eBay dapat berubah sewaktu-waktu, sehingga selector mungkin perlu diperbarui.
- Aplikasi ini dibuat hanya untuk tujuan pembelajaran. Gunakan sesuai dengan kebijakan dan ketentuan situs terkait.
- Jika **Description** tidak muncul, kemungkinan halaman detail produk diblokir atau memerlukan autentikasi tambahan.

---

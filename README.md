# 📚 Perpustakaan Mini (CRUD PHP + MySQL)

Aplikasi web sederhana untuk mengelola katalog buku.
Project ini dibuat untuk kebutuhan pembelajaran (UAS) menggunakan **HTML, Bootstrap, JavaScript, PHP, dan MySQL**.

---

## ✨ Fitur
* 📖 Mengelola daftar buku (CRUD)
* 🔍 Melihat detail buku
* Data tersimpan di database MySQL

---

## 🛠️ Teknologi yang Digunakan
* PHP
* MySQL
* JavaScript
* Bootstrap
* HTML & CSS

---

## 📂 Struktur Folder

```
web-uas/
├─ signup.html
├─ login.html
├─ menu.html
├─ dashboard.html
├─ detail.html
├─ create.html
├─ edit.html
├─ js/
│  ├─ app.js
|  ├─ login.js
|  ├─ signup.js
│  ├─ detail.js
│  └─ edit.js
├─ css/
│  └─ styles.css
├─ php/
│  ├─ koneksi.php
│  ├─ book_read.php
│  ├─ book_detail.php
│  ├─ book_create.php
│  ├─ book_update.php
│  └─ book_delete.php
└─ database.sql
```

---

## 🚀 Cara Menjalankan Project

### 1️⃣ Clone Repository

```bash
git clone <url-repository>
```

### 2️⃣ Pindahkan ke Folder `htdocs`

```
xampp/htdocs/utspemrogramanweb
```

### 3️⃣ Import Database

1. Buka **phpMyAdmin**
2. Buat database baru (contoh: `perpustakaan`)
3. Import file `perpustakaan.sql`

---

### 4️⃣ Konfigurasi Database

Edit file berikut:

```
php/koneksi.php
```

Sesuaikan konfigurasi:

```php
$conn = new mysqli("localhost", "root", "", "perpustakaan");
```

---

### 5️⃣ Jalankan di Browser

```
http://localhost/utspemrogramanweb/dashboard.html
```
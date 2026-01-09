<?php
require 'koneksi.php';

$id = $_POST['id'] ?? null;
$id_transaksi = $_POST['id_transaksi'] ?? 'TRX' . rand(100, 999);
$book_id = $_POST['book_id'];
$nama_peminjam = $_POST['nama_peminjam'];
$tgl_pinjam = $_POST['tgl_pinjam'];
$tgl_kembali = $_POST['tgl_kembali'];
$status = $_POST['status'];

if ($id) {
    // Logic Edit (Slide 2)
    $stmt = $conn->prepare("UPDATE peminjaman SET book_id=?, nama_peminjam=?, tgl_pinjam=?, tgl_kembali=?, status=? WHERE id=?");
    $stmt->bind_param("issssi", $book_id, $nama_peminjam, $tgl_pinjam, $tgl_kembali, $status, $id);
} else {
    // Logic Tambah (Slide 1)
    $stmt = $conn->prepare("INSERT INTO peminjaman (id_transaksi, book_id, nama_peminjam, tgl_pinjam, tgl_kembali, status) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sissss", $id_transaksi, $book_id, $nama_peminjam, $tgl_pinjam, $tgl_kembali, $status);
}

$stmt->execute();
header("Location: ../peminjaman.html");
exit;
?>
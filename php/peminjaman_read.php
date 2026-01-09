<?php
include "koneksi.php"; // Menggunakan koneksi yang sudah Anda buat
$sql = "SELECT p.*, b.title FROM peminjaman p JOIN book b ON p.book_id = b.id ORDER BY p.id DESC";
$result = $conn->query($sql);
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);
?>
<?php
require 'koneksi.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../index.html");
    exit;
}

$title = trim($_POST['title'] ?? '');
$author = trim($_POST['author'] ?? '');
$image = trim($_POST['image'] ?? '');
$description = trim($_POST['description'] ?? '');

if ($title === '' || $author === '') {
    die('Judul dan penulis wajib diisi.');
}

$stmt = $conn->prepare("INSERT INTO book (title, author, image, description) VALUES (?, ?, ?, ?)");

$stmt->bind_param("ssss", $title, $author, $image, $description);
$stmt->execute();

$stmt->close();
$conn->close();

// balik ke index
header("Location: ../index.html");
exit;

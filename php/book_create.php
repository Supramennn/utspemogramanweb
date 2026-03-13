<?php
require_once 'book.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../dashboard.html");
    exit;
}

$title = trim($_POST['title'] ?? '');
$author = trim($_POST['author'] ?? '');
$image = trim($_POST['image'] ?? '');
$description = trim($_POST['description'] ?? '');

if ($title === '' || $author === '') {
    die('Judul dan penulis wajib diisi.');
}

$book = new Book();
$book->create($title, $author, $image, $description);

// balik ke dashboard
header("Location: ../dashboard.html");
exit;

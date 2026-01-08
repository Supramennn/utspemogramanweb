<?php
require 'koneksi.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../dashboard.html");
    exit;
}

$id = $_POST['id'];

$stmt = $conn->prepare("DELETE FROM book WHERE id=?");
$stmt->bind_param("i", $id);
$stmt->execute();

header("Location: ../dashboard.html?deleted=1");
exit;

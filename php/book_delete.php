<?php
require_once 'book.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../dashboard.html");
    exit;
}

$id = $_POST['id'];

$book = new Book();
$book->delete($id);

header("Location: ../dashboard.html?deleted=1");
exit;

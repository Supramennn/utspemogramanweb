<?php
require_once 'book.php';

$id = $_POST['id'];
$title = $_POST['title'];
$author = $_POST['author'];
$image = $_POST['image'];
$description = $_POST['description'];

$book = new Book();
$book->update($id, $title, $author, $image, $description);

header("Location: ../detail.html?id=$id");
exit;

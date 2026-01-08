<?php
require 'koneksi.php';

$id = $_POST['id'];
$title = $_POST['title'];
$author = $_POST['author'];
$image = $_POST['image'];
$description = $_POST['description'];

$stmt = $conn->prepare("UPDATE book SET title=?, author=?, image=?, description=? WHERE id=?");

$stmt->bind_param("ssssi",
  $title, $author, $image, $description, $id);

$stmt->execute();

header("Location: ../detail.html?id=$id");
exit;

<?php
require_once 'book.php';

$book = new Book();
$data = $book->read();

echo json_encode($data);
?>

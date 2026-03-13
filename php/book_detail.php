<?php
require_once 'book.php';

$id = $_GET['id'] ?? '';

$book = new Book();
$data = $book->detail($id);

if ($data) {
  echo json_encode($data);
}
else {
  http_response_code(404);
  echo json_encode(["error" => "Book not found"]);
}

<?php
include "koneksi.php";

$id = $_GET['id'] ?? '';

$result = $conn->query("SELECT * FROM book WHERE id='$id'");
$data = $result->fetch_assoc();

if ($data) {
  echo json_encode($data);
} else {
  http_response_code(404);
  echo json_encode(["error" => "Book not found"]);
}

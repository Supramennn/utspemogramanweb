<?php
include "koneksi.php";
$result = $conn->query("SELECT * FROM book");
$data = [];
while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}
echo json_encode($data);
?>

<?php
require_once 'koneksi.php';

class Book {
    private $conn;

    public function __construct() {
        global $conn;
        $this->conn = $conn;
    }

    public function create($title, $author, $image, $description) {
        $stmt = $this->conn->prepare("INSERT INTO book (title, author, image, description) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $title, $author, $image, $description);
        $result = $stmt->execute();
        $stmt->close();
        return $result;
    }

    public function read() {
        $result = $this->conn->query("SELECT * FROM book");
        $data = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        return $data;
    }

    public function detail($id) {
        $stmt = $this->conn->prepare("SELECT * FROM book WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_assoc();
        $stmt->close();
        return $data;
    }

    public function update($id, $title, $author, $image, $description) {
        $stmt = $this->conn->prepare("UPDATE book SET title=?, author=?, image=?, description=? WHERE id=?");
        $stmt->bind_param("ssssi", $title, $author, $image, $description, $id);
        $result = $stmt->execute();
        $stmt->close();
        return $result;
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM book WHERE id=?");
        $stmt->bind_param("i", $id);
        $result = $stmt->execute();
        $stmt->close();
        return $result;
    }
}
?>

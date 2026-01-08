const id = new URLSearchParams(location.search).get('id');

if (!id) {
    alert("ID tidak ditemukan");
    location.href = "index.html";
}

// ambil data buku
fetch(`php/book_detail.php?id=${id}`)
    .then(res => res.json())
    .then(book => {
        document.getElementById('bookId').value = book.id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('image').value = book.image || '';
        document.getElementById('description').value = book.description || '';
    });

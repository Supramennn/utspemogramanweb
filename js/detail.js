// ====== Ambil ID dari URL ======
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const detailEl = document.getElementById('detail');

if (!id) {
    detailEl.innerHTML = '<div class="text-center text-danger py-5"><h4>Book Not Found</h4></div>';
    throw new Error("No ID");
}

// ====== Ambil data dari PHP ======
fetch(`php/book_detail.php?id=${id}`)
    .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
    })
    .then(book => {
        document.getElementById('bookTitle').textContent = book.title;
        document.getElementById('bookAuthor').textContent = 'oleh ' + book.author;
        document.getElementById('bookDesc').textContent = book.description || 'Belum ada deskripsi.';

        // redirect edit
        document.getElementById('btnEdit').href = `edit.html?id=${book.id}`;

        // action hapus
        document.getElementById('deleteId').value = book.id;
        document.getElementById('deleteForm').onsubmit = () => {
            return confirm('Yakin mau hapus buku ini?');
        };

        const cover = document.getElementById('bookCover');
        cover.style.backgroundImage = `url(${book.image})`;
        cover.style.backgroundSize = 'cover';
        cover.style.backgroundPosition = 'center';
    })
    .catch(() => {
        detailEl.innerHTML = '<div class="text-center text-danger py-5"><h4>Book Not Found</h4></div>';
    });

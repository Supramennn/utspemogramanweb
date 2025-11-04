// ====== Data buku (dummy) ======
const BOOKS = [
    { id: 'bk-001', title: 'Madilog', author: 'Tan Malaka', image:'https://mabhak.sch.id/wp-content/uploads/2023/12/9789791683319_Madilog-Tan-Malaka-Materialisme-Dialektika-Logika.jpg' },
    { id: 'bk-002', title: 'Basis Data Relasional', author: 'N. Pratama' },
    { id: 'bk-003', title: 'Clean Code', author: 'Robert C. Martin' },
    { id: 'bk-004', title: 'Eloquent JavaScript', author: 'Marijn Haverbeke' },
    { id: 'bk-005', title: 'Pemrograman Python untuk Data', author: 'Y. Alamsyah' },
    { id: 'bk-006', title: 'Machine Learning Dasar', author: 'A. Nugroho' },
    { id: 'bk-007', title: 'The Pragmatic Programmer', author: 'Andrew Hunt' },
    { id: 'bk-008', title: 'Struktur Diskrit', author: 'R. Susanto' },
    { id: 'bk-009', title: 'Operating Systems', author: 'A. Silberschatz' },
    { id: 'bk-010', title: 'Database System Concepts', author: 'H. Korth' },
    { id: 'bk-011', title: 'Jaringan Komputer', author: 'A. Tanenbaum' },
    { id: 'bk-012', title: 'The Lord of the Rings', author: 'J. R. R. Tolkien' },
];

// ====== Storage util ======
const storageKey = 'mini-lib-status-v2';
const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
function persist() { localStorage.setItem(storageKey, JSON.stringify(saved)); }

// ====== Render grid ======
const grid = document.getElementById('grid');
const tmpl = document.getElementById('cardTemplate');
const resultCount = document.getElementById('resultCount');
const search = document.getElementById('search');

function makeCard(book, i) {
    const node = tmpl.content.firstElementChild.cloneNode(true);
    const cover = node.querySelector('.cover');
if (book.image) {
  cover.style.backgroundImage = `url(${book.image})`;
  cover.style.backgroundSize = 'cover';
  cover.style.backgroundPosition = 'center';
}

    node.querySelector('[data-field="title"]').textContent = book.title;
    node.querySelector('[data-field="author"]').textContent = 'oleh ' + book.author;

    const card = node.querySelector('.book-card');
    card.style.animationDelay = `${i * 60}ms`; // staggered animation

    const statusPill = node.querySelector('.status');
    const label = statusPill.querySelector('.label');
    const dot = statusPill.querySelector('.dot');
    const btn = node.querySelector('.btn');
    const ribbon = node.querySelector('.ribbon');

    function applyState(isBorrowed) {
        btn.setAttribute('aria-pressed', isBorrowed ? 'true' : 'false');
        if (isBorrowed) {
            statusPill.classList.add('borrowed', 'text-bg-danger');
            statusPill.classList.remove('text-bg-success');
            label.textContent = 'Dipinjam';
            btn.querySelector('.btn-label').textContent = 'Kembalikan';
            ribbon.classList.remove('d-none');
        } else {
            statusPill.classList.remove('borrowed', 'text-bg-danger');
            statusPill.classList.add('text-bg-success');
            label.textContent = 'Tersedia';
            btn.querySelector('.btn-label').textContent = 'Pinjam';
            ribbon.classList.add('d-none');
        }
    }

    applyState(!!saved[book.id]);

    btn.addEventListener('click', () => {
        const nowBorrowed = !saved[book.id];
        saved[book.id] = nowBorrowed;
        if (!nowBorrowed) delete saved[book.id];
        applyState(nowBorrowed);
        persist();
    });

    return node;
}

function render(data) {
    grid.innerHTML = '';
    data.forEach((b, i) => grid.appendChild(makeCard(b, i)));
    updateCount();
    toggleEmpty(data.length === 0);
}

function updateCount() {
    const visible = grid.querySelectorAll('.book-card').length;
    resultCount.textContent = `${visible} hasil`;
}
function toggleEmpty(show) { document.getElementById('empty').classList.toggle('d-none', !show); }

// ====== Search (Live) ======
function filterBooks(q) {
    const s = q.trim().toLowerCase();
    if (!s) { render(BOOKS); return; }
    const filtered = BOOKS.filter(b => b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s));
    render(filtered);
}
search.addEventListener('input', (e) => filterBooks(e.target.value));

// keyboard shortcut '/'
window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== search) { e.preventDefault(); search.focus(); }
});

// first paint
render(BOOKS);

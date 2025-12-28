// login.js
// ============================
// Perpustakaan Mini — Auth Logic
// - Login from localStorage users
// - Seed admin if empty
// - Session storage in localStorage
// - Helper requireAuth + logout
// ============================

const USERS_KEY = "mini-lib-users";
const SESSION_KEY = "mini-lib-session";

// ====== Seed default admin (only if users empty) ======
(function seedAdminIfEmpty() {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    if (!Array.isArray(users) || users.length === 0) {
        const seeded = [
            { username: "admin", password: "12345", role: "admin" }
        ];
        localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
    }
})();

// ====== Utilities ======
function getUsers() {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(users) ? users : [];
}

function setSession(user) {
    // Simpan session minimal, jangan simpan password
    const session = {
        username: user.username,
        role: user.role || "user",
        loginAt: new Date().toISOString()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
}

function getSession() {
    try {
        return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch {
        return null;
    }
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}

function showError(message) {
    // Optional: kalau ada elemen alert di HTML, tampilkan di sana
    const alertBox = document.getElementById("loginAlert");
    if (alertBox) {
        alertBox.textContent = message;
        alertBox.classList.remove("d-none");
        return;
    }
    // fallback
    alert(message);
}

function hideError() {
    const alertBox = document.getElementById("loginAlert");
    if (alertBox) alertBox.classList.add("d-none");
}

// ====== Public helpers (dipakai page lain) ======
function requireAuth(redirectTo = "login.html") {
    const session = getSession();
    if (!session || !session.username) {
        window.location.href = redirectTo;
        return null;
    }
    return session;
}

function logout(redirectTo = "login.html") {
    clearSession();
    window.location.href = redirectTo;
}

// expose to global (biar bisa dipakai di file lain)
window.requireAuth = requireAuth;
window.logout = logout;

// ====== Login form handling ======
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (!form) return;

    const usernameEl = document.getElementById("username");
    const passwordEl = document.getElementById("password");

    // Kalau sudah login, langsung lempar ke menu
    const existing = getSession();
    if (existing?.username) {
        window.location.href = "menu.html";
        return;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        hideError();

        const username = (usernameEl?.value || "").trim();
        const password = (passwordEl?.value || "").trim();

        if (!username || !password) {
            showError("Username dan password wajib diisi.");
            return;
        }

        const users = getUsers();
        const found = users.find(
            (u) => u.username === username && u.password === password
        );

        if (!found) {
            showError("Username atau password salah.");
            return;
        }

        setSession(found);
        window.location.href = "menu.html";
    });
});

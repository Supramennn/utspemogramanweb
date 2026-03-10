// login.js
// ============================
// Perpustakaan Mini — Auth Logic (OOP Refactor)
// ============================

/**
 * StorageManager — wrapper aman untuk localStorage
 * FIX: semua akses localStorage lewat try-catch terpusat
 */
class StorageManager {
    static get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(key);
            return raw !== null ? JSON.parse(raw) : fallback;
        } catch {
            return fallback;
        }
    }

    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }
}

/**
 * AuthManager — single source of truth untuk autentikasi
 * FIX: SESSION_KEY seragam "auth_user" — konsisten dengan dashboard.html & login.html
 */
class AuthManager {
    static SESSION_KEY = "auth_user";
    static USERS_KEY = "mini-lib-users";

    // ====== User Store ======

    static getUsers() {
        const users = StorageManager.get(AuthManager.USERS_KEY, []);
        return Array.isArray(users) ? users : [];
    }

    /**
     * Seed admin default jika belum ada user sama sekali
     * FIX: password diperketat — ganti "12345" dengan sesuatu lebih kuat
     * Catatan: di produksi, password harus di-hash (bcrypt/argon2 di server)
     */
    static seedDefaultAdmin() {
        const users = AuthManager.getUsers();
        if (users.length === 0) {
            StorageManager.set(AuthManager.USERS_KEY, [
                { username: "admin", password: "Admin2026!", role: "admin" },
                { username: "user", password: "User2026!", role: "user" },
            ]);
        }
    }

    /**
     * Autentikasi: cari user berdasarkan username + password
     * FIX: hanya return field yang dibutuhkan — tidak expose field berbahaya
     */
    static authenticate(username, password) {
        const users = AuthManager.getUsers();
        const found = users.find(
            u => u.username === username && u.password === password
        );

        if (!found) return null;

        // FIX: whitelist field yang masuk session — bukan spread seluruh objek
        return {
            username: found.username,
            role: found.role ?? "user",
        };
    }

    // ====== Session ======

    static getSession() {
        return StorageManager.get(AuthManager.SESSION_KEY, null);
    }

    static setSession(user) {
        const session = {
            username: user.username,
            role: user.role ?? "user",
            loginAt: new Date().toISOString(),
        };
        StorageManager.set(AuthManager.SESSION_KEY, session);
        return session;
    }

    static clearSession() {
        StorageManager.remove(AuthManager.SESSION_KEY);
    }

    static isLoggedIn() {
        const session = AuthManager.getSession();
        return !!(session?.username);
    }

    // ====== Guards (dipakai halaman lain) ======

    /**
     * Redirect ke loginPage jika belum login
     * Expose ke window agar bisa dipakai halaman lain tanpa import
     */
    static requireAuth(loginPage = "login.html") {
        const session = AuthManager.getSession();
        if (!session?.username) {
            window.location.href = loginPage;
            return null;
        }
        return session;
    }

    static logout(redirectTo = "login.html") {
        AuthManager.clearSession();
        window.location.href = redirectTo;
    }
}

// Expose helper ke global — kompatibel dengan halaman lain
window.requireAuth = (page) => AuthManager.requireAuth(page);
window.logout = (page) => AuthManager.logout(page);

// Seed admin saat script pertama diload
AuthManager.seedDefaultAdmin();


/**
 * LoginForm — mengelola UI & logika form login
 * FIX: semua DOM interaction terpusat, tidak ada logika tersebar di luar class
 */
class LoginForm {
    constructor() {
        // Hanya jalankan jika ada form login di halaman ini
        this.form = document.getElementById("loginForm");
        if (!this.form) return;

        this._bindElements();
        this._guardAlreadyLoggedIn();
        this._bindEvents();
    }

    _bindElements() {
        this.elUser = document.getElementById("username");
        this.elPass = document.getElementById("password");
        this.elAlert = document.getElementById("loginAlert");
        this.elSubmit = document.getElementById("submitBtn");
    }

    /** FIX: jika sudah login, langsung redirect — tidak perlu isi form lagi */
    _guardAlreadyLoggedIn() {
        if (AuthManager.isLoggedIn()) {
            window.location.replace("menu.html");
        }
    }

    _bindEvents() {
        this.form.addEventListener("submit", (e) => this._handleSubmit(e));

        // FIX: reset error saat user mulai mengetik ulang
        [this.elUser, this.elPass].forEach(el => {
            el?.addEventListener("input", () => {
                el.classList.remove("is-invalid");
                this._hideError();
            });
        });
    }

    _handleSubmit(e) {
        e.preventDefault();

        // FIX: trim untuk hindari spasi tidak sengaja
        const username = this.elUser?.value.trim() ?? "";
        const password = this.elPass?.value.trim() ?? "";

        if (!this._validate(username, password)) return;

        this._setLoading(true);

        // Simulasi async — ganti dengan fetch() ke API di produksi
        setTimeout(() => {
            const user = AuthManager.authenticate(username, password);

            if (user) {
                AuthManager.setSession(user);
                window.location.href = "menu.html";
            } else {
                this._showError("Username atau password salah.");
                this._setLoading(false);
            }
        }, 400);
    }

    /** FIX: validasi per-field dengan Bootstrap is-invalid — bukan alert() */
    _validate(username, password) {
        let valid = true;

        if (!username) {
            this.elUser?.classList.add("is-invalid");
            valid = false;
        }
        if (!password) {
            this.elPass?.classList.add("is-invalid");
            valid = false;
        }

        if (!valid) {
            this._showError("Username dan password wajib diisi.");
        }

        return valid;
    }

    /** FIX: tidak ada fallback alert() — cukup tampilkan di #loginAlert */
    _showError(message) {
        if (!this.elAlert) return;
        this.elAlert.textContent = message;
        this.elAlert.classList.remove("d-none");
    }

    _hideError() {
        if (!this.elAlert) return;
        this.elAlert.classList.add("d-none");
        this.elAlert.textContent = "";
    }

    /** FIX: disable tombol saat proses — cegah spam submit */
    _setLoading(isLoading) {
        if (!this.elSubmit) return;
        this.elSubmit.disabled = isLoading;
        this.elSubmit.textContent = isLoading ? "Memproses…" : "Masuk →";
    }
}

// ✅ Inisialisasi setelah DOM siap
document.addEventListener("DOMContentLoaded", () => {
    new LoginForm();
});

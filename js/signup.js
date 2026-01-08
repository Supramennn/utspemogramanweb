// signup.js
const STORAGE_KEY = "mini-lib-users";

const form = document.getElementById("signupForm");
const [usernameInput, passwordInput] = form.querySelectorAll("input");

function getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        alert("Username dan password wajib diisi.");
        return;
    }

    const users = getUsers();

    const exists = users.some(u => u.username === username);
    if (exists) {
        alert("Username sudah digunakan.");
        return;
    }

    users.push({
        username,
        password,
        role: "user" // default role
    });

    saveUsers(users);

    alert("Pendaftaran berhasil! Silakan login.");
    window.location.href = "login.html";
});

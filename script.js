document.addEventListener('DOMContentLoaded', () => {

    // --- KREDENSIAL LOGIN ---
    const CORRECT_USERNAME = "david";
    const CORRECT_PASSWORD = "123"; // GANTI DENGAN PASSWORD ANDA

    // --- Elemen-elemen DOM ---
    const loginGate = document.getElementById('login-gate');
    const appContainer = document.getElementById('app-container');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const logoutButton = document.getElementById('logout-button');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section, .full-screen');

    // --- LOGIKA LOGIN/LOGOUT (Sama seperti sebelumnya) ---
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
            loginGate.classList.add('hidden');
            appContainer.classList.remove('hidden');
            loginError.textContent = '';
        } else {
            loginError.textContent = 'Username atau password salah!';
        }
    });

    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        appContainer.classList.add('hidden');
        loginGate.classList.remove('hidden');
        loginForm.reset();
    });

    // --- LOGIKA SMOOTH SCROLL ---
    navLinks.forEach(link => {
        if (link.hash !== "") { // Pastikan link punya href="#..."
            link.addEventListener('click', function(event) {
                // Mencegah perilaku default klik
                event.preventDefault();

                // Ambil id tujuan dari href
                const targetId = this.hash;
                const targetSection = document.querySelector(targetId);

                // Lakukan scroll ke elemen tujuan
                if(targetSection){
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });

    // --- LOGIKA UNTUK MENANDAI LINK AKTIF SAAT SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hapus kelas 'active' dari semua link
                navLinks.forEach(link => link.classList.remove('active'));

                // Cari link yang cocok dengan section yang terlihat
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.5 // Anggap aktif jika 50% bagian terlihat
    });

    // Mulai amati setiap section
    sections.forEach(section => {
        observer.observe(section);
    });

});
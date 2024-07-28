
document.addEventListener('DOMContentLoaded', function () {
    // logica Login
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const storedUser = JSON.parse(localStorage.getItem(username));

            if (storedUser && storedUser.password === password) {
                localStorage.setItem('authenticated', 'true');
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }
        });
    }

    // Logica register
    const registerForm = document.getElementById('register-form');
    const registerErrorMessage = document.getElementById('error-message');
    const registerSuccessMessage = document.getElementById('success-message');

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                registerErrorMessage.textContent = "Las contraseñas no coinciden";
                registerErrorMessage.style.display = 'block';
                registerSuccessMessage.style.display = 'none';
                return;
            }

            if (localStorage.getItem(username)) {
                registerErrorMessage.textContent = "El usuario ya existe";
                registerErrorMessage.style.display = 'block';
                registerSuccessMessage.style.display = 'none';
                return;
            }

            const userData = {
                password: password
            };

            localStorage.setItem(username, JSON.stringify(userData));
            registerSuccessMessage.style.display = 'block';
            registerErrorMessage.style.display = 'none';
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        });
    }

    // logica log out
    const logoutBtn = document.getElementById('logout-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('authenticated');
            window.location.href = 'login.html';
        });
    }

    // autentificacion
    const isAuthenticated = localStorage.getItem('authenticated');

    if (isAuthenticated !== 'true' && window.location.pathname !== '/login.html' && window.location.pathname !== '/register.html') {
        window.location.href = 'login.html';
    }
});




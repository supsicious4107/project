document.addEventListener('DOMContentLoaded', () => {
    // === 1. Переключение между формами с сохранением состояния в Local Storage ===
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-container form');

    // Восстанавливаем активную вкладку из Local Storage при загрузке
    const savedFormType = localStorage.getItem('activeForm') || 'login';
    document.querySelector(`[data-form="${savedFormType}"]`)?.classList.add('active');
    document.getElementById(`${savedFormType}Form`)?.classList.add('active-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const formType = tab.dataset.form;

            // Обновляем вкладки
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Сохраняем активную вкладку в Local Storage
            localStorage.setItem('activeForm', formType);

            // Скрываем все формы
            forms.forEach(form => form.classList.remove('active-form'));

            // Показываем нужную форму
            document.getElementById(`${formType}Form`).classList.add('active-form');
        });
    });

    // === 2. Обработка формы входа с проверкой данных в Local Storage ===
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
        alert('Пользователь не найден. Пожалуйста, зарегистрируйтесь.');
        return;
    }

    if (email === storedUser.email && password === storedUser.password) {
        localStorage.setItem('isLoggedIn', 'true'); // Устанавливаем флаг
        window.location.href = 'index.html';
    } else {
        alert('Неверный email или пароль');
    }
});

// Обработка формы регистрации
// registr.js
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }

    // Сохраняем пользователя
    localStorage.setItem('user', JSON.stringify({ email, password }));
    localStorage.setItem('isLoggedIn', 'true'); // Устанавливаем флаг
    window.location.href = 'index.html';
});

    // === 4. Кнопка "Выйти" (если добавите её в index.html) ===
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            window.location.href = 'registr.html'; // Перенаправление на страницу входа
        });
    }

    // === 5. Обработка "Забыли пароль" ===
    const forgotLink = document.querySelector('[data-form="forgot"]');
    if (forgotLink) {
        forgotLink.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Функция восстановления пароля в разработке');
        });
    }
});

// registr.js
console.log('Пользователь в LS:', localStorage.getItem('user'));
console.log('isLoggedIn:', localStorage.getItem('isLoggedIn'));

// Переключение между формами
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const formType = tab.dataset.form;
                
                // Обновление вкладок
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Скрытие всех форм
                document.querySelectorAll('.form-container form').forEach(form => {
                    form.classList.remove('active-form');
                });
                
                // Показ нужной формы
                document.getElementById(`${formType}Form`).classList.add('active-form');
            });
        });

        // Обработка формы входа
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь можно добавить логику отправки данных
            alert('Форма входа отправлена!');
        });

        // Обработка формы регистрации
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Пароли не совпадают!');
                return;
            }
            
            // Здесь можно добавить логику регистрации
            alert('Регистрация успешна!');
        });

        // Переключение на восстановление пароля
        document.querySelector('[data-form="forgot"]').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Функция восстановления пароля в разработке');
        });
        
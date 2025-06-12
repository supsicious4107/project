document.addEventListener('DOMContentLoaded', function() {
    // Sample data for recipes
    const recipes = [
      
        {
    id: 2,
    title: "Греческий салат",
    time: "15 мин",
    servings: 2,
    description: "Свежий и полезный салат с помидорами, огурцами, оливками и фетой.",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "lunch",
    calories: 200 
  },
  {
    id: 3,
    title: "Тыквенный суп-пюре",
    time: "45 мин",
    servings: 6,
    description: "Нежный крем-суп из тыквы с добавлением сливок и ароматных специй.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "lunch",
    calories: 150 
  },
  {
    id: 4,
    title: "Овсянка с фруктами",
    time: "10 мин",
    servings: 1,
    description: "Полезный завтрак с овсяными хлопьями, свежими фруктами и медом.",
    image: "https://avatars.mds.yandex.net/i?id=65a26a7dca0da11b24efbadd83e9a556_l-5496540-images-thumbs&n=13",
    category: "breakfast",
    calories: 170 
  },
  {
    id: 5,
    title: "Шоколадный мусс",
    time: "25 мин",
    servings: 4,
    description: "Нежный десерт из темного шоколада с воздушной текстурой.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "dessert",
    calories: 300 
  },
  {
    id: 6,
    title: "Плов с курицей",
    time: "30 мин",
    servings: 1,
    description: "Прекрасное блюдо для плотного ужина из риса и курицы.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/3774499/pub_65145f1716c215404f7e4248_65146fad16c215404f9e895b/scale_1200",
    category: "dinner",
    calories: 500 
  }
];

    // Sample data for meal plan
    const mealPlan = [
        {
            day: "Понедельник",
            meals: ["Овсянка с фруктами", "Куриный суп", "Лосось с овощами"]
        },
        {
            day: "Вторник",
            meals: ["Творог с медом", "Греческий салат", "Паста Карбонара"]
        },
        {
            day: "Среда",
            meals: ["Омлет с овощами", "Овощной суп", "Курица с рисом"]
        },
        {
            day: "Четверг",
            meals: ["Гранола с йогуртом", "Стейк с картофелем", "Тыквенный суп-пюре"]
        },
        {
            day: "Пятница",
            meals: ["Смузи-боул", "Роллы с лососем", "Пицца домашняя"]
        },
        {
            day: "Суббота",
            meals: ["Блины с ягодами", "Шашлык из курицы", "Салат Цезарь"]
        },
        {
            day: "Воскресенье",
            meals: ["Яичница с беконом", "Плов", "Творожная запеканка"]
        }
    ];

    // Sample shopping list items
    const initialShoppingList = [
        { name: "Куриное филе", quantity: "500 г", completed: false },
        { name: "Рис", quantity: "1 кг", completed: false },
        { name: "Помидоры", quantity: "6 шт", completed: false },
        { name: "Огурцы", quantity: "4 шт", completed: false }
    ];

    // DOM elements
    const recipesGrid = document.getElementById('recipesGrid');
    const planWeek = document.getElementById('planWeek');
    const shoppingListEl = document.getElementById('shoppingList');
    const newItemInput = document.getElementById('newItemInput');
    const addItemBtn = document.getElementById('addItemBtn');
    const clearListBtn = document.getElementById('clearListBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const startBtn = document.getElementById('startBtn');
    const demoBtn = document.getElementById('demoBtn');

    // Initialize the app
    function init() {
        renderRecipes();
        renderMealPlan();
        renderShoppingList();
        setupEventListeners();
    }


    // Render recipes
   function renderRecipes(filter = 'all') {
    recipesGrid.innerHTML = '';
    
    const filteredRecipes = filter === 'all' 
        ? recipes 
        : recipes.filter(recipe => recipe.category === filter);
    
    filteredRecipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        
        // Добавлено отображение калорий (с проверкой наличия поля)
        const caloriesHtml = recipe.calories ? `
            <div class="recipe-meta-item">
                <span>🔥 ${recipe.calories} ккал/порция</span>
            </div>
        ` : '';
        
        recipeCard.innerHTML = `
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.title}">
            </div>
            <div class="recipe-info">
                <h3 class="recipe-title">${recipe.title}</h3>
                <div class="recipe-meta">
                    <div class="recipe-meta-item">
                        <span>⏱ ${recipe.time}</span>
                    </div>
                    <div class="recipe-meta-item">
                        <span>🍽 ${recipe.servings} порции</span>
                    </div>
                    ${caloriesHtml}
                </div>
                <p class="recipe-desc">${recipe.description}</p>
                <button class="btn btn-outline" style="width: 100%;">Посмотреть рецепт</button>
            </div>
        `;
        recipesGrid.appendChild(recipeCard);
    });
}


    // Render meal plan
    function renderMealPlan() {
        planWeek.innerHTML = '';
        
        mealPlan.forEach(day => {
            const dayCard = document.createElement('div');
            dayCard.className = 'day-card';
            
            let mealsHtml = '';
            day.meals.forEach(meal => {
                mealsHtml += `<div class="day-meal">${meal}</div>`;
            });
            
            dayCard.innerHTML = `
                <div class="day-name">${day.day}</div>
                ${mealsHtml}
            `;
            
            planWeek.appendChild(dayCard);
        });
    }

    // Render shopping list
    function renderShoppingList() {
        shoppingListEl.innerHTML = '';
        
        const shoppingList = getShoppingListFromStorage();
        
        shoppingList.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-item';
            listItem.innerHTML = `
                <input type="checkbox" class="item-checkbox" ${item.completed ? 'checked' : ''} data-index="${index}">
                <span class="item-name ${item.completed ? 'completed' : ''}">${item.name}</span>
                <span class="item-quantity">${item.quantity}</span>
            `;
            shoppingListEl.appendChild(listItem);
        });
        
        // Add event listeners to checkboxes
        document.querySelectorAll('.item-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', toggleItemComplete);
        });
    }

    // Get shopping list from localStorage or use initial list
    function getShoppingListFromStorage() {
        const storedList = localStorage.getItem('shoppingList');
        return storedList ? JSON.parse(storedList) : initialShoppingList;
    }

    // Save shopping list to localStorage
    function saveShoppingList(list) {
        localStorage.setItem('shoppingList', JSON.stringify(list));
    }

    // Toggle item complete status
    function toggleItemComplete(e) {
        const index = e.target.dataset.index;
        const shoppingList = getShoppingListFromStorage();
        shoppingList[index].completed = e.target.checked;
        saveShoppingList(shoppingList);
        renderShoppingList();
    }

    // Add new item to shopping list
    function addNewItem() {
        const itemName = newItemInput.value.trim();
        if (itemName) {
            const shoppingList = getShoppingListFromStorage();
            shoppingList.push({
                name: itemName,
                quantity: "1 шт",
                completed: false
            });
            saveShoppingList(shoppingList);
            newItemInput.value = '';
            renderShoppingList();
        }
    }

    // Clear shopping list
    function clearShoppingList() {
        if (confirm('Вы уверены, что хотите очистить список покупок?')) {
            saveShoppingList([]);
            renderShoppingList();
        }
    }

    // Filter recipes by category
    function filterRecipes(e) {
        const category = e.target.dataset.category;
        filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderRecipes(category);
    }

    // Scroll to section
    function scrollToSection(sectionId) {
        document.querySelector(sectionId).scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Shopping list
        addItemBtn.addEventListener('click', addNewItem);
        newItemInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addNewItem();
        });
        clearListBtn.addEventListener('click', clearShoppingList);
        
        // Recipe filters
        filterBtns.forEach(btn => {
            btn.addEventListener('click', filterRecipes);
        });
        
        // Navigation buttons
        startBtn.addEventListener('click', () => scrollToSection('#recipes'));
        demoBtn.addEventListener('click', () => scrollToSection('#meal-plan'));
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                if (href !== '#') {
                    scrollToSection(href);
                }
            });
        });
    }

    // Initialize the app
    init();
     const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.querySelector('.auth-btn.login');
    const registerBtn = document.querySelector('.auth-btn.register');
    const logoutBtn = document.getElementById('logoutBtn');

    if (isLoggedIn) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
    }

    // Обработчик выхода
    // index.js
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn'); // Удаляем только флаг
        window.location.href = 'registr.html'; // Перенаправляем на форму входа
    });
}
});



     // index.js
console.log('isLoggedIn (index):', localStorage.getItem('isLoggedIn'));
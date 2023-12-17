document.getElementById('Generate Food').addEventListener('click', function () {
    // const day = document.getElementById('day').value;
    // const mealTime = document.getElementById('meal-time').value;
    getMeal();
    getDrink();
    var h3Element = document.querySelector('.container h3');
    if (h3Element) {
        h3Element.remove();
    }
});
function toggleMenu() {
    var menuItems = document.getElementById("menu-items");
    if (menuItems.className === "menu-items-hidden") {
        menuItems.className = "menu-items-shown";
    } else {
        menuItems.className = "menu-items-hidden"
    }
}
function getMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            displayMeal(data.meals[0]);
            updateSelectionHistory('meal', data.meals[0].strMeal);
        })
        .catch(error => console.error('Error:', error));
}
function getDrink() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            displayDrink(data.drinks[0]);
            updateSelectionHistory('drink', data.drinks[0].strDrink);
        })
        .catch(error => console.error('Error:', error));
}
function displayMeal(meal) {
    const resultSection = document.getElementById('result');
    resultSection.innerHTML = ''; // Clear previous results
    const mealDiv = document.createElement('div');
    mealDiv.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    `;
    resultSection.appendChild(mealDiv);
}
function displayDrink(drink) {
    const resultSection = document.getElementById('result2');
    resultSection.innerHTML = ''; // Clear previous results
    const drinkDiv = document.createElement('div');
    drinkDiv.innerHTML = `
        <h2>${drink.strDrink}</h2>
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
    `;
    resultSection.appendChild(drinkDiv);
}
//History of searches...
document.getElementById('Show History').addEventListener('click', function () {
    var historyElement = document.getElementById('history');
    if (historyElement.style.display === 'none' || historyElement.style.display === '') {
        historyElement.style.display = 'block';
    } else {
        historyElement.style.display = 'none';
    }
});
function updateSelectionHistory(type, selection) {
    let history = JSON.parse(localStorage.getItem('selectionHistory')) || { meals: [], drinks: [] };
    if (type === 'meal') {
        history.meals.push(selection);
        if (history.meals.length > 5) history.meals.shift();
    } else if (type === 'drink') {
        history.drinks.push(selection);
        if (history.drinks.length > 5) history.drinks.shift();
    }
    localStorage.setItem('selectionHistory', JSON.stringify(history));
    displaySelectionHistory();
}
function displaySelectionHistory() {
    let history = JSON.parse(localStorage.getItem('selectionHistory')) || { meals: [], drinks: [] };
    const historySection = document.getElementById('history');
    // If there are no meals or drinks in the history, don't show the history section
    if (history.meals.length === 0 && history.drinks.length === 0) {
        historySection.style.display = 'none';
        return;
    }
    historySection.innerHTML = '<h3>Previous Selections</h3>';
    history.meals.forEach(meal => {
        let p = document.createElement('p');
        p.textContent = 'Meal: ' + meal;
        historySection.appendChild(p);
    });
    history.drinks.forEach(drink => {
        let p = document.createElement('p');
        p.textContent = 'Drink: ' + drink;
        historySection.appendChild(p);
    });
    historySection.style.display = 'block';
}
document.getElementById('Generate Food').addEventListener('click', function () {
    // const day = document.getElementById('day').value;
    // const mealTime = document.getElementById('meal-time').value;
    getMeal();
    getDrink();
});

function getMeal(mealTime) {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => displayMeal(data.meals[0]))
        .catch(error => console.error('Error:', error));
}

function getDrink() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => displayDrink(data.drinks[0]))
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
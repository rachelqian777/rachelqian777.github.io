// JavaScript Document


const randomButton = document.querySelector('#random-btn');
const mealContainer = document.querySelector('#meal-container');

randomButton.addEventListener('click', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      const mealName = meal.strMeal;
      const mealInstructions = meal.strInstructions;
      const mealPicture = meal.strMealThumb;

      const mealHTML = `
        <div class="parent">
            <div class="name">
            <h2>How about "${mealName}" ?</h2>
            </div>
            <div class="img">
            <img src="${mealPicture}">
            </div>
            <div class="details">
                <h3 style="padding-top:20px">Instructions</h3>
                <div id="recipe">
                    <pre id="instructions">${mealInstructions}</pre>
                </div>
                
            </div>
        </div>
      `;

      mealContainer.innerHTML = mealHTML;

      document.getElementById("add-to-fav").addEventListener("click", function() {
        let mealObj = JSON.parse(meal);
        let mealName = mealObj.strMeal.replace(/ /g, "_");
        localStorage.setItem(mealName, meal);
      
        let savedMeals = JSON.parse(localStorage.getItem("savedMeals")) || [];
        savedMeals.push(mealObj);
        localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
      });
    })
    .catch(error => console.error(error));
});

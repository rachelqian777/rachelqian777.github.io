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

    //   let count = 1;
    //   let ingredients = [];
    //   for(let i in meal) {
    //       let ingredient = "";
    //       let measure = "";
    //       if(i.startsWith("strIngredient") && meal[i]) {
    //           ingredient = meal[i];
    //           measure = meal[`strMeasure` + count];
    //           count += 1;
    //           ingredients.push(`${measure} ${ingredient}`);
    //       }
    //   }

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
                <button class="btn-secondary">Add to Favorite</button>
            </div>
        </div>
      `;

    //   let ingredientCon = document.getElementById("ingredient-con");
    //   let parent2 = document.createElement("ul");

    //   ingredients.forEach((i) => {
    //       let child = document.createElement("li");
    //       child.innerText = i;
    //       parent2.appendChild(child);
    //   });

    //   ingredientCon.appendChild(parent2);
      mealContainer.innerHTML = mealHTML;
    })
    .catch(error => console.error(error));
});

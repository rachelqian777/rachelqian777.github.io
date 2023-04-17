// JavaScript Document

let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url="https://www.themealdb.com/api/json/v1/1/search.php?s=";
let  userInp= document.getElementById("user-inp").value;

searchBtn.addEventListener("click", () => {
    let userInp = document.getElementById("user-inp").value;
    if(userInp.length == 0){
        result.innerHTML = `<p>Please type a dish name to start the search.</p>`;
    }
    else{
        fetch(url + userInp)
    .then((response) => response.json())
    .then((data) => {
        let myMeal = data.meals[0];
        console.log(myMeal);
        console.log(myMeal.strMealThumb);
        console.log(myMeal.strMeal);
        console.log(myMeal.strInstructions);


        let count = 1;
        let ingredients = [];
        for(let i in myMeal) {
            let ingredient = "";
            let measure = "";
            if(i.startsWith("strIngredient") && myMeal[i]) {
                ingredient = myMeal[i];
                measure = myMeal[`strMeasure` + count];
                count += 1;
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        console.log(ingredients);

        result.innerHTML = `
        <div class="parent">
            <div class="name">
                <h2>${myMeal.strMeal}</h2>
            </div>
            <div class="img">
                <img src=${myMeal.strMealThumb}>
            </div>
            <div class="details">
                <h3>Ingredients</h3>
                <div id="ingredient-con"></div>
                <h3 style="padding-top:20px">Instructions</h3>
                <div id="recipe">
                    <pre id="instructions">${myMeal.strInstructions}</pre>
                </div>
                <button class="btn-secondary">Add to Favorite</button>
            </div>

        </div>
        `;

        let ingredientCon = document.getElementById("ingredient-con");
        let parent2 = document.createElement("ul");
        let recipe = document.getElementById("recipe")

        ingredients.forEach((i) => {
            let child = document.createElement("li");
            child.innerText = i;
            parent2.appendChild(child);
            ingredientCon.appendChild(parent2);
        })
    });
    }
});



const mealInput = document.querySelector('.form1');
const mealBox = document.querySelector('.mealAllBox');
const mealInfo = document.querySelector('.mealInfo');
const random  = document.querySelector('.button');
const allMeals = ['Arrabiata', 'Bread'];




const showInAbout = (data) => {
  mealInfo.innerHTML = `
    <h1 class="title">${data.strMeal}</h1>

    <img src="${data.strMealThumb}">
  
    <div class="aboutShort">
      <p class="foodType">${data.strCategory}</p>
      <p class="foodOrigin">${data.strArea}</p>
    </div>


    <p class="recipe">
      ${data.strInstructions}
    </p>
  `
}


mealBox.addEventListener('click', (e) => {
  if (e.target.parentElement.getAttribute('key')) {
    const key = e.target.parentElement.getAttribute('key')
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${key}`)
    .then(res => res.json())
    .then(data => {
      showInAbout(data.meals[0]);
    })

  }
})



const showInUi = (data) => {
  console.log(data);
  data.meals.forEach(meal => {
    mealBox.innerHTML += `
    <div class="mealBox" key="${meal.idMeal}">
      <img src="${meal.strMealThumb}" class="image">
    </div>
    `
  })
}



mealInput.addEventListener('submit', (e) => {
  mealInfo.innerHTML = ``;
  mealBox.innerHTML = '';
  e.preventDefault();

  const mealValue = mealInput.textInput.value.trim();

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealValue}`)
    .then(res => res.json())
    .then(data => {
      showInUi(data);
    })
})


random.addEventListener('click', () => {
  
  const randomMeal = allMeals[Math.round(Math.random() * (allMeals.length - 1))];
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${randomMeal}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      showInUi(data);
    })
})



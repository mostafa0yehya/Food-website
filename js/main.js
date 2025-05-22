"use strict";
const main = document.querySelector(".main");
const closeBtn = document.getElementById("btnClose");
const sideContent = document.querySelector(".sidebar .content");
const closeIcon = document.querySelector("#btnClose .close");
const menuIcon = document.querySelector("#btnClose .menu");
const listItems = document.querySelectorAll(".sidebar .content ul li");

const catgeories = document.querySelector(".categories .row");
const areas = document.querySelector(".areas .row");
const ingredients = document.querySelector(".ingredients .row");

const catgeorySection = document.querySelector(".categories");
const ingredientSection = document.querySelector(".ingredients");
const contacSection = document.querySelector(".contact");
const areaSection = document.querySelector(".areas");
const mealsSection = document.querySelector(".meals");
const meals = document.querySelector(".meals .row");
const loader = document.querySelector(".load");
const categoryLink = document.getElementById("cat");
const ingredientLink = document.getElementById("ing");
const areaLink = document.getElementById("area");
const contLink = document.getElementById("cont");
const mainChild = document.querySelectorAll(".main .container .section");
const mealsOfCat = document.querySelector(".meals .row");
const searchSection = document.querySelector(".search-res");
const resSection = document.querySelector(".res .row");
const mealSection = document.querySelector(".meal");
const mealRow = document.querySelector(".meal .row");

$(document).ready(function () {
  $(".load").fadeOut(300);
});
closeBtn.addEventListener("click", function () {
  showHideSide();
});

contLink.addEventListener("click", function () {
  toggleSection(contacSection);
  showHideSide();
});

async function getData(url) {
  try {
    const request = await fetch(url);
    const data = await request.json();
    removeLoad();
    return data;
  } catch (error) {
    return "error in getting data", error;
  }
}

categoryLink.addEventListener("click", async function () {
  addLoad();
  try {
    const data = await getData(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    displayCategories(data.categories);
  } catch (error) {
    console.log(error);
  }
  toggleSection(catgeorySection);
});
ingredientLink.addEventListener("click", async function () {
  addLoad();
  try {
    const data = await getData(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );

    displayIngredients(data.meals);
  } catch (error) {
    console.log(error);
  }
  toggleSection(ingredientSection);
});
areaLink.addEventListener("click", async function () {
  addLoad();
  try {
    const data = await getData(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );

    displayAreas(data.meals);
  } catch (error) {
    console.log(error);
    removeLoad();
  }
  toggleSection(areaSection);
});
function displayCategories(data) {
  let cartona = ``;

  data.forEach((el) => {
    cartona += `
  <div class="col-md-3">
      <div
  onclick="getMeals('${el.strCategory}')"
  class="box"
>
  <img src="${el.strCategoryThumb}" alt="${el.strCategory}" />
  <div class="layer text-center">
    <h3 class="my-2">${el.strCategory}</h3>
    <p>${el.strCategoryDescription.split(" ", 20).join(" ")}...</p>
  </div>
</div>

                </div>`;
  });
  catgeories.innerHTML = cartona;
}
function displayMeals(data) {
  let cartona = ``;

  data.forEach((el) => {
    cartona += `
  <div class="col-md-3">
      <div onclick="getMeal('${el.idMeal}')"
  class="box"
>
  <img src="${el.strMealThumb}" alt="${el.strMeal}" />
  <div class="layer text-center">
    <h3 class="my-2">${el.strMeal}</h3>
  </div>
</div>

                </div>`;
  });
  return cartona;
}
async function getMeals(id = "") {
  addLoad();
  try {
    let url = id
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
      : "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let data = await getData(url);
    data = data.meals.slice(0, 20);
    mealsOfCat.innerHTML = displayMeals(data);
    showHideSide();
  } catch (error) {
    console.log(error);
    removeLoad();
  }
  toggleSection(mealsSection);
}

function displayAreas(data) {
  let cartona = ``;

  data.forEach((el) => {
    cartona += `
 <div class="col-md-3">
  <div onclick="getArea('${el.strArea}')" class="area">
    <div
     
      class="rounded-2 text-center cursor-pointer"
      bis_skin_checked="1"
    >
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h3>${el.strArea}</h3>
    </div>
  </div>
</div>
`;
  });
  areas.innerHTML = cartona;
}
function displayIngredients(data) {
  let cartona = ``;
  data = data.filter(function (el) {
    return el.strDescription != null;
  });
  data = data.slice(0, 20);
  data.forEach((el) => {
    cartona += `
 <div class="col-md-3">
  <div class="area">
    

    <div
     onclick="getByIngredient('${el.strIngredient}')"
      class="rounded-2 text-center cursor-pointer"
      bis_skin_checked="1"
    >
    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
      <h3 class="py-2 mb-0">${el.strIngredient}</h3>
      <p>${el.strDescription?.split(" ", 20).join(" ")}</p>
    </div>
  </div>
</div>
`;
  });
  ingredients.innerHTML = cartona;
}
function toggleSection(sectionToShow) {
  mainChild.forEach((el) => el.classList.add("hide-section"));
  mainChild.forEach((el) => el.classList.remove("show-section"));
  sectionToShow.classList.remove("hide-section");
  sectionToShow.classList.add("show-section");
}

function removeLoad() {
  $(".load").fadeOut(500);

  showHideSide();
}
function addLoad() {
  $(".load").fadeIn(100);

  // loader.classList.remove("d-none");
}
function showHideSide() {
  let isHidden = sideContent.classList.toggle("side-hidden");
  if (isHidden) {
    closeIcon.classList.add("d-none");
    menuIcon.classList.remove("d-none");
    listItems.forEach((item, i) => {
      item.classList.remove("animate");
    });
  } else {
    listItems.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add("animate");
      }, i * 100 + 200);
    });
    menuIcon.classList.add("d-none");
    closeIcon.classList.remove("d-none");
  }
}

async function getArea(area) {
  addLoad();
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  toggleSection(mealsSection);

  mealsOfCat.innerHTML = displayMeals(data.meals);
  showHideSide();
}
async function getByIngredient(ingredient) {
  addLoad();
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.trim()}`
  );

  toggleSection(mealsSection);

  mealsOfCat.innerHTML = displayMeals(data.meals);
  showHideSide();
}
async function getMeal(id) {
  addLoad();
  toggleSection(mealSection);

  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  data = data.meals[0];
  showHideSide();

  displayMealDetails(data);
}
function displayMealDetails(data) {
  let tags = data.strTags?.split(",") ?? data.strTags ?? [];
  tags = tags.filter((el) => el.length > 0);
  let childsOful = ``;
  tags.forEach(function (el) {
    childsOful += `<li class="alert bg-info m-2 p-1">${el}</li>`;
  });
  let ingredients = [];

  for (let i = 1; i <= 20; i++) {
    let ingredient = data[`strIngredient${i}`];
    let measure = data[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      let cleanMeasure = measure?.trim() ?? "";
      let cleanIngredient = ingredient.trim();
      ingredients.push(`${cleanMeasure} ${cleanIngredient}`.trim());
    }
  }

  let boxOfIng = ``;
  ingredients.forEach(function (el) {
    boxOfIng += `   <li class="alert alert-info m-2 p-1">${el}</li>`;
  });

  console.log(mealRow);

  mealRow.innerHTML = `
      <div class="col-md-4">
                <div class="image">
                  <img
                    src=${data.strMealThumb}
                    class="pb-2"
                    alt=""
                  />
                  <h2>${data.strMeal}</h2>
                </div>
              </div>
              <div class="col-md-8">
                <div class="info">
                  <h3>Instructions</h3>
                  <p>
                   ${data.strInstructions}
                  </p>
                  <h3>Area :${data.strArea}</h3>
                  <h3 class="my-2">Category : ${data.strCategory}</h3>
                  <h3>Recipes :</h3>
                  <div>
                    <ul class="d-flex flex-wrap">
              ${boxOfIng}
                  
                    </ul>
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 my-2 flex-wrap">
                   ${childsOful}
                    </ul>
                    <a
                      target="_blank"
                      href="${data.strSource ?? "#"}"
                      class="btn btn-success"
                      >Source</a
                    >
                    <a
                      target="_blank"
                      href=${data.strYoutube}
                      class="btn btn-danger"
                      >Youtube</a
                    >
                  </div>
                </div>
              </div>`;
}

document.querySelector("#search").addEventListener("click", function () {
  toggleSection(searchSection);
  showHideSide();

  document
    .querySelector("#byName")
    .addEventListener("input", async function (btn) {
      addLoad();
      let data = await getData(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${btn.target.value}`
      );
      resSection.innerHTML = displayMeals(data?.meals ?? []);

      showHideSide();
    });
  document
    .querySelector("#byFirst")
    .addEventListener("input", async function (btn) {
      addLoad();
      const input = btn.target.value.trim();

      try {
        let data = await getData(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`
        );
        resSection.innerHTML = displayMeals(data?.meals ?? []);
      } catch (error) {
        console.log("Error in search by first letter:", error);
        resSection.innerHTML = displayMeals([]); // Display empty results on error
      }

      showHideSide();
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const inputs = {
    inputName: {
      regex: /^[a-zA-Z ]{3,30}$/,
      error: "Name must be 3-30 letters.",
    },
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      error: "Enter a valid email address.",
    },
    phone: {
      regex: /^01[0-2,5]{1}[0-9]{8}$/,
      error: "Enter a valid Egyptian phone number.",
    },
    inputAge: {
      regex: /^(1[89]|[2-9][0-9]|1[01][0-9]|120)$/,
      error: "Age must be between 18 and 120.",
    },
    inputPassword: {
      regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      error:
        "Password must be at least 8 characters, including letters and numbers.",
    },
    inputRePassword: {
      match: "inputPassword",
      error: "Passwords do not match.",
    },
  };

  const submitBtn = document.querySelector(".submit-btn");
  submitBtn.disabled = true;

  function validateInput(id) {
    const input = document.getElementById(id);
    const value = input.value.trim();
    const config = inputs[id];
    let isValid = false;

    if (config.regex) {
      isValid = config.regex.test(value);
    } else if (config.match) {
      const matchValue = document.getElementById(config.match).value.trim();
      isValid = value === matchValue && value !== "";
    }

    const errorSpan = input.nextElementSibling;
    if (!isValid) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      if (errorSpan) errorSpan.textContent = config.error;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      if (errorSpan) errorSpan.textContent = "";
    }

    return isValid;
  }

  Object.keys(inputs).forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      const errorSpan = document.createElement("span");
      errorSpan.className = "text-danger";
      input.parentNode.appendChild(errorSpan);

      input.addEventListener("input", () => {
        validateInput(id);
        checkFormValidity();
      });
    }
  });

  function checkFormValidity() {
    const allValid = Object.keys(inputs).every((id) => validateInput(id));
    submitBtn.disabled = !allValid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (Object.keys(inputs).every((id) => validateInput(id))) {
      alert("Form submitted successfully!");
      form.reset();
      Object.keys(inputs).forEach((id) => {
        const input = document.getElementById(id);
        input.classList.remove("is-valid");
      });
      submitBtn.disabled = true;
    } else {
      alert("Please correct the errors in the form.");
    }
  });
});
getMeals("");

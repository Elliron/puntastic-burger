'use strict';

//global varibles
var bunsElement = document.getElementById('buns');
var meatsElement = document.getElementById('meats');
var cheeseElement = document.getElementById('cheese');
var vegetablesElement = document.getElementById('vegetables');
var saucesElement = document.getElementById('sauces');
var sidesElement = document.getElementById('sides');
var menu = document.getElementById('menu');
var retrieveBurger = localStorage.getItem('burgers');

//click event variables
var burgerBuilder = document.getElementById('burger-builder');
var burgerOrder = document.getElementById('burger-order');
var checkOutButton = document.getElementById('checkout-button');
var clickedMenuItem, topBun, indexCounter;

var burgerConstructor = [];

//global arrays use to populate the igridents menu and also make it easier to build the burger.
var ingredients = {
  bunsArr: ['Sesame seed', 'Brioche', 'Pretzel', 'Hawaiian roll', 'Kaiser roll'],

  meatsArr: ['Single Patty', 'Ham', 'Bacon', 'Plant Based', 'Egg'],

  cheeseArr: ['Cheddar', 'American', 'Gouda', 'Pepper Jack', 'Swiss'],

  vegetablesArr: ['Pickles', 'Tomato', 'Onions', 'Avacado', 'Pineapple', 'Jalepenos', 'Lettuce'],

  saucesArr: ['Ketchup', 'Mustard', 'Mayo', 'BBQ'],

  sidesArr: ['Fries', 'Tots', 'Onion Rings', 'Sweet Potato Fries', 'Waffle Fries', 'Soft Drink', 'Tea', 'Lemonade', 'Water'],
};

function BurgerConstructor() {
  this.buns = [];
  this.burger = [];
  this.meats = [];
  this.cheese = [];
  this.vegetables = [];
  this.sauces = [];
  this.sides = [];
  burgerConstructor.push(this);
}

function menuBuilder(parentElement, arrContent) {
  //for loop to build out the menus
  for (var i = 0; i < arrContent.length; i++) {
    var menuElement = document.createElement('li');
    menuElement.textContent = arrContent[i];
    menuElement.className = 'menu-item';
    // add img source here for adding custom icons next to list
    parentElement.appendChild(menuElement);
  }
}

//render out each menu
function renderMenu() {
  menuBuilder(bunsElement, ingredients.bunsArr);
  menuBuilder(meatsElement, ingredients.meatsArr);
  menuBuilder(cheeseElement, ingredients.cheeseArr);
  menuBuilder(vegetablesElement, ingredients.vegetablesArr);
  menuBuilder(saucesElement, ingredients.saucesArr);
  menuBuilder(sidesElement, ingredients.sidesArr);
}

function eventClick(event) {
  event.preventDefault();
  //getting the name of the ingredient
  clickedMenuItem = event.target.innerHTML;
  //getting the html class the user is clicking on and storing as varible
  var clickClass = event.target.classList[0];
  //getting the id of the parentelement
  var clickParentId = event.target.parentNode.id;
  //getting the id of the clicked element
  var clickId = event.target.id;
  //replacing spaces with - and lower casing all letters
  var clickedMenuItemfiltered = clickedMenuItem.replace(/\s+/g, '-').toLowerCase();

  var str = clickParentId + 'Arr';
  //if what user clicks on is not .menu-item return nothing, else return the ingredient

  if (burgerConstructor[0].buns.length < 1) {
    if (clickParentId !== 'buns') {
      console.log('Bun-jour! Please select a bun before continuing!');
    } else if (clickParentId === 'buns') {
      addIngredientToBurger(clickedMenuItem, str, clickParentId);
      burgerBuilderUpdater(clickedMenuItemfiltered);
      topBun = document.createElement('img');
      //divElement.className = clickedMenuItem;
      topBun.id = 'topBun';
      topBun.src = `img/${clickedMenuItemfiltered}-top.png`;
      topBun.style.bottom = `${110}px`;
      topBun.style.zIndex = 2;
      burgerBuilder.appendChild(topBun);
    }
  } else if (clickClass === 'menu-item' && clickParentId !== 'buns') {
    addIngredientToBurger(clickedMenuItem, str, clickParentId);
    burgerBuilderUpdater(clickedMenuItemfiltered);
  }

  else if (burgerConstructor[0].buns.length > 1 && clickParentId === 'buns') {
    burgerConstructor[0].buns.splice(0, 1);
    burgerConstructor[0].burger.splice(0, 1);
  }

  else if (clickId === clickedMenuItem) {
    removeItemfromOrder(clickedMenuItem, clickId, clickedMenuItemfiltered);
  }
}

function checkOut() {
  var stringifiedBurger = JSON.stringify(burgerConstructor);
  localStorage.setItem('burgers', stringifiedBurger);
}

function loadBurger() {
  burgerConstructor = JSON.parse(retrieveBurger);
}

function addIngredientToBurger(ingredient, ingredientArray, ingredientId) {
  for (var i in ingredients[ingredientArray]) {
    if (ingredient === ingredients[ingredientArray][i]) {
      //console.log(ingredientId);
      customBurger.burger.push(ingredients[ingredientArray][i]);
      customBurger[ingredientId].push(ingredients[ingredientArray][i]);
    }
  }
}

function burgerBuilderUpdater(image) {
  if (customBurger.burger.length < 2) {
    indexCounter = 70;
  } else {
    indexCounter = customBurger.burger.length * 15 + 70;
    topBun.style.bottom = `${indexCounter + 20}px`;
    topBun.style.zIndex = customBurger.burger.length + 2;
  }
  var divElement = document.createElement('img');
  divElement.id = image;
  divElement.src = `img/${image}.png`;
  burgerBuilder.appendChild(divElement);

  //changing the bottom position of the img
  divElement.style.bottom = `${indexCounter}px`;
  divElement.style.zIndex = customBurger.burger.length + 1;

  //add x for end user to delete ingredients
  var liElement = document.createElement('li');
  liElement.id = clickedMenuItem;
  liElement.textContent = clickedMenuItem;
  burgerOrder.appendChild(liElement);
}

function removeItemfromOrder(ingredient, name, filteredName) {
  for (var i in customBurger.burger) {
    if (ingredient === customBurger.burger[i]) {
      customBurger.burger.splice(i, 1);
      customBurger.meats.splice(i, 1);
      customBurger.cheese.splice(i, 1);
      customBurger.vegetables.splice(i, 1);
      customBurger.sauces.splice(i, 1);
      console.log('splices are firing');
    }
  }

  var liElement = document.getElementById(name);
  liElement.parentNode.removeChild(liElement);

  var divElement = document.getElementById(filteredName);
  divElement.parentNode.removeChild(divElement);

  var position = parseInt(topBun.style.bottom);
  topBun.style.bottom = `${position - 15}px`;
}

if (retrieveBurger) {
  loadBurger();
} else {
  var customBurger = new BurgerConstructor();
}

renderMenu();

menu.addEventListener('click', eventClick);
burgerOrder.addEventListener('click', eventClick);
checkOutButton.addEventListener('click', checkOut);

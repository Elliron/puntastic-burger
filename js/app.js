'use strict';

//global varibles
var bunsElement = document.getElementById('buns');
var meatsElement = document.getElementById('meats');
var cheeseElement = document.getElementById('cheese');
var vegtablesElement = document.getElementById('vegtables');
var saucesElement = document.getElementById('sauces');
var sidesElement = document.getElementById('sides');
var menu = document.getElementById('menu');

var burgerBuilder = document.getElementById('burger-builder');
var burgerOrder = document.getElementById('burger-order');
var clickedMenuItem;

var burgerConstructor = [];


//global arrays use to populate the igridents menu and also make it easier to build the burger.
var ingredients = {
  bunsArr: ['brown', 'yellow', 'Sesame seed', 'Brioche', 'Pretzel', 'Hawaiian roll', 'Kaiser roll'],

  meatsArr: ['Single Patty', 'Double Patty', 'Triple Patty', 'Ham', 'Bacon', 'Plant Based', 'Egg', 'Pull Pork'],

  cheeseArr: ['Chedder', 'American', 'Blue Cheese', 'Gouda', 'Pepper Jack', 'Swiss'],

  vegtablesArr: ['Pickles', 'Totmato', 'Onion', 'Avacado', 'Pineapple', 'Jalepenos', 'Red Bell Pepper', 'Lettuce', 'Baby Spinach', 'Kale'],

  saucesArr: ['Ketchup', 'Mustard', 'Mayo', 'BBQ', 'Caribbean Jerk', 'Chipotle', 'Sriracha', 'Southwest', 'Ghost Pepper'],

  sidesArr: ['Fries', 'Tots', 'Onion Rings', 'Sweet Potato Fries', 'Waffle Fries', 'Soft Drink', 'Tea', 'Lemonade', 'Water'],
};

function BurgerConstructor() {
  this.bun = [];
  this.burger = [];
  this.meats = [];
  this.cheese = [];
  this.vegatables = [];
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
  menuBuilder(vegtablesElement, ingredients.vegtablesArr);
  menuBuilder(saucesElement, ingredients.saucesArr);
  menuBuilder(sidesElement, ingredients.sidesArr);
}

function eventClick(event) {

  //getting the html class the user is clicking on and storing as varible
  var clickClass = event.target.classList[0];
  //getting the id of the parentelement
  var clickParentId = event.target.parentNode.id;
  //getting the id of the clicked element
  var clickId = event.target.id;
  //getting the name of the ingredient
  clickedMenuItem = event.target.innerHTML;

  var str = clickParentId + 'Arr';
  console.log(str);
  //if what user clicks on is not .menu-item return nothing, else return the ingredient
  if (clickClass === 'menu-item') {
    addIngredientToBurger(clickedMenuItem, str, clickParentId);
    burgerBuilderUpdater();
    //console.log(`var inside clickevent ${clickedMenuItem}`);
    //console.log(customBurger.burger);
    //console.log(burgerConstructor);
  }
  if (clickId === clickedMenuItem) {
    removeItemfromOrder(clickedMenuItem, clickId);
    console.log('remove fired');
  }

  //adding event click the ingredients menu and then adding it to the burger builder as a div with class. We will replace bgColor with image.jpg file dynamically

}
//we will need to create some logic that only allows user to click on one bun. Something like if bunSelected is true then alert user 'you cannot select another bun until you remove the current bun from your cart.

//something like if (customerBurger.bun.length - 1) select a bun, else bun already selected... the same logic can be applied to toppings. This could be used to calculate charging $0.50 per addtional ingredient.

function addIngredientToBurger(ingredient, ingredientArray, ingredientId) {
  for (var i in ingredients[ingredientArray]) {
    if (ingredient === ingredients[ingredientArray][i]) {
      console.log(ingredients[ingredientArray][i]);
      //console.log(ingredientId);
      customBurger.burger.push(ingredients[ingredientArray][i]);
      customBurger[ingredientId].push(ingredients[ingredientArray][i]);
    }
  }
}
function burgerBuilderUpdater() {
  var divElement = document.createElement('div');
  //divElement.className = clickedMenuItem;
  divElement.id = 'div' + clickedMenuItem;
  burgerBuilder.appendChild(divElement);
  divElement.style.top = `${100}px`; //this needs to be dynamic
  divElement.style.backgroundColor = clickedMenuItem; // this should be background image
  //zindex will use the array index of the element.
  divElement.style.zIndex = customBurger.burger.length + 1;

  //add x for end user to delete ingredients
  var liElement = document.createElement('li');
  liElement.id = clickedMenuItem;
  liElement.textContent = clickedMenuItem;
  burgerOrder.appendChild(liElement);
}

function removeItemfromOrder(ingredient, name) {
  for (var i in customBurger.burger) {
    if (ingredient === customBurger.burger[i]) {
      customBurger.burger.splice(i, 1);
      customBurger.meats.splice(i, 1);
      customBurger.cheese.splice(i, 1);
      customBurger.vegatables.splice(i, 1);
      customBurger.sauces.splice(i, 1);
      console.log('splices are firing');
    }
  }
  var liElement = document.getElementById(name);
  liElement.parentNode.removeChild(liElement);
  //console.log(customBurger.burger);
  //divElement.parentNode.removeChild(divElement);
}


var customBurger = new BurgerConstructor();

renderMenu();

menu.addEventListener('click', eventClick);
burgerOrder.addEventListener('click', eventClick);

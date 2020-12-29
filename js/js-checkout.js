'use strict';
//global variables
var burgerCheckout = document.getElementById('burger-checkout');
var retrieveBurger = localStorage.getItem('burgers');
var burgerConstructor;

function loadBurger() {
  burgerConstructor = JSON.parse(retrieveBurger);
}

function burgerList() {
  for (var i = 0; i < burgerConstructor[0].burger.length; i++) {
    console.log(burgerConstructor[0].burger[i]);
    var liElement = document.createElement('li');
    liElement.textContent = burgerConstructor[0].burger[i];
    burgerCheckout.appendChild(liElement);
  }
}

loadBurger();
burgerList();
console.log(burgerConstructor);

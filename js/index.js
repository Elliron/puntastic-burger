'use strict';

var punContainer = document.getElementById('container');
var punOneElement = document.getElementById('pun-of-the-day');
var punArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

function getRandomIndex(number) {
  return Math.floor(Math.random()* Math.floor(number));
}

function punGenerator() {
  var randomPun = getRandomIndex(punArray.length);
  console.log(punArray[randomPun]);
  punOneElement.textContent = punArray[randomPun];
  punOneElement.parentNode.appendChild (punOneElement);
}

punGenerator();
// for (i = 0, i < punArray.length, i++)

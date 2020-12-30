'use strict';

var punContainer = document.getElementById('container');
var punOneElement = document.getElementById('pun-of-the-day');
var punArray = [
  'Did you know that sesame seeds are the secret to a burgers success? Ever since they were introduced, they have been on a roll!',
  'Single burger?  Let me introduce you to my friend... Meat Patty!',
  'Our ham is the best around! Although, it would be a shame if you put an s at the beginning and an e at the end.',
  'Did you know that even cavemen made bacon from dinosaurs?  It was Jurassic Pork.',
  'Please egg-scuse us for all the puns... we figured everyone loves yolks!',
  'Sweet dreams are made of cheese',
  'What did the cheese use to change his tire?  A pepper jack!',
  'Our pickles are kind of a big dill!',
  'Lettuce add some freshness to your burger!',
  'Did you know that french fries don\'t originate from France?  They are prepared in Greece!',
  'I once saw an onion ring... when I answered it nobody was there!',
  'Sweet dreams are made of teas...'
];

function getRandomIndex(number) {
  return Math.floor(Math.random() * Math.floor(number));
}

function punGenerator() {
  var randomPun = getRandomIndex(punArray.length);
  console.log(punArray[randomPun]);
  punOneElement.textContent = punArray[randomPun];
  punOneElement.parentNode.appendChild(punOneElement);
}

punGenerator();
// for (i = 0, i < punArray.length, i++)

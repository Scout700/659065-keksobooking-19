'use strict';

/** ad title
* @constant {string} */
var TITLE = 'Заголовок объявления';

/** minimum price
* @constant {number} */
var MIN_PRICE = 10000;

/** maximum price
* @constant {number} */
var MAX_PRICE = 3000000;

/** minimum rooms
* @constant {number} */
var MIN_ROOMS = 3;

/** maximum rooms
* @constant {number} */
var MAX_ROOMS = 10;

/** an array of strings containing the type of the property
* @constant {Array} */
var TYPE_OF_HOUSING = [
  'Дворец',
  'Квартира',
  'Дом',
  'Бунгало'
];

/** minimum guests
* @constant {number} */
var MIN_GUESTS = 1;

/** maximum guests
* @constant {number} */
var MAX_GUESTS = 10;

/** array of strings containing the arrival time
* @constant {Array} */
var CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

/** array of lines containing the departure time
* @constant {Array} */
var CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

/** an array of strings containing data about the benefits
* @constant {Array} */
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

/** description line
* @constant {string} */
var DESCRIPTION = 'Строка с описанием';

/** an array of strings containing the addresses of the pictures
* @constant {Array} */
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

/** minimum x coordinate of the mark on the map
* @constant {number} */
var LOCATION_PIN_MIN_X = 0;

/** maximum x coordinate of the mark on the map
* @constant {number} */
var LOCATION_PIN_MAX_X = 1200;

/** minimum y coordinate of the mark on the map
* @constant {number} */
var LOCATION_PIN_MIN_Y = 130;

/** maximum y coordinate of the mark on the map
* @constant {number} */
var LOCATION_PIN_MAX_Y = 630;

/**
* returns a random number in the specified range
* @param {number} min number
* @param {number} max number
* @return {number} random number in the specified range
*/
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

/**
* returns a random element of the array.
* @param {Array} arr - original array
* @return {string} random element of the array
*/
var getRandomElement = function (arr) {
  var randomElement = Math.floor(Math.random() * arr.length);
  return (arr[randomElement]);
};


/** returns a new array of random length
 * @param {Array} arr - original array
 * @return {Array} a new array of random length
 */
var generateRandomArray = function (arr) {
  var randomArray = arr.slice(0, Math.ceil(Math.random() * arr.length));
  return randomArray;
};

/**
 * returns an array of ads with random characteristics
 * @param {number} count number of ads
 * @return {Array} array of ads with random characteristics
 */
var generateOffers = function (count) {
  var offers = [];
  for (var i = 0; i < count; i++) {
    var loc = {
      x: getRandomNumber(LOCATION_PIN_MIN_X, LOCATION_PIN_MAX_X),
      y: getRandomNumber(LOCATION_PIN_MIN_Y, LOCATION_PIN_MAX_Y)
    };
    offers[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': TITLE,
        'address': loc.x + ', ' + loc.y,
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': getRandomElement(TYPE_OF_HOUSING),
        'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        'checkin': getRandomElement(CHECKIN),
        'checkout': getRandomElement(CHECKOUT),
        'features': generateRandomArray(FEATURES),
        'description': DESCRIPTION,
        'photos': generateRandomArray(PHOTOS)
      },
      'location': {
        'x': loc.x,
        'y': loc.y
      }
    };
  }
  return offers;
};

generateOffers(8);// temporarily for verification

var map = document.querySelector('.map');
map.classList.remove('map--faded');

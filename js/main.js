'use strict';

/** ad title
* @constant {string} */
var TITLE = 'Милая уютная квартирка';

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

/** object with value type of housing
* @constant {Object} */
var TypeHosting = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало'
};

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
var MIN_X = 0;

/** maximum x coordinate of the mark on the map
* @constant {number} */
var MAX_X = 1200;

/** minimum y coordinate of the mark on the map
* @constant {number} */
var MIN_Y = 130;

/** maximum y coordinate of the mark on the map
* @constant {number} */
var MAX_Y = 630;

/** number of pins
* @constant {number} */
var numberPins = 8;

/** pin width
* @constant {number} */
var PIN_WIDTH = 40;

/** pin height
* @constant {number} */
var PIN_HEIGHT = 40;

/**
* find a random number in the specified range
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
* @return {*} random element of the array
*/
var getRandomElementFromArray = function (arr) {
  var randomNumber = Math.floor(Math.random() * arr.length);
  return (arr[randomNumber]);
};

/** generate a new array of random length
* @param {Array} arr - original array
* @return {Array} returns a new array of random length
*/
var generateRandomArray = function (arr) {
  var randomArray = arr.slice(0, Math.ceil(Math.random() * arr.length));
  return randomArray;
};

/**
* writes object keys to the array and returns the value of one random key
* @param {Object} obj - object
* @return {string} returns the value of one random key
*/
var getRandomKeyValue = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[Math.floor(Math.random() * keys.length)]];
};

/**
* returns an array of ads with random characteristics.
* @param {number} count number of ads
* @return {Array} returns array of ads with random characteristics
*/
var generateOffers = function (count) {
  var offers = [];
  for (var i = 0; i < count; i++) {
    var loc = {
      x: getRandomNumber(MIN_X, MAX_X),
      y: getRandomNumber(MIN_Y, MAX_Y)
    };
    offers[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': TITLE,
        'address': loc.x + ', ' + loc.y,
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': getRandomKeyValue(TypeHosting),
        'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        'checkin': getRandomElementFromArray(CHECKIN),
        'checkout': getRandomElementFromArray(CHECKOUT),
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

/** generates a marker with the necessary characteristics (the coordinates of the label and the avatar and alternative text for the image).
* @param {Object} pin the ad of array
* @return {string} returns a new DOM element
*/
var generatePin = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - (PIN_WIDTH / 2)) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

/**
* adding pins to the map.
* @param {Array} pins array of ads with pins data
*/
var addPinsOnMap = function (pins) {
  var mapPinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  pins.forEach(function (item, j) {
    fragment.appendChild(generatePin(pins[j]));
  });
  mapPinsElement.appendChild(fragment);
};

addPinsOnMap(generateOffers(numberPins));

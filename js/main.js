'use strict';

/** ad title
* @constant {string} */
var TITLE = 'Милая уютная квартирка';

/** minimum price
* @constant {number} */
var MIN_PRICE = 10000;

/** maximum price
* @constant {number} */
var MAX_PRICE = 1000000;

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
var PIN_WIDTH = 50;

/** pin height
* @constant {number} */
var PIN_HEIGHT = 70;

/** Object of main-pin properties
* @constant {Object} */
var MainPin = {
  // main-pin width
  PIN_MAIN_WIDTH: 65,
  // main-pin height
  PIN_MAIN_HEIGHT: 65,
  // main-pin height pice
  PICE: 22,
  // x coordinate of the main-pin on the map
  PIN_MAIN_X: 570,
  // y coordinate of the main-pin on the map
  PIN_MAIN_Y: 375
};

/** The key 'enter'
* @constant {string} */
var KEY_ENTER = 'Enter';

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

/** generates a marker with the necessary characteristics (the coordinates of the label and the avatar and alternative text for the image).
* @param {Object} pin the ad of array
* @return {string} returns a new DOM element
*/
var generatePin = function (pin) {
  var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
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
  pins.forEach(function (pin) {
    fragment.appendChild(generatePin(pin));
  });
  mapPinsElement.appendChild(fragment);
};

/**
* generates an ad with the necessary characteristics
* @param {Object} card the ad of array
*/
/* var generateCard = function (card) {
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '\u20bd/ночь';
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнат(-ы) для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  // var popupFeatures = cardElement.querySelector('.popup__features');
  var getFeaturesinElement = function (features) {
    features.forEach(function (feature) {
      if (card.offer.features.indexOf(feature, 0) === -1) {
        cardElement.querySelector('.popup__features').removeChild(cardElement.querySelector('.popup__feature--' + feature));
      }
    });
  };
  getFeaturesinElement(FEATURES);
  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  var photoFragment = document.createDocumentFragment();
  var popupPhotos = cardElement.querySelector('.popup__photos');
  card.offer.photos.forEach(function (photo, j) {
    var photoElement = popupPhotos.querySelector('img');
    photo = photoElement.cloneNode(true);
    photo.src = card.offer.photos[j];
    photoFragment.appendChild(photo);
  });
  popupPhotos.innerHTML = '';
  cardElement.querySelector('.popup__photos').appendChild(photoFragment);
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  map.insertBefore(cardElement, document.querySelector('.map__filters-container'));
}; */

// Adding the disabled attribute

var map = document.querySelector('.map');
var mapFilters = map.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
var adFormInputs = adForm.querySelectorAll('input');
var adFormSelects = adForm.querySelectorAll('select');
var mapFiltersSelects = mapFilters.querySelectorAll('select');
var mapFiltersFieldset = mapFilters.querySelector('.map__features');
var pinsArray = generateOffers(numberPins);

var addsAttributeDisabled = function (formElements) {
  formElements.forEach(function (elem) {
    elem.setAttribute('disabled', 'disabled');
    var mapPinMainAddress = adForm.querySelector('#address');
    mapPinMainAddress.value = Math.floor(MainPin.PIN_MAIN_X + MainPin.PIN_MAIN_WIDTH / 2) + ', ' + Math.floor(MainPin.PIN_MAIN_Y + MainPin.PIN_MAIN_HEIGHT / 2);
  });
};

var removeAttributeDisabled = function (formElements) {
  formElements.forEach(function (elem) {
    elem.removeAttribute('disabled', 'disabled');
  });
  var mapPinMainAddress = adForm.querySelector('#address');
  mapPinMainAddress.value = Math.floor(MainPin.PIN_MAIN_X + MainPin.PIN_MAIN_WIDTH / 2) + ', ' + Math.floor(MainPin.PIN_MAIN_Y + MainPin.PIN_MAIN_HEIGHT + MainPin.PICE);
};

mapFilters.setAttribute('disabled', 'disabled');
mapFiltersFieldset.setAttribute('disabled', 'disabled');
addsAttributeDisabled(adFormInputs);
addsAttributeDisabled(adFormSelects);
addsAttributeDisabled(mapFiltersSelects);

var setPageAction = function () {
  map.classList.remove('map--faded');
  mapFilters.removeAttribute('disabled', 'disabled');
  adForm.classList.remove('ad-form--disabled');
  mapFiltersFieldset.removeAttribute('disabled', 'disabled');
  removeAttributeDisabled(adFormInputs);
  removeAttributeDisabled(adFormSelects);
  removeAttributeDisabled(mapFiltersSelects);
  addPinsOnMap(pinsArray);
};

var mapPinMain = document.querySelector('.map__pin--main');

var onMainPinClick = function (evt) {
  if (evt.button === 0) {
    setPageAction();
  }
};

var onMainPinPress = function (evt) {
  if (evt.key === KEY_ENTER) {
    setPageAction();
  }
};

mapPinMain.addEventListener('mousedown', onMainPinClick);
mapPinMain.addEventListener('keydown', onMainPinPress);
// generateCard(pinsArray[0]); */

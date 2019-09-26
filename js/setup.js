'use strict';

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var WIZARDS_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var MIN_ARRAY_INDEX = 0;
var wizards = [];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateWizards = function () {
  for (var i = 0; i < WIZARDS_NAME.length; i++) {
    var coatColorIndex = getRandomInt(MIN_ARRAY_INDEX, COAT_COLOR.length);
    var eyesColorIndex = getRandomInt(MIN_ARRAY_INDEX, EYES_COLOR.length);
    var wizard = {
      name: WIZARDS_NAME[i],
      coatColor: COAT_COLOR[coatColorIndex],
      eyesColor: EYES_COLOR[eyesColorIndex],
    };
    wizards.push(wizard);
  }
};

function generateWizardElement(wizard, element) {
  element.querySelector('.setup-similar-label').textContent = wizard.name;
  element.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  element.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return element;
}

var addWizardElements = function () {
  var fragment = document.createDocumentFragment();
  generateWizards();
  for (var i = 0; i < 4; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement = generateWizardElement(wizards[i], wizardElement);
    fragment.appendChild(wizardElement);
  }
  similarListElement.appendChild(fragment);
};

addWizardElements();


var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setup = document.querySelector('.setup');
var userNameInput = document.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardCoatInput = document.querySelector('[name=coat-color]');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesInput = document.querySelector('[name=eyes-color]');
var fireball = document.querySelector('.setup-fireball-wrap');
var fireballInput = document.querySelector('[name=fireball-color]');

var getNextColor = function (currentColor, colors) {
  var index = colors.indexOf(currentColor);
  return ++index === colors.length ? colors[0] : colors[index];
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

wizardCoat.addEventListener('click', function (evt) {
  var nextColor = getNextColor(wizardCoatInput.value, COAT_COLOR);
  evt.currentTarget.style.fill = nextColor;
  wizardCoatInput.value = nextColor;
});

wizardEyes.addEventListener('click', function (evt) {
  var nextColor = getNextColor(wizardEyesInput.value, EYES_COLOR);
  evt.currentTarget.style.fill = nextColor;
  wizardEyesInput.value = nextColor;
});

fireball.addEventListener('click', function (evt) {
  var nextColor = getNextColor(fireballInput.value, FIREBALL_COLOR);
  evt.currentTarget.style.backgroundColor = nextColor;
  fireballInput.value = nextColor;
});


document.querySelector('.setup-similar').classList.remove('hidden');

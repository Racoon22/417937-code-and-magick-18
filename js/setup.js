'use strict';

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var WIZARDS_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var MIN_ARRAY_INDEX = 0;
var wizards = [];

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
document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

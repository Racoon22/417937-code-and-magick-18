'use strict';
(function () {
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var DEBOUNCE_INTERVAL = 500; // ms

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardCoatInput = document.querySelector('[name=coat-color]');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardEyesInput = document.querySelector('[name=eyes-color]');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var fireballInput = document.querySelector('[name=fireball-color]');

  var coatColor = wizardCoat.style.fill;
  var eyesColor = wizardEyes.style.backgroundColor;
  var wizards = [];

  var generateWizardElement = function (wizard, element) {
    element.querySelector('.setup-similar-label').textContent = wizard.name;
    element.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    element.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return element;
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var getNextColor = function (currentColor, colors) {
    var index = colors.indexOf(currentColor);
    return ++index === colors.length ? colors[0] : colors[index];

  };
  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var nameComparator = function (a, b) {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    renderWizard(wizards.sort(function (a, b) {
      var rankDiff = getRank(b) - getRank(a);
      if (rankDiff === 0) {
        rankDiff = nameComparator(a.name, b.name);
      }
      return rankDiff;
    }));
  };

  var renderWizard = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      var wizardElement = similarWizardTemplate.cloneNode(true);
      wizardElement = generateWizardElement(wizards[i], wizardElement);
      fragment.appendChild(wizardElement);
    }
    similarListElement.textContent = '';
    similarListElement.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;

    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  document.querySelector('.setup-similar').classList.remove('hidden');
  window.backend.load(successHandler, errorHandler);

  wizardCoat.addEventListener('click', function (evt) {
    coatColor = getNextColor(wizardCoatInput.value, window.setup.COAT_COLOR);
    evt.currentTarget.style.fill = coatColor;
    wizardCoatInput.value = coatColor;
    debounce(updateWizards());
  });

  wizardEyes.addEventListener('click', function (evt) {
    eyesColor = getNextColor(wizardEyesInput.value, window.setup.EYES_COLOR);
    evt.currentTarget.style.fill = eyesColor;
    wizardEyesInput.value = eyesColor;
    debounce(updateWizards());
  });

  fireball.addEventListener('click', function (evt) {
    var fireballColor = getNextColor(fireballInput.value, FIREBALL_COLOR);
    evt.currentTarget.style.backgroundColor = fireballColor;
    fireballInput.value = fireballColor;
  });

  window.setup = {
    COAT_COLOR: COAT_COLOR,
    EYES_COLOR: EYES_COLOR,
    errorHandler: errorHandler
  };

})();

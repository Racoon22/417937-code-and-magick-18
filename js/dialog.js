'use strict';
(function () {
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var POPUP_TOP = '80px';
  var POPUP_LEFT = '50%';

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setup = document.querySelector('.setup');
  var form = document.querySelector('.setup-wizard-form');
  var userNameInput = document.querySelector('.setup-user-name');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardCoatInput = document.querySelector('[name=coat-color]');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardEyesInput = document.querySelector('[name=eyes-color]');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var fireballInput = document.querySelector('[name=fireball-color]');


  var dialogHandler = setup.querySelector('.upload');

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
    setup.style.top = POPUP_TOP;
    setup.style.left = POPUP_LEFT;
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
    var nextColor = getNextColor(wizardCoatInput.value, window.setup.COAT_COLOR);
    evt.currentTarget.style.fill = nextColor;
    wizardCoatInput.value = nextColor;
  });

  wizardEyes.addEventListener('click', function (evt) {
    var nextColor = getNextColor(wizardEyesInput.value, window.setup.EYES_COLOR);
    evt.currentTarget.style.fill = nextColor;
    wizardEyesInput.value = nextColor;
  });

  fireball.addEventListener('click', function (evt) {
    var nextColor = getNextColor(fireballInput.value, FIREBALL_COLOR);
    evt.currentTarget.style.backgroundColor = nextColor;
    fireballInput.value = nextColor;
  });

  var userDialog = document.querySelector('.setup');
  var closeUserDialog = function () {
    userDialog.classList.add('hidden');
  };


  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), closeUserDialog, window.setup.errorHandler);
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var dragged = false;

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault)
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();

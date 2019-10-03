'use strict';
(function () {
  var GET_WIZARDS_URL = 'https://js.dump.academy/code-and-magick/data';
  var POST_WIZARD_URL = 'https://js.dump.academy/code-and-magick';

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Упс! Что-то пошло не так!');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('GET', GET_WIZARDS_URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError('Упс! Что-то пошло не так!');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', POST_WIZARD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();

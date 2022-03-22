'use strict';
/*jshint esversion: 6 */

/**
 * Jasmine - фреймворк которым мы будем пользоваться
 * https://jasmine.github.io
 * Будем использовать его тк он проще
 *
 * есть еще
 * Mocha фреймворк с библиотекой Chai JS
 */

/**
 * установка
 * npm i jasmine jasmine-core
 * npx jasmine init
 *
 * после идем в package.json и проверяем что все установилось
 * меняем версию на 3.6.4
 *
 * потом дописываем там в теле scripts {...}
 * "test": "jasmine"
 */

/**
 * после идем в файл настроек ../spec/support/jasmine.json
 *
 * "spec_dir": "spec", - папка которую мы будем тестировать
 * "**[sS]pec.?(m)js" - файлы с расширением *.spec будут приниматься для тестирования
 *
 * "stopSpecOnExpectationFailure": false, - если true, при падении теста дальше стоп
 * "random": true - если выше false, то тут true, это рандомизация тестов
 */

/**
 * создаем в папке spec/support/jasmine.spec.js
 * и пишем в нем наши тесты
 */
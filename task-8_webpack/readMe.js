'use strict';
/*jshint esversion: 6 */

/**
 * WebPack - мощный сборщик, типа Gulp
 * Для установки пишем
 *
 * npm install webpack --dev
 * npm i webpack-cli
 * npm i webpack-node-externals
 *
 * что бы переносить файлы из одного места в другое
 * npm i copy-webpack-plugin
 *
 * инициализировать полноценную рабочую HTML где будет подключено все
 * npm i html-webpack-plugin
 *
 */

/**
 * babel - транспилятор позволяет преобразовывать наш код в кроссбраузерность
 *
 * ядро нашего babel:
 * npm i @babel/core
 *
 * что бы дать предустановки нашего babel
 * npm i @babel/preset-env
 *
 * что бы можно было подключать другие лоадеры через babel (css, html итп)
 * npm i @babel/preset-env
 */

/**
 * обработка данных
 *
 * npm i css-loader
 * npm i file-loader
 * npm i html-loader
 * npm i style-loader
 */

/**
 * минификация CSS & JS
 *
 * npm i mini-css-extract-plugin
 * npm i optimize-css-assets-webpack-plugin |ИЛИ| npm i  css-minimizer-webpack-plugin
 *
 * TODO: не работает - надо разобраться потом
 * npm i uglifyjs-webpack-plugin |ИЛИ| npm install uglifyjs-webpack-plugin --save-dev
 * ИЛИ то или другое с флагом -g
 */

/**
 * что бы установить необходимые пакеты мы можем искать их в NPM а за тем в
 * ручную прописывать установку каждого... Или сразу написать не обходимые пакеты
 * в package.json и затем прописать npm i
 */

/*
указываем точку входа
Где init.js - в нем подключаем наши файлы через import...
Out.js - файл который нам соберет webpack, называется bundle
*/
// webpack init.js out.js


/**/


/**
 * далее в корне создаем файл
 * .browserslistrc
 *
 * и пишем в нем
 * last 5 versions
 *
 * это указывает WebPack, какие браузеры мы хотим поддерживать, в нашем примере
 * указана последняя верия браузеров. Тут можно заморочится по полной и для
 * каждой системы указать свою версию браузеров
 *
 * подробнее тут:
 * https://github.com/browserslist/browserslist
 */

// Далее идем в наш конфиг WebPack: webpack.server.config.js


// TODO: доделать в отдельном примере файла
// продакшн сборка - удаляет все пробелы, комментарии и все лишнее, делается флагом -p
// Webpack init.js out-p.js -p

// слежка за сборкой, те webpack будет следить самостоятельно за изменениями те автосборка
// Webpack init.js out.js --watch
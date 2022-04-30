'use strict';
/*jshint esversion: 6 */

/**
 * Важно!
 * в NodeJS все выполняется ассинхронно!!!
 */

/**
 * npm init - инициализация проекта
 * ИЛИ
 * npm init -y
 *
 * После чего в корне появится package.json
 * Это своего рода оглавление прокта из чего он состоит, те это описание проекта
 * и если развернуть проект в другой среде, и прописать npm init то все
 * не обходимые зависимости окторые должны быть в проекте - установятся
 */

/**
 * Axios — это JavaScript-библиотека для выполнения либо HTTP-запросов в Node.js,
 * либо XMLHttpRequests в браузере. Она поддерживает промисы — новинку ES6.
 * Одна из особенностей, которая делает её лучше fetch() — автоматические
 * преобразования JSON-данных.
 *
 * устанавливаем ее:
 * npm i axios
 */

/**
 * после установки появилось:
 * package-lock.json - строго фиксирует версии
 * node_modules - тут устанавливаются все зависимости которые нам нужны
 */

/**
 * В настройках шторма -> Languages & Frameworks -> Node.js and NPM
 * и ставим галочку - Coding assistance for Node.js
 * и шторм будет помогать работать с синтаксисом nodeJS
 */

/**
 * что бы зайти в консоль вводим - node
 * global - глобальный элемент, типа document,
 * все остальное как и в браузере , за исключением некоторых DOM и API браузера
 * остальное все одинаковое
 * что бы выйти из консоли дважды ctrl+c
 */

/**
 * Модуль os предоставляет служебные методы и свойства, связанные
 * с операционной системой.
 *
 * подробнее тут:
 * https://nodejs.org/api/os.html
 */
const os = require('os');

/**
 * что бы увидеть что выведится - node src/js/task-7.js
 * выведит нашу платформу - darwin
 */
console.log(os.platform());

/**
 * вернет массив о ядрах ЦП твоего ПК
 */
console.log(os.cpus());


/**/


/**
 * Moment - Библиотека дат JavaScript для синтаксического анализа, проверки,
 * манипулирования и форматирования дат.
 *
 * что бы становить moment нужно просто навести на подчеркнутное 'moment' мышкой
 * и выбрать - install... в подсказках шторма
 * ИЛИ
 * npm i moment
 */
const moment = require('moment');
console.log(moment())


/**/


/**
 * импортируем наш файл модуль
 * расширение можем - опускать
 */
const a = require('./task-7_func.js');

// импортируем наш объект модуля через деструктуризацию { a, b, ... }
const { b } = require('./task-7_func.js');

// вызываем ОДНУ ф-цию
// console.log(a(10));

// вызываем нашу ф-цию из переданного объекта модуля
console.log(a.a(22));

// вызываем нашу ф-цию
console.log(b(11));


/**/


/**
 * fs - библиотека для работы с файловой системой
 */
const fs = require('fs');
const users = [{ name: 'Ann', age: 25 }];

// строка JSON типа
console.log(JSON.stringify(users));

/**
 * writeFile - записывает данные в файл, каждый раз будет перезатирать
 * нижнюю запись от writeFile
 */
fs.writeFile('./src/js/task-7_db.json', JSON.stringify(users), (err) => {
  if (err) {
    console.log(err);
  }
});

console.log('-');

fs.readFile('./src/js/task-7_db.json', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    /**
     *  по умолчанию вернет содержимое файла, а именно значение data из нашего
     *  callback,
     *  но мы при считывании файла добавим еще одну запись
     */

    const usersList = JSON.parse(data);
    usersList.push({name: 'Alex', age: 23});

    fs.writeFile('./src/js/task-7_db.json', JSON.stringify(usersList), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});


/**/


/**
 * работа с web сервером
 * http - библиотека
 */
const http = require('http');

/**
 * создаем сервер, в него всегда будет передаваться ДВА параметра, это
 * request и response, в виде callback
 */
/*
const server = http.createServer((req, res) => {
  res.write('Hello world _');

  // завершить поток ожидания, те без него будет все висеть и ждать запросов
  // те метод говорит о том, что данные больше не будут записываться в Writable
  res.end();
});
*/

/**
 * запускаем наш сервер все той же командой (и при КАЖДОМ изменении надо
 * перезапускать нашу команду)
 *
 * node src/js/task-7.js
 *
 * и после чего, консаоль не завершит выполнение а будет ждать ввода запроса
 * те будет мигать бегунок
 *
 * а смотреть результат надо тут
 * http://localhost:5555
 */
//server.listen(5555);

/**
 * что бы каждый раз не перезапускать наш сервер в ручную, нам поможет модуль
 * npm i -g nodemon
 *
 * затем запускаем через него наш скрипт
 * nodemon src/js/task-7.js
 */

/**
 * что бы обрабатывать url запросы, не только методами GET / POST был придуман
 * CRUD - Create Read Update Delete ИЛИ PUT POST GET PATCH DELETE
 * применим для работы с БД
 *
 */
const server = http.createServer((req, res) => {
  // когда мы шлем запрос к нашему корню url, в корень url
  if (req.url === '/') {
    return res.end('Hello from nodeJs')
  }

  /**
   *
   */
  if (req.url === '/api/users') {
    fs.readFile('./src/js/task-7_db.json', 'utf-8', (err, data) => {
      if (err) {
        res.end(err);
      } else {
        res.end(data);
      }
    });
  }

  // так строится описание всех API
  if (req.url === '/api/catalog') {
    if (req.method === 'GET') {};
    if (req.method === 'POST') {};
    if (req.method === 'DELETE') {};
    if (req.method === 'PATCH') {};
  }

  // когда мы шлем наш запрос НЕ к корневому url, те http://localhost:5555/ttt
  //res.end('Page not found =(');
});
server.listen(5555);

/**
 * что бы работать с нашим проектом бакэнд нам нужен фреймворк Express
 * npm i express
 *
 * далее мы пишем нашу серверную часть в файле /task-7_server/server.js
 */
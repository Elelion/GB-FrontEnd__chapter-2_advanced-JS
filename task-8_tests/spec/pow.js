'use strict';
/*jshint esversion: 6 */

/**
 * Мы пишем в начале ф-цию а потом покрываем ее тестами это - BDD
 * А если бы нам пришли тесты под которые нам нужно было бы написать
 * ф-цию, то это был бы подход - TDD
 */
const pow = (x, n) => {
  if (x === null || n === null) {
    return null;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
};

// экспортируем во ВНЕ - без скобок !!!
module.exports = pow;
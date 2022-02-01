'use strict';
/*jshint esversion: 6 */

/**
 * TODO: Закрепляем материал (можно НЕ проверять, для себя...). Задания ниже.
 */

/**
 * В ES2015 появился способ удобно записывать в разные переменные элементы
 * массива или объекта. Такой синтаксис называется деструктуризацией.
 *
 * Деструктуризация массивов и объектов
 */
let array = ['first', 'second'];
let [a, b] = array;
console.log(a); // first
console.log(b); // second

// имена переменных должны совпадать!!! aObj - в объекте и aObj в let
let obj = {
  aObj: 'first',
  bObj: 'second'
}
let {aObj, bObj} = obj;
console.log(aObj); // first
console.log(bObj); // second

// Деструктуризации можно комбинировать и вкладывать друг в друга. Такой объект
let user = {
  params: {
    firstname: 'John',
    lastname: 'Smith'
  },
  goods: ['Book', 'Phone']
}
let {params: {firstname, lastname}, goods: [good1, good2]} = user;
console.log(firstname); // John
console.log(lastname);  // Smith
console.log(good1);     // Book
console.log(good2);     // Phone


/**/


/**
 * У стрелочных функций есть ещё одно важное отличие от обычных:
 * они не создают собственного контекста и наследуют контекст родителя
 */


/**/


// получение степени числа ** 2 степень / ** 3 третья степень
console.log(2 ** 2);


// обычный объект
let object = {
  a: 1,
  b: 2,
};

// получаем массив свойств из объекта
let arr = Object.values(object);
console.log(arr);

// получаем массив ключей из объекта
let arrKeys = Object.keys(object);
console.log(arrKeys);


/**/


let firstName = 'Ivan';
let lastName = 'IvanoV';
let year = 1990;

function getAge(year) {
  let date = new Date();
  return date.getFullYear() - year;
}

const FIO = `${firstName} ${lastName} ${getAge(year)}`;

console.log(FIO);
console.log(FIO.indexOf('IvanoV')); // 5 тк считает по буквам индексы - Ivan I
console.log(FIO.endsWith('32')); // проверяет на что оканчивается строка
console.log(FIO.repeat(2)); // выводит указанное кол-во раз (аналогично for...)

console.log('----');

/* ------------------------------------------------------------------------- */

/**
 * TODO: Задание №1
 * Добавьте стили для верхнего меню, товара, списка товаров и кнопки вызова корзины.
 */

// правильнее задавать в стилях, по этому все классы уже предопределены в scc
/*
document.querySelector('header').classList.add('header');
let header = document.querySelector('.header');

document.querySelector('main').classList.add('main');
let main = document.querySelector('.main');

let buttonCart = document.querySelector('.btn-cart');
let productsWrapper = document.querySelector('.products');
*/

/*
header.style = `
  height: 40px;
  border: 1px solid black;
  padding: 0 15px 0 15px;
`;

buttonCart.style = `
  float: right;
  margin-top: 10px;
`;

main.style = `
  max-width: 1140px;
  height: 100vh;
  margin: 0 auto 0 auto;
  border: 1px solid red;
`;

productsWrapper.style = `
  display: flex;
  height: inherit;
  justify-content: space-between;
  flex-wrap: wrap;
`;
 */


/**/


const products = [
  {id: 1, title: 'Notebook', price: 2000},
  {id: 2, title: 'Mouse', price: 20},
  {id: 3, title: 'Keyboard', price: 200},
  {id: 4, title: 'Gamepad', price: 50},

  {id: 4, title: 'Gamepad', price: 50},
  {id: 4, title: 'Gamepad', price: 50},
  {id: 4, title: 'Gamepad', price: 50},
  {id: 4, title: 'Gamepad', price: 50},
];

//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (title = 'заголовок', price = 0, index) => {
  return `<div class="product-item">
            <img src="https://picsum.photos/200/300?random=${index}" alt="${index}" class="product-item__img">
            <h3 class="product-item__title">${title}</h3>
            <p class="product-item__price">${price}</p>
            <button class=product-item__buy-btn">Купить</button>
          </div>`;
};

/**
 * TODO: Задание №2
 * Добавьте значения по умолчанию для аргументов функции. Как можно
 * упростить или сократить запись функций?
 */
const renderPage = (list) => {
  // это лишнее
  // const productsList = list.map(item => renderProduct(item.title,item.price));
  // console.log(productsList);

  /**
   * Метод .map() принимает функцию обратного вызова как один из аргументов,
   * и текущее значение обрабатываемого функцией элемента является
   * важным параметром этой функции. Это обязательный параметр.
   * С этим параметром вы можете модифицировать каждый элемент массива и создать
   * новую функцию.
   */
  document.querySelector('.products').innerHTML = list.map(
    (item, index) => renderProduct(item.title, item.price, index)

    /**
     * TODO: Задание №3
     * *Сейчас после каждого товара на странице выводится запятая. Из-за
     * чего это происходит? Как это исправить?
     *
     * Ответ:
     * приводит массив к строке (и использует запятую в качестве разделителя
     * по умолчанию). Таким образом, можно объяснить массив
     * преобразования в строку перед установкой innerHTML, добавив join(''):
     */
  ).join('');
};

renderPage(products);

console.log('----');

'use strict';
/*jshint esversion: 6 */

/**
 * TODO: Закрепляем материал (можно НЕ проверять, для себя...). Задания ниже.
 */

// синтаксис 1
//let regExp = new RegExp('выражение', 'флаги');

// синтаксис 2
//let regExp = /expression/flags

let str = 'Язык JavaScript - лучший язык в мире из за популярности Java';

// поиск в соответствии с регистром
//let regExp = new RegExp('Java');


/**
 * i - поиск с любым регистром
 * g - множественный поиск
 * m - многострочный поиск
 */
let regExp = new RegExp('jaVa', 'i');
console.log(regExp);


/**
 * Search
 *
 * статусы:
 * -1 - соответствий не найдено
 * цифра - индекс, под которым начинается найденное соответствие
 */
console.log(str.search(regExp));


/**
 * match
 *
 * null - если не чего не найдено
 * если найдено - возвращает массив-объект с подробной информацией о совпадении
 *  НО без флага /g или /m
 */
console.log(str.match(/java/ig));


/**
 * Replace
 *
 * заменяет найденное значение, на указанное
 */
// изменит только первое найденное значение
// console.log('+7 (000)555-55-55'.replace('-', ':'));

// изменит все
console.log('+7 (000)555-55-55'.replace(/-/g, ':'));

/**
 * Замена
 *
 * то что пишется в круглых скобках - будет запоминаться
 *
 * [a-z] - все значения алфавита, будет искать до первого совпадения
 *
 * контификатор (+) - значит от одного и более раз может встречатся заданное значение
 *
 * каждое значение присваивается в переменные $1, $2 итп
 *
 * $& - строка что была изначально
 */
let name = 'Snow, John';
console.log(name.replace(/([a-z]+), ([a-z]+)/i, '$2 $1'));
console.log(name.replace(/([a-z]+), ([a-z]+)/i, 'Было: $& \n Стало: $2 $1'));


/**
 * Классы
 *
 * \d - он же [0123456789] или он же [0-9]
 * \D - НЕ одно из чисел, он же [ˆ0123456789] или [ˆ0-9], где ^ это отрицание
 * \w - любая буква [a-zA-Z0-9], для кирилици используем [а-яА-ЯёЁ]
 * \W - не w
 * \s - space, tab , \n
 * \S - не s
 * \b - граница слова
 * \B - не b
 *
 * Квантификаторы
 * {m} - строго m раз. Пример: ((name.replace(/([a-z]{4})...
 * {m,n} - от m до n.
 * {m,} - от m до бесконечности. Пример: ((name.replace(/([a-z]{1,})...
 * {,n} - от 0 до n раз
 *
 * Сокращения
 * + - аналог {1,}
 * * - {0,}
 * ? - {0,1}
 *
 */


/**
 * Задачка
 *
 * Есть строка типа +7-(800) 700:60-50
 * На выходе надо получить: 78007006050
 */
console.log('+7-(800) 700:60-50'.replace(/\D/g, ' '));

regExp = new RegExp(/\d+/g)
console.log('+7-(800) 700:60-50'.match(regExp).join(' '));

console.log('+7-(800) 700:60-50'.match(/\d+/g).join(' '));


/**
 * Задачка
 * Есть два написания одного слова
 * амереканское и британское
 *
 * color colour
 *
 * Нужно отловить в тексте все написания этого слова
 */
console.log('there is [ color colour ] no level'.match(/colou?r/g));
console.log('there is [ color colour colotr coloutr ] no level'.match(/colo[ut]?r/g));


/**
 * Различные примеры
 */
// найдет ПЕРВЫЙ Java слово
console.log('Язык JavaScript это не Java вам =)'.match(/\bjava\B/i));

// найдет ПОСЛЕДНИЙ Java слово
console.log('Язык JavaScript это не Java вам =)'.match(/\bjava\b/i));

// найти совпадение с НАЧАЛА строки
console.log('Язык JavaScript это не Java'.match(/java/i));

// найти совпадение с КОНЦА строки, где $ - указывает конец строки
console.log('Язык JavaScript это не Java'.match(/java$/i));

// есть текст, написать регулярку которая найдет все главы
// тк . является частью регулярок, ее нужно экранировать \ , все символы так экранируются
console.log('Chapter 7.2, Chapter 8.1, Chapter 9h4'.match(/\d\.\d/ig));


/**
 * Test
 *
 * возвращает true / false, проверяя вырожение на условие
 */
console.log(/java/i.test(str))


/**
 * Exec
 *
 * Позволяет контролировать КАЖДОЕ найденное вложение
 * У каждой регулярки есть св-во lastIndex
 */
let result;
regExp = /java/ig;

console.log(`Начальный индекс lastIndex: ${regExp.lastIndex}`); // 0
while (result = regExp.exec(str)) {
  console.log(result); // Java
  console.log(`Текущий индекс lastIndex: ${regExp.lastIndex}`); // 9 / 60
}
console.log(`Конечный индекс lastIndex: ${regExp.lastIndex}`); // 0


/* ------------------------------------------------------------------------- */


document.querySelector('header').classList.add('header');
document.querySelector('main').classList.add('main');


/**/


const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/*
function getRequest(url, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
}
*/


/**
 * Переводим выше описанную ф-цию на промисы
 */
/*
let getRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject('Error reject');
        } else {
          resolve(xhr.responseText);
        }
      }
    };
    xhr.send();
  })
};

 */


/**/


// базовые классы
class List {
  constructor(url, container, list = listContext){
    // контенер где рендерятся товары
    this.container = container;

    // словарь для классов строка
    this.list = list;

    // API
    this.url = url;

    // наши товары
    this.goods = [];

    // наши товары в корзине
    this.allProducts = [];

    // отфильтрованные товары
    this.filtered = [];

    this.init();
  }

  // получение данных с сервера
  getJson(url){
    return fetch(url ? url : `${API + this.url}`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }

  // обработка полученных данных
  handleData(data) {
    this.fetchGoodsData();

    // FIXME: подумать над этим...
    // for (let item of data) {
      // this.goods.push(item);
    // }
    this.goods = data;

    this.render();
  }

  // заполняем локальными данными
  fetchGoodsData() {
    this.goods = [
      {id_product: 1, product_name: 'Notebook', price: 2000},
      {id_product: 2, product_name: 'Mouse', price: 20},
      {id_product: 3, product_name: 'Keyboard', price: 200},
      {id_product: 4, product_name: 'Gamepad', price: 50},

      {id_product: 5, product_name: 'Gamepad', price: 450},
      {id_product: 6, product_name: 'Gamepad', price: 350},
      {id_product: 7, product_name: 'Gamepad', price: 150},
      {id_product: 8, product_name: 'Gamepad', price: 250},
    ];
  }

  // подсчет стоимости всех товаров
  calcSum(type = 'allProducts') {
    /**
     * reduce - сложить все елементы массива по полю
     * sum - переменная где будет результат
     * item - значение
     * , 0 - дефолтное значение для sum
     */
    // let finalSum = null;

    let typeVar = (type === 'goods') ? this.goods : this.allProducts;
    let finalSum = typeVar.reduce((sum, item) =>
      sum + (item.price * item.quantity), 0);

    /*
    if (type === 'goods') {
      finalSum = this.goods.reduce((sum, item) =>
        sum + (item.price * item.quantity), 0);
    } else {
      finalSum = this.allProducts.reduce((sum, item) =>
        sum + (item.price * item.quantity), 0);
    }
    */

    return String(finalSum);
  }

  render(){
    const block = document.querySelector(this.container);

    for (let product of this.goods){
      // const productObj = new this.list[this.constructor.name](product);

      // альтернативаня реализация без словаря
      let productObj = null;

      // this.constructor.name - возвращает имя текущего класса
      if (this.constructor.name === 'ProductsList') {
        productObj = new ProductItem(product);
      }

      if (this.constructor.name === 'Cart') {
        productObj = new CartItem(product);
      }

      if (!productObj) {
        return;
      }

      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.render());
    }
  }

  // метод поиска товаров
  filter(value){
    const regexp = new RegExp(value, 'i');
    this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
    this.allProducts.forEach(el => {
      const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);

      if (!this.filtered.includes(el)){
        block.classList.add('invisible');
      } else {
        block.classList.remove('invisible');
      }
    })
  }

  init(){
    // return false
  }
}

class Item{
  constructor(el, img = 'https://via.placeholder.com/200x150'){
    this.product_name = el.product_name;
    this.price = el.price;
    this.id_product = el.id_product;
    this.img = img;
  }

  render(){
    return ``;
  }
}


/**/


class ProductsList extends List{
  constructor(cart, container = '.products', url = "/catalogData.json"){
    super(url, container);

    this.cart = cart;
    this.getJson()
      .then(data => this.handleData(data));
  }

  init(){
    document.querySelector(this.container).addEventListener('click', e => {
      if (e.target.classList.contains('buy-btn')){
        this.cart.addProduct(e.target);
      }
    });

    document.querySelector('.search-form').addEventListener('submit', e => {
      e.preventDefault();
      this.filter(document.querySelector('.search-field').value);
    });
  }
}

class ProductItem extends Item{
  render() {
    return `
      <div class="product-item" data-id="${this.id_product}">
        <img src="${this.img}" alt="Some img">
        <div class="desc">
          <h3>${this.product_name}</h3>
          <p>${this.price} ₽</p>
          <button class="buy-btn"
          data-id="${this.id_product}"
          data-name="${this.product_name}"
          data-price="${this.price}">Купить</button>
        </div>
      </div>`;
  }
}

class Cart extends List{
  constructor(container = ".cart-block", url = "/getBasket.json"){
    super(url, container);

    this.getJson()
      .then(data => {
        this.handleData(data.contents);
      });
  }

  addProduct(element){
    this.getJson(`${API}/addToBasket.json`)
      .then(data => {
        if (data.result === 1){
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);

          if (find) {
            find.quantity++;
            this.updateCart(find);
          } else {
            let product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['name'],
              quantity: 1
            };

            /**
             * goods - отражает список товаров,
             * которые нужно отрендерить.
             * При добавлении нового товара, нас интересует только он один.
             */
            this.goods = [product];

            /**
             * вызывая метод render, мы добавим в allProducts только его,
             * тем самым избегая лишнего перерендера.
             */
            this.render();

            // обновляем состояние общей суммы корзины
            document.querySelector('.cart-sum').innerHTML = this.calcSum('goods');
          }
        } else {
          alert('Error');
        }
      })
  }

  removeProduct(element){
    this.getJson(`${API}/deleteFromBasket.json`)
      .then(data => {
        if (data.result === 1){
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);

          // если товара > 1, то уменьшаем количество на 1
          if (find.quantity > 1){
            find.quantity--;
            this.updateCart(find);
          } else {
            // удаляем
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();

            // обновляем состояние общей суммы корзины
            document.querySelector('.cart-sum').innerHTML = this.calcSum();
          }
        } else {
          alert('Error');
        }
      })
  }

  // обновляем данные корзины
  updateCart(product) {
    let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
    block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;

    // обновляем состояние общей суммы корзины
    document.querySelector('.cart-sum').innerHTML = this.calcSum();
  }

  init(){
    document.querySelector('.btn-cart').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('invisible');

      // обновляем состояние общей суммы корзины
      document.querySelector('.cart-sum').innerHTML = this.calcSum();
    });

    document.querySelector(this.container).addEventListener('click', e => {
      if (e.target.classList.contains('del-btn')){
        this.removeProduct(e.target);
      }
    });
  }
}

class CartItem extends Item{
  constructor(el, img = 'https://via.placeholder.com/50x100'){
    super(el, img);

    this.quantity = el.quantity;
  }

  render(){
    return `
      <div class="cart-item" data-id="${this.id_product}">
        <div class="product-bio">
          <img src="${this.img}" alt="Some image">
          
          <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
            <p class="product-single-price">${this.price} за ед.</p>
          </div>
        </div>
        <div class="right-block">
          <p class="product-price">${this.quantity*this.price} ₽</p>
          <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
      </div>
    `
  }
}

const listContext = {
  ProductsList: ProductItem,
  Cart: CartItem
};

let cart = new Cart();
new ProductsList(cart);

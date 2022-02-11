'use strict';
/*jshint esversion: 6 */

/**
 * TODO: Закрепляем материал (можно НЕ проверять, для себя...). Задания ниже.
 */

/**
 * Статический методы класса – это обычные методы, НО наследуемые объыекты
 * от этого класса (где был статический метод) НЕ имеют доступ к этому
 * статическому методу.
 * Те сам объект от класса где был статический метод - имеет доступ к такому
 * методу. А унаследуемые объекты - уже НЕ имеют домтуп к статич.методу.
 *
 * подробнее тут:
 * https://www.youtube.com/watch?v=Tsr4GvCBPaI
 */


/**/


/**
 * JSON - обычная строка
 *
 * которая имеет сл формат:
 * ... = '{"name": "Ann"}';
 * !ОБЯЗАТЕЛЬНО - в нутри двойные ковычки, с одиночными НЕ будет работать
 *
 *
 */
let userJson = '{"name": "Ann", "age": 25, "isTrue": true}';
console.log('userJson: (string)');
console.log(userJson);

// JSON.parse(строка Json) - преобразует строку Json в объект (те распарсивает)
let user = JSON.parse(userJson);
console.log('user: (object) - parsed');
console.log(user);

// добавляем новую строку /объект в нашу имебщуюся строку Json
user.dateCreated = '2019-05-15';
user.address = {
  city: 'MSK',
  postalCode: 104922,
};
console.log(user);

// преобразуем наш распарсенный Json обратно в строку, по умолчанию передает все ключи
let editedUser = JSON.stringify(user);
console.log('editedUser: (stringify)')
console.log(editedUser);

/**
 * передаем ТОЛЬКО заданные ключи
 *
 * Что касается объектов - указывать надо так:
 * 'address',
 *    'city',
 *    'postalCode',
 *
 * если же просто указать
 * 'city', 'postalCode',
 * БЕЗ 'address' - то будет.. не будет не чего
 *
 * 4 - третий параметр stringify - говорит о том, что вывести текст в читаемом
 * виде, а отступов сделать в 4 пробела
 */
editedUser = JSON.stringify(user, [
  'name',
  'dateCreated',
  'address',
  'city',
  'postalCode',
], 4);
console.log('editedUser: (stringify user, [...])');
console.log(editedUser);

/**
 * вызываем callback, те мы можем вклиниться в парсинг и применить свои условия
 */
let newUser = JSON.parse(editedUser, (key, value) => {
  // со скобками НЕ раотает!!!
  if (key === 'dateCreated')
    value = new Date(value);
    return value;
});
console.log('newUser: ');
console.log(newUser.dateCreated.getFullYear());

console.log('----');


/**/


/**
 * CALLBACK
 */

let num = () => {
  let b;

  // будет выполнена после того, как завершится ВЕСЬ наш синхронный код
  setTimeout(() => {
    b = 20;
  }, 500);

  // undefined
  return b;
}
console.log(num()); // undefined


/**
 * коллбэк — это функция, которая должна быть выполнена после того, как другая
 * функция завершила выполнение (отсюда и название: callback – функция
 * обратного вызова)
 */
// param - параметр ф-ции, который мы будем принимать в ф-цию / это callback
let num1 = (tutFunkciyaKotoruyTiPeredashVMenya) => {
  setTimeout(() => {
    tutFunkciyaKotoruyTiPeredashVMenya(20);
  }, 500);
}
num1((data) => {
    console.log(data);
  }); // 20


// или более понятно, можно так:
let numb = (func) => {
  setTimeout(() => {
    func('adasdsa');
    }, 700);
};

function obicnayaFunction(param) {
  console.log(param);
}

numb(obicnayaFunction); // adasdsa

console.log('----');


/**/


/**
 * PROMISE
 *
 * Promise - класс, который мы дожны описать и вернуть
 * в конструктор промиса !всегда! нужно передавать callback ф-цию
 *
 * Промисы имеют сл. состояния
 * pending - подвисший промис (в каком то ожидании операции итп)
 * fulfilled - завершенный промис
 * rejected - по каким то причинам завершился не успешно
 *
 * Принимает ВСЕГДА два параметра - resolve, reject
 * resolve - ф-ция которую мы будем всегда вызывать
 * reject - либо НЕ вызывается, либо вызывается при ошибки
 */
let numPromise = (a) => {
  return new Promise((resolve, reject) =>{
    setTimeout(() => {
      if (a)
        resolve('resolve string: ' + a)
      else
        reject('no param A')
    }, 800);
  });
}

/**
 * все что описываем в .then( () => {...}) - является ф-цией resolve
 * catch - блок отлова ошибок, для ф-ции reject, catch - ВСЕГДА один для
 * ВСЕго промиса
 *
 * если мы НЕ передадим параметр в numPromise, то сработает catch, и вызовится
 * ф-ция reject из промиса, и потом НЕ остановится. Те код будет работать дальше
 */
numPromise('test').then((data) => {
  console.log('promise:');
  console.log(data);
}).catch((err) => {
  console.log(err);
});

console.log('----');


/**/


/**
 * ASYNC / AWAIT
 *
 * работает только с промисом!!! (по сути это синтаксический сахар)
 *
 * Обратите внимание, хотя await и заставляет JavaScript дожидаться
 * выполнения промиса, это не отнимает ресурсов процессора. Пока промис
 * не выполнится, JS-движок может заниматься другими задачами: выполнять
 * прочие скрипты, обрабатывать события и т.п.
 */
async function mySyncNum() {
  try {
    const result = await numPromise('async');
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

mySyncNum();


/**/


/**
 * AJAX
 *
 * xhr.readyState - статусы запросов
 * 0 - не инициализирован
 * 1 - загрузка данных
 * 2 - принят сервером
 * 3 - идет обмен данными
 * 4 - выполнен (будет всегда по завершению, не смотря на то были ли ошибки или нет)
 *
 * tel_ajax.json - файл, см в корне
 */
document.getElementById('ajax-button').addEventListener('click', (event) => {
  // ES5
  /*
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'tel_ajax.json', true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) {
      return;
    }

    if (xhr.readyState !== 200) {
      console.log(`Error | status: ${xhr.status} | statusText: ${xhr.statusText}`);
    } else {
      // xhr.responseText - результат
      console.log('responseText: ' + xhr.responseText);
    }
  };

  // отправить запрос
  xhr.send();
  */

  // ES6
  fetch('tel_ajax.json')
    .then((result) => {
      // вернет преобразованный в JSON формат наш результат
      return result.json();
    })
    .then((data) => {
      // всегда делать ДВА .then, в 1м - результат, во 2м - все события итп
      // console.log(data);

      let block = document.getElementById('ajax-block');
      block.insertAdjacentHTML('beforeend', `
        <p>${data.name} - <strong>${data.tel}</strong></p>
      `);
    })
    .catch((err) => {
      console.log(err);
    });
});


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


// TODO: 1. Переделайте getRequest() так, чтобы она использовала промисы.
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


// TODO: 2. Допиливаем корзину
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

    for (let item of data) {
      this.goods.push(item);
    }

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
  calcSum() {
    /**
     * reduce - сложить все елементы массива по полю
     * sum - переменная где будет результат
     * item - значение
     * , 0 - дефолтное значение для sum
     */
    return this.allProducts.reduce((sum, item) => sum + item.price, 0);
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
    })
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
        if(data.result === 1){
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if(find){
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
             * goods - это своего рода "опорный" массив, отражающий список товаров,
             * которые нужно отрендерить.
             * При добавлении нового товара, нас интересует только он один.
             */
            this.goods = [product];

            /**
             * далее вызывая метод render, мы добавим в allProducts только его,
             * тем самым избегая лишнего перерендера.
             */
            this.render();
          }
        } else {
          alert('Error');
        }
      })
  }

  removeProduct(element){
    this.getJson(`${API}/deleteFromBasket.json`)
      .then(data => {
        if(data.result === 1){
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);

          // если товара > 1, то уменьшаем количество на 1
          if(find.quantity > 1){
            find.quantity--;
            this.updateCart(find);
          } else {
            // удаляем
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
          }
        } else {
          alert('Error');
        }
      })
  }

  // обновляем данные корзины
  updateCart(product){
    let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
    block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
  }

  init(){
    document.querySelector('.btn-cart').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('invisible');
    });

    document.querySelector(this.container).addEventListener('click', e => {
      if(e.target.classList.contains('del-btn')){
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

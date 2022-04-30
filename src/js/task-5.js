'use strict';
/*jshint esversion: 6 */

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const appTask = new Vue({
  el: '#task5',

  data: {
    imgCatalog: 'https://via.placeholder.com/200x150',
    imgCart: 'https://via.placeholder.com/200x150',

    catalogUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',

    searchLine: '',

    productItems: [],
    cartItems: [],
    filtered: [],

    showCart: false,
  },

  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        });
    },

    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            /**
             * arr.find(function(item, index, array)
             * Если функция возвращает true, поиск прерывается и возвращается
             * item. Если ничего не найдено, возвращается undefined
             */
            let find = this.cartItems.find(el => el.id_product === product.id_product);

            if (find) {
              find.quantity++;
              // this.updateCart(find);
            } else {
              /**
               * Метод Object. ... assign() используется для копирования
               * значений всех собственных перечисляемых свойств из одного
               * или более исходных объектов в целевой объект. После
               * копирования он возвращает целевой объект.
               */
              let prod = Object.assign({quantity: 1}, product);
              this.cartItems.push(prod);
            }
            console.log(this.cartItems)
          } else {
            alert('Error');
          }
        })
    },

    remove(item) {
      console.log(item);
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            if (item.quantity > 1) {
              item.quantity--;
            } else {
              /**
               * splice - специальный метод JS для работы с массивами, в нашем
               * примере мы будем удалять им
               */
              this.cartItems.splice(this.cartItems.indexOf(item), 1);
            }
          }
        })
    },

    filter() {
      let regexp = new RegExp(this.searchLine, 'i');
      this.filtered = this.productItems.filter(el => regexp.test(el.product_name));
    },
  },

  /**
   * хук жизненного цикла - каждый раз когда мы инициализируем компоненту
   * она проходит определенные этапы своего существования. Эти хуки ВСЕГДА
   * выполняются
   *
   * - beforeCreate() {...} - до того как компонент появится
   * - created() {...} - когда уже все создано (тут еще отсутствует DOM)
   * - beforeMount() {...} - перед монтированием DOM
   * - mounted() {...} - после монтирования DOM
   *
   * - beforeUpdate() {...} - цикл после создания во время жизни, перед обновлением
   * - updated() {...} - аналогично, после обновления
   * - beforeDestroy() {...} - перед тем, когда компонент уничтожается
   * - destroyed() {...} - когда компонент был уничтожен
   */
  created() {
    this.getJson(`${API + this.cartUrl}`)
      .then(data => {
        for (let el of data) {
          this.cartItems.push(el);
        }
      })
      .catch(error => {
      console.log(error);
      });

    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.productItems.push(el);
          this.filtered.push(el);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },

});


/* ------------------------------------------------------------------------- */


document.querySelector('header').classList.add('header');
document.querySelector('main').classList.add('main');


/**/


// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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

// let cart = new Cart();
// new ProductsList(cart);

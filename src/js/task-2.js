'use strict';
/*jshint esversion: 6 */

/**
 * TODO: Закрепляем материал (можно НЕ проверять, для себя...). Задания ниже.
 */

/**
 * Инкапсуляция – возможность объединить все свойства и методы и при желании
 * скрыть часть из них. Это значит, что в классе содержится полный набор
 * свойств и методов, необходимых для его работы. При этом мы можем сделать
 * так, чтобы некоторые из них были недоступны напрямую у экземпляров класса.
 * Так обычно делают для служебных свойств и методов, которые используются
 * для внутренних преобразований данных в классе.
 */

/**
 * Полиморфизм – возможность объявить у разных классов один и тот же метод
 * или свойство. Например, создадим на основе нашего класса ПунктМеню два
 * класса-наследника – ПунктГлавногоМеню и ПунктБоковогоМеню. Для пункта
 * главного меню сделаем так, чтобы при вызове метода Покраснеть становился
 * красным только текст, а для бокового меню – текст и рамка вокруг него.
 * Метод называется одинаково, но в зависимости от того, к какому пункту
 * мы его применяем, будут выполняться разные действия.
 */

/**
 * innerHTML - отнимает больше ресурсов при большом кол-ве рендеринга
 * insertAdjacentHTML - отнимает меньше ресурсов при больших объектов
 */

console.log('----');

/* ------------------------------------------------------------------------- */

document.querySelector('header').classList.add('header');
document.querySelector('main').classList.add('main');

/**
 * TODO: Задание №1
 * Добавьте пустые классы для Корзины товаров и Элемента корзины товаров.
 * Продумайте, какие методы понадобятся для работы с этими сущностями.
 */
class Cart {
  constructor() {
    this.beginEvent();
  }

  initDOMElements() {
    this.cartButton = document.querySelector('.header__cart');
    this.productTitles = document.querySelectorAll('.products__title');
    this.productPrices = document.querySelectorAll('.products__price');
    this.cartDeal = document.querySelector('.header__cart-amount');
    this.cartButton = document.querySelector('.header__cart');
    this.cartContent = document.querySelector('.header__cart-content');
  }

  stylizingContent() {
    this.cartContent.style.cssText = `
      position: absolute;
      top: 75px;
      right: 75px;
      display: none;
      z-index: 999;
      width: 500px;
      height: auto;
      border: 1px solid black;
      background: white;`;
  }

  renderContent() {
    //this.stylizingContent();

    return this.cartContent.insertAdjacentHTML('beforeend', `
      <table style="width: 100%; border-collapse:collapse; border-spacing:0; height: auto;">
        <thead>
          <tr style="border-bottom: 1px solid #595959; height: 40px;">
            <th>id</th>
            <th>Название</th>
            <th>Количество</th>
            <th>За шт</th>
            <th>Итого</th>
          </tr>
        </thead>
        <tbody class="header__cart-table">
      </table>
      <div>Итого: <span class="header__cart-summary"></span></div>`);
  }

  renderItemContent() {
    // рендерим добавление нового товара (таблица)
  }

  add() {
    // добавляем товар в корзину
  }

  summaryPrice() {
    // считать сумарный товар в корзине
  }

  beginEvent() {
    this.initDOMElements();
    // this.renderContent();
  }
}

new Cart();


/**/


class productList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    // this.allProducts = [];

    this.fetchGoodsData();
    this.summaryGoodsList();
    this.render();
  }

  fetchGoodsData() {
    this.goods = [
      {id: 1, title: 'Notebook', price: 2000},
      {id: 2, title: 'Mouse', price: 20},
      {id: 3, title: 'Keyboard', price: 200},
      {id: 4, title: 'Gamepad', price: 50},

      {id: 5, title: 'Gamepad', price: 450},
      {id: 6, title: 'Gamepad', price: 350},
      {id: 7, title: 'Gamepad', price: 150},
      {id: 8, title: 'Gamepad', price: 250},
    ];
  }

  /**
   * TODO: Задание №2
   * Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
   */
  summaryGoodsList() {
    let sum = 0;

    for (let product of this.goods) {
      sum += product.price;
    }

    console.log(sum);
    //return sum;
  }

  render() {
    const catalogBlock = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);

      // this.allProducts.push(productObject);
      catalogBlock.insertAdjacentHTML('beforeend', productObject.getHTMLString())
    }
  }
}

class ProductItem {
  constructor(product, img = 'https://picsum.photos/200/300') {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return `
      <div class="product-item">
        <img src="https://picsum.photos/200/300?random=${this.id}" 
          alt="${this.index}" 
          class="product-item__img">
          
        <h3 class="product-item__title">${this.title}</h3>
        <p class="product-item__price">${this.price}</p>
        <button class=product-item__buy-btn">Купить</button>
      </div>`;
  }
}

new productList();

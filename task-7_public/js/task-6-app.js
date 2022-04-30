'use strict';
/*jshint esversion: 6 */

// import appProductComponent from './task-6-appProductComponent';
// import appCartComponent from './task-6-components-2.js';
// import appSearch from './task-6-appSearch';


/**/


const childElem = {
  // задаем имя компонента
  name: 'child-elem',

  // наш HTML шаблон
  template: `
    <div>
      <p>child-elem - local component</p>
    </div>
  `,
}





const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#appTask6',

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

  components: {
    // appProductComponent,
    // appCartComponent,
    // appSearch,

    childElem,
  },

  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          // console.log(error);
          console.log('Error alert:');
          this.$refs.error.setError(error);
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

'use strict';
/*jshint esversion: 6 */

Vue.component('cart', {
  name: 'cart',
  props: ['cartItems', 'img', 'visibility'],

  template: `
    <div class="cart-block" v-show="visibility">
      <p v-if="!cartItems.length">Корзина пуста</p>

      <cart-item class="cart-item" v-for="item of cartItems"
        :key="item.id_product"
        :cart-item="item"
        :img="img">
      </cart-item>
    </div>
  `,
});

Vue.component('cart-item', {
  name: 'cart-item',
  props: ['cartItem', 'img'],

  template: `
    <div class="cart-item">
      <div class="product-bio">
        <img :src="img" alt="some img">
        <div class="product-desc">
          <p class="product-title">{{cartItem.product_name}}</p>
          <p class="product-quantity">{{cartItem.quantity}}</p>
          <p class="product-price">{{cartItem.price}} ₽/1шт</p>
        </div>
      </div>
      <div class="right-block">
        <p class="product-price">{{cartItem.quantity * cartItem.price}} ₽</p>
         <button class="del-btn" @click="$root.remove(cartItem)">&times;</button> 
      </div>
    </div>
  `,
});


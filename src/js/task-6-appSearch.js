'use strict';
/*jshint esversion: 6 */

Vue.component('search', {
  name: 'search',

  template: `
    <form action="#" class="search-form" @submit.prevent="$root.filter()">   
      <input type="text" class="search-field" v-model="$root.searchLine">
      <button class="btn-search" type="submit">
        <i class="fas fa-search"></i>
      </button>
    </form>
  `,

});

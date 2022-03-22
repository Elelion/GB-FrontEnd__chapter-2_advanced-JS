'use strict';
/*jshint esversion: 6 */

/**
 * вызываем в task-6-app.js -> methods -> getJson()...catch()
 */
Vue.component('error', {
  name: 'error',

  data() {
    return {
      text: '',
    }
  },

  methods: {
    setError(error) {
      this.text = error;
    }
  },

  computed: {
    isVisible() {
      return this.text !== '';
    }
  },

  template: `
    <div class="error-block" v-if="isVisible">
      <p class="error-msg">
        <button class="close-btn" @click="setError('')">x</button>
        {{ text }}
      </p>
    </div>
  `,

});

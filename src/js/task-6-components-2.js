'use strict';
/*jshint esversion: 6 */

Vue.component('some-el-second', {
  name: 'some-el-second',

  data: () => ({
    title: 'task-6-components-2.js (text)',
  }),

  components: {

  },

  template: `
    <div>
      <div>{{ title }}</div>
    </div>`,
});

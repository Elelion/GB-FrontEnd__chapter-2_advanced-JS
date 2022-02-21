'use strict';
/*jshint esversion: 6 */

// вариант подключения №2
// импортируем наш внешний элемент из отдельного файла (можем подключать и тут)
import childElemComponents from './task-6-childElem.js';

const app = new Vue({
  el: '#app',

  data: {
    chapter: 'App#1, chapter',
    counter: 0,

    // свойство для наших вкладок
    tabs: ['one', 'two', 'three'],
    tabCurrent: 'one',
  },

  methods: {
    increaseCounter() {
      this.counter++;
    }
  },

  components: {
    // вариант подключения №2
    childElemComponents,
  },

  computed: {
    currentComponent() {
      return `component-${this.tabCurrent}`;
    },
  },

  /**
   * вариант подключения №2
   *
   * передаем значения через props
   * props.title итп
   */
  template: `
    <div>
      <!--
      Если нужно передать значения из нашей data: {...}
      то нам поможет только v-bind 
      v-bind:chapter = "chapter" />
      -->
      <some-el 
        title = "Hello my app | call from task-6.js"
        :chapter = "chapter" 
        :counter = "counter"/>
        
      <some-el  
        :counter = "counter"
        :increaseCounter = "increaseCounter" />
        
      <!-- подписываемся на наше событие @increase-counter -->
      <some-el  
        @increase-counter = "increaseCounter"
        :counter = "counter" />
        
      <some-el
        :counter = "counter" />
        
      <!-- каждый раз при вызове - создается свой ИЗОЛИРОВАННЫЙ компонент -->
      <childElemComponents />
      <childElemComponents />
      
      <!-- 
      передача через слоты - то что является между закрывающимся и открывающимся
      тегом <some-el> тут будет слот </some-el> - является слотами
      -->
      <span>span: im injecting sa slot</span>
      <p>p: slot</p>
      
      
      <!-- Делаем наши вкладки (tab's) -->
      <div>
        <button 
          v-for="tab in tabs" 
          :key="tab.id" 
          @click="tabCurrent = tab"
        >
          {{ tab }}
        </button>
        
        <!-- 
        component - позволяет интерпалировать компонент
        v-bind:is - Используется для динамически переключаемых компонентов и для 
        обхода ограничений при использовании DOM-шаблонов. Используется только
        с <component />
        -->
        <component :is="currentComponent">
        </component>
      </div>
    </div>`,

  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
});

'use strict';
/*jshint esversion: 6 */

// импортируем наш элемент из отдельного файла
import childElemComponents from './task-6-childElem.js';


/**
 * Компонент - локальный
 */
const childElem = {
  // задаем имя компонента
  name: 'child-elem',

  // наш HTML шаблон
  template: `
    <p>child-elem - local component</p>
  `,
}


/**/


/**
 * Компонент - ГЛОБАЛЬНЫЙ
 * данный подход используется - редко!
 *
 * Всегда! должен возарщать ф-цию
 *
 * Задаем наш компонента подобнымобразом, где:
 * (название компонента, параметры объекта)
 *
 * Разметку компонента передать из вне не получится, по этому она должна уже
 * быть здесь и описана в св-ве template
 */
Vue.component('some-el', {
  /**
   * все передаваемые (принимаемые) параметры - ТОЛЬКО через props!
   * increaseCounter - является ссылкой на метод
   */
  props: ['title', 'chapter', 'counter', 'increaseCounter'],
  data: () => ({
    // передаем данные из data, если нет props
    // title: 'hello world',
  }),

  // что бы подключить другие компоненты, надо передать ссылку др компонента
  components: {
    childElem, // наш локальный элемент из этого же файла
    childElemComponents, // внешний элемент из др файла
  },

  // обязательно должен быть рутовый div!, а к компонентам обращаемся по name
  template: `
    <div>
      <div>{{ title }}</div>
      <p>{{ chapter }}</p>
      
      <!-- к локальным элементам обращаемся по заданному имени name: ... -->
      <child-elem />
      
      <!-- к внешним элементам обращаемся по импортируемому имени -->
      <childElemComponents />
      
      <p>---</p>
      
      <!-- метод будет менять состояние у КОНКРЕТНОГО counter, а не у всех -->
      <button @click="counter++">increase</button>
      
      <!-- метод будет менять состояние у ВСЕХ counter, а не у конкретного -->
      <button @click="increaseCounter()">increase from func</button>
      
      <!-- 
      обращение к родителю counter, эффект аналогично что и с методом
      ИЛИ
      Определяет родительский экземпляр для создаваемого. Устанавливает 
      отношение «родитель-потомок» между ними. Родитель будет доступен дочернему 
      экземпляру посредством this.$parent, а дочерний экземпляр будет добавлен в 
      массив $children родителя. 
      -->
      <button @click="$parent.counter++">increase parent</button>
      
      <!--
      $emit / this.emit - регистрирует свое событие или вызывает событие
      те позволяет спродуцировать свое событие и подписаться на него же
      
      в родительском app прописываем его вызов как бы через props
      ... @increase-counter = "increaseCounter" ...
      
      increase-counter - название нашего события
      -->
      <button @click="$emit('increase-counter')">increase emit</button>
      
      <p>counter: {{ counter }}</p>
      
      <!-- 
      тк слот в родителе размещен между компонентами - он НЕ отобразится
      что бы он был виден - его нужно где то отобразить
      
      Если впишем что либо между тегами <slot /> то это значение будет по default
      
      Слоты рекомендуется использовать в легких вещах, в яжелых лучше без них 
      -->
      <slot>Default slot</slot>
      
      <hr>
    </div>`,
});


/**/


/**
 * Делаем вкладку с переключениями
 */
Vue.component('component-one', {
  template: `<div>Lorem ipsum 1...</div>`,
});

Vue.component('component-two', {
  template: `<div>Lorem ipsum 2...</div>`,
});

Vue.component('component-three', {
  template: `<div>Lorem ipsum 3...</div>`,
});
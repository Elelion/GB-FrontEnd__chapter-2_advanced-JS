// описываем блок тестов
describe('Соответствие значений', function () {
  // описываем название нашего теста
  it('Проверка значений переменной на = 10', function () {
    let a = 10;

    // любой тест начинается с ф-ции expect
    // .toBe - строгое значение
    expect(a).toBe(10);
  });
});

/**
 * ЗАПУСКАЕМ наш тест из папки task-8_tests
 * npx jasmine
 *
 * в результате будет F - тест провален ИЛИ зеленая точка . - тест успешен
 */

// продвинутые фишки
describe('Дополнительные ф-ции', function () {
  it('Сравнение двух объектов', () => {
    const myGo = () => {};

    const user = {
      name: 'anna',
      age: 20,

      // будет всегда разное значение ссылок на ф-цию
      // go: () => {},

      // теперь ссылка будет на ф-цию одинаковая
      go: myGo,
    }

    const user2 = {
      name: 'anna',
      age: 20,

      // будет всегда разное значение ссылок на ф-цию
      // go: () => {},

      // теперь ссылка будет на ф-цию одинаковая
      go: myGo,
    }

    /**
     * тк ссылки на объект будут всегда разные, а нам надо проверить сам
     * объект, то надо вызывать .toEqual
     */
    expect(user).toEqual(user2);
  });

  // массивы - сравниваются индексы и их значения | .not.toEqual - не эквивалентны
  it('Массивы', function () {
    const arr1 = ['black', 'white'];
    const arr2 = ['white', 'black'];

    // expect(arr1).toEqual(arr2);
    expect(arr1).not.toEqual(arr2);
  });

  // проверка регулярок
  it('RegExp', function () {
    let str = 'test Abcd Jasmine';

    expect(str).toMatch(/abcd/i);
  })

  /**
   * Различные тесты
   */
  /*
  expect().toBeNull(); // null
  expect().toBeUndefined(); // undefined
  expect().toBeTruthy(); // true
  expect().toBeFalsy(); // false
  expect().toBeNaN(); // NaN
  expect().toBeGreaterThan(); // больше чем...
  expect().toBeGreaterThanOrEqual(); // больше ИЛИ равно
  expect().toBeLessThan(); // меньше чем
  expect().toBeLessThanOrEqual(); // меньше ИЛИ равно
  expect().toBeCloseTo(); // максимально приближенное значение к какому либо
   */
});

/**
 * далее мы пишем ф-цию возведения в степень -> pow.js
 * и пишем для нее тесты в pow.spec.js
 */

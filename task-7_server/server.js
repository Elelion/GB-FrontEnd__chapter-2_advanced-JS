const express = require('express');
const fs = require('fs');

// создаем наше приложение на основе Express'a
const app = express();

// говорим нашему приложению что бы он понимал JSON и уже принимал его распарсеным
app.use(express.json());

/**
 * Для того чтобы Node.js сервер мог передавать по запросу находящиеся у него
 * статические файлы (изображения, аудио, HTML, CSS, JS), используется функция
 * фреймворка Express static().
 *
 * все запросы по нашему endpoint'y мы будем возвращать по нему статичные
 * данные, и указываем по какому пути нужно отдавать данные (task-7_public)
 * а в public лежит наше Vue приложение, те оно отдасться как есть, вернется
 * index.html а от туда подтянуться все js+css итп. Указываем лишь папку приложения
 * дальше nodeJS сделает все сам
 *
 * https://nodejsdev.ru/doc/static/
 */
app.use('/', express.static('./task-7_public'));

/**
 * get - как и в PHP...
 *
 * те нам не надо больше писать записи типа
 * if (req.url === '/api/products') {...}
 * тк мы уже задеклирировали путь GET уже в app.get
 *
 */

// товары через GET
app.get('/api/products', (req, res) => {
  fs.readFile('./task-7_server/db/products.json', 'utf-8', (err, data) => {
    if (err) {
      // передаем объект ошибки
      res.send(JSON.stringify({result: 0, err}));
      console.log('app.get/api/product - send - error');
    } else {
      res.send(data);
      console.log('app.get/api/product - send - ok');
    }
  });

  console.log('app.get/api/product - end');
});

// корзина через GET
app.get('/api/cart', (req, res ) => {
  fs.readFile('./task-7_server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({result: 0, err}));
      console.log('app.get/api/cart - send - error');
    } else {
      res.send(data);
      console.log('app.get/api/cart - send - ok');
    }
  });
})

// корзина через POST
app.post('/api/cart', (req, res ) => {
  fs.readFile('./task-7_server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({result: 0, err}));
      console.log('app.get/api/cart - send - error');
    } else {
      const cart = JSON.parse(data);

      // для получения самих отправленных данных используем .body
      cart.contents.push(req.body);

      fs.writeFile('/task-7_server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.end(JSON.stringify({result: 0, err}));
        } else {
          res.end(JSON.stringify({result: 1}));
        }
      })
    }
  });
})

/**
 * мы можем задать так же и передаваемый параметр, /id
 * делвется это так:
 * /:id
 * и все что будет передаваться после / - будет сохранено в params
 *
 * а если передать вот так,
 * /:id?qwe=rty
 * то try будет сохранено в свойстве qwe
 */
app.put('/api/cart/:id ', (req, res ) => {
  fs.readFile('./task-7_server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({result: 0, err}));
      console.log('app.get/api/cart - send - error');
    } else {
      const cart = JSON.parse(data);
      const find = cart.contents.find(good => good.id_product === Number(req.params.id));
      find.quantity += req.body.quantity;

      // для получения самих отправленных данных используем .body
      cart.contents.push(req.body);

      fs.writeFile('/task-7_server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.end(JSON.stringify({result: 0, err}));
        } else {
          res.end(JSON.stringify({result: 1}));
        }
      })
    }
  });
})

// запускаем прослушку
app.listen(5555, () => {
  console.log('server started...');
});
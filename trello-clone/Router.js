const Router = require('express');
const controller = require('./Controller.js');

const router = new Router();

// тут має бути ще перевірка на валідність введених даних

router.get('/', controller.test);
router.post('/create', controller.create);
router.post('/login', controller.login);


module.exports = router;

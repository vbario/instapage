var express = require('express');
var router = new express.Router();
var controller = require('./controller');
var requireLogin = require('../../require_login');

router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:id', requireLogin, controller.update);
router.get('/delete/:id', requireLogin, controller.delete);
router.delete('/:id', requireLogin, controller.delete);
router.get('/:id', controller.show);

module.exports = router;

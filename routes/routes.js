const express = require('express');
const router = express.Router();
const multer = require('multer');

const atkCtrl = require('../controllers/atk');
const cookieCtrl = require('../controllers/cookie');

router.get('/atk', atkCtrl.fetch);
router.post('/atk', atkCtrl.create);
router.get('/atk/:name', atkCtrl.get);
router.put('/atk/:name', atkCtrl.update);
router.delete('/atk/:name', atkCtrl.destroy);
router.get('/atk/:name/detail/:id', atkCtrl.get);

router.get('/cookies-read', cookieCtrl.cookieReader);
router.get('/cookies-send', cookieCtrl.cookieSave);
router.get('/session-send', cookieCtrl.sessionSave);

module.exports = router;

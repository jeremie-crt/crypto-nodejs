var express = require('express');
var router = express.Router();
let controller = require('../controllers/homepage')

/* GET home page. */
router.get('/', controller.homePage);

module.exports = router;

var express = require('express');
var router = express.Router();
let controller = require('../controllers/homepage')

/* GET home page. */
router.get('/', controller.welcomePage);

module.exports = router;

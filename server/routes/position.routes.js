var express = require('express');
var router = express.Router();
const position = require("../controllers/position.controller")

// var apicache = require('apicache')
// var cache = apicache.middleware

/* GET positions. */
router.get('/', position.findAll );


module.exports = router;
  
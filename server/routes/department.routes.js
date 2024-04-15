var express = require('express');
var router = express.Router();
const department = require("../controllers/department.controller")
// var apicache = require('apicache')
// var cache = apicache.middleware

/* GET departments. */
router.get('/', department.findAll );

module.exports = router;
  
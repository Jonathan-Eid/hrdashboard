var express = require('express');
var router = express.Router();
var apicache = require('apicache')
var cache = apicache.middleware

const employee = require("../controllers/employee.controller")



/* GET employees. */
router.get('/', cache('1 hour'), employee.findAll);
router.post('/', employee.create);
router.put('/', employee.update);
router.delete('/', employee.delete);



module.exports = router;
   
var express = require('express');
var router = express.Router();

const employee = require("../controllers/employee.controller")



/* GET users listing. */
router.get('/', employee.findAll );


// Get all Employees - filter filter by department or status
// Add employees - 



module.exports = router;
  
const db = require("../models");
const Department = db.department

exports.findAll = (req, res) => {
  
    Department.findAll()
    .then((departments) => {
        res.send(departments)
    })
    .catch((err)=>{
        res.status(500).send(({
            message:err.message
        }))
    })
    
}

// Omitting PUT, DELETE CRUD Operations & Pagination
const db = require("../models");
const Department = db.department

exports.findAll = (req, res) => {
  
    Department.findAll({
        attributes: ["id", "name"],
    })
    .then((departments) => {
        res.send(departments)
    })
    .catch((err)=>{
        res.status(500).send(({
            message:err
        }))
    })
    
}

// Omitting PUT, DELETE CRUD Operations & Pagination
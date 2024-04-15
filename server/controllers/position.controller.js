const db = require("../models");
const Position = db.position

exports.findAll = (req, res) => {
  
    Position.findAll({
        attributes: ["id", "name"],
    })
    .then((positions) => {
        res.send(positions)
    })
    .catch((err)=>{
        res.status(500).send(({
            message:err
        }))
    })
    
}

// Omitting PUT, DELETE CRUD Operations & Pagination
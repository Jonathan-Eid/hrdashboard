const db = require("../models");
const Position = db.position

exports.findAll = (req, res) => {
  
    Position.findAll()
    .then((positions) => {
        res.send(positions)
    })
    .catch((err)=>{
        res.status(500).send(({
            message:err.message
        }))
    })
    
}

// Omitting PUT, DELETE CRUD Operations & Pagination
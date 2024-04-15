const db = require("../models");
const Employee = db.employee
const Department = db.department
const Position = db.position
const Op = db.Sequelize.Op
var apicache = require('apicache')



exports.findAll = (req, res) => {  

    const { page, size, department, status } = req.query; 
    var departmentFilter = department ? { name: { [Op.like]: `%${department}%` } } : null;
    var statusFilter = status ? { status } : null;

    const { limit, offset } = getPagination(page, size);

    Employee.findAndCountAll({
        where: statusFilter,
        limit,
        offset,
        attributes: ["id", "firstName",'lastName','salary','status'],
        include:[
            {
                model: Department,
                attributes: ['id','name'],
                where: departmentFilter
            },
            {
                model: Position,
                attributes: ['id','name']
            }
        ],
        })
        .then((data) => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch((err) => {
            res.status(500).send({
            message:
                err || "Some error occurred while retrieving employees.",
            });
        });
    };

    exports.create = (req, res) => {
        apicache.clear();
        const employeeAttributes =  req.body
        Employee.create(
            employeeAttributes
        )
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
            message:
                err || "Some error occurred while updating employee",
            });
        });

        
    }

    exports.update = (req, res) => {
        apicache.clear();
        const employeeUpdate =  req.body
        console.log(employeeUpdate)
        Employee.update(
            employeeUpdate,
            {where: {
                id: employeeUpdate.id
            }
        })
        .then((data) => {
            console.log(data)
            res.send(data);
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send({
            message:
                err || "Some error occurred while updating employee",
            });
        });

        
    }

    exports.delete = (req, res) => {
        apicache.clear();
        const employeeId =  req.body.employeeId
        Employee.destroy({
            where: {
                id: employeeId
            }
        })
        .then(() => {
            res.send({
                message: `Employee ${employeeId} successfully deleted`
            });
        })
        .catch((err) => {
            res.status(500).send({
            message:
                err || "Some error occurred while deleting employee",
            });
        });

    }

    const getPagination = (page, size) => {
        const limit = size ? +size : 10;
        const offset = page ? page * limit : 0;
    return { limit, offset };
    };

    const getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: employees } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, employees, totalPages, currentPage };
    };





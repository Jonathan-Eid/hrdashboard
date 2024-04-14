const db = require("../models");
const Employee = db.employee
const Department = db.department
const Position = db.position
const Op = db.Sequelize.Op


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
                attributes: ['name'],
                where: departmentFilter
            },
            {
                model: Position,
                attributes: ['name']
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
                err.message || "Some error occurred while retrieving tutorials.",
            });
        });
    };

    const getPagination = (page, size) => {
        const limit = size ? +size : 10;
        const offset = page ? page * limit : 0;
    return { limit, offset };
    };

    const getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: tutorials } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, tutorials, totalPages, currentPage };
    };

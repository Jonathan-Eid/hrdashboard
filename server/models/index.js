const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
});
const db = {};
db.Sequelize = Sequelize;
db.employee = require("./employee.model.js")(sequelize,Sequelize);
db.department = require("./department.model.js")(sequelize,Sequelize);
db.position = require("./position.model.js")(sequelize,Sequelize);
db.department.hasMany(db.employee)
db.position.hasMany(db.employee)
db.employee.belongsTo(db.department)
db.employee.belongsTo(db.position)


module.exports = db;
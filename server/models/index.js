const { map } = require("../app.js");
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
db.department.hasMany(db.employee, {
  foreignKey: {
    allowNull: false,
  },
})
db.position.hasMany(db.employee, {
  foreignKey: {
    allowNull: false,
  },
})
db.employee.belongsTo(db.department)
db.employee.belongsTo(db.position)



const initDb = ( async () =>{

  await sequelize.sync();
  console.log('All models were synchronized successfully.');

  const departments = ['HR','Engineering','Business'].map( async (departmentName) =>  {
    const [department, created] = await db.department.findOrCreate({
      where: {name: departmentName}
    })

    if (created){
      console.log(`Department: "${department.name}" created`)
    }

    return department

  } ) 

  const positions = await ['Specialist','SDE','Analyst'].map( async (positionName) =>  {
    const [position, created] = await db.position.findOrCreate({
      where: {name: positionName} 
    })

    if (created){
      console.log(`Position: "${position.name}" created`)
    }
    return position
    } 
  ) 

  const employees = [
    {
      firstName: "Solid",
      lastName: "Snake",
      salary: 50000,
      status: true
    },
    {
      firstName: "Revolver",
      lastName: "Ocelot",
      salary: 50000,
      status: true
    },
    {
      firstName: "Big",
      lastName: "Boss",
      salary: 50000,
      status: false
    },

  ]
  for (let i = 0; i < 3; i++) {
    const department = await departments[i]
    const position = await positions[i]
    const [employee, created] = await db.employee.findOrCreate({
      where: {
        firstName: employees[i].firstName,
        lastName: employees[i].lastName,
        salary: employees[i].salary,
        status: employees[i].status,
        departmentId: department.id,
        positionId: position.id
      }
    })

    if (created){
      console.log(`Employee: "${employee.firstName} ${employee.lastName}" created`)
    }

  }

})()   

 
module.exports = db;  
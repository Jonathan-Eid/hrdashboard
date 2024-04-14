module.exports = (sequelize,Sequelize) => {
    const Employee = sequelize.define("employee", {
      name: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      created: {
        type: Sequelize.DATE
      },
    },{tableName : 'employee'});
  
    return Employee;
  };
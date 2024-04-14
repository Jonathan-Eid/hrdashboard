module.exports = (sequelize,Sequelize) => {
    const Department = sequelize.define("department", {
      name: {
        type: Sequelize.STRING
      },
      created: {
        type: Sequelize.DATE
      },
    },{tableName : 'department'});
  
    return Department;
  };
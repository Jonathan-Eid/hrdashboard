module.exports = (sequelize,Sequelize) => {
    const Department = sequelize.define("department", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2,20],
          notEmpty: true
        }
      }
    },{tableName : 'department'});
  
    return Department;
  };
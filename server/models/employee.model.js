module.exports = (sequelize,Sequelize) => {
    const Employee = sequelize.define("employee", {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2,20],
          notEmpty: true,
        }
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2,20],
          notEmpty: true,
        }
      },
      salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          max:1000000,
          min: 1000
        }

      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    },{tableName : 'employee'});
  
    return Employee;
  };
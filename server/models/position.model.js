module.exports = (sequelize,Sequelize) => {
    const Position = sequelize.define("position", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2,20],
          notEmpty: true
        }
      }
    },{tableName : 'position'});
  
    return Position;
  };
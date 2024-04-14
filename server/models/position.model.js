module.exports = (sequelize,Sequelize) => {
    const Position = sequelize.define("position", {
      name: {
        type: Sequelize.STRING
      },
      created: {
        type: Sequelize.DATE
      },
    },{tableName : 'position'});
  
    return Position;
  };
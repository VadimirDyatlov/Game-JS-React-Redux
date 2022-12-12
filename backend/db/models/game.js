const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
    }
  }
  Game.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    kill_counte: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    counter_gold: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    time_counter: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Game',
    tableName: 'Games',
  });
  return Game;
};

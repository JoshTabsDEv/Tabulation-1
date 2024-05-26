'use strict';
module.exports = (sequelize, DataTypes) => {
  const Judge = sequelize.define('Judge', {
    judge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    judge_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    judge_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'event_id'
      }
    }
  }, {});

  Judge.associate = function(models) {
    // Define the association to Event
    Judge.belongsTo(models.Event, { foreignKey: 'event_id' });
  };

  return Judge;
};
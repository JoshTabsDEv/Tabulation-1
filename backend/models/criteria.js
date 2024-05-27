'use strict';
module.exports = (sequelize, DataTypes) => {
  const Criteria = sequelize.define('Criteria', {
    criteria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    criteria_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    criteria_percentage: {
      type: DataTypes.INTEGER,
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
  }, {
    timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false,
  },{});

  Criteria.associate = function(models) {
    // Define the association to Event
    Criteria.belongsTo(models.Event, { foreignKey: 'event_id' });
  };

  return Criteria;
};
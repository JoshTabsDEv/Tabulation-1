'use strict';
module.exports = (sequelize, DataTypes) => {
    const Contestant = sequelize.define('Contestant', {
      contestant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      contestant_no: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      contestant_name: {
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
    },{
      timestamps: false,
  
    // If don't want createdAt
    createdAt: false,
  
    // If don't want updatedAt
    updatedAt: false,
    } ,{});
  
    Contestant.associate = function(models) {
      // associations can be defined here
      Contestant.belongsTo(models.Event, { foreignKey: 'event_id' });
    };
  
    return Contestant;
  };
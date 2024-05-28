'use strict';
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    contestant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    criteria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    judge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false, // Disable timestamps
    createdAt: false, // Disable createdAt
    updatedAt: false, // Disable updatedAt
  });

  Score.associate = function(models) {
    // Define the association to Judge
    Score.belongsTo(models.Judge, { foreignKey: 'judge_id' });

    // Define the association to Event
    Score.belongsTo(models.Event, { foreignKey: 'event_id' });

    // Define the association to Contestant
    Score.belongsTo(models.Contestant, { foreignKey: 'contestant_id' });

    // Define the association to Criterion
    Score.belongsTo(models.Criteria, { foreignKey: 'criteria_id' });
  };

  // Method to calculate average scores and rank contestants
  Score.calculateAverageScores = async function(eventId) {
    return await Score.findAll({
      attributes: [
        'contestant_id',
        [sequelize.fn('AVG', sequelize.col('score')), 'averageScore']
      ],
      where: { eventId },
      group: ['contestant_id'],
      order: [[sequelize.fn('AVG', sequelize.col('score')), 'DESC']],
      include: [{
        model: sequelize.models.Contestant,
        attributes: ['contestant_id', 'contestant_name']
      }]
    });
  };

  return Score;
};

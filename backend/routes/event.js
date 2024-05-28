const express = require('express');
const router = express.Router();
const { Contestant, Criteria, Judge, Score} = require('../models');

// Fetch contestants for a specific event
router.get('/:eventId/contestants', async (req, res) => {
  try {
    const { eventId } = req.params;
    const contestants = await Contestant.findAll({ where: { event_id: eventId } });
    res.json(contestants);
  } catch (error) {
    console.error('Error fetching contestants:', error);
    res.status(500).json({ message: 'Failed to fetch contestants' });
  }
});

router.get('/:eventId/judge', async (req, res) => {
  try {
    const { eventId } = req.params;
    const judge = await Judge.findAll({ where: { event_id: eventId } });
    res.json(judge);
    console.log(judge)
  } catch (error) {
    console.error('Error fetching contestants:', error);
    res.status(500).json({ message: 'Failed to fetch contestants' });
  }
});

// Fetch criteria for a specific event
router.get('/:eventId/criteria', async (req, res) => {
  try {
    const { eventId } = req.params;
    const criteria = await Criteria.findAll({ where: { event_id: eventId } });
    res.json(criteria);
  } catch (error) {
    console.error('Error fetching criteria:', error);
    res.status(500).json({ message: 'Failed to fetch criteria' });
  }
});

// Submit scores for contestants
router.post('/:eventId/:judgeID/scores', async (req, res) => {
  try {
    const { eventId, judgeID} = req.params;

    const { scores } = req.body;

    await Promise.all(scores.map(score => {
      return Score.create({
        event_id: eventId,
        contestant_id: score.contestant_id,
        criteria_id: score.criteria_id,
        judge_id: judgeID,
        score: score.score

      });
    }));

    res.json({ message: 'Scores submitted successfully' });
  } catch (error) {
    console.error('Error submitting scores:', error);
    res.status(500).json({ message: 'Failed to submit scores' });
  }
});
router.get('/:eventId/contestantRankings', async (req, res) => {
  const { eventId } = req.params;
  try {
    // Fetch all contestants from the database
    const contestants = await Contestant.findAll();

    // Array to store contestant rankings
    const contestantRankings = [];

    // Iterate over each contestant
    for (const contestant of contestants) {
      // Fetch all scores for the current contestant
      const scores = await Score.findAll({ where: {contestant_id: contestant.contestant_id} });

      // Calculate the average score for the contestant
      const totalScore = scores.reduce((sum, score) => sum + score.score, 0);

      // Calculate the average score for the contestant
      const averageScore = scores.length > 0 ? totalScore / scores.length : 0;

      // Push the contestant's average score and details to the contestantRankings array
      contestantRankings.push({
        contestantId: contestant.contestant_id,
        contestantName: contestant.contestant_name,
        averageScore: averageScore.toFixed(2) // Round to 2 decimal places
      });
    }

    // Sort contestantRankings array based on averageScore in descending order
    contestantRankings.sort((a, b) => b.averageScore - a.averageScore);

    // Assign rank to each contestant based on their position in the sorted array
    contestantRankings.forEach((ranking, index) => {
      ranking.rank = index + 1;
    });

    // Send the contestant rankings as a JSON response
    res.json(contestantRankings);
  } catch (error) {
    // If an error occurs, send a 500 status code with an error message
    console.error('Error computing contestant rankings:', error);
    res.status(500).json({ message: 'Failed to compute contestant rankings' });
  }
});

module.exports = router;

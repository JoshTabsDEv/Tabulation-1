const express = require('express');
const router = express.Router();
const { Judge , Contestant, Criteria } = require('../models');


router.post('/', async (req, res) => {

    const { judges, contestants , criterias } = req.body;
    console.log(criterias)
    try {
      // Use Sequelize to create records in the database
      const newJudge = await Judge.bulkCreate(judges);
      const newContestant = await Contestant.bulkCreate(contestants);
      const newCriteria = await Criteria.bulkCreate(criterias); 
      res.json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ message: 'Failed to save data' });
    }
  });

  router.get('/getJudges/:eventId', async (req, res) => {
    try {
      const { eventId } = req.params;
      const judges = await Judge.findAll({ where: { event_id: eventId } });
      res.json(judges);
    } catch (error) {
      console.error('Error fetching judges:', error);
      res.status(500).json({ message: 'Failed to fetch judges' });
    }
  });
  

module.exports = router;
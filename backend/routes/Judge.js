const express = require('express');
const router = express.Router();
const { Judge } = require('../models'); // Adjust the path as per your project structure

// Endpoint to save judges, contestants, and criteria
router.post('/', async (req, res) => {
    const event_id = req.params
    const { judges } = req.body;
    console.log(judges)
    try {
      // Use Sequelize to create records in the database
      const newJudge = await Judge.bulkCreate(judges);
      // Respond to the client indicating that the data was saved successfully
      res.json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ message: 'Failed to save data' });
    }
  });

module.exports = router;
// In your auth route file (e.g., routes/auth.js)
const express = require('express');
const router = express.Router();
const { Judge } = require('../models'); // Adjust the path to your models

// Login endpoint
router.post('/login', async (req, res) => {
  const { judge_name, judge_code } = req.body;

  try {
    // Check if the judge exists and the code matches
    const judge = await Judge.findOne({ where: { judge_name, judge_code } });

    if (judge) {
      return res.json({ success: true, eventId: judge.event_id, judgeID: judge.judge_id});
    } else {
      return res.json({ success: false, message: 'Invalid judge name or code' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
});

module.exports = router;

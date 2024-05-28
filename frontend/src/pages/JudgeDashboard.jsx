import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { Button, TextField, Grid, Typography, Card, CardContent } from "@mui/material";
import axios from "axios";

function JudgeDashboard() {
  const { eventId , judgeID} = useParams();
  const [contestants, setContestants] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [scores, setScores] = useState({});
  const [judges , setJudges] = useState({})
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchContestantsAndCriteria();
  }, []);

  const fetchContestantsAndCriteria = async () => {
    try {
      const contestantsResponse = await axios.get(`http://localhost:8001/event/${eventId}/contestants`);
      const criteriaResponse = await axios.get(`http://localhost:8001/event/${eventId}/criteria`);
      const judgeResponse = await axios.get(`http://localhost:8001/event/${eventId}/judge`);
      setContestants(contestantsResponse.data);
      setCriteria(criteriaResponse.data);
      setJudges(judgeResponse.data)
      console.log()
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleScoreChange = (contestantId, criterionId, value) => {
    setScores({
      ...scores,
      [`${contestantId}-${criterionId}`]: value
    });
  };

  const handleSubmitScores = async () => {
    try { 
      const formattedScores = Object.keys(scores).map(key => {
        const [contestant_id, criteria_id] = key.split("-");
        return {
          contestant_id,
          criteria_id,
          score: scores[key]
        };
      });

      await axios.post(`http://localhost:8001/event/${eventId}/${judgeID}/scores`, { scores: formattedScores });
      alert('Scores submitted successfully');
      navigate(`/done`);
    } catch (error) {
      console.error('Error submitting scores:', error);
      setError('Failed to submit scores');
    }

    
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Judge Dashboard
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {contestants.map(contestant => (
          <Grid item xs={12} md={10} key={contestant.contestant_id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {contestant.contestant_name}
                </Typography>
                {criteria.map(criterion => (
                  <Grid container spacing={2} alignItems="center" key={criterion.criteria_id}>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {criterion.criteria_name} ({criterion.criteria_percentage}%)
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        type="number"
                        variant="outlined"
                        label="Score"
                        fullWidth
                        value={scores[`${contestant.contestant_id}-${criterion.criteria_id}`] || ""}
                        onChange={(e) => handleScoreChange(contestant.contestant_id, criterion.criteria_id, e.target.value)}
                        style={{ padding: "8px" }} // Add padding here
                      />
                    </Grid>
                  </Grid>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleSubmitScores}>
          Submit Scores
        </Button>
      </div>
      {error && (
        <Typography variant="body2" color="error" align="center" marginTop="20px">
          {error}
        </Typography>
      )}
    </div>
  );
}

export default JudgeDashboard;

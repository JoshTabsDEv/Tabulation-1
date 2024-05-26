import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, InputAdornment, Grid, Typography, Card, CardContent, Container } from '@mui/material';
import { Event as EventIcon } from '@mui/icons-material';
import { Formik, Form } from "formik";
import axios from 'axios';

function InputForJudgeSet() {
  const [noOfJudges, setNoOfJudges] = useState('');
  const [noOfContestants, setNoOfContestants] = useState('');
  const [noOfCriteria, setNoOfCriteria] = useState('');
  const [openAddJudgeDialog, setOpenAddJudgeDialog] = useState(false);
  const [showTextFields, setShowTextFields] = useState(false);
  const [judges, setJudges] = useState([]);
  const [contestants, setContestants] = useState([]);
  const [criteria, setCriteria] = useState([]);

  const handleOpenAddJudgeDialog = () => {
    setOpenAddJudgeDialog(true);
  };

  const handleCloseAddJudgeDialog = () => {
    setOpenAddJudgeDialog(false);
  };

  const handleAddJudge = () => {
    if (!noOfJudges || !noOfContestants || !noOfCriteria) {
      alert('All fields are required');
      return;
    }
    setShowTextFields(true);
    handleCloseAddJudgeDialog();
  };

  const handleSubmit = async () => {
    // Initialize an array to store judge data
    const judgeData = [];

    // Loop through the judges array to extract data from each TextField component
    for (let i = 0; i < judges.length; i++) {
        // Extract judge name from the TextField component
        const judgeName = judges[i];
        
        // Judge number starts from 1 (index + 1)
        const judgeNo = i + 1;

        // Hardcoded event_id for demonstration, you can use dynamic event_id if available
        const eventId = "57";

        // Create an object with judge data and push it to the judgeData array
        judgeData.push({
            judge_no: judgeNo.toString(),
            judge_name: judgeName,
            event_id: eventId
        });
    }

    try {
        // Send the judgeData array to the backend API
        await axios.post('http://localhost:8001/setUp', { judges: judgeData });

        // Alert the user that the data was saved successfully
        alert('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
        alert('Failed to save data');
    }
};

  return (
    <Container>
      <Button style={{ marginTop: "10px" }} variant="outlined" onClick={handleOpenAddJudgeDialog}>Start Setting up</Button>
      <Formik
        initialValues={{ noOfJudges: '', noOfContestants: '', noOfCriteria: '' }}
        onSubmit={handleAddJudge}
      >
        {({ handleChange }) => (
          <Form>
            <Dialog open={openAddJudgeDialog} onClose={handleCloseAddJudgeDialog} maxWidth="sm" fullWidth>
              <DialogTitle style={{ textAlign: "center" }}>Judging Set-Up</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      label="No. of Judges"
                      variant="outlined"
                      fullWidth
                      name="noOfJudges"
                      value={noOfJudges}
                      onChange={(e) => {
                        handleChange(e);
                        setNoOfJudges(e.target.value);
                      }}
                      error={!noOfJudges}
                      helperText={!noOfJudges ? 'No. of Judges is required' : ''}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><EventIcon /></InputAdornment>,
                      }}
                      style={{ marginTop: "10px" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="No. of Contestants"
                      variant="outlined"
                      fullWidth
                      name="noOfContestants"
                      value={noOfContestants}
                      onChange={(e) => {
                        handleChange(e);
                        setNoOfContestants(e.target.value);
                      }}
                      error={!noOfContestants}
                      helperText={!noOfContestants ? 'No. of Contestants is required' : ''}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><EventIcon /></InputAdornment>,
                      }}
                      style={{ marginTop: "10px" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="No. of Criteria"
                      variant="outlined"
                      fullWidth
                      name="noOfCriteria"
                      value={noOfCriteria}
                      onChange={(e) => {
                        handleChange(e);
                        setNoOfCriteria(e.target.value);
                      }}
                      error={!noOfCriteria}
                      helperText={!noOfCriteria ? 'No. of Criteria is required' : ''}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><EventIcon /></InputAdornment>,
                      }}
                      style={{ marginTop: "10px" }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ justifyContent: "center" }}>
                <Button variant="contained" color="primary" type="submit" style={{ marginBottom: "30px" }} onClick={handleAddJudge}>
                  Proceed
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        )}
      </Formik>

      {showTextFields && (
        <Card style={{ marginTop: '20px', padding: '20px' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom style={{ marginTop: '20px', marginBottom: '10px' }}>Judges</Typography>
            <Grid container spacing={2}>
              {[...Array(Number(noOfJudges))].map((_, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <TextField
                    label={`Judge ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    name={`judge${index + 1}`}
                    onChange={(e) => {
                      const newJudges = [...judges];
                      newJudges[index] = e.target.value;
                      setJudges(newJudges);
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><EventIcon /></InputAdornment>,
                    }}
                    style={{ marginTop: "10px" }}
                  />
                </Grid>
              ))}
            </Grid>

            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: "20px" }}>
              Submit
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default InputForJudgeSet;
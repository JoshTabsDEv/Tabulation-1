import React, { useState } from 'react';
import { Dialog, Alert, DialogTitle, DialogContent, DialogActions, TextField, Button, InputAdornment, Grid, Typography, Card, CardContent, Container } from '@mui/material';
import { Event as EventIcon } from '@mui/icons-material';
import { Formik, Form } from "formik";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function InputForJudgeSet() {
  const { eventId } = useParams();
  const [noOfJudges, setNoOfJudges] = useState('');
  const [noOfContestants, setNoOfContestants] = useState('');
  const [noOfCriteria, setNoOfCriteria] = useState('');
  const [openAddJudgeDialog, setOpenAddJudgeDialog] = useState(false);
  const [showTextFields, setShowTextFields] = useState(false);
  const [judges, setJudges] = useState([]);
  const [contestants, setContestants] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [totalPercentageError, setTotalPercentageError] = useState(false);
  const navigate = useNavigate();

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

  const generateJudgeCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async () => {
    const totalPercentage = criteria.reduce((total, criteriaItem) => total + Number(criteriaItem.percentage), 0);

    if (totalPercentage !== 100) {
      setTotalPercentageError(true);
      return;
    }

    setTotalPercentageError(false);

    try {
      const judgeData = judges.map((judgeName, index) => ({
        judge_no: (index + 1).toString(),
        judge_name: judgeName,
        judge_code: generateJudgeCode(), // Generate a unique code for each judge
        event_id: eventId
      }));

      const contestantData = contestants.map((contestantName, index) => ({
        contestant_no: (index + 1).toString(),
        contestant_name: contestantName,
        event_id: eventId
      }));

      const criteriaData = criteria.map((criterion) => ({
        criteria_name: criterion.name,
        criteria_percentage: criterion.percentage,
        event_id: eventId
      }));

      await axios.post('http://localhost:8001/setUp', { judges: judgeData, contestants: contestantData, criterias: criteriaData });

      alert('Data saved successfully');
      navigate(`/GenerateJudgeCredentials/${eventId}`);
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
            <Card style={{ marginTop: '20px', padding: '20px' }}>
              <CardContent>
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
              </CardContent>
            </Card>
            <Card style={{ marginTop: '20px', padding: '20px' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom style={{ marginTop: '20px', marginBottom: '10px' }}>Contestants</Typography>
                <Grid container spacing={2}>
                  {[...Array(Number(noOfContestants))].map((_, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <TextField
                        label={`Contestant ${index + 1}`}
                        variant="outlined"
                        fullWidth
                        name={`contestant${index + 1}`}
                        onChange={(e) => {
                          const newContestants = [...contestants];
                          newContestants[index] = e.target.value;
                          setContestants(newContestants);
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start"><EventIcon /></InputAdornment>,
                        }}
                        style={{ marginTop: "10px" }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
            <Typography variant="h5" gutterBottom style={{ marginTop: '20px', marginBottom: '10px' }}>Criteria</Typography>
            <Card style={{ marginTop: '20px', padding: '20px' }}>
              <CardContent>
                <Grid container spacing={2}>
                  {[...Array(Number(noOfCriteria))].map((_, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <TextField
                        label={`Criteria ${index + 1}`}
                        variant="outlined"
                        fullWidth
                        name={`criteriaName${index + 1}`}
                        onChange={(e) => {
                          const newCriteria = [...criteria];
                          newCriteria[index] = { ...newCriteria[index], name: e.target.value };
                          setCriteria(newCriteria);
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start"><EventIcon /></InputAdornment>,
                        }}
                        style={{ marginTop: "10px" }}
                      />
                      <TextField
                        label={`Percentage`}
                        variant="outlined"
                        fullWidth
                        type="number"
                        name={`criteriaPercentage${index + 1}`}
                        onChange={(e) => {
                          const newCriteria = [...criteria];
                          newCriteria[index] = { ...newCriteria[index], percentage: e.target.value };
                          setCriteria(newCriteria);
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">%</InputAdornment>,
                        }}
                        style={{ marginTop: "10px" }}
                      />
                    </Grid>
                  ))}
                </Grid>
                {totalPercentageError && (
                  <Alert variant="filled" severity="error" sx={{ marginTop: "10px" }}>
                    Total percentage should be 100
                  </Alert>
                )}
              </CardContent>
            </Card>
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

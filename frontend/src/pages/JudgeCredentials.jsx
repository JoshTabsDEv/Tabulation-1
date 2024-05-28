import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';

function JudgeCredentials() {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [judges, setJudges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJudges = async () => {
        try {
            const response = await axios.get(`http://localhost:8001/setUp/getJudges/${eventId}`);
            setJudges(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching judges:', error);
            setLoading(false);
        }
        };

        fetchJudges();
    }, [eventId]);

    const handleButtonClick = () => {
        // Handle button click event
        navigate(`/${eventId}`);
    };

    return (
        <div style={{ textAlign: 'center' }}>
        <Navbar name="Judge Credentials" />
        <Container style={{ marginTop: '20px' }}>
            {loading ? (
            <CircularProgress />
            ) : (
            <Grid container spacing={3}>
                {judges.map((judge, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                    <CardContent>
                        <Typography variant="h6" component="div" gutterBottom>
                        Judge Name: {judge.judge_name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                        Username: {judge.judge_name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                        Password: {judge.judge_code}
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
            )}
        </Container>
        <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
            style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            }}
        >
            Start Event
        </Button>
        </div>
    );
}

export default JudgeCredentials;

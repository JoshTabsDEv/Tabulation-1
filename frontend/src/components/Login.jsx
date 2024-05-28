import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Dialog, Card, CardContent, CardActions, Typography, TextField } from "@mui/material";
import axios from 'axios';
import background from "../assets/background.jpg"; // Adjust the path to your background image

function Login() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [judgeName, setJudgeName] = useState("");
  const [judgeCode, setJudgeCode] = useState("");
  const [error, setError] = useState("");
  const [eventActive, setEventActive] = useState(false);
  const navigate = useNavigate();
  const {eventId} = useParams();

  useEffect(() => {
    setOpen(true); // Open the dialog when the component mounts
    checkEventStatus();
  }, []);

  const checkEventStatus = async () => {
   if(eventId >0 ){
    setEventActive(true)
   }
  };

  const handleLogin = async () => {
    try {
      let response;
      if (eventActive) {
        response = await axios.post('http://localhost:8001/auth/login', {
          judge_name: judgeName,
          judge_code: judgeCode
        });
      } else {
        navigate("/dashboard")
      }

      if (response.data.success) {
        const { eventId, judgeID} = response.data; // Assuming the response contains judgeId
        navigate(eventActive ? `/judge/${eventId}/${judgeID}` : '/dashboard');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Dialog open={open} aria-labelledby="login-dialog-title">
        <Card sx={{ maxWidth: 400, padding: 2 }}>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: "center", marginBottom: 2 }}>
              Tabulation System
            </Typography>
            {eventActive ? (
              <>
                <TextField
                  label="Judge Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  value={judgeName}
                  onChange={(e) => setJudgeName(e.target.value)}
                />
                <TextField
                  label="Judge Code"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  value={judgeCode}
                  onChange={(e) => setJudgeCode(e.target.value)}
                />
              </>
            ) : (
              <>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )}
            {error && (
              <Typography variant="body2" color="error" sx={{ textAlign: "center", marginTop: 1 }}>
                {error}
              </Typography>
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button variant="contained" onClick={handleLogin} color="primary" fullWidth>
              Login
            </Button>
          </CardActions>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
              Copyright © JoshTabsDev 2024.
            </Typography>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
}

export default Login;

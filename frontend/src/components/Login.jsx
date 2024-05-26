import React, { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import { Button, Dialog, Card, CardContent, CardActions, Typography, TextField, Checkbox } from "@mui/material";
import background from "../assets/background.jpg"; // Adjust the path to your background image

function Login() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate ();

  useEffect(() => {
    setOpen(true); // Open the dialog when the component mounts
  }, []);
  const handleLogin = () => {
   
      
      history("/dashboard");
    
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
      <Dialog open={open}  aria-labelledby="login-dialog-title">
        <Card sx={{ maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: "center", marginBottom: 2 }}>
              Tabulation System
            </Typography>
            <TextField
              label="Phone number, username, or email"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
            />
          
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button variant="contained" onClick= {handleLogin} color="primary" fullWidth>
              Login
            </Button>
          </CardActions>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
            Copyright © JoshTabsDEv 2024.
            </Typography>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
}

export default Login;

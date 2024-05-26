// Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = (props) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1}}>
                    {props.name}
                </Typography>
            
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;

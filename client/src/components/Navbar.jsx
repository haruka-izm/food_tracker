import React, { Component } from 'react';
// without `withRouter`, can't logout
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ListItem from "@material-ui/core/ListItem";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from "@material-ui/core/styles";
import style from '../styles/styleNavbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Navbar = props => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { classes } = props;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        props.history.push('/login');
    };

    return (

        <Grid container>
            <Grid item xs></Grid>
            <Grid item xs={6}>
                <Typography className={classes.title}>Food Tracker</Typography>
            </Grid>
            <Grid item xs>
                <div  >
                    <ListItem className={classes.myProfile}>
                        <Avatar />
                        <Button
                            onClick={handleClick}>My Profile
                        </Button>
                    </ListItem>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Grid>
        </Grid>



    )
}


export default withRouter(withStyles(style)(Navbar));
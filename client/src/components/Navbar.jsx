import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { requestOptions, urlOptions } from '../constants';

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
    const householdId = props.householdId;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        setAnchorEl(null);
        const res = await fetch(urlOptions.LOGOUT, requestOptions.GET);
        if (res.status === 204) {
            props.dispatch(actions.logOut());
        } else {
            console.log('Failed to logout')
        };

    };

    const handleMyAcccount = () => {
        props.history.push("/myAccount");
    };

    const handleDashboard = () => {
        props.history.push("/dashboard");
    };

    const handleChat = () => {
        props.history.push(`/chat/${householdId}`)
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
                        <MenuItem onClick={handleMyAcccount}>My account</MenuItem>
                        <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
                        <MenuItem onClick={handleChat}>Chat</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Grid>
        </Grid>
    )
}


export default connect(state => {
    return {
        householdId: state.householdId
    }
})(withRouter(withStyles(style)(Navbar)));
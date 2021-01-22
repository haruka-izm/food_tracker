import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ListItem from "@material-ui/core/ListItem";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Navbar = props => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        console.log("selected clicked")
        setAnchorEl(null);
    };

    const handleLogout = () => {
        console.log("logout clicked")
        setAnchorEl(null);
        // props.history.push('/login');
    };

    return (
        <div>
            <ListItem>
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
    )
}


export default Navbar;
import React from 'react';
import Login from './Login';
import { withStyles } from "@material-ui/core/styles";
import style from '../styles/styleHome';

const Home = (props) => {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                Food Tracker
            </div>

            <div className={classes.form}>
                <Login />
            </div>
        </div>
    );
};

export default withStyles(style)(Home);
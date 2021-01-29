import React from 'react';
import Login from './Login';
import { withStyles } from "@material-ui/core/styles";
import style from '../styles/styleHome';
import Typography from '@material-ui/core/Typography';

const Home = (props) => {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <Typography variant='h1' className={classes.title}>
                Food Tracker
            </Typography>

            <div className={classes.form}>
                <Login />
            </div>
        </div>
    );
};

export default withStyles(style)(Home);
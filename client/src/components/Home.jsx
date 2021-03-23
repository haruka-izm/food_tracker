import React from 'react';
import Login from './Login';
import { withStyles } from "@material-ui/core/styles";
import style from '../styles/styleHome';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Home = (props) => {
    const { classes } = props;
    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            direction="row"
            className={classes.container}>
            <Grid item>
                <Typography variant='h1' className={classes.title}>
                    Food Tracker
            </Typography>
            </Grid>
            <Grid item>
                <Login />
            </Grid>
        </Grid>
    );
};

export default withStyles(style)(Home);
import React, { useState } from 'react';
import axios from "axios";
import { requestOptions, urlOptions } from "../../constants";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import style from '../../styles/styleMyAccount';

const HouseholdId = (props) => {
    const { classes } = props;

    return (


        <Card>
            <CardContent >
                <Typography>
                    Household Id
                </Typography>
            </CardContent>
            <CardActions >
                <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>Off</Grid>
                        <Grid item>
                            <Switch ></Switch>
                        </Grid>
                        <Grid item>On</Grid>
                    </Grid>
                </Typography>
            </CardActions>
        </Card>
    )
};

export default withStyles(style)(HouseholdId);
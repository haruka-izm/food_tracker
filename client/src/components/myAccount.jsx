import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Navbar from './Navbar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import style from '../styles/styleMyAccount';

const MyAccount = (props) => {
    const { classes } = props;
    const [notification, setNotification] = useState(false);

    const handleNotification = (event) => {
        setNotification(event.target.checked);
    };

    return (
        <div>
            <div id="navbar">
                <Navbar />
            </div>
            <div id="content">
                <Card>

                    <CardContent className={classes.title}>
                        <Typography>
                            Email notification
                        </Typography>
                    </CardContent>



                    <CardActions className={classes.switch}>
                        <Typography component="div">
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>Off</Grid>
                                <Grid item>
                                    <Switch checked={notification} onChange={handleNotification}></Switch>
                                </Grid>
                                <Grid item>On</Grid>
                            </Grid>
                        </Typography>
                    </CardActions>
                </Card>
            </div>
        </div>
    )

};

export default withStyles(style)(withRouter(MyAccount));
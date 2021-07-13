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

const EmailNotification = (props) => {
    const { classes } = props;
    // to do: when a page is loaded, fetch preferences and apply to UI
    // [] == fetchUIdata()?
    const [notification, setNotification] = useState(false);

    const handleNotification = async (event) => {
        setNotification(event.target.checked);

        const val = event.target.checked;
        const putBody = { email_notification: val.toString() }

        const res = await axios.put(urlOptions.PREFERENCES, putBody, requestOptions.PUT);
        if (res.status === 200) {
            // todo: update UI

        } else {
            // todo: update UI

        };


    };

    return (

        <Card>
            <CardContent >
                <Typography>
                    Email notification
                </Typography>
            </CardContent>
            <CardActions >
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
    )
};

export default withStyles(style)(EmailNotification);
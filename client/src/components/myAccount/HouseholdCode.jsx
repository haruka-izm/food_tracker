import React, { useEffect, useState } from 'react';
import { requestOptions, urlOptions } from "../../constants";

import Card from '@material-ui/core/Card';
import Tooltip from "@material-ui/core/Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from 'react-redux';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import style from '../../styles/styleMyAccount';

const HouseholdCode = (props) => {
    const { classes } = props;
    const householdId = props.householdId;
    console.log("FE id: ", householdId)

    const [copied, setCopied] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [code, setCode] = useState('');

    const handleCopy = () => {
        setCopied(true);
    };

    const getHouseholdCode = async () => {
        const postBody = { body: JSON.stringify({ householdId: householdId }) };
        const res = await fetch(urlOptions.PREFERENCES, { ...postBody, ...requestOptions.POST });
        if (res.status === 200) {
            const json = await res.json();
            const code = json.data.householdCode;

            setCode(code);
            setIsLoaded(true);

        } else {
            console.log("failed to fetch data")
        };

    };

    useEffect(() => {
        if (!isLoaded && householdId != "") {
            getHouseholdCode();
        }
    }, [householdId])

    return (

        <Card>
            <CardContent >
                <Typography>
                    Household Code
                </Typography>

            </CardContent>
            <CardActions >
                <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <CopyToClipboard
                            text={code}  // to be copied
                            onCopy={handleCopy}>

                            <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
                                <div>{code}</div>
                            </Tooltip>

                        </CopyToClipboard>
                    </Grid>
                </Typography>
            </CardActions>
        </Card>


    )
};

export default withStyles(style)(connect(state => {
    console.log("state: ", state.householdId)
    return {
        householdId: state.householdId
    }
})(HouseholdCode));
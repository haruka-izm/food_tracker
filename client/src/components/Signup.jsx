import React, { useState } from 'react';
import { TextField, Button, FormControl, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import style from '../styles/styleSignup';
import * as actions from '../actions/actions';
import { requestOptions, urlOptions } from '../constants';


const Signup = props => {
    const email = useFormInput('');
    const password = useFormInput('');
    const username = useFormInput('');
    const confirmedPassword = useFormInput('');
    const [error, setError] = useState(null);
    //const [loading, setLoading] = useState(false);
    const [householdCode, setHouseholdCode] = useState('false');
    const { classes } = props;


    const handleSignup = async (event) => {
        event.preventDefault();
        if (password.value != confirmedPassword.value) {
            setError("Passwords don't match.");
        } else {
            const postBody = {
                body: JSON.stringify({
                    email: email.value,
                    username: username.value,
                    password: password.value

                })
            };
            const res = await fetch(urlOptions.SIGNUP, { ...requestOptions.POST, ...postBody });
            if (res.status === 201) {
                //props.dispatch(actions.isValidUser());
                props.history.push('/dashboard');

            } else {
                //props.dispatch(actions.isNotValidUser());
                const json = await res.json();
                setError(json.message);
            };
        };
    };

    const handleSelectChange = (e) => {
        setHouseholdCode(e.target.value);
    };

    return (
        <Paper className={classes.container}>
            <div >
                <div>
                    <FormControl >
                        <TextField type="text" {...email} required placeholder="email" variant="outlined" className={classes.emailAndPassword}></TextField>
                        <TextField type="text" {...username} required placeholder="user name" variant="outlined" className={classes.emailAndPassword}></TextField>
                        <TextField type='password' {...password} required placeholder="password" variant="outlined" className={classes.emailAndPassword}></TextField>
                        <TextField type='password' {...confirmedPassword} required placeholder="re-enter password" variant="outlined" className={classes.emailAndPassword}></TextField>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.selectYesOrNo}>
                        <InputLabel id="select-household-code">Do you have a household code?</InputLabel>
                        <Select
                            value={householdCode}
                            onChange={handleSelectChange}

                        >
                            <MenuItem value='true'>Yes</MenuItem>
                            <MenuItem value='false'>No</MenuItem>
                        </Select>
                        {householdCode == "true"
                            ? <TextField type='text' placeholder="household code" variant="outlined" className={classes.householdCode}></TextField>
                            : ""}

                    </FormControl>



                    <Typography className={classes.warning}>
                        {error}
                    </Typography>

                </div>
                <div >
                    <Button type='submit' onClick={handleSignup} variant="contained" color="secondary" className={classes.signup}>Sign up</Button>
                </div>
            </div>
        </Paper>
    );
};

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    };

    return {
        value,
        onChange: handleChange
    };
};


export default withStyles(style)(connect()(Signup));
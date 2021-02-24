import React, { useState } from 'react';
import { TextField, Button, FormControl, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import style from '../styles/styleSignup';
import * as actions from '../actions/actions';

const SIGNUP_URL = 'http://localhost:8080/api/signup';

const SignUp = props => {
    const email = useFormInput('');
    const password = useFormInput('');
    const confirmedPassword = useFormInput('');
    const [error, setError] = useState(null);
    //const [loading, setLoading] = useState(false);
    const { classes } = props;


    const handleSignup = async (event) => {
        event.preventDefault();
        if (password.value != confirmedPassword.value) {
            setError("Passwords don't match.");
        } else {
            const reqOptions = {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "http://localhost:3000" },
                body: JSON.stringify({ email: email.value, password: password.value })
            };

            const res = await fetch(SIGNUP_URL, reqOptions);
            if (res.status === 201) {
                props.dispatch(actions.isValidUser());
                props.history.push('/dashboard');

            } else {
                props.dispatch(actions.isNotValidUser());
                const json = await res.json();
                setError(json.message);
            };
        };
    };

    return (
        <Paper className={classes.container}>
            <div >
                <div>
                    <FormControl >
                        <TextField type="text" {...email} required placeholder="Email" variant="outlined" className={classes.emailAndPassword}></TextField>
                        <TextField type='password' {...password} required placeholder="password" variant="outlined" className={classes.emailAndPassword}></TextField>
                        <TextField type='password' {...confirmedPassword} required placeholder="re-enter password" variant="outlined" className={classes.emailAndPassword}></TextField>
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


export default withStyles(style)(connect()(SignUp));
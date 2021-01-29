import React, { useState } from 'react';
import { TextField, Button, FormControl } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import style from '../styles/styleSignup';

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
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" },
                body: JSON.stringify({ email: email.value, password: password.value })
            };

            const res = await fetch(SIGNUP_URL, reqOptions);
            if (res.status === 201) {
                props.history.push('/dashboard');
                //return res.json();
            }

            if (res.status === 400) {
                const json = await res.json();
                setError(json.message);
            } else {
                console.error('API error /api/login ', res);
            }
        }
    }

    return (
        <Paper className={classes.container}>
            <div >
                <div>
                    {/**
                 * <form >
                 * 
                 */}

                    <FormControl >
                        <TextField type="text" {...email} required placeholder="Email" variant="outlined" className={classes.emailAndPassword}></TextField>
                        <TextField type='password' {...password} required placeholder="password" variant="outlined" className={classes.emailAndPassword}></TextField>
                        <TextField type='password' {...confirmedPassword} required placeholder="re-enter password" variant="outlined" className={classes.emailAndPassword}></TextField>
                    </FormControl>

                    {/**
                     *  </form>
                     */}

                    {error}
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


export default withStyles(style)(SignUp);
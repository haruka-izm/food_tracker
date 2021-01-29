import React, { useState } from 'react';
// import axios from 'axios';
import { TextField, Button, FormControl, makeStyles } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
//import { makeStyles } from '@material-ui/core/styles';
//import { setUserSession } from '../utils/Common';
import { withStyles } from "@material-ui/core/styles";
import style from '../styles/styleLogin';


const LOGIN_URL = 'http://localhost:8080/api/login';

const Login = props => {
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const { classes } = props;

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(null);

        // fetch vs axios
        // fetch: 2 steps to handle JSON data
        //       1)make a http req, 2) call .json on the req

        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" },
            body: JSON.stringify({ email: email.value, password: password.value })
        };

        const res = await fetch(LOGIN_URL, reqOptions);
        if (res.status === 200) {
            props.history.push('/dashboard');
            //return res.json();
        }

        if (res.status === 400) {
            console.log('400 called')
            const json = await res.json();
            // setError(json.message);
            //setError(error.res.data.message)
        } else {
            console.error('API error /api/login ', res);
            //setError("Something went wrong. Please try again later.")
        }

    }

    const handleCreateNewAccount = () => {
        props.history.push('/signup');
    }

    return (
        <Paper>
            <div className={classes.container}>
                <div>
                    <form >
                        <FormControl>
                            {/*
                    
                    {...email} : not React syntax, JS syntax
                               : passing key/value pair to a component

                    */}
                            <div >
                                <TextField type="text" {...email} required placeholder="Email" variant='outlined' className={classes.emailAndPassword} ></TextField>
                            </div>
                            <div>
                                <TextField type='password' {...password} required placeholder='Password' variant='outlined' className={classes.emailAndPassword}></TextField>
                            </div>
                        </FormControl>
                    </form>
                    {error}
                </div>
                <div className={classes.login}>
                    <Button type='submit' onClick={handleLogin} variant='contained' color="primary" >Log In</Button>
                </div>
                <div className={classes.borderLine}>

                </div>
                <div className={classes.createNewAccount}>
                    <Button onClick={handleCreateNewAccount} variant='contained' color="secondary">Create New Account</Button>
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



export default withStyles(style)(Login);
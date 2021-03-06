import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { TextField, Button, FormControl, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import style from '../styles/styleLogin';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { requestOptions, urlOptions } from '../constants';


const Login = props => {
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const { classes } = props;

    const handleLogin = async (event) => {
        event.preventDefault();
        props.dispatch(actions.isAuthenticating())

        setError(null);

        // fetch vs axios
        // fetch: 2 steps to handle JSON data
        //       1)make a http req, 2) call .json on the req

        const postBody = { body: JSON.stringify({ email: email.value, password: password.value }) }

        const res = await fetch(urlOptions.LOGIN, { ...requestOptions.POST, ...postBody });
        if (res.status === 200) {
            props.history.push('/dashboard');

        } else {
            const json = await res.json();
            setError(json.message);
        }

    }

    const handleCreateNewAccount = () => {
        props.history.push('/signup');
    };

    return (
        <Paper className={classes.paper}>
            <div className={classes.container}>
                <div>

                    <FormControl>
                        <div >
                            <TextField type="text" {...email} required placeholder="Email" variant='outlined' className={classes.emailAndPassword} ></TextField>
                        </div>
                        <div>
                            <TextField type='password' {...password} required placeholder='Password' variant='outlined' className={classes.emailAndPassword}></TextField>
                        </div>
                    </FormControl>

                    <Typography className={classes.warning}>
                        {error}
                    </Typography>

                </div>
                <div >
                    <Button type='submit' onClick={handleLogin} variant='contained' color="primary" className={classes.login}>Log In</Button>
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



export default withRouter(connect()(withStyles(style)(Login)));
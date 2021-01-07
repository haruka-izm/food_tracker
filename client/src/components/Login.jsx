import React, { useState } from 'react';
// import axios from 'axios';
import { TextField, Button, FormControl, makeStyles } from "@material-ui/core";
//import { makeStyles } from '@material-ui/core/styles';
//import { setUserSession } from '../utils/Common';


const Login = props => {
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);

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

        const res = await fetch('http://localhost:8080/api/login', reqOptions);
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
        <div style={{ maxWidth: '300px', border: 'red solid 1px' }}>
            <div >
                <form>
                    <FormControl>
                        {/*
                    
                    {...email} : not React syntax, JS syntax
                               : passing key/value pair to a component

                    */}
                        <TextField type="text" {...email} required placeholder="Email" variant='outlined' ></TextField>

                        <TextField type='password' {...password} required placeholder='Password' variant='outlined' ></TextField>
                    </FormControl>
                </form>
                {error}
            </div>
            <div>
                <Button type='submit' onClick={handleLogin} variant='outlined' color="primary">Log In</Button>
            </div>
            <div style={{ borderBottom: '1px solid #dadde1', alignItems: 'center' }}>

            </div>
            <div>
                <Button onClick={handleCreateNewAccount} variant='outlined'>Create New Account</Button>
            </div>
        </div>
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

const useStyles = makeStyles({

})




export default Login;
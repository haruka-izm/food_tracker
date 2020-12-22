import React, { useState } from 'react';
import { TextField, FormLabel, Button, FormControl } from "@material-ui/core";

const Login = props => {
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    //const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" },
            body: JSON.stringify({ email: email.value, password: password.value })
        };

        const res = await fetch('http://localhost:8080/api/login', reqOptions);
        if (res.status === 200) {
            props.history.push('/api/dashboard');
            //return res.json();
        }

        if (res.status === 400) {
            const json = await res.json();
            setError(json.message);
        } else {
            console.error('API error /api/login ', res);
        }

        /*
    }).then(data => {
        console.log(`data is ${data}`)
        //this.props.login(data.user);
    })
        .catch(error => {
            console.log(error.message)
        })

        */
    }

    return (
        <div>
            <form>
                <FormControl>
                    <FormLabel htmlFor='email'>Email: required</FormLabel>
                    <TextField {...email} required></TextField>
                    <br />
                    <FormLabel htmlFor='password'>Password: required</FormLabel>
                    <TextField {...password} required></TextField>
                </FormControl>
            </form>
            {error}
            <div><Button type='submit' onClick={handleLogin}>Log in</Button></div>
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

export default Login;
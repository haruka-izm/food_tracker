import React, { useState } from 'react';
import { TextField, FormLabel, Button, FormControl } from "@material-ui/core";


const SignUp = props => {
    const email = useFormInput('');
    const password = useFormInput('');
    const confirmedPassword = useFormInput('');
    const [error, setError] = useState(null);
    //const [loading, setLoading] = useState(false);



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

            const res = await fetch('http://localhost:8080/api/signup', reqOptions);
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
        <div>
            <div>
                <form >
                    <FormControl>
                        <TextField type="text" {...email} required placeholder="Email" variant="outlined"></TextField>
                        <TextField type='password' {...password} required placeholder="password" variant="outlined"></TextField>
                        <TextField type='password' {...confirmedPassword} required placeholder="re-enter password" variant="outlined"></TextField>
                    </FormControl>
                </form>
                {error}
            </div>
            <div>
                <Button type='submit' onClick={handleSignup} variant="outlined">Sign up</Button>
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


export default SignUp;
import { Typography, Box, TextField, Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from "../store/action/index.js";


const Register = () => {

    const userReducer = useSelector((state) => {
        return state.userReducer;
    })


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({

        username: "",
        password: ""
    })
    const submitHandle = (e) => {
        e.preventDefault();
        const sendRequest = () => {
            axios.post("https://travelling-app-lemon.vercel.app/api/v1/login", {
                username: inputs.username,
                password: inputs.password
            })
                .then((response) => {
                    console.log(response)
                    if (response?.data?.token && response?.data?.user) {
                        localStorage.setItem('accessToken', JSON.stringify(response.data.token));
                        localStorage.setItem('userDetails', JSON.stringify(response.data.user))
                        dispatch(logIn({ userDetails: response.data.user, accessToken: response.data.token }));
                    }
                    else {
                        alert('unable to login at the moment');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    if (err?.response?.data?.result?.message) {
                        alert(err.response.data.result.message);
                    }
                    else {
                        alert('unable to login at the moment')
                    }
                })
        }

        sendRequest();
    }


    const changeHandle = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    // console.log(inputs)
    return (
        <>
    {
        userReducer.isLoggedIn && <Navigate to="/" />
    }
            <div id='login'>
                <form onSubmit={submitHandle}>
                    <Box border={1} borderRadius={3} borderColor='#ccc' width={'50%'}
                        padding={3} display='flex' flexDirection={'column'} margin='auto'
                        justifyContent={'center'} alignItems='center' marginTop={5} maxWidth={400}>

                        <Typography padding={2} textAlign="center" variant="h2">Login</Typography>
                        <TextField onChange={changeHandle} value={inputs.username} type={'username'} name='username' placeholder="Username" margin="normal" />
                        <TextField onChange={changeHandle} value={inputs.password} type={'password'} name='password' placeholder="Password" margin="normal" />
                        <Button type='submit' variant="contained" sx={{ borderRadius: 1, marginTop: 2 }}>Submit</Button>
                        <Link className='link' to='/register'><Button>Register</Button></Link>
                    </Box>
                </form>
            </div>
        </>
    )
}


export default Register;
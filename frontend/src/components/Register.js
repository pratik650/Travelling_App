import { Typography, Box, TextField, Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Register = () => {
    // const [isSignUp , setIsSignUp] = useState(false);
    const userReducer = useSelector((state) =>{
        return state.userReducer;
    })
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        password: ""
    })
    const submitHandle = (e) => {
        e.preventDefault();

        const sendRequest = () => {
            axios.post("https://travelling-app-lemon.vercel.app/api/v1/register",
                {
                    name: inputs.name,
                    username: inputs.username,
                    password: inputs.password
                })
                .then((response) => {
                    console.log(response);

                        alert("Register successfully now you can Login")
                        navigate("/login");
                    
                    // setInputs({ username: "", email: "", name: "", password: "" })
                })
                .catch((err) => {
                    console.log(err)
                    if(err?.response?.data?.result?.message){
                        alert(err.response.data.result.message)
                    }
                    else{
                        alert("unable to login try after some time.");
                    }
                })
        }

        sendRequest();
    }


    const changeHandle = (e) => {
        setInputs((prev) => ({
          ...prev,
          [e.target.name] : e.target.value
        }))
      }
    // console.log(inputs)
    return (

        <>
        {
            userReducer.isLoggedIn && <Navigate to={'/'}/>
        }            
            <div id='register'>
            <form onSubmit={submitHandle}>
                <Box border={1} borderRadius={3} borderColor='#ccc' width={'50%'}
                    padding={3} display='flex' flexDirection={'column'} margin='auto'
                    justifyContent={'center'} alignItems='center' marginTop={5} maxWidth={400}>

                    <Typography padding={2} textAlign="center" variant="h2">Register</Typography>
                   
                        <TextField onChange={changeHandle} value={inputs.name} name='name' placeholder="Name" margin="normal" />
                    <TextField onChange={changeHandle} value={inputs.username} type={'username'} name='username' placeholder="Username" margin="normal" />
                    <TextField onChange={changeHandle} value={inputs.password} type={'password'} name='password' placeholder="Password" margin="normal" />
                    <Button type='submit' variant="contained" sx={{ borderRadius: 1, marginTop: 2 }}>Submit</Button>
                    <Link className="link" to="/login"><Button>Login</Button></Link>
                </Box>
            </form>
        </div>
        </>
    )
}


export default Register;
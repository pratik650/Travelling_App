import { InputLabel, TextField, Typography, Box, Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate,useNavigate } from 'react-router-dom';


const AddPost = () => {
  const userReducer = useSelector((state) => {
    return state.userReducer;
  })
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: ""
  })
  const changeHandle = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  const submitHandle = (e) => {
    e.preventDefault();

    const sendRequest = () => {
      const headers = {
        Authorization: userReducer.accessToken
      }
      axios.post("https://travelling-app-lemon.vercel.app/api/v1/post/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL
      }, { headers }
      )
        .then((response) => {
          console.log(response);
          alert("Post add successfully now you can refresh")
          navigate('/')
        })
        .catch((err) => {

          if (err?.response?.data?.result?.message) {
            alert(err.response.data.result.message)
          }
          else {
            alert("unable to add post try after some time.");
          }
        })

    };
    sendRequest()

  }

  return (
    <div>
      {userReducer.isLoggedIn?
      (<form onSubmit={submitHandle}>
        <Box border={2} borderRadius={3} borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
         width={'50%'} boxShadow="10px 10px 20px #ccc"
          padding={3} margin={'auto'} marginTop={3} display='flex' flexDirection={'column'}>
          <Typography fontWeight={'bold'} padding={3} color={'grey'} variant='h2' textAlign={'center'}  >Post</Typography>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' }}>Title</InputLabel>
          <TextField name='title' value={inputs.title} onChange={changeHandle} margin="auto" variant="outlined" />

          <InputLabel sx={{ mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' }}>Description</InputLabel>
          <TextField name='description' value={inputs.description} onChange={changeHandle} margin="auto" variant="outlined" />

          <InputLabel sx={{ mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' }}>imageURL</InputLabel>
          <TextField name='imageURL' value={inputs.imageURL} onChange={changeHandle} margin="auto" variant="outlined" />
          <Button sx={{ marginTop: 2, borderRadius: 2 }} variant='contained' type='submit'>Submit</Button>
        </Box>
      </form>) : <Navigate to={"/"}/>}
    </div>
  )
}

export default AddPost;
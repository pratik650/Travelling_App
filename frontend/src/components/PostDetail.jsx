import { useEffect, useState} from 'react';
import { InputLabel, TextField, Typography, Box, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useParams,useNavigate } from 'react-router-dom';


const AddPost = () => {
  const navigate = useNavigate();
  const [loader,setLoader] = useState(true);
  const userReducer = useSelector((state) => {
    return state.userReducer;
  })
  const postId = useParams().id;
  const [inputs, setInputs] = useState({
    title: "",
    description: ""
  })
  const changeHandle = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  useEffect(() => {
    axios.get(`https://travelling-app-lemon.vercel.app/api/v1/post/${postId}`)
    .then((response)=> {
      // console.log(response)
      if(response?.data?.requiredPost){
        setInputs(()=>{
          return{
            title:response.data.requiredPost.title,
            description:response.data.requiredPost.description
          }
        })
        setLoader(false);
      }
      else{
        alert('WE are unable to edit the post the moment');
        navigate('/');
      }
    })
    .catch((err)=>{
      alert('WE are unable to edit the post the moment');
        navigate('/');
    })
  }, [])
  const submitHandle = (e) => {
    e.preventDefault();

    const sendRequest = () => {
      const headers = {
        Authorization: userReducer.accessToken
      }
      axios.put(`https://travelling-app-lemon.vercel.app/api/v1/post/update/${postId}`, {
        title: inputs.title,
        description: inputs.description
      }, { headers }
      )
        .then((response) => {
          console.log(response);
          alert("Post edit successfully now you can refresh")
          navigate('/mypost')
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
    <>
      {
        loader? <div  style={{display:"flex", justifyContent:"center", marginTop:"5rem"}}><CircularProgress/></div>:<div>
      {userReducer.isLoggedIn ?
        (<form onSubmit={submitHandle}>
          <Box border={2} borderRadius={3} borderColor='##273239' width={'50%'}
            padding={3} margin={'auto'} marginTop={3} display='flex' flexDirection={'column'}>
            <Typography fontWeight={'bold'} padding={3} color={'grey'} variant='h2' textAlign={'center'}>Edit Post</Typography>
            <InputLabel sx={{ mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' }}>Title</InputLabel>
            <TextField name='title' value={inputs.title} onChange={changeHandle} margin="auto" variant="outlined" />

            <InputLabel sx={{ mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' }}>Description</InputLabel>
            <TextField name='description' value={inputs.description} onChange={changeHandle} margin="auto" variant="outlined" />
            <Button sx={{ marginTop: 2, borderRadius: 2 }} variant='contained' type='submit'>Submit</Button>
          </Box>
        </form>) : <Navigate to={"/"}/>}
    </div>
      }
    </>
  )
}

export default AddPost;
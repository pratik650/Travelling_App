import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import CardPost from './CardPost';
import { useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@mui/material';

const Posts = () => {
  const userReducer = useSelector((state)=>{
    return state.userReducer
  })
  const [posts , setPosts] = useState([]);
  useEffect(() => {
    axios.get('https://travelling-app-lemon.vercel.app/api/v1/post')
    .then((response)=>{
      if(response?.data?.posts){
        setPosts([
          ...response.data.posts
        ])
      }
    })
    .catch((err)=>{
      console.log(err);
        alert('Some error occured')
    })
  },[])
  return (
    <div>
      {
        posts && posts.length > 0 ? posts.map((post, index)=>{
          return <CardPost 
            key={index}
            title={post.title}
            description={post.description}
            imageURL={post.image}
            userName={post.userId.name}
            isUser={String(post.userId._id) === String(userReducer?.details?._id) || false}
            id={post._id}
          />

        }):<div style={{display:"flex",  marginTop:"5rem", flexDirection:"column", alignItems:"center"}}><CircularProgress /><Typography mt={1}>Loading...</Typography></div>
      }
    </div>
  )
}

export default Posts;
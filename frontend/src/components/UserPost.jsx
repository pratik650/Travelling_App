import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CardPost from './CardPost';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserPost = () => {
  const [post, setPost] = useState([]);
  const userReducer = useSelector((state) => {
    return state.userReducer;
  })
  useEffect(()=>{
    if(userReducer.isLoggedIn){
      axios.get(`https://travelling-app-lemon.vercel.app/api/v1/post/user/${userReducer?.details?._id}`)
    .then((res)=>{
      console.log(res);
      if(res?.data?.result){
        setPost(()=>{
          return [
            ...res.data.result
          ]
        })
      }
      else{
        throw "some error occured";
      }
    })
    .catch((err)=>{
      console.log(err);
      alert("Please try after some time.")
    })
    }
  },[])


  return (
    <>
      {userReducer.isLoggedIn?
      <div>
      {post && post.length > 0 && post.map((el , index) => (
      <CardPost 
      id={el._id}
      key={index}
      isUser={true}
      title={el.title} 
      description={el.description} 
      imageURL={el.image} 
      userName={userReducer.details.name}/>))}
    </div> : <Navigate to={"/"}/>}
    </>
  )
}

export default UserPost;
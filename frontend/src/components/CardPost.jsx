import React from 'react';
import { Avatar, Box, Card, Typography, IconButton, CardContent, CardHeader, CardMedia } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useSelector } from 'react-redux';


const CardPost = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const userReducer = useSelector((state) => {
    return state.userReducer
  })
  const editHandle = (e) => {
    navigate(`/mypost/${id}`);
  }

  const deleteHandle = (e) => {
    if (window.confirm("Are you sure want to delete")) {
      const headers = {
        Authorization: userReducer.accessToken
      }
      axios.delete(`https://travelling-app-lemon.vercel.app/api/v1/post/delete/${id}`, { headers })
        .then((response) => {
          console.log(response)
          alert("Post deleted,refresh the page to see the changes")
          navigate('/')
        })
        .catch((err) => {
          console.log(err)
          if (err?.response?.data?.result?.message) {
            alert(err.response.data.result.message)
          }
          else {
            alert('Unable to delete')
          }
        })
    }

  }
  console.log(title, isUser);
  return (
    <div>
      <Card sx={{
        width: "40%", margin: "auto", marginTop: 2, padding: 2, boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}>
        {isUser && (
          <Box display="flex">
            <IconButton onClick={editHandle} sx={{ marginLeft: "auto" }}>
              <EditIcon color="warning" />
            </IconButton>
            <IconButton >
              <DeleteIcon onClick={deleteHandle} color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
              {userName.length > 0 && userName[0]}
            </Avatar>
          }

          title={title}
        // subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b>{": "}{description}
          </Typography>
        </CardContent>

      </Card>

    </div>
  );
};

export default CardPost;
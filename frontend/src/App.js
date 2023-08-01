import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header.jsx';
import Posts from './components/Posts.jsx';
import UserPost from './components/UserPost.jsx'
import PostDetail from './components/PostDetail.jsx';
import AddPost from './components/AddPost.jsx';
import Register from './components/Register';
import Login from './components/Login';
function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn)
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Posts/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/post/add' element={<AddPost/>}/>
          <Route path='/mypost' element={<UserPost/>}/> 
          <Route path='/mypost/:id' element={<PostDetail/>}/> 
           
        </Routes>  
    </div>
  );
}

export default App;

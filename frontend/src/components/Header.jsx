import React from 'react';
import {AppBar , Toolbar , Typography , Box , Button  , Tabs ,Tab } from '@mui/material';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {logOut} from "../store/action/index"

const Header = () => {
  const isLoggedIn = useSelector((state)=>{
    return state.userReducer.isLoggedIn;
  });
  const [value , setValue] = useState();
  const dispatch = useDispatch();

  const handleLogOut =() =>{
    dispatch(logOut());
    localStorage.clear();
  }
  return (
    <div>
        <AppBar position='sticky' sx={{background:"#273239"}}>
            <Toolbar>
                <Typography variant='h4'>Travel Blog</Typography>
                { isLoggedIn && <Box display='flex' marginRight={'auto'} marginLeft={'auto'}>
                  <Tabs textColor='inherit' value={value} onChange={(e,val) => setValue(val)}>
                    <Tab LinkComponent={Link} to='/' label="All Posts"/>
                    <Tab  LinkComponent={Link} to='/mypost' label="My Posts"/>
                    <Tab LinkComponent={Link} to='/post/add' label="Add Post"/>
                  </Tabs>
                </Box>}
                <Box display="flex" marginLeft="auto">
                    { !isLoggedIn ? <> <Button LinkComponent={Link} to='/login' variant="outlined" sx={{margin:1, borderRadius:1 }} color="warning" >Login</Button>
                    <Button LinkComponent={Link} to='/register' variant="outlined" sx={{margin:1, borderRadius:1 }} color="warning">Signup</Button></>
                    :<Button onClick={handleLogOut} variant="outlined" sx={{margin:1, borderRadius:1 }} color="warning" >Logout</Button>}
                    {/* { isLoggedIn &&  */}
                    {/* <Button onClick={() => dispatch(authAction.logout())} LinkComponent={Link} to='/auth' variant="outlined" sx={{margin:1, borderRadius:1 }} color="warning">Logout</Button>} */}
                </Box>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header;
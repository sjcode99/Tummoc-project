import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
// import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
// import Overview from './Overview';


const AllRoutes = () => {
    return (
        <Box>
            <Routes>
                {/* <Route path='/' element={<Home />}></Route> */}
                {/* <Route path='/profile' element={<Profile />}></Route>
                <Route path='/overview' element={<Overview />}></Route> */}
                <Route path='/' element={<Login />}></Route>
                <Route path='/Profile' element={<Profile />}></Route>
                <Route path='/register' element={<Signup />}></Route>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
        </Box>
    );
}

export default AllRoutes;
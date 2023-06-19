import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';


const AllRoutes = () => {
    return (
        <Box>
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/Profile' element={<Profile />}></Route>
                <Route path='/register' element={<Signup />}></Route>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
        </Box>
    );
}

export default AllRoutes;
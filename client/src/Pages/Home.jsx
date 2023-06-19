import React, { useEffect } from 'react'
import { backend_url } from './BackendURL';
import { Navigate, useNavigate } from 'react-router-dom'
import { Box, Heading, Img } from '@chakra-ui/react';


const Home = () => {
  const navigate = useNavigate();

  const getData = async () => {
    let res = await fetch(`${backend_url}/home`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
      }
    });
    res = await res.json();
    if (res.status == "NO") {
      localStorage.clear();
      navigate('/login');
    }
  };

  if (localStorage.getItem('token') === null) {
    return <Navigate to="/login" />
  }

  getData();

  return (
    <Box textAlign={"center"} display="flex" justifyContent={"center"} alignItems="center" flexDirection={"column"}>
      <Heading mb="10px">Welcome to Tummoc App</Heading>
      <Img height={"400px"} w="500px" src='./logo.png' alt='logo profile' />
    </Box>
  );
}

export default Home;
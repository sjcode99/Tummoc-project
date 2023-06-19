import React, { useEffect, useState } from 'react';
import { Box, Input } from '@chakra-ui/react';
import { backend_url } from './BackendURL';
import { Navigate } from 'react-router-dom';
import UserCard from '../Components/UserCard';

const initCity = { name: '' };
const Overview = () => {
    const [cityDetails, setCityDetails] = useState(initCity);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            let res = await fetch(`${backend_url}/overview/allLocations`);
            res = await res.json();
            setData(res.data);
        } catch (err) {
            console.log(err)
        }
    };

    const handleChangeCity = (e) => {
        let { name, value } = e.target;
        setCityDetails({ ...cityDetails, [name]: value });
    }
    const handleSubmitCity = async (e) => {
        e.preventDefault();

        try {
            let res = await fetch(`${backend_url}/overview/city`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    'user_id': localStorage.getItem('user_id')
                },
                body: JSON.stringify(cityDetails)
            });
        } catch (err) {
            console.log(err)
        }
        getData();
        setCityDetails({ name: '' });
    };

    if (localStorage.getItem('token') === null) {
        return <Navigate to="/login" />
    };

    return (
        <Box>
            <Box boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" w={["70%", "70%", "20%"]} padding={'20px'} m='auto'>
                <form onSubmit={handleSubmitCity}>
                    <Input onChange={handleChangeCity} name='name' value={cityDetails.name} w='200px' mb='1%' type='text' placeholder='Enter Cityname' />
                    <br />
                    <Input type='submit' w='200px' bg="black" color={'white'} />
                </form>
            </Box>

            <Box m='5% 0'><UserCard data={data} /></Box>

        </Box>
    );
}

export default Overview;
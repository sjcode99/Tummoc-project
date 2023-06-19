import { Container, Heading, Img, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('UserDetails')))
    }, []);

    if (userData === null) {
        return <h1>Loading....</h1>
    }
    const { name, picture, email } = userData;
    return (
        <Container textAlign={'center'}>
            <Img w={'100%'} src={picture} alt="name" />
            <Heading fontSize={'20px'}>{name}</Heading>
            <Text>{email}</Text>
        </Container>
    );
}

export default Profile;
import { Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

const UserCard = ({ data }) => {
    console.log(data)
    return (
        <TableContainer mt={["15%", "15%", "0%"]}>
            <Table size='sm' variant={"striped"}>
                <Thead>
                    <Tr>
                        <Th>User Name</Th>
                        <Th>Location</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data && data.map(({ _id, name, userId }) =>
                        <Tr key={_id}>
                            <Td>{name}</Td>
                            <Td>{userId.name}</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default UserCard;
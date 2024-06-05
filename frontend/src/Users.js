import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import axios from 'axios';
import { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);  

    //lifecycle method
    useEffect(() => {
        getUsers();
    }, []);


    const getUsers = () => {
        axios.get('http://localhost:3001/api/users')
            .then(response => {
                setUsers(response?.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const addUser = (data) => {
        setSubmitted(true);

        const payload = {
            id:data.id,
            name:data.name,
        }

        axios.post('http://localhost:3001/api/createuser', payload)
            .then(() => {
                getUsers();
                setSubmitted(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return(
        <Box
            sx={{
                width:'calc(100%-100px)',
                margin:'auto',
                marginTop: '100px',
            }}
        >
            <UserForm 
                addUser = {addUser}
                submitted = {submitted}
            />
            <UsersTable rows={users} />
        </Box>
        
    );
}

export default Users;
import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import axios from 'axios';
import { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false); 
    const [isEdit, setIsEdit] = useState(false); 
    const [selectedUser, setSelectedUser] = useState({});

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
                isEdit(false); 
            })
            .catch(error => {
                console.log(error);
            });
    }

    const updateUser = (data) => {
        setSubmitted(true);

        const payload = {
            id:data.id,
            name:data.name,
        }

        axios.put('http://localhost:3001/api/updateuser', payload)
            .then(() => {
                getUsers();
                setSubmitted(false);
                isEdit(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteUser = (data) => {   
            axios.post('http://localhost:3001/api/deleteuser', data)
            .then(() => {
                getUsers();
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
                updateUser = {updateUser}
                submitted = {submitted}
                data = {selectedUser}
                isEdit = {isEdit}   
            />
            <UsersTable 
                selectedUser = {data => {
                    setSelectedUser(data);
                    setIsEdit(true);
                
                }}
                rows={users} 
                deleteUser={data => window.confirm('Are you sure ?') && deleteUser(data)}
            />
        </Box>
        
    );
}

export default Users;
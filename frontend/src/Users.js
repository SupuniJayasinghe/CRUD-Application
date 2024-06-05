import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";

const users = [
    {id: 1, name: 'John Doe'},
    {id: 2, name: 'Jane Doe'},
    {id: 3, name: 'John Smith'},
    {id: 4, name: 'Jane Smith'},
];

const Users = () => {
    return(
        <Box
            sx={{
                width:'calc(100%-100px)',
                margin:'auto',
                marginTop: '100px',
            }}
        >
            <UserForm />
            <UsersTable rows={users} />
        </Box>
        
    );
}

export default Users;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

import UserInfo from "./components/userInfo";
import UserInventory from "./components/userInventory";
import AddUserForm from "./components/addUserForm";
import SideBar from "./components/sideBar";
import handleDelete from "./components/userInventory";
import handleEdit from "./components/userInfo";

// Main App component
const App = () => {
    const [users, setUsers] = React.useState([]);

    // Function to add a new user
    const addUser = (user) => {
      const id = users.length ? users[users.length - 1].id + 1 : 1; // Generate a new ID
      user = { ...user, id }; // Add the ID to the user object
        setUsers([...users, user]); // Update the users state with the new user
    };

    // Function to refresh the user list (could be used to fetch from server)
    const refreshUsers = () => {
    // Fetch from server or localStorage etc.
        fetch("http://localhost:5000/users")
            .then(res => res.json())
            .then(data => setUsers(data));
    };

    // Render the main application with routing
    return (
        <Router>
            <div style={{ display: "flex" }}>
                <SideBar />
                <div style={{ marginLeft: "300px", padding: "20px", flex: 1}}>
                    <h1>User Management System</h1>
                    <Routes>
                        <Route path="/add-user" element={<AddUserForm addUser={addUser} />} />
                        <Route path="/user-info" element={<UserInfo users={users} />} />
                        <Route path="/users" element={ <UserInventory users={users} 
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            refreshUsers={refreshUsers} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    ); 
}

export default App;
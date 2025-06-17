import React, { use, useState } from "react";
import "./userInventory.css"; 

const UserInventory = ({ users, onDelete, onEdit, refreshUsers }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
 
  // const handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this user?")) {
  //     onDelete(id);
  //   }
  // };

  const handleDelete = (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`http://localhost:5000/user/${email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete user");
        return res.json();
      })
      .then(() => {
        // onDelete(email); // Update UI locally
        alert("User deleted successfully!");
        if (typeof refreshUsers === "function") {
          refreshUsers();
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting user.");
      });
    }
  };

  const openEditModal = (user) => {
    setEditingUser({ ...user });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    onEdit(editingUser);
    setShowModal(false);
    setEditingUser(null);
  };

  return (
    <div className="user-inventory-container">
      <h2 className="user-inventory-header">User Inventory</h2>

      <button className="refresh-button" onClick={refreshUsers}>Refresh</button>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>
                <button className="edit-button" onClick={() => openEditModal(user)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(user.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && editingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit User</h3>
            <input type="text" name="name" placeholder="Name" value={editingUser.name} onChange={handleEditChange}/>
            <input type="number" name="age" placeholder="Age" value={editingUser.age} onChange={handleEditChange}/>
            <input type="email" name="email" placeholder="Email" value={editingUser.email} onChange={handleEditChange}/>
            <div className="modal-actions">
              <button className="cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-button" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default UserInventory;

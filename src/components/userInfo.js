import React, { useState } from "react";
import "./userInfo.css";

const UserInfo = ({ users }) => {
  const [selectedId, setSelectedId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  // Function to handle viewing user info
  const handleViewInfo = (email) => {
    const user = users.find(u => u.id.toString() === selectedId);
    setSelectedUser(user);
    setEditMode(false);
    setEditedUser(null);
  };
  // Function to handle editing user info
  // This function sets the edit mode and initializes the editedUser state
  // It allows the user to modify the selected user's details
  const handleEdit = () => {
    setEditMode(true);
    setEditedUser({ ...selectedUser });
  };
  // Function to handle changes in the input fields
  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };
  // Function to handle saving the edited user info
  const handleSave = () => {
    // NOTE: Implement save logic as needed
    setSelectedUser(editedUser);
    setEditMode(false);
    alert("Changes saved (not persisted)");
  };

  return (
    <div className="user-info-container">
      <h2>Select a User</h2>
      <select
        value={selectedId}
        onChange={e => setSelectedId(e.target.value)}
        className="user-info-select">
        <option value="">-- Select a user --</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>

      <button onClick={handleViewInfo} className="user-info-button">
        View Info
      </button>

      {selectedUser && (
        <div className="user-info-card">
          <div style={{ textAlign: "center" }}>
            <img
              src={`https://i.pravatar.cc/150?u=${selectedUser.email}`}
              alt="avatar"
              className="user-info-avatar"
            />
          </div>

          {!editMode ? (
            <>
              <h3 style={{ color: "#d84315" }}>User Information</h3>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Age:</strong> {selectedUser.age}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <button onClick={handleEdit} className="user-info-button">Edit</button>
            </>
          ) : (
            <> 
              <h3 style={{ color: "#d84315" }}>Edit User</h3>
              <input type="text" name="name" value={editedUser.name} onChange={handleChange} className="user-info-input"/>
              <input type="number" name="age" value={editedUser.age} onChange={handleChange} className="user-info-input"/>
              <input type="email" name="email" value={editedUser.email} onChange={handleChange} className="user-info-input"/>
              <div style={{ textAlign: "center" }}>
                <button onClick={handleSave} className="user-info-button">Save</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfo;

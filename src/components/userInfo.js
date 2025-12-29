import React, { useState } from "react";
import "./userInfo.css";

const UserInfo = ({ users }) => {
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  // Function to handle viewing user info ...
  const handleViewInfo = () => {
    const user = users.find(u => u.email === selectedEmail);
    setSelectedUser(user);
    setEditMode(false);
    setEditedUser(null);
  };
  
  // This function sets the edit mode and initializes the editedUser state ...
  // It allows the user to modify the selected user's details ...
  const handleEdit = () => {
    setEditMode(true);
    setEditedUser({ ...selectedUser, originalEmail: selectedUser.email });
  };

  // Function to handle changes in the input fields when editing user info ...
  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle saving the edited user info ...
  const handleSave = () => {
    fetch(`http://localhost:5000/user/${editedUser.originalEmail}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editedUser.name,
        age: editedUser.age,
        email: editedUser.email
      })
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to update user");
      return res.json();
    })
    .then(() => {
      setSelectedUser(editedUser);
      setSelectedEmail(editedUser.email); // update selectedEmail if email changed
      setEditMode(false);
      alert("Changes saved successfully!");
    })
    .catch((err) => {
      console.error(err);
      alert("Error saving changes.");
    });
  };
//check if users prop is provided ...
  if (!Array.isArray(users) || users.length === 0) {
    return <div>No users available</div>;
  }
  return (
    <div className="user-info-container">
      <h2>Select a User</h2>
      <select
        value={selectedEmail}
        onChange={e => setSelectedEmail(e.target.value)}
        className="user-info-select">
        <option value="">-- Select a user --</option>
        {users.map(user => (
          <option key={user.id} value={user.email}>
            {user.name}
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
              alt="avatar" className="user-info-avatar"/>
          </div>

          {!editMode ? (
            <>
              <h3 style={{ color: "#d84315" }}>User Information</h3>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Age:</strong> {selectedUser.age}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <button onClick={handleEdit} className="user-info-button">Edit</button>
              <button onClick={() => setSelectedUser(null)} className="user-info-button">Close</button>
            </>
          ) : (
            <> 
              <h3 style={{ color: "#d84315" }}>Edit User</h3>
              <input type="text" name="name" value={editedUser.name} onChange={handleChange} className="user-info-input"/>
              <input type="number" name="age" value={editedUser.age} onChange={handleChange} className="user-info-input"/>
              <input type="email" name="email" value={editedUser.email} onChange={handleChange} className="user-info-input"/>
              <div style={{ textAlign: "center" }}>
                <button onClick={handleSave} className="user-info-button">Save</button>
                <button onClick={() => { setEditMode(false); setEditedUser(null); }} className="user-info-button">Cancel</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfo;

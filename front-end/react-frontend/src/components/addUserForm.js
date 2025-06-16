import React from "react";
import "./addUserForm.css";

const AddUserForm = ({ addUser }) => {
  const [form, setForm] = React.useState({
    name: "",
    age: "",
    email: "",
  });

  // Function to handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.age && form.email) {
      fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add user");
        return res.json();
      })
      .then((data) => {
        alert("User added successfully!");
        setForm({ name: "", age: "", email: "" });
        // Optionally call a parent refreshUsers() here
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding user.");
      });
    }
  };

  return (
    <div className="add-user-container">
      <form onSubmit={handleSubmit} className="add-user-card">
        <h2>Add New User</h2>

        <div>
          <label className="add-user-label">Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="add-user-input" required/>
        </div>
        <div>
          <label className="add-user-label">Age:</label>
          <input type="number" name="age" value={form.age} onChange={handleChange}className="add-user-input" required/>
        </div>
        <div>
          <label className="add-user-label">Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="add-user-input" required/>
        </div>
        <div style={{ textAlign: "center" }}>
          <button type="submit" className="add-user-button">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;

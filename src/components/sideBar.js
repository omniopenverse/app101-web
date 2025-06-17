
import React from 'react';
import { Link } from 'react-router-dom';
import './sideBar.css';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <h2>Navigation</h2>

      <Link to="/add-user" className="sidebar-link">
        <button className="sidebar-button">Add User</button>
      </Link>

      <Link to="/user-info" className="sidebar-link">
        <button className="sidebar-button">User Info</button>
      </Link>

      <Link to="/users" className="sidebar-link">
        <button className="sidebar-button">User Inventory</button>
      </Link>
    </div>
  );
};

export default Sidebar;

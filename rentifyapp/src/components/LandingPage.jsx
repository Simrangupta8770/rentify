import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Navbar.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar">
        <h1>Rentify</h1>
        <div className="nav-links">
          <Link to="/listings">Listings</Link>
          <Link to="/notify">Notification</Link>
          <Link to="/my-properties">My Properties</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default LandingPage;

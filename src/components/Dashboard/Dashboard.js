import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/', { replace: true });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>IP Speaker Management Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <nav className="dashboard-nav">
        <ul className="dashboard-nav-list">
          <li>
            <Link to="/dashboard/home">Home</Link>
          </li>
          <li>
            <Link to="/dashboard/ip-speaker-configuration">IP Speaker Configuration</Link>
          </li>
          <li>
            <Link to="/dashboard/audio-settings">Audio Settings</Link>
          </li>
        </ul>
      </nav>
      <main className="dashboard-content">
        <Outlet />
      </main>
      <footer className="dashboard-footer">
        <p>&copy; 2024 IP Speaker Management</p>
      </footer>
    </div>
  );
};

export default Dashboard;

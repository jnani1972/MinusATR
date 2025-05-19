import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null; // Prevent rendering if not authenticated (handled by redirect)
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>Welcome to the Trading Bot Dashboard!</p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#c82333')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc3545')}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
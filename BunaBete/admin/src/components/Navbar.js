import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <span style={{color: '#00d4ff', fontFamily: 'Orbitron', fontSize: '20px'}}>Buna</span>
          <span style={{color: '#ffd700', fontFamily: 'Orbitron', fontSize: '20px'}}>Sports</span>
          <span style={{color: '#a0a0b0', marginLeft: '10px', fontSize: '14px'}}>Admin</span>
        </Link>
        <div style={styles.right}>
          <span style={styles.user}>{user?.username}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: '#1a1a2e',
    borderBottom: '1px solid #2a2a4a',
    zIndex: 1000,
    padding: '15px 0'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    marginLeft: '250px'
  },
  logo: { textDecoration: 'none', display: 'flex', alignItems: 'center' },
  right: { display: 'flex', alignItems: 'center', gap: '20px' },
  user: { color: '#a0a0b0', fontSize: '14px' },
  logoutBtn: {
    background: '#ff4757',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px'
  }
};

export default Navbar;

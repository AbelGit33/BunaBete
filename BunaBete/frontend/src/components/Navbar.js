import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="navbar"
      style={styles.navbar}
    >
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoBuna}>Buna</span>
          <span style={styles.logoSports}>Sports</span>
        </Link>

        <div style={styles.links}>
          <Link to="/news" style={styles.link}>News</Link>
          <Link to="/live-scores" style={styles.link}>Live Scores</Link>
          <Link to="/matches" style={styles.link}>Matches</Link>
          <Link to="/teams" style={styles.link}>Teams</Link>
          <Link to="/leagues" style={styles.link}>Leagues</Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" style={styles.link}>
                {user?.username}
              </Link>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={{...styles.link, ...styles.registerBtn}}>Register</Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'rgba(10, 10, 26, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #2a2a4a',
    zIndex: 1000,
    padding: '15px 0'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  logoBuna: {
    fontFamily: 'Orbitron',
    color: '#00d4ff'
  },
  logoSports: {
    fontFamily: 'Orbitron',
    color: '#ffd700'
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'color 0.3s ease'
  },
  registerBtn: {
    background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
    padding: '8px 20px',
    borderRadius: '8px'
  },
  logoutBtn: {
    background: '#ff4757',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600
  }
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.code}>404</h1>
        <h2 style={styles.title}>Page Not Found</h2>
        <p style={styles.text}>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" style={styles.link}>← Back to Home</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 160px)',
    padding: '40px 20px'
  },
  content: { textAlign: 'center' },
  code: { fontSize: '120px', fontWeight: 700, color: '#00d4ff', fontFamily: 'Orbitron', lineHeight: 1 },
  title: { fontSize: '36px', marginBottom: '20px', fontFamily: 'Orbitron' },
  text: { color: '#a0a0b0', marginBottom: '30px', fontSize: '18px' },
  link: {
    color: '#00d4ff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 600,
    padding: '12px 30px',
    border: '2px solid #00d4ff',
    borderRadius: '8px',
    display: 'inline-block',
    transition: 'all 0.3s ease'
  }
};

export default NotFound;

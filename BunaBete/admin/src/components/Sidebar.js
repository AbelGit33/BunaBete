import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/articles', label: 'Articles', icon: '📰' },
    { path: '/matches', label: 'Matches', icon: '⚽' },
    { path: '/teams', label: 'Teams', icon: '🏟️' },
    { path: '/leagues', label: 'Leagues', icon: '🏆' },
    { path: '/users', label: 'Users', icon: '👥' }
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.menu}>
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.menuItem,
              ...(location.pathname === item.path ? styles.menuItemActive : {})
            }}
          >
            <span style={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    position: 'fixed',
    left: 0,
    top: '60px',
    bottom: 0,
    width: '250px',
    background: '#1a1a2e',
    borderRight: '1px solid #2a2a4a',
    overflowY: 'auto'
  },
  menu: { padding: '20px 0' },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    color: '#a0a0b0',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontSize: '15px'
  },
  menuItemActive: {
    background: 'rgba(0, 212, 255, 0.1)',
    color: '#00d4ff',
    borderRight: '3px solid #00d4ff'
  },
  icon: { fontSize: '18px' }
};

export default Sidebar;

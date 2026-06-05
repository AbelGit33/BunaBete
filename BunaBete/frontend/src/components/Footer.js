import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div>
            <h3 style={styles.logo}>
              <span style={{color: '#00d4ff', fontFamily: 'Orbitron'}}>Buna</span>
              <span style={{color: '#ffd700', fontFamily: 'Orbitron'}}>Sports</span>
            </h3>
            <p style={styles.text}>Your Premier Sports News & Information Platform</p>
          </div>

          <div>
            <h4 style={styles.heading}>Quick Links</h4>
            <Link to="/news" style={styles.link}>News</Link>
            <Link to="/live-scores" style={styles.link}>Live Scores</Link>
            <Link to="/matches" style={styles.link}>Matches</Link>
            <Link to="/teams" style={styles.link}>Teams</Link>
            <Link to="/leagues" style={styles.link}>Leagues</Link>
          </div>

          <div>
            <h4 style={styles.heading}>Sports</h4>
            <Link to="/news/football" style={styles.link}>Football</Link>
            <Link to="/news/basketball" style={styles.link}>Basketball</Link>
            <Link to="/news/tennis" style={styles.link}>Tennis</Link>
            <Link to="/news/athletics" style={styles.link}>Athletics</Link>
          </div>

          <div>
            <h4 style={styles.heading}>Contact</h4>
            <a href="mailto:info@bunasports.com" style={styles.link}>info@bunasports.com</a>
            <p style={styles.text}>+251 911 234 567</p>
            <p style={styles.text}>Addis Ababa, Ethiopia</p>
          </div>
        </div>

        <div style={styles.bottom}>
          <p>&copy; 2026 Buna Sports. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: '#0a0a1a',
    borderTop: '1px solid #2a2a4a',
    padding: '40px 0 20px',
    marginTop: 'auto'
  },
  container: { maxWidth: '1400px', margin: '0 auto', padding: '0 20px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px',
    marginBottom: '30px'
  },
  logo: { fontSize: '24px', marginBottom: '10px' },
  heading: { color: '#00d4ff', marginBottom: '15px', fontFamily: 'Orbitron' },
  text: { color: '#a0a0b0', marginBottom: '8px' },
  link: {
    display: 'block',
    color: '#a0a0b0',
    textDecoration: 'none',
    marginBottom: '8px',
    transition: 'color 0.3s ease'
  },
  bottom: {
    borderTop: '1px solid #2a2a4a',
    paddingTop: '20px',
    textAlign: 'center',
    color: '#a0a0b0'
  }
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const Leagues = () => {
  const { data: leagues, isLoading } = useQuery('leagues', () =>
    axios.get('http://localhost:5000/api/leagues').then(res => res.data)
  );

  if (isLoading) return <div style={styles.loading}>Loading leagues...</div>;

  const groupedBySport = leagues?.reduce((acc, league) => {
    if (!acc[league.sport]) acc[league.sport] = [];
    acc[league.sport].push(league);
    return acc;
  }, {});

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Leagues</h1>

      {Object.entries(groupedBySport || {}).map(([sport, sportLeagues]) => (
        <section key={sport} style={styles.section}>
          <h2 style={styles.sportTitle}>{sport.toUpperCase()}</h2>
          <div style={styles.leaguesGrid}>
            {sportLeagues.map(league => (
              <Link to={`/leagues/${league._id}`} key={league._id} style={styles.leagueCard}>
                <h3>{league.name}</h3>
                <p style={styles.meta}>{league.country}</p>
                {league.season && <p style={styles.meta}>Season: {league.season}</p>}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
  pageTitle: {
    fontSize: '36px',
    marginBottom: '30px',
    background: 'linear-gradient(135deg, #00d4ff, #ffd700)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Orbitron'
  },
  loading: { textAlign: 'center', padding: '100px 20px', color: '#a0a0b0' },
  section: { marginBottom: '40px' },
  sportTitle: { fontSize: '24px', color: '#00d4ff', marginBottom: '20px', fontFamily: 'Orbitron' },
  leaguesGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' },
  leagueCard: {
    background: '#1a1a2e',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #2a2a4a',
    textDecoration: 'none',
    color: 'white',
    transition: 'all 0.3s ease'
  },
  meta: { color: '#a0a0b0', fontSize: '14px', marginTop: '5px' }
};

export default Leagues;

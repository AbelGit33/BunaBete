import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const Matches = () => {
  const { data: liveMatches } = useQuery('liveMatches', () =>
    axios.get('http://localhost:5000/api/matches/live').then(res => res.data)
  );

  const { data: upcomingMatches } = useQuery('upcomingMatches', () =>
    axios.get('http://localhost:5000/api/matches/upcoming').then(res => res.data)
  );

  const { data: allMatches } = useQuery('allMatches', () =>
    axios.get('http://localhost:5000/api/matches').then(res => res.data)
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Matches</h1>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🔴 Live Now</h2>
        <div style={styles.matchesGrid}>
          {liveMatches?.map(match => (
            <Link to={`/matches/${match._id}`} key={match._id} style={styles.matchCard}>
              <div style={styles.liveBadge}>LIVE</div>
              <h3>{match.homeTeam} vs {match.awayTeam}</h3>
              <p style={styles.score}>{match.score.home} - {match.score.away}</p>
              <p style={styles.meta}>{match.league}</p>
            </Link>
          )) || <p style={styles.noData}>No live matches</p>}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Upcoming</h2>
        <div style={styles.matchList}>
          {upcomingMatches?.slice(0, 15).map(match => (
            <Link to={`/matches/${match._id}`} key={match._id} style={styles.matchItem}>
              <div style={styles.matchTime}>
                {new Date(match.startTime).toLocaleDateString()} {new Date(match.startTime).toLocaleTimeString()}
              </div>
              <div style={styles.matchTeams}>
                <span>{match.homeTeam}</span>
                <span style={styles.vs}>vs</span>
                <span>{match.awayTeam}</span>
              </div>
              <div style={styles.league}>{match.league}</div>
            </Link>
          ))}
        </div>
      </section>
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
  section: { marginBottom: '60px' },
  sectionTitle: { fontSize: '28px', marginBottom: '20px', color: '#00d4ff', fontFamily: 'Orbitron' },
  matchesGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' },
  matchCard: {
    background: '#1a1a2e',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #2a2a4a',
    textDecoration: 'none',
    color: 'white',
    position: 'relative'
  },
  liveBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: '#ff4757',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 700
  },
  score: { fontSize: '28px', fontWeight: 700, color: '#00d4ff', margin: '10px 0' },
  meta: { color: '#a0a0b0', fontSize: '14px' },
  noData: { color: '#a0a0b0', textAlign: 'center', padding: '40px' },
  matchList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  matchItem: {
    background: '#1a1a2e',
    padding: '15px 20px',
    borderRadius: '8px',
    border: '1px solid #2a2a4a',
    textDecoration: 'none',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  matchTime: { color: '#a0a0b0', fontSize: '14px', width: '200px' },
  matchTeams: { display: 'flex', gap: '15px', alignItems: 'center', flex: 1 },
  vs: { color: '#a0a0b0', fontSize: '14px' },
  league: { color: '#00d4ff', fontSize: '14px', width: '150px', textAlign: 'right' }
};

export default Matches;

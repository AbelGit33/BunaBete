import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const LiveScores = () => {
  const { data: liveMatches, isLoading } = useQuery('liveMatches', () =>
    axios.get('http://localhost:5000/api/matches/live').then(res => res.data),
    { refetchInterval: 30000 }
  );

  const { data: upcomingMatches } = useQuery('upcomingMatches', () =>
    axios.get('http://localhost:5000/api/matches/upcoming').then(res => res.data)
  );

  if (isLoading) return <div style={styles.loading}>Loading live scores...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Live Scores</h1>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🔴 Live Now</h2>
        <div style={styles.matchesGrid}>
          {liveMatches?.length > 0 ? liveMatches.map(match => (
            <div key={match._id} style={styles.matchCard}>
              <div style={styles.liveBadge}>LIVE</div>
              <div style={styles.matchInfo}>
                <div style={styles.team}>
                  <span style={styles.teamName}>{match.homeTeam}</span>
                  <span style={styles.score}>{match.score.home}</span>
                </div>
                <div style={styles.vs}>VS</div>
                <div style={styles.team}>
                  <span style={styles.teamName}>{match.awayTeam}</span>
                  <span style={styles.score}>{match.score.away}</span>
                </div>
              </div>
              <p style={styles.league}>{match.league}</p>
            </div>
          )) : <p style={styles.noData}>No live matches at the moment</p>}
        </div>
      </section>

      <section>
        <h2 style={styles.sectionTitle}>Upcoming Matches</h2>
        <div style={styles.upcomingList}>
          {upcomingMatches?.slice(0, 10).map(match => (
            <div key={match._id} style={styles.upcomingCard}>
              <div style={styles.matchHeader}>
                <span style={styles.league}>{match.league}</span>
                <span style={styles.time}>{new Date(match.startTime).toLocaleString()}</span>
              </div>
              <h4>{match.homeTeam} vs {match.awayTeam}</h4>
              <p style={styles.venue}>{match.venue}</p>
            </div>
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
  loading: { textAlign: 'center', padding: '100px 20px', color: '#a0a0b0' },
  section: { marginBottom: '60px' },
  sectionTitle: { fontSize: '28px', marginBottom: '20px', color: '#00d4ff', fontFamily: 'Orbitron' },
  matchesGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' },
  matchCard: {
    background: '#1a1a2e',
    padding: '25px',
    borderRadius: '12px',
    border: '1px solid #2a2a4a',
    position: 'relative'
  },
  liveBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: '#ff4757',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 700,
    animation: 'pulse 2s infinite'
  },
  matchInfo: { textAlign: 'center', marginTop: '20px' },
  team: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' },
  teamName: { fontSize: '18px', fontWeight: 600 },
  score: { fontSize: '32px', fontWeight: 700, color: '#00d4ff' },
  vs: { color: '#a0a0b0', fontSize: '14px', margin: '10px 0' },
  league: { color: '#a0a0b0', fontSize: '14px', textAlign: 'center', marginTop: '10px' },
  noData: { color: '#a0a0b0', textAlign: 'center', padding: '40px' },
  upcomingList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  upcomingCard: {
    background: '#1a1a2e',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #2a2a4a'
  },
  matchHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  time: { color: '#a0a0b0', fontSize: '14px' },
  venue: { color: '#a0a0b0', fontSize: '14px' }
};

export default LiveScores;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const MatchDetails = () => {
  const { id } = useParams();
  const { data: match, isLoading } = useQuery(['match', id], () =>
    axios.get(`http://localhost:5000/api/matches/${id}`).then(res => res.data)
  );

  if (isLoading) return <div style={styles.loading}>Loading match details...</div>;
  if (!match) return <div style={styles.loading}>Match not found</div>;

  return (
    <div style={styles.container}>
      <Link to="/matches" style={styles.backLink}>← Back to Matches</Link>

      <div style={styles.matchHeader}>
        <div style={styles.statusBadge}>{match.status.toUpperCase()}</div>
        <h1 style={styles.title}>{match.homeTeam} vs {match.awayTeam}</h1>
        <p style={styles.league}>{match.league} • {match.country}</p>
      </div>

      <div style={styles.scoreSection}>
        <div style={styles.teamSection}>
          <h2 style={styles.teamName}>{match.homeTeam}</h2>
          <div style={styles.score}>{match.score.home}</div>
        </div>
        <div style={styles.vs}>VS</div>
        <div style={styles.teamSection}>
          <h2 style={styles.teamName}>{match.awayTeam}</h2>
          <div style={styles.score}>{match.score.away}</div>
        </div>
      </div>

      <div style={styles.infoGrid}>
        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>Match Info</h3>
          <p><strong>Start Time:</strong> {new Date(match.startTime).toLocaleString()}</p>
          <p><strong>Venue:</strong> {match.venue || 'TBD'}</p>
          <p><strong>Status:</strong> {match.status}</p>
        </div>

        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>Events</h3>
          {match.events?.length > 0 ? (
            <ul style={styles.eventsList}>
              {match.events.map((event, idx) => <li key={idx}>{event}</li>)}
            </ul>
          ) : <p style={styles.textMuted}>No events recorded</p>}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' },
  loading: { textAlign: 'center', padding: '100px 20px', color: '#a0a0b0' },
  backLink: { color: '#00d4ff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' },
  matchHeader: { textAlign: 'center', marginBottom: '40px' },
  statusBadge: {
    display: 'inline-block',
    background: '#00d4ff',
    color: '#0a0a1a',
    padding: '5px 20px',
    borderRadius: '20px',
    fontWeight: 700,
    fontSize: '14px',
    marginBottom: '15px'
  },
  title: { fontSize: '36px', fontFamily: 'Orbitron', marginBottom: '10px' },
  league: { color: '#a0a0b0', fontSize: '18px' },
  scoreSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
    background: '#1a1a2e',
    padding: '40px',
    borderRadius: '16px',
    marginBottom: '30px'
  },
  teamSection: { textAlign: 'center' },
  teamName: { fontSize: '24px', marginBottom: '15px' },
  score: { fontSize: '64px', fontWeight: 700, color: '#00d4ff' },
  vs: { color: '#a0a0b0', fontSize: '20px', fontWeight: 600 },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  infoCard: { background: '#1a1a2e', padding: '25px', borderRadius: '12px', border: '1px solid #2a2a4a' },
  infoTitle: { color: '#00d4ff', marginBottom: '15px', fontFamily: 'Orbitron' },
  eventsList: { color: '#a0a0b0', paddingLeft: '20px' },
  textMuted: { color: '#a0a0b0' }
};

export default MatchDetails;

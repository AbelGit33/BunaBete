import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const TeamDetails = () => {
  const { id } = useParams();
  const { data: team, isLoading } = useQuery(['team', id], () =>
    axios.get(`http://localhost:5000/api/teams/${id}`).then(res => res.data)
  );

  if (isLoading) return <div style={styles.loading}>Loading team details...</div>;
  if (!team) return <div style={styles.loading}>Team not found</div>;

  return (
    <div style={styles.container}>
      <Link to="/teams" style={styles.backLink}>← Back to Teams</Link>

      <div style={styles.header}>
        <h1 style={styles.title}>{team.name}</h1>
        <p style={styles.league}>{team.league} • {team.country}</p>
      </div>

      {team.logo && <img src={team.logo} alt={team.name} style={styles.logo} />}

      <div style={styles.infoGrid}>
        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>Team Info</h3>
          <p><strong>Founded:</strong> {team.founded || 'N/A'}</p>
          <p><strong>Stadium:</strong> {team.stadium || 'N/A'}</p>
          <p><strong>League:</strong> {team.league}</p>
        </div>

        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>Statistics</h3>
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{team.wins}</span>
              <span style={styles.statLabel}>Wins</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{team.draws}</span>
              <span style={styles.statLabel}>Draws</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{team.losses}</span>
              <span style={styles.statLabel}>Losses</span>
            </div>
          </div>
        </div>
      </div>

      {team.description && (
        <div style={styles.description}>
          <h3 style={styles.infoTitle}>About</h3>
          <p>{team.description}</p>
        </div>
      )}

      {team.players?.length > 0 && (
        <div style={styles.players}>
          <h3 style={styles.infoTitle}>Players</h3>
          <div style={styles.playerList}>
            {team.players.map((player, idx) => (
              <div key={idx} style={styles.player}>{player}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' },
  loading: { textAlign: 'center', padding: '100px 20px', color: '#a0a0b0' },
  backLink: { color: '#00d4ff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' },
  header: { textAlign: 'center', marginBottom: '30px' },
  title: { fontSize: '36px', fontFamily: 'Orbitron', marginBottom: '10px' },
  league: { color: '#a0a0b0', fontSize: '18px' },
  logo: { display: 'block', margin: '0 auto 30px', maxWidth: '200px' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' },
  infoCard: { background: '#1a1a2e', padding: '25px', borderRadius: '12px', border: '1px solid #2a2a4a' },
  infoTitle: { color: '#00d4ff', marginBottom: '15px', fontFamily: 'Orbitron' },
  stats: { display: 'flex', justifyContent: 'space-around', textAlign: 'center' },
  statItem: { display: 'flex', flexDirection: 'column' },
  statValue: { fontSize: '36px', fontWeight: 700, color: '#00d4ff' },
  statLabel: { color: '#a0a0b0', fontSize: '14px', marginTop: '5px' },
  description: { background: '#1a1a2e', padding: '25px', borderRadius: '12px', border: '1px solid #2a2a4a', marginBottom: '30px' },
  players: { background: '#1a1a2e', padding: '25px', borderRadius: '12px', border: '1px solid #2a2a4a' },
  playerList: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '15px' },
  player: { background: '#16213e', padding: '10px', borderRadius: '8px', textAlign: 'center' }
};

export default TeamDetails;

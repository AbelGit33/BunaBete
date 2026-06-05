import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const Teams = () => {
  const { data: teams, isLoading } = useQuery('teams', () =>
    axios.get('http://localhost:5000/api/teams').then(res => res.data)
  );

  const { data: leagues } = useQuery('leagues', () =>
    axios.get('http://localhost:5000/api/leagues').then(res => res.data)
  );

  if (isLoading) return <div style={styles.loading}>Loading teams...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Teams</h1>

      {leagues?.map(league => {
        const leagueTeams = teams?.filter(t => t.league === league.name);
        if (!leagueTeams || leagueTeams.length === 0) return null;

        return (
          <section key={league._id} style={styles.section}>
            <h2 style={styles.leagueTitle}>{league.name}</h2>
            <div style={styles.teamsGrid}>
              {leagueTeams.map(team => (
                <Link to={`/teams/${team._id}`} key={team._id} style={styles.teamCard}>
                  <h3>{team.name}</h3>
                  <p style={styles.meta}>{team.country}</p>
                  <div style={styles.stats}>
                    <span>W: {team.wins}</span>
                    <span>D: {team.draws}</span>
                    <span>L: {team.losses}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
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
  leagueTitle: { fontSize: '24px', color: '#00d4ff', marginBottom: '20px', fontFamily: 'Orbitron' },
  teamsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' },
  teamCard: {
    background: '#1a1a2e',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #2a2a4a',
    textDecoration: 'none',
    color: 'white',
    transition: 'all 0.3s ease'
  },
  meta: { color: '#a0a0b0', fontSize: '14px', margin: '5px 0' },
  stats: { display: 'flex', gap: '15px', marginTop: '10px', fontSize: '14px', color: '#00d4ff' }
};

export default Teams;

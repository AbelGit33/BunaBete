import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const LeagueDetails = () => {
  const { id } = useParams();
  const { data: league, isLoading } = useQuery(['league', id], () =>
    axios.get(`http://localhost:5000/api/leagues/${id}`).then(res => res.data)
  );

  if (isLoading) return <div style={styles.loading}>Loading league details...</div>;
  if (!league) return <div style={styles.loading}>League not found</div>;

  return (
    <div style={styles.container}>
      <Link to="/leagues" style={styles.backLink}>← Back to Leagues</Link>

      <div style={styles.header}>
        <h1 style={styles.title}>{league.name}</h1>
        <p style={styles.meta}>{league.sport.toUpperCase()} • {league.country}</p>
      </div>

      {league.logo && <img src={league.logo} alt={league.name} style={styles.logo} />}

      {league.description && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>About</h3>
          <p>{league.description}</p>
        </div>
      )}

      {league.season && (
        <div style={styles.section}>
          <p><strong>Current Season:</strong> {league.season}</p>
        </div>
      )}

      {league.teams?.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Teams</h3>
          <div style={styles.teamsGrid}>
            {league.teams.map(team => (
              <Link to={`/teams/${team._id}`} key={team._id} style={styles.teamCard}>
                <h4>{team.name}</h4>
              </Link>
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
  meta: { color: '#a0a0b0', fontSize: '18px' },
  logo: { display: 'block', margin: '0 auto 30px', maxWidth: '200px' },
  section: { background: '#1a1a2e', padding: '25px', borderRadius: '12px', border: '1px solid #2a2a4a', marginBottom: '20px' },
  sectionTitle: { color: '#00d4ff', marginBottom: '15px', fontFamily: 'Orbitron' },
  teamsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '15px' },
  teamCard: { background: '#16213e', padding: '15px', borderRadius: '8px', textDecoration: 'none', color: 'white', textAlign: 'center' }
};

export default LeagueDetails;

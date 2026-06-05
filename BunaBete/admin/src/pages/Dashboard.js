import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const Dashboard = () => {
  const { data: articles } = useQuery('adminArticles', () =>
    axios.get('http://localhost:5000/api/articles').then(res => res.data)
  );

  const { data: matches } = useQuery('adminMatches', () =>
    axios.get('http://localhost:5000/api/matches').then(res => res.data)
  );

  const { data: teams } = useQuery('adminTeams', () =>
    axios.get('http://localhost:5000/api/teams').then(res => res.data)
  );

  const { data: users } = useQuery('adminUsers', () =>
    axios.get('http://localhost:5000/api/admin/users').then(res => res.data)
  );

  const stats = [
    { label: 'Articles', value: articles?.length || 0, icon: '📰' },
    { label: 'Matches', value: matches?.length || 0, icon: '⚽' },
    { label: 'Teams', value: teams?.length || 0, icon: '🏟️' },
    { label: 'Users', value: users?.length || 0, icon: '👥' }
  ];

  const liveMatches = matches?.filter(m => m.status === 'live') || [];

  return (
    <div>
      <h1 style={styles.title}>Dashboard</h1>

      <div style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <div key={idx} style={styles.statCard}>
            <div style={styles.statIcon}>{stat.icon}</div>
            <div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🔴 Live Matches</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Match</th>
                <th>League</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {liveMatches.slice(0, 5).map(match => (
                <tr key={match._id}>
                  <td>{match.homeTeam} vs {match.awayTeam}</td>
                  <td>{match.league}</td>
                  <td>{match.score.home} - {match.score.away}</td>
                  <td><span style={styles.liveBadge}>LIVE</span></td>
                </tr>
              ))}
              {liveMatches.length === 0 && (
                <tr><td colSpan="4" style={styles.noData}>No live matches</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Recent Articles</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Views</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {articles?.slice(0, 5).map(article => (
                <tr key={article._id}>
                  <td>{article.title}</td>
                  <td><span style={styles.badge}>{article.category}</span></td>
                  <td>{article.views}</td>
                  <td>{new Date(article.publishedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  title: { fontSize: '28px', color: '#00d4ff', marginBottom: '30px', fontFamily: 'Orbitron' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' },
  statCard: {
    background: '#1a1a2e',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #2a2a4a',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  statIcon: { fontSize: '32px' },
  statValue: { fontSize: '28px', fontWeight: 700, color: '#00d4ff' },
  statLabel: { color: '#a0a0b0', fontSize: '14px' },
  section: { marginBottom: '40px' },
  sectionTitle: { fontSize: '20px', color: '#00d4ff', marginBottom: '20px', fontFamily: 'Orbitron' },
  tableContainer: { background: '#1a1a2e', borderRadius: '12px', border: '1px solid #2a2a4a', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  liveBadge: { background: '#ff4757', color: 'white', padding: '4px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: 600 },
  badge: { background: 'rgba(0, 212, 255, 0.2)', color: '#00d4ff', padding: '4px 12px', borderRadius: '15px', fontSize: '12px' },
  noData: { textAlign: 'center', padding: '20px', color: '#a0a0b0' }
};

export default Dashboard;

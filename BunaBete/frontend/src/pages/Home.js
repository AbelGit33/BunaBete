import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const Home = () => {
  const { data: featuredArticles } = useQuery('featuredArticles', () =>
    axios.get('http://localhost:5000/api/articles/featured').then(res => res.data)
  );

  const { data: liveMatches } = useQuery('liveMatches', () =>
    axios.get('http://localhost:5000/api/matches/live').then(res => res.data)
  );

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Welcome to <span style={{color: '#00d4ff'}}>Buna</span><span style={{color: '#ffd700'}}>Sports</span>
        </h1>
        <p style={styles.heroSubtitle}>Your Premier Sports News & Information Platform</p>
        <div style={styles.heroButtons}>
          <Link to="/news" style={styles.btnPrimary}>Latest News</Link>
          <Link to="/live-scores" style={styles.btnSecondary}>Live Scores</Link>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Live Matches</h2>
        <div style={styles.matchesGrid}>
          {liveMatches?.slice(0, 6).map(match => (
            <Link to={`/matches/${match._id}`} key={match._id} style={styles.matchCard}>
              <div style={styles.liveBadge}>LIVE</div>
              <h4>{match.homeTeam} vs {match.awayTeam}</h4>
              <p>{match.league}</p>
              <p style={styles.score}>{match.score.home} - {match.score.away}</p>
            </Link>
          )) || <p style={styles.textMuted}>No live matches at the moment</p>}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Latest News</h2>
        <div style={styles.newsGrid}>
          {featuredArticles?.slice(0, 6).map(article => (
            <Link to={`/news/${article._id}`} key={article._id} style={styles.newsCard}>
              <h4>{article.title}</h4>
              <p style={styles.textMuted}>{article.category} • {new Date(article.publishedAt).toLocaleDateString()}</p>
              <p>{article.summary || article.content?.substring(0, 100)}...</p>
            </Link>
          )) || <p style={styles.textMuted}>No articles yet</p>}
        </div>
      </section>

      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Why Choose Buna Sports?</h2>
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>⚡ Live Scores</h3>
            <p>Real-time updates for football, basketball, tennis and more</p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>📰 Latest News</h3>
            <p>Stay updated with breaking sports news and analysis</p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>🏆 Leagues & Teams</h3>
            <p>Comprehensive coverage of leagues and team statistics</p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>📊 Match Stats</h3>
            <p>Detailed statistics and match information</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' },
  hero: {
    textAlign: 'center',
    padding: '80px 20px',
    background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(255,215,0,0.1))',
    borderRadius: '20px',
    marginBottom: '60px'
  },
  heroTitle: { fontSize: '56px', marginBottom: '20px', fontFamily: 'Orbitron' },
  heroSubtitle: { fontSize: '20px', color: '#a0a0b0', marginBottom: '40px' },
  heroButtons: { display: 'flex', gap: '20px', justifyContent: 'center' },
  btnPrimary: {
    padding: '15px 40px',
    background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '18px'
  },
  btnSecondary: {
    padding: '15px 40px',
    background: 'transparent',
    border: '2px solid #ffd700',
    color: '#ffd700',
    textDecoration: 'none',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '18px'
  },
  section: { marginBottom: '60px' },
  sectionTitle: {
    fontSize: '36px',
    textAlign: 'center',
    marginBottom: '40px',
    background: 'linear-gradient(135deg, #00d4ff, #ffd700)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  matchesGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
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
    fontWeight: 600
  },
  score: { fontSize: '24px', fontWeight: 700, color: '#00d4ff', marginTop: '10px' },
  newsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
  newsCard: {
    background: '#1a1a2e',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #2a2a4a',
    textDecoration: 'none',
    color: 'white'
  },
  textMuted: { color: '#a0a0b0', fontSize: '14px' },
  features: { marginBottom: '60px' },
  featureGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' },
  featureCard: {
    background: '#1a1a2e',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid #2a2a4a',
    textAlign: 'center'
  },
  featureTitle: { fontSize: '20px', marginBottom: '10px' }
};

export default Home;

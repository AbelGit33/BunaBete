import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const News = () => {
  const { data: articles, isLoading } = useQuery('articles', () =>
    axios.get('http://localhost:5000/api/articles').then(res => res.data)
  );

  const { data: featured } = useQuery('featuredArticles', () =>
    axios.get('http://localhost:5000/api/articles/featured').then(res => res.data)
  );

  if (isLoading) return <div style={styles.loading}>Loading news...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Sports News</h1>

      {featured && featured.length > 0 && (
        <section style={styles.featuredSection}>
          <h2 style={styles.sectionTitle}>Featured</h2>
          <div style={styles.featuredGrid}>
            {featured.slice(0, 3).map(article => (
              <Link to={`/news/${article._id}`} key={article._id} style={styles.featuredCard}>
                <h3>{article.title}</h3>
                <p style={styles.meta}>{article.category} • {new Date(article.publishedAt).toLocaleDateString()}</p>
                <p>{article.summary || article.content?.substring(0, 150)}...</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 style={styles.sectionTitle}>All News</h2>
        <div style={styles.newsList}>
          {articles?.map(article => (
            <Link to={`/news/${article._id}`} key={article._id} style={styles.newsItem}>
              <div style={styles.newsContent}>
                <h3>{article.title}</h3>
                <p style={styles.meta}>
                  {article.category} • {new Date(article.publishedAt).toLocaleDateString()} • {article.views} views
                </p>
                <p>{article.summary || article.content?.substring(0, 200)}...</p>
              </div>
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
  loading: { textAlign: 'center', padding: '100px 20px', color: '#a0a0b0' },
  featuredSection: { marginBottom: '60px' },
  sectionTitle: { fontSize: '28px', marginBottom: '20px', color: '#00d4ff', fontFamily: 'Orbitron' },
  featuredGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
  featuredCard: {
    background: '#1a1a2e',
    padding: '25px',
    borderRadius: '12px',
    border: '1px solid #2a2a4a',
    textDecoration: 'none',
    color: 'white',
    transition: 'all 0.3s ease'
  },
  newsList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  newsItem: {
    background: '#1a1a2e',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #2a2a4a',
    textDecoration: 'none',
    color: 'white',
    display: 'flex',
    gap: '20px',
    transition: 'all 0.3s ease'
  },
  newsContent: { flex: 1 },
  meta: { color: '#a0a0b0', fontSize: '14px', margin: '8px 0' }
};

export default News;

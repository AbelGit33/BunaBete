import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const NewsDetails = () => {
  const { id } = useParams();
  const { data: article, isLoading } = useQuery(['article', id], () =>
    axios.get(`http://localhost:5000/api/articles/${id}`).then(res => res.data)
  );

  if (isLoading) return <div style={styles.loading}>Loading article...</div>;
  if (!article) return <div style={styles.loading}>Article not found</div>;

  return (
    <div style={styles.container}>
      <Link to="/news" style={styles.backLink}>← Back to News</Link>

      <article style={styles.article}>
        <div style={styles.header}>
          <span style={styles.category}>{article.category}</span>
          <h1 style={styles.title}>{article.title}</h1>
          <div style={styles.meta}>
            <span>By {article.author || 'Buna Sports Team'}</span>
            <span>•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{article.views} views</span>
          </div>
        </div>

        {article.imageUrl && (
          <img src={article.imageUrl} alt={article.title} style={styles.image} />
        )}

        <div style={styles.content}>
          <p>{article.summary}</p>
          <div style={styles.body}>{article.content}</div>
        </div>

        <div style={styles.tags}>
          {article.tags?.map(tag => (
            <span key={tag} style={styles.tag}>{tag}</span>
          ))}
        </div>
      </article>
    </div>
  );
};

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '40px 20px' },
  loading: { textAlign: 'center', padding: '100px 20px', color: '#a0a0b0' },
  backLink: { color: '#00d4ff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' },
  article: { background: '#1a1a2e', borderRadius: '16px', padding: '30px', border: '1px solid #2a2a4a' },
  header: { marginBottom: '30px' },
  category: { background: '#00d4ff', color: '#0a0a1a', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 },
  title: { fontSize: '36px', marginTop: '15px', lineHeight: 1.3, fontFamily: 'Orbitron' },
  meta: { display: 'flex', gap: '10px', color: '#a0a0b0', marginTop: '15px', fontSize: '14px' },
  image: { width: '100%', borderRadius: '12px', marginBottom: '30px' },
  content: { lineHeight: 1.8, fontSize: '17px' },
  body: { marginTop: '20px', whiteSpace: 'pre-wrap' },
  tags: { display: 'flex', gap: '10px', marginTop: '30px', flexWrap: 'wrap' },
  tag: { background: '#16213e', padding: '5px 15px', borderRadius: '20px', fontSize: '13px', color: '#a0a0b0' }
};

export default NewsDetails;

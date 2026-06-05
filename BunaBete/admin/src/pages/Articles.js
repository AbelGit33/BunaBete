import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const Articles = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    category: 'football',
    author: 'Buna Sports Team',
    isFeatured: false
  });

  const { data: articles, isLoading } = useQuery('adminArticles', () =>
    axios.get('http://localhost:5000/api/articles').then(res => res.data)
  );

  const createMutation = useMutation(
    (data) => axios.post('http://localhost:5000/api/articles', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('adminArticles');
        toast.success('Article created!');
        setShowForm(false);
        resetForm();
      }
    }
  );

  const deleteMutation = useMutation(
    (id) => axios.delete(`http://localhost:5000/api/articles/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('adminArticles');
        toast.success('Article deleted!');
      }
    }
  );

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      summary: '',
      category: 'football',
      author: 'Buna Sports Team',
      isFeatured: false
    });
    setEditingArticle(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  if (isLoading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>Articles</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} style={styles.addBtn}>
          + Add Article
        </button>
      </div>

      {showForm && (
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>{editingArticle ? 'Edit Article' : 'New Article'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                style={styles.input}
              >
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
                <option value="tennis">Tennis</option>
                <option value="athletics">Athletics</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Summary</label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
                style={styles.textarea}
                rows="3"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                style={styles.textarea}
                rows="10"
                required
              />
            </div>
            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.saveBtn} disabled={createMutation.isLoading}>
                {createMutation.isLoading ? 'Saving...' : 'Save'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Views</th>
              <th>Featured</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles?.map(article => (
              <tr key={article._id}>
                <td>{article.title}</td>
                <td><span style={styles.badge}>{article.category}</span></td>
                <td>{article.views}</td>
                <td>{article.isFeatured ? '✓' : ''}</td>
                <td>{new Date(article.publishedAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => deleteMutation.mutate(article._id)} style={styles.deleteBtn}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  loading: { color: '#a0a0b0', textAlign: 'center', padding: '50px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  title: { fontSize: '28px', color: '#00d4ff', fontFamily: 'Orbitron' },
  addBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600
  },
  formCard: { background: '#1a1a2e', padding: '25px', borderRadius: '12px', border: '1px solid #2a2a4a', marginBottom: '30px' },
  formTitle: { color: '#00d4ff', marginBottom: '20px', fontFamily: 'Orbitron' },
  inputGroup: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '5px', color: '#a0a0b0', fontSize: '14px' },
  input: { width: '100%', padding: '10px 14px', background: '#16213e', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white' },
  textarea: { width: '100%', padding: '10px 14px', background: '#16213e', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', resize: 'vertical' },
  buttonGroup: { display: 'flex', gap: '10px', marginTop: '20px' },
  saveBtn: { padding: '10px 30px', background: 'linear-gradient(135deg, #00d4ff, #0099cc)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 },
  cancelBtn: { padding: '10px 30px', background: 'transparent', border: '2px solid #a0a0b0', color: '#a0a0b0', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 },
  tableContainer: { background: '#1a1a2e', borderRadius: '12px', border: '1px solid #2a2a4a', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  badge: { background: 'rgba(0, 212, 255, 0.2)', color: '#00d4ff', padding: '4px 12px', borderRadius: '15px', fontSize: '12px' },
  deleteBtn: { padding: '6px 12px', background: '#ff4757', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }
};

export default Articles;

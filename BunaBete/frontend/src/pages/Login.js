import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login to Buna Bete</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={styles.text}>
          Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 160px)',
    padding: '40px 20px'
  },
  card: {
    background: '#1a1a2e',
    padding: '40px',
    borderRadius: '16px',
    border: '1px solid #2a2a4a',
    width: '100%',
    maxWidth: '450px'
  },
  title: {
    fontSize: '32px',
    textAlign: 'center',
    marginBottom: '30px',
    fontFamily: 'Orbitron'
  },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', color: '#a0a0b0', fontWeight: 600 },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: '#16213e',
    border: '1px solid #2a2a4a',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px'
  },
  button: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '10px'
  },
  text: { textAlign: 'center', marginTop: '20px', color: '#a0a0b0' },
  link: { color: '#00d4ff', textDecoration: 'none' }
};

export default Login;

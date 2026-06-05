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
      toast.error('Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Buna Sports Admin</h1>
        <p style={styles.subtitle}>Sign in to access the admin panel</p>
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
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#0a0a1a',
    padding: '20px'
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
    marginBottom: '10px',
    fontFamily: 'Orbitron',
    background: 'linear-gradient(135deg, #00d4ff, #ffd700)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: { textAlign: 'center', color: '#a0a0b0', marginBottom: '30px' },
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
  }
};

export default Login;

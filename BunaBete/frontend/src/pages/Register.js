import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phone: '',
    referralCode: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      toast.success('Registration successful! Welcome to Buna Bete!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Join Buna Bete</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} style={styles.input} required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={styles.input} />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} required minLength="6" />
          </div>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Referral Code (Optional)</label>
              <input type="text" name="referralCode" value={formData.referralCode} onChange={handleChange} style={styles.input} />
            </div>
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p style={styles.text}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
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
    maxWidth: '550px'
  },
  title: { fontSize: '32px', textAlign: 'center', marginBottom: '30px', fontFamily: 'Orbitron' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
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

export default Register;

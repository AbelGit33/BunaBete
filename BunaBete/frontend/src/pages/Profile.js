import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const updateProfileMutation = useMutation(
    (data) => axios.put('http://localhost:5000/api/users/profile', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user']);
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      },
      onError: () => toast.error('Failed to update profile')
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>My Profile</h1>

      <div style={styles.profileCard}>
        <div style={styles.header}>
          <div style={styles.avatar}>{user?.username?.charAt(0).toUpperCase()}</div>
          <div>
            <h2 style={styles.name}>{user?.fullName || user?.username}</h2>
            <p style={styles.email}>{user?.email}</p>
            <p style={styles.role}>Role: {user?.role}</p>
          </div>
        </div>

        <div style={styles.infoSection}>
          <h3 style={styles.sectionTitle}>Account Information</h3>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  style={styles.input}
                />
              </div>
              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.saveBtn} disabled={updateProfileMutation.isLoading}>
                  {updateProfileMutation.isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p style={styles.info}><strong>Username:</strong> {user?.username}</p>
              <p style={styles.info}><strong>Email:</strong> {user?.email}</p>
              <p style={styles.info}><strong>Full Name:</strong> {user?.fullName || 'Not set'}</p>
              <p style={styles.info}><strong>Phone:</strong> {user?.phone || 'Not set'}</p>
              <p style={styles.info}><strong>Address:</strong> {user?.address || 'Not set'}</p>
              <p style={styles.info}><strong>Member Since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
              <button onClick={() => setIsEditing(true)} style={styles.editBtn}>Edit Profile</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '40px 20px' },
  pageTitle: {
    fontSize: '36px',
    marginBottom: '30px',
    background: 'linear-gradient(135deg, #00d4ff, #ffd700)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Orbitron'
  },
  profileCard: { background: '#1a1a2e', borderRadius: '16px', padding: '30px', border: '1px solid #2a2a4a' },
  header: { display: 'flex', gap: '30px', alignItems: 'center', marginBottom: '40px' },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    fontWeight: 700,
    color: 'white'
  },
  name: { fontSize: '28px', marginBottom: '5px' },
  email: { color: '#a0a0b0', marginBottom: '5px' },
  role: { color: '#00d4ff', fontSize: '14px', fontWeight: 600 },
  infoSection: { borderTop: '1px solid #2a2a4a', paddingTop: '30px' },
  sectionTitle: { color: '#00d4ff', marginBottom: '20px', fontFamily: 'Orbitron' },
  info: { marginBottom: '12px', color: '#a0a0b0' },
  editBtn: {
    marginTop: '20px',
    padding: '12px 30px',
    background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer'
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
  buttonGroup: { display: 'flex', gap: '15px', marginTop: '20px' },
  saveBtn: {
    padding: '12px 30px',
    background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  cancelBtn: {
    padding: '12px 30px',
    background: 'transparent',
    border: '2px solid #a0a0b0',
    color: '#a0a0b0',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer'
  }
};

export default Profile;

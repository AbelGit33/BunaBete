import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const Leagues = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', sport: 'football', country: '', season: ''
  });

  const { data: leagues, isLoading } = useQuery('adminLeagues', () =>
    axios.get('http://localhost:5000/api/leagues').then(res => res.data)
  );

  const createMutation = useMutation(
    (data) => axios.post('http://localhost:5000/api/leagues', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('adminLeagues');
        toast.success('League created!');
        setShowForm(false);
      }
    }
  );

  const deleteMutation = useMutation(
    (id) => axios.delete(`http://localhost:5000/api/leagues/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('adminLeagues');
        toast.success('League deleted!');
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  if (isLoading) return <div style={{color: '#a0a0b0', textAlign: 'center', padding: '50px'}}>Loading...</div>;

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <h1 style={{fontSize: '28px', color: '#00d4ff'}}>Leagues</h1>
        <button onClick={() => setShowForm(true)} style={styles.addBtn}>+ Add League</button>
      </div>

      {showForm && (
        <div style={styles.formCard}>
          <h2 style={{color: '#00d4ff', marginBottom: '20px'}}>New League</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>League Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={styles.input} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Sport</label>
                <select value={formData.sport} onChange={(e) => setFormData({...formData, sport: e.target.value})}
                  style={styles.input}>
                  <option value="football">Football</option>
                  <option value="basketball">Basketball</option>
                  <option value="tennis">Tennis</option>
                  <option value="athletics">Athletics</option>
                </select>
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Country</label>
                <input type="text" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})}
                  style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Season</label>
                <input type="text" value={formData.season} onChange={(e) => setFormData({...formData, season: e.target.value})}
                  style={styles.input} placeholder="e.g. 2025-2026" />
              </div>
            </div>
            <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
              <button type="submit" style={styles.saveBtn} disabled={createMutation.isLoading}>
                {createMutation.isLoading ? 'Saving...' : 'Save'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={styles.cancelBtn}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={styles.grid}>
        {leagues?.map(league => (
          <div key={league._id} style={styles.card}>
            <h3 style={{color: 'white', marginBottom: '10px'}}>{league.name}</h3>
            <p style={styles.meta}>Sport: {league.sport}</p>
            <p style={styles.meta}>Country: {league.country}</p>
            {league.season && <p style={styles.meta}>Season: {league.season}</p>}
            <button onClick={() => deleteMutation.mutate(league._id)} style={styles.deleteBtn}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  addBtn: { padding: '10px 20px', background: 'linear-gradient(135deg, #00d4ff, #0099cc)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 },
  formCard: { background: '#1a1a2e', padding: '25px', borderRadius: '12px', border: '1px solid #2a2a4a', marginBottom: '30px' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  inputGroup: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '5px', color: '#a0a0b0', fontSize: '14px' },
  input: { width: '100%', padding: '10px 14px', background: '#16213e', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px' },
  saveBtn: { padding: '10px 30px', background: 'linear-gradient(135deg, #00d4ff, #0099cc)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 },
  cancelBtn: { padding: '10px 30px', background: 'transparent', border: '2px solid #a0a0b0', color: '#a0a0b0', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
  card: { background: '#1a1a2e', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a4a' },
  meta: { color: '#a0a0b0', fontSize: '14px', marginBottom: '5px' },
  deleteBtn: { marginTop: '15px', padding: '8px 16px', background: '#ff4757', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }
};

export default Leagues;

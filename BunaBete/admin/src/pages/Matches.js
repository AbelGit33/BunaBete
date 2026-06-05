import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const Matches = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    homeTeam: '', awayTeam: '', league: '', sport: 'football',
    startTime: '', status: 'upcoming', venue: ''
  });

  const { data: matches, isLoading } = useQuery('adminMatches', () =>
    axios.get('http://localhost:5000/api/matches').then(res => res.data)
  );

  const createMutation = useMutation(
    (data) => axios.post('http://localhost:5000/api/matches', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('adminMatches');
        toast.success('Match created!');
        setShowForm(false);
      }
    }
  );

  const deleteMutation = useMutation(
    (id) => axios.delete(`http://localhost:5000/api/matches/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('adminMatches');
        toast.success('Match deleted!');
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate({...formData, startTime: new Date(formData.startTime)});
  };

  if (isLoading) return <div style={{color: '#a0a0b0', textAlign: 'center', padding: '50px'}}>Loading...</div>;

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <h1 style={{fontSize: '28px', color: '#00d4ff'}}>Matches</h1>
        <button onClick={() => setShowForm(true)} style={styles.addBtn}>+ Add Match</button>
      </div>

      {showForm && (
        <div style={styles.formCard}>
          <h2 style={{color: '#00d4ff', marginBottom: '20px'}}>New Match</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Home Team</label>
                <input type="text" value={formData.homeTeam} onChange={(e) => setFormData({...formData, homeTeam: e.target.value})}
                  style={styles.input} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Away Team</label>
                <input type="text" value={formData.awayTeam} onChange={(e) => setFormData({...formData, awayTeam: e.target.value})}
                  style={styles.input} required />
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>League</label>
                <input type="text" value={formData.league} onChange={(e) => setFormData({...formData, league: e.target.value})}
                  style={styles.input} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Sport</label>
                <select value={formData.sport} onChange={(e) => setFormData({...formData, sport: e.target.value})}
                  style={styles.input}>
                  <option value="football">Football</option>
                  <option value="basketball">Basketball</option>
                  <option value="tennis">Tennis</option>
                </select>
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Start Time</label>
                <input type="datetime-local" value={formData.startTime} onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  style={styles.input} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Venue</label>
                <input type="text" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})}
                  style={styles.input} />
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

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Match</th>
              <th>League</th>
              <th>Status</th>
              <th>Start Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches?.map(match => (
              <tr key={match._id}>
                <td>{match.homeTeam} vs {match.awayTeam}</td>
                <td>{match.league}</td>
                <td><span style={match.status === 'live' ? styles.badgeLive : styles.badge}>{match.status}</span></td>
                <td>{new Date(match.startTime).toLocaleString()}</td>
                <td><button onClick={() => deleteMutation.mutate(match._id)} style={styles.deleteBtn}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
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
  tableContainer: { background: '#1a1a2e', borderRadius: '12px', border: '1px solid #2a2a4a', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  badge: { background: 'rgba(0, 212, 255, 0.2)', color: '#00d4ff', padding: '4px 12px', borderRadius: '15px', fontSize: '12px' },
  badgeLive: { background: '#ff4757', color: 'white', padding: '4px 12px', borderRadius: '15px', fontSize: '12px' },
  deleteBtn: { padding: '6px 12px', background: '#ff4757', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }
};

export default Matches;

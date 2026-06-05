import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const Teams = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', league: '', country: '', founded: '', stadium: ''
  });

  const { data: teams, isLoading } = useQuery('adminTeams', () =>
    axios.get('http://localhost:5000/api/teams').then(res => res.data)
  );

  const createMutation = useMutation(
    (data) => axios.post('http://localhost:5000/api/teams', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('adminTeams');
        toast.success('Team created!');
        setShowForm(false);
      }
    }
  );

  const deleteMutation = useMutation(
    (id) => axios.delete(`http://localhost:5000/api/teams/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('adminTeams');
        toast.success('Team deleted!');
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
        <h1 style={{fontSize: '28px', color: '#00d4ff'}}>Teams</h1>
        <button onClick={() => setShowForm(true)} style={styles.addBtn}>+ Add Team</button>
      </div>

      {showForm && (
        <div style={styles.formCard}>
          <h2 style={{color: '#00d4ff', marginBottom: '20px'}}>New Team</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Team Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={styles.input} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>League</label>
                <input type="text" value={formData.league} onChange={(e) => setFormData({...formData, league: e.target.value})}
                  style={styles.input} required />
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Country</label>
                <input type="text" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})}
                  style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Founded</label>
                <input type="number" value={formData.founded} onChange={(e) => setFormData({...formData, founded: e.target.value})}
                  style={styles.input} />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Stadium</label>
              <input type="text" value={formData.stadium} onChange={(e) => setFormData({...formData, stadium: e.target.value})}
                style={styles.input} />
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
              <th>Team Name</th>
              <th>League</th>
              <th>Country</th>
              <th>Stadium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams?.map(team => (
              <tr key={team._id}>
                <td>{team.name}</td>
                <td>{team.league}</td>
                <td>{team.country}</td>
                <td>{team.stadium || 'N/A'}</td>
                <td><button onClick={() => deleteMutation.mutate(team._id)} style={styles.deleteBtn}>Delete</button></td>
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
  deleteBtn: { padding: '6px 12px', background: '#ff4757', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }
};

export default Teams;

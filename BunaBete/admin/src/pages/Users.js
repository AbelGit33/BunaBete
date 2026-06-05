import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const Users = () => {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery('adminUsers', () =>
    axios.get('http://localhost:5000/api/admin/users').then(res => res.data)
  );

  const updateStatusMutation = useMutation(
    ({id, isActive}) => axios.put(`http://localhost:5000/api/admin/users/${id}/status`, {isActive}),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('adminUsers');
        toast.success('User status updated!');
      }
    }
  );

  if (isLoading) return <div style={{color: '#a0a0b0', textAlign: 'center', padding: '50px'}}>Loading...</div>;

  return (
    <div>
      <h1 style={{fontSize: '28px', color: '#00d4ff', marginBottom: '30px'}}>Users</h1>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td><span style={user.role === 'admin' ? styles.badgeAdmin : styles.badge}>{user.role}</span></td>
                <td>
                  <span style={user.isActive ? styles.badgeSuccess : styles.badgeDanger}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{user.balance} ETB</td>
                <td>
                  <button
                    onClick={() => updateStatusMutation.mutate({id: user._id, isActive: !user.isActive})}
                    style={user.isActive ? styles.deactivateBtn : styles.activateBtn}
                  >
                    {user.isActive ? 'Deactivate' : 'Activate'}
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
  tableContainer: { background: '#1a1a2e', borderRadius: '12px', border: '1px solid #2a2a4a', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  badge: { background: 'rgba(0, 212, 255, 0.2)', color: '#00d4ff', padding: '4px 12px', borderRadius: '15px', fontSize: '12px' },
  badgeAdmin: { background: 'rgba(255, 215, 0, 0.2)', color: '#ffd700', padding: '4px 12px', borderRadius: '15px', fontSize: '12px' },
  badgeSuccess: { background: 'rgba(0, 255, 136, 0.2)', color: '#00ff88', padding: '4px 12px', borderRadius: '15px', fontSize: '12px' },
  badgeDanger: { background: 'rgba(255, 71, 87, 0.2)', color: '#ff4757', padding: '4px 12px', borderRadius: '15px', fontSize: '12px' },
  activateBtn: { padding: '6px 12px', background: '#00ff88', color: '#0a0a1a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 },
  deactivateBtn: { padding: '6px 12px', background: '#ff4757', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }
};

export default Users;

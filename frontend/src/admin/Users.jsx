import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/adminService';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');

  const load = () => {
    setStatus('loading');
    fetchUsers().then((res) => { setUsers(res.data.users); setStatus('success'); }).catch(() => setStatus('error'));
  };
  useEffect(load, []);

  if (status === 'loading') return <LoadingState label="Loading users..." />;
  if (status === 'error') return <ErrorState onRetry={load} />;

  return (
    <div>
      <h1>Users</h1>
      <div className="card mt-4" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ padding: '10px 8px' }}>Name</th>
              <th style={{ padding: '10px 8px' }}>Email</th>
              <th style={{ padding: '10px 8px' }}>Role</th>
              <th style={{ padding: '10px 8px' }}>Registered</th>
              <th style={{ padding: '10px 8px' }}>Last Login</th>
              <th style={{ padding: '10px 8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '10px 8px' }}>{u.name}</td>
                <td style={{ padding: '10px 8px' }}>{u.email}</td>
                <td style={{ padding: '10px 8px' }}><span className={`badge ${u.role === 'admin' ? 'badge-progress' : 'badge-new'}`}>{u.role}</span></td>
                <td style={{ padding: '10px 8px' }}>{new Date(u.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '10px 8px' }}>{u.last_login_at ? new Date(u.last_login_at).toLocaleString() : '—'}</td>
                <td style={{ padding: '10px 8px' }}><span className={`badge ${u.status === 'active' ? 'badge-resolved' : 'badge-progress'}`}>{u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import DataTable from '../components/table/DataTable';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import { useToast } from '../components/ui/ToastContext';

const UserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToast } = useToast();

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setData([
        { id: 1, name: 'Alice Cooper', email: 'alice@example.com', role: 'Admin', lastLogin: '2023-10-25' },
        { id: 2, name: 'Bob Dylan', email: 'bob@example.com', role: 'Instructor', lastLogin: '2023-10-26' },
        { id: 3, name: 'Charlie Watts', email: 'charlie@example.com', role: 'Student', lastLogin: '2023-10-20' },
        { id: 4, name: 'Diana Ross', email: 'diana@example.com', role: 'Student', lastLogin: '2023-10-22' },
        { id: 5, name: 'Elvis Presley', email: 'elvis@example.com', role: 'Instructor', lastLogin: '2023-10-27' },
        { id: 6, name: 'Freddie Mercury', email: 'freddie@example.com', role: 'Student', lastLogin: '2023-10-21' },
      ]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'role', 
      label: 'Role',
      render: (val) => (
        <span style={{
          padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
          backgroundColor: val === 'Admin' ? '#E1BEE7' : (val === 'Instructor' ? '#BBDEFB' : '#DCEDC8'),
          color: val === 'Admin' ? '#4A148C' : (val === 'Instructor' ? '#0D47A1' : '#33691E')
        }}>
          {val}
        </span>
      )
    },
    { key: 'lastLogin', label: 'Last Login' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>Users</h1>
        <button style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#FF6B35', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Invite User</button>
      </div>

      {loading ? (
        <Skeleton type="table" />
      ) : error ? (
        <ErrorState title="Unable to Load Users" message="Error fetching user data." onRetry={fetchData} />
      ) : data.length === 0 ? (
        <EmptyState title="No Users Found" message="Invite users to get started." />
      ) : (
        <DataTable 
          data={data} 
          columns={columns} 
          filterOptions={['Admin', 'Instructor', 'Student']}
          onEdit={(row) => addToast({ type: 'success', message: `Editing user ${row.name}` })}
          onDelete={(id) => setData(prev => prev.filter(item => item.id !== id))}
          onArchive={(id) => addToast({ type: 'warning', message: `User archived.` })}
        />
      )}
    </div>
  );
};

export default UserList;

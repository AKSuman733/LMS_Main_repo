import { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable';
import CardSkeleton from '../../components/CardSkeleton';

const usersSeed = [
  { id: 1, name: 'Arjun Patel', email: 'arjun.patel@example.com', role: 'Student', status: 'Active', joined: '2025-01-18' },
  { id: 2, name: 'Priya Sharma', email: 'priya.sharma@example.com', role: 'Mentor', status: 'Pending', joined: '2025-02-04' },
  { id: 3, name: 'Ravi Kumar', email: 'ravi.kumar@example.com', role: 'Admin', status: 'Active', joined: '2024-11-12' },
  { id: 4, name: 'Neha Singh', email: 'neha.singh@example.com', role: 'Student', status: 'Inactive', joined: '2025-03-03' },
  { id: 5, name: 'Kavya Rao', email: 'kavya.rao@example.com', role: 'Student', status: 'Active', joined: '2025-04-22' },
  { id: 6, name: 'Sahil Mehta', email: 'sahil.mehta@example.com', role: 'Mentor', status: 'Active', joined: '2025-01-28' },
];

function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(usersSeed);
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (row) => setData((current) => current.filter((item) => item.id !== row.id));
  const handleArchive = (row) => setData((current) => current.map((item) => (item.id === row.id ? { ...item, status: 'Archived' } : item)));
  const handleBulkDelete = (selectedIds) => setData((current) => current.filter((item) => !selectedIds.includes(item.id)));
  const handleBulkArchive = (selectedIds) => setData((current) => current.map((item) => (selectedIds.includes(item.id) ? { ...item, status: 'Archived' } : item)));
  const handleBulkExport = (selectedIds) => {
    const payload = data.filter((item) => selectedIds.includes(item.id));
    console.log('Export users', payload);
  };

  const columns = [
    { key: 'name', label: 'Name', sortable: true, searchable: true },
    { key: 'email', label: 'Email', sortable: true, searchable: true },
    { key: 'role', label: 'Role', sortable: true, searchable: true, filterOptions: ['Student', 'Mentor', 'Admin'] },
    { key: 'status', label: 'Status', sortable: true, searchable: true, filterOptions: ['Active', 'Pending', 'Inactive', 'Archived'] },
    { key: 'joined', label: 'Joined', sortable: true, searchable: false },
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Total Users</p>
              <h2 className="mt-3 text-4xl font-black">{data.length}</h2>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Active Users</p>
              <h2 className="mt-3 text-4xl font-black">{data.filter((item) => item.status === 'Active').length}</h2>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Mentor Count</p>
              <h2 className="mt-3 text-4xl font-black">{data.filter((item) => item.role === 'Mentor').length}</h2>
            </div>
          </div>
        )}

        <DataTable
          title="User Directory"
          columns={columns}
          data={data}
          loading={loading}
          error={error}
          emptyState={{
            title: 'No Users Yet',
            message: 'Ready to onboard your first user?',
            actionLabel: 'Invite User',
            onAction: () => console.log('Add user'),
          }}
          onView={(row) => console.log('View user', row)}
          onEdit={(row) => console.log('Edit user', row)}
          onDelete={handleDelete}
          onArchive={handleArchive}
          onBulkDelete={handleBulkDelete}
          onBulkExport={handleBulkExport}
          onBulkArchive={handleBulkArchive}
        />
      </div>
    </div>
  );
}

export default Users;

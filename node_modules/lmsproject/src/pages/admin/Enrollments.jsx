import { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable';
import CardSkeleton from '../../components/CardSkeleton';

const enrollmentsSeed = [
  { id: 1, student: 'Arjun Patel', course: 'MERN Stack Mastery', progress: '78%', status: 'Active', enrolled: '2025-02-12' },
  { id: 2, student: 'Priya Sharma', course: 'DSA For Placements', progress: '42%', status: 'Pending', enrolled: '2025-03-08' },
  { id: 3, student: 'Neha Singh', course: 'Frontend System Design', progress: '96%', status: 'Completed', enrolled: '2024-12-19' },
  { id: 4, student: 'Kavya Rao', course: 'MERN Stack Mastery', progress: '23%', status: 'Active', enrolled: '2025-04-01' },
  { id: 5, student: 'Sahil Mehta', course: 'DSA For Placements', progress: '60%', status: 'Active', enrolled: '2025-01-31' },
];

function Enrollments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(enrollmentsSeed);
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
    console.log('Export enrollments', payload);
  };

  const columns = [
    { key: 'student', label: 'Student', sortable: true, searchable: true },
    { key: 'course', label: 'Course', sortable: true, searchable: true, filterOptions: ['MERN Stack Mastery', 'DSA For Placements', 'Frontend System Design'] },
    { key: 'progress', label: 'Progress', sortable: true, searchable: false },
    { key: 'status', label: 'Status', sortable: true, searchable: true, filterOptions: ['Active', 'Pending', 'Completed', 'Archived'] },
    { key: 'enrolled', label: 'Enrolled', sortable: true, searchable: false },
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
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Total Enrollments</p>
              <h2 className="mt-3 text-4xl font-black">{data.length}</h2>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Active Courses</p>
              <h2 className="mt-3 text-4xl font-black">{data.filter((item) => item.status === 'Active').length}</h2>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Completed</p>
              <h2 className="mt-3 text-4xl font-black">{data.filter((item) => item.status === 'Completed').length}</h2>
            </div>
          </div>
        )}

        <DataTable
          title="Enrollment Records"
          columns={columns}
          data={data}
          loading={loading}
          error={error}
          emptyState={{
            title: 'No Enrollments Yet',
            message: 'No learners have been assigned to a course yet.',
            actionLabel: 'Create Enrollment',
            onAction: () => console.log('Create enrollment'),
          }}
          onView={(row) => console.log('View enrollment', row)}
          onEdit={(row) => console.log('Edit enrollment', row)}
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

export default Enrollments;

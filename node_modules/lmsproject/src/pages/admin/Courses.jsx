import { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable';
import CardSkeleton from '../../components/CardSkeleton';

const coursesSeed = [
  { id: 1, title: 'MERN Stack Mastery', instructor: 'John Doe', category: 'Web Development', price: '₹2999', status: 'Published' },
  { id: 2, title: 'DSA For Placements', instructor: 'Sarah Lee', category: 'Data Structures', price: '₹1999', status: 'Draft' },
  { id: 3, title: 'Frontend System Design', instructor: 'Alex Smith', category: 'UI/UX Design', price: '₹3499', status: 'Published' },
  { id: 4, title: 'Python for Beginners', instructor: 'Rohit Sen', category: 'Web Development', price: '₹1499', status: 'Archived' },
  { id: 5, title: 'Advanced React Patterns', instructor: 'Mina Desai', category: 'Web Development', price: '₹2599', status: 'Published' },
  { id: 6, title: 'System Design Workshop', instructor: 'Amit Verma', category: 'System Design', price: '₹3999', status: 'Pending' },
];

function Courses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(coursesSeed);
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
    console.log('Export courses', payload);
  };

  const columns = [
    { key: 'title', label: 'Course Title', sortable: true, searchable: true },
    { key: 'instructor', label: 'Instructor', sortable: true, searchable: true },
    { key: 'category', label: 'Category', sortable: true, searchable: true, filterOptions: ['Web Development', 'Data Structures', 'UI/UX Design', 'System Design'] },
    { key: 'price', label: 'Price', sortable: true, searchable: false },
    { key: 'status', label: 'Status', sortable: true, searchable: true, filterOptions: ['Published', 'Draft', 'Pending', 'Archived'] },
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
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Total Courses</p>
              <h2 className="mt-3 text-4xl font-black">{data.length}</h2>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Published</p>
              <h2 className="mt-3 text-4xl font-black">{data.filter((item) => item.status === 'Published').length}</h2>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Drafts</p>
              <h2 className="mt-3 text-4xl font-black">{data.filter((item) => item.status === 'Draft').length}</h2>
            </div>
          </div>
        )}

        <DataTable
          title="Course Catalog"
          columns={columns}
          data={data}
          loading={loading}
          error={error}
          emptyState={{
            title: 'No Courses Yet',
            message: 'Ready to create your first course?',
            actionLabel: 'Add Course',
            onAction: () => console.log('Open add course page'),
          }}
          onView={(row) => console.log('View course', row)}
          onEdit={(row) => console.log('Edit course', row)}
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

export default Courses;

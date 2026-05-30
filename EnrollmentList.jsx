import React, { useState, useEffect } from 'react';
import DataTable from '../components/table/DataTable';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import { useToast } from '../components/ui/ToastContext';

const EnrollmentList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToast } = useToast();

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setData([
        { id: 1, student: 'Charlie Watts', course: 'Introduction to React', date: '2023-09-01', progress: '100%', status: 'Completed' },
        { id: 2, student: 'Diana Ross', course: 'JavaScript Fundamentals', date: '2023-10-15', progress: '45%', status: 'Active' },
        { id: 3, student: 'Freddie Mercury', course: 'Advanced CSS Patterns', date: '2023-10-20', progress: '10%', status: 'Active' },
        { id: 4, student: 'Charlie Watts', course: 'Node.js Backend Dev', date: '2023-08-10', progress: '0%', status: 'Dropped' },
      ]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { key: 'student', label: 'Student' },
    { key: 'course', label: 'Course' },
    { key: 'date', label: 'Enrollment Date' },
    { key: 'progress', label: 'Progress' },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => (
        <span style={{
          padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
          backgroundColor: val === 'Completed' ? '#E8F5E9' : (val === 'Active' ? '#E3F2FD' : '#FFEBEE'),
          color: val === 'Completed' ? '#2E7D32' : (val === 'Active' ? '#1565C0' : '#C62828')
        }}>
          {val}
        </span>
      )
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>Enrollments</h1>
        <button style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#FF6B35', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Manual Enroll</button>
      </div>

      {loading ? (
        <Skeleton type="table" />
      ) : error ? (
        <ErrorState title="Unable to Load Enrollments" message="Error fetching enrollment data." onRetry={fetchData} />
      ) : data.length === 0 ? (
        <EmptyState title="No Enrollments Found" message="Enroll students to see data here." />
      ) : (
        <DataTable 
          data={data} 
          columns={columns} 
          filterOptions={['Active', 'Completed', 'Dropped']}
          onEdit={(row) => addToast({ type: 'success', message: `Editing enrollment` })}
          onDelete={(id) => setData(prev => prev.filter(item => item.id !== id))}
          onArchive={(id) => addToast({ type: 'warning', message: `Enrollment archived.` })}
        />
      )}
    </div>
  );
};

export default EnrollmentList;

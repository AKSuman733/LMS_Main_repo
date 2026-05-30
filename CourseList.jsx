import React, { useState, useEffect } from 'react';
import DataTable from '../components/table/DataTable';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import { useToast } from '../components/ui/ToastContext';

const CourseList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToast } = useToast();

  const fetchData = (simulateError = false, simulateEmpty = false) => {
    setLoading(true);
    setError(false);
    
    // Simulate API delay
    setTimeout(() => {
      if (simulateError) {
        setError(true);
        setLoading(false);
        return;
      }
      
      if (simulateEmpty) {
        setData([]);
        setLoading(false);
        return;
      }

      // Mock Data
      setData([
        { id: 1, title: 'Introduction to React', instructor: 'John Doe', status: 'Published', students: 120, price: '$49' },
        { id: 2, title: 'Advanced CSS Patterns', instructor: 'Jane Smith', status: 'Draft', students: 0, price: '$29' },
        { id: 3, title: 'JavaScript Fundamentals', instructor: 'Bob Johnson', status: 'Published', students: 450, price: '$39' },
        { id: 4, title: 'Node.js Backend Dev', instructor: 'Alice Williams', status: 'Archived', students: 89, price: '$59' },
        { id: 5, title: 'Python for Data Science', instructor: 'Charlie Brown', status: 'Published', students: 210, price: '$99' },
      ]);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { key: 'title', label: 'Course Title' },
    { key: 'instructor', label: 'Instructor' },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => (
        <span style={{
          padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
          backgroundColor: val === 'Published' ? '#E8F5E9' : (val === 'Draft' ? '#FFF3E0' : '#EEEEEE'),
          color: val === 'Published' ? '#2E7D32' : (val === 'Draft' ? '#E65100' : '#616161')
        }}>
          {val}
        </span>
      )
    },
    { key: 'students', label: 'Students' },
    { key: 'price', label: 'Price' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>Courses</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => fetchData(false, false)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>Reload</button>
          <button onClick={() => fetchData(false, true)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>Show Empty</button>
          <button onClick={() => fetchData(true, false)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>Show Error</button>
          <button style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#FF6B35', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>+ Create Course</button>
        </div>
      </div>

      {loading ? (
        <Skeleton type="table" />
      ) : error ? (
        <ErrorState 
          title="Unable to Load Courses" 
          message="We encountered an error while fetching the course list. Please try again."
          onRetry={() => fetchData()}
          supportLink="#"
        />
      ) : data.length === 0 ? (
        <EmptyState
          title="No Courses Yet"
          message="Ready to create your first course?"
          actionText="+ Create Course"
          onAction={() => addToast({ type: 'success', message: 'Create course modal would open here!' })}
        />
      ) : (
        <DataTable 
          data={data} 
          columns={columns} 
          filterOptions={['Published', 'Draft', 'Archived']}
          onEdit={(row) => addToast({ type: 'success', message: `Editing ${row.title}` })}
          onDelete={(id) => setData(prev => prev.filter(item => item.id !== id))}
          onArchive={(id) => addToast({ type: 'warning', message: `Course ${id} archived.` })}
        />
      )}
    </div>
  );
};

export default CourseList;

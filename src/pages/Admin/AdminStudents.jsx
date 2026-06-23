import { useState, useEffect } from 'react';
import { MOCK_STUDENTS } from '../../utils/mockData';
import { ArrowLeft, CheckCircle, Clock, AlertCircle, Users } from 'lucide-react';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import { useToast } from '../../hooks/useToast';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const { addToast } = useToast();

  useEffect(() => {
    // Simulate network delay
    setTimeout(() => {
      setStudents(MOCK_STUDENTS);
      setLoading(false);
      // Simulate error randomly or set to false
      setError(false); 
    }, 1000);
  }, []);

  const handleDeleteConfirm = () => {
    if (studentToDelete) {
      setStudents(prev => prev.filter(s => s.id !== studentToDelete.id));
      addToast({ type: 'success', message: 'Student deleted successfully!' });
    }
    setDeleteModalOpen(false);
    setStudentToDelete(null);
  };

  const columns = [
    { 
      key: 'name', 
      label: 'Student', 
      sortable: true,
      filterable: false,
      render: (row, highlight) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{highlight(row.name)}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{highlight(row.email)}</div>
        </div>
      )
    },
    { 
      key: 'enrolled_count', 
      label: 'Enrolled Courses',
      sortable: true,
      filterable: true,
      render: (row) => (
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-blue-200">
          {row.enrolled_count}
        </span>
      )
    },
    { 
      key: 'completed_count', 
      label: 'Completed Courses',
      sortable: true,
      filterable: true,
      render: (row) => (
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          {row.completed_count}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterable: true,
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {row.status || 'Active'}
        </span>
      )
    }
  ];

  const rowActions = [
    {
      label: 'View Details',
      onClick: (row) => setSelectedStudent(row)
    },
    {
      label: 'Edit',
      onClick: (row) => addToast({ type: 'info', message: `Editing ${row.name}` })
    },
    {
      label: 'Toggle Status',
      onClick: (row) => {
        setStudents(prev => prev.map(s => s.id === row.id ? { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' } : s));
        addToast({ type: 'success', message: `${row.name} status updated.` });
      }
    },
    {
      label: 'Archive',
      onClick: (row) => {
        addToast({ type: 'success', message: `${row.name} archived.` });
      }
    },
    {
      label: 'Delete',
      destructive: true,
      onClick: (row) => {
        setStudentToDelete(row);
        setDeleteModalOpen(true);
      }
    }
  ];

  const bulkActions = [
    {
      label: 'Archive Selected',
      onClick: (selectedIds) => {
        addToast({ type: 'success', message: `${selectedIds.length} students archived.` });
      }
    },
    {
      label: 'Export CSV',
      onClick: (selectedIds) => {
        const selectedStudents = students.filter(s => selectedIds.includes(s.id));
        const headers = ['ID', 'Name', 'Email', 'Enrolled', 'Completed', 'Status'];
        const csvContent = [
          headers.join(','),
          ...selectedStudents.map(s => [s.id, `"${s.name}"`, `"${s.email}"`, s.enrolled_count, s.completed_count, s.status].join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `students_export_${new Date().getTime()}.csv`;
        link.click();
        addToast({ type: 'success', message: `Exported ${selectedIds.length} students to CSV.` });
      },
      keepSelection: true
    },
    {
      label: 'Delete Selected',
      destructive: true,
      onClick: (selectedIds) => {
        setStudents(prev => prev.filter(s => !selectedIds.includes(s.id)));
        addToast({ type: 'success', message: `${selectedIds.length} students deleted.` });
      }
    }
  ];

  if (selectedStudent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSelectedStudent(null)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {selectedStudent.name}'s Progress
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{selectedStudent.email}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Active</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{selectedStudent.last_active ? new Date(selectedStudent.last_active).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Status</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                selectedStudent.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {selectedStudent.status || 'Active'}
              </span>
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Course Details</h3>
        <div className="grid grid-cols-1 gap-6">
          {selectedStudent.courses?.map(course => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{course.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                    {course.status === 'Completed' ? <CheckCircle className="w-4 h-4 mr-1 text-green-500" /> : 
                     course.status === 'In Progress' ? <Clock className="w-4 h-4 mr-1 text-brand-orange" /> :
                     <AlertCircle className="w-4 h-4 mr-1 text-gray-500" />}
                    {course.status}
                  </p>
                </div>
                {course.quiz_score !== null && (
                  <div className="text-right">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">Quiz Score</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{course.quiz_score}%</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-700 dark:text-gray-300">Progress</span>
                  <span className="text-gray-900 dark:text-white">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${course.progress === 100 ? 'bg-green-600' : 'bg-brand-orange'}`} 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {course.remarks && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Instructor Remarks: </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{course.remarks}</span>
                </div>
              )}
            </div>
          ))}
          {(!selectedStudent.courses || selectedStudent.courses.length === 0) && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No courses enrolled yet.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Directory</h2>
      </div>

      <DataTable 
        columns={columns}
        data={students}
        isLoading={loading}
        isError={error}
        globalSearchFields={['name', 'email']}
        onRowAction={rowActions}
        bulkActions={bulkActions}
        emptyState={{
          icon: <Users className="w-12 h-12" />,
          title: "No Users Yet",
          message: "No students have registered yet."
        }}
        errorState={{
          title: "Unable to Load Users",
          action: (
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition">
              Retry
            </button>
          )
        }}
      />

      <Modal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Are you sure?"
        type="confirm"
        isDestructive={true}
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
      >
        <p>This will permanently delete the student <strong>{studentToDelete?.name}</strong> and remove all their data. This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default AdminStudents;

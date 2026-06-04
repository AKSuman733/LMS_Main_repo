import { useState, useEffect } from 'react';
import { MOCK_ADMIN_ENROLLMENTS } from '../../utils/mockData';
import { Clock, CheckCircle, Activity, ClipboardList } from 'lucide-react';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import { useToast } from '../../components/ToastProvider';

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [enrollmentToDelete, setEnrollmentToDelete] = useState(null);

  const { addToast } = useToast();

  useEffect(() => {
    // Simulate network delay
    setTimeout(() => {
      setEnrollments(MOCK_ADMIN_ENROLLMENTS);
      setLoading(false);
      setErrorState(false);
    }, 1000);
  }, []);

  const handleDeleteConfirm = () => {
    if (enrollmentToDelete) {
      setEnrollments(prev => prev.filter(e => e.id !== enrollmentToDelete.id));
      addToast({ type: 'success', message: 'Enrollment deleted successfully!' });
    }
    setDeleteModalOpen(false);
    setEnrollmentToDelete(null);
  };

  const columns = [
    { 
      key: 'studentName', 
      label: 'Student', 
      sortable: true,
      filterable: false,
      render: (row, highlight) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {highlight(row.studentName)}
        </div>
      )
    },
    { 
      key: 'courseName', 
      label: 'Course',
      sortable: true,
      filterable: true,
      render: (row, highlight) => (
        <div className="text-sm text-gray-900 dark:text-white">
          {highlight(row.courseName)}
        </div>
      )
    },
    { 
      key: 'date', 
      label: 'Date Enrolled',
      sortable: true,
      filterable: false,
      render: (row) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(row.date).toLocaleDateString()}
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
          row.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
          row.status === 'Active' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {row.status === 'Completed' && <CheckCircle className="w-3 h-3 mr-1" />}
          {row.status === 'Active' && <Activity className="w-3 h-3 mr-1" />}
          {row.status === 'Inactive' && <Clock className="w-3 h-3 mr-1" />}
          {row.status}
        </span>
      )
    },
    {
      key: 'progress',
      label: 'Progress',
      sortable: true,
      filterable: false,
      render: (row) => (
        <div className="flex items-center space-x-2 w-32">
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div 
              className={`h-2 rounded-full ${row.progress === 100 ? 'bg-green-600' : 'bg-blue-600'}`} 
              style={{ width: `${row.progress}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{row.progress}%</span>
        </div>
      )
    }
  ];

  const rowActions = [
    {
      label: 'View',
      onClick: (row) => addToast({ type: 'info', message: `Viewing enrollment for ${row.studentName}` })
    },
    {
      label: 'Edit',
      onClick: (row) => addToast({ type: 'info', message: `Editing enrollment for ${row.studentName}` })
    },
    {
      label: 'Archive',
      onClick: () => addToast({ type: 'success', message: `Enrollment archived.` })
    },
    {
      label: 'Delete',
      destructive: true,
      onClick: (row) => {
        setEnrollmentToDelete(row);
        setDeleteModalOpen(true);
      }
    }
  ];

  const bulkActions = [
    {
      label: 'Archive Selected',
      onClick: (selectedIds) => addToast({ type: 'success', message: `${selectedIds.length} enrollments archived.` })
    },
    {
      label: 'Export CSV',
      onClick: (selectedIds) => addToast({ type: 'success', message: `Exporting ${selectedIds.length} enrollments.` }),
      keepSelection: true
    },
    {
      label: 'Delete Selected',
      destructive: true,
      onClick: (selectedIds) => {
        setEnrollments(prev => prev.filter(e => !selectedIds.includes(e.id)));
        addToast({ type: 'success', message: `${selectedIds.length} enrollments deleted.` });
      }
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Enrollments</h2>

      <DataTable 
        columns={columns}
        data={enrollments}
        isLoading={loading}
        isError={errorState}
        globalSearchFields={['studentName', 'courseName']}
        onRowAction={rowActions}
        bulkActions={bulkActions}
        emptyState={{
          icon: <ClipboardList className="w-12 h-12" />,
          title: "No Enrollments Yet",
          message: "Enrollments will appear here once learners join courses.",
          action: (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              View Course Catalog
            </button>
          )
        }}
        errorState={{
          title: "Unable to Load Enrollments",
          action: (
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition">
              Retry
            </button>
          )
        }}
      />

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Are you sure?"
        type="confirm"
        isDestructive={true}
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
      >
        <p>This will permanently delete the enrollment for <strong>{enrollmentToDelete?.studentName}</strong> in <strong>{enrollmentToDelete?.courseName}</strong>. This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default AdminEnrollments;

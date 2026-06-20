import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  Search, 
  MoreVertical, 
  Calendar,
  Mail,
  BookOpen,
  Filter,
  Trash2,
  Archive,
  Eye,
  Download,
  Edit2,
  RefreshCw,
  Trash
} from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import { confirmAction } from '../../utils/confirmAction';
import '../../styles/AdminLayout.css';

const UserManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    fetchStudents();
  }, [activeTab]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5001/api/auth/all-students?status=${activeTab}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(response.data);
    } catch (err) {
      console.error('Error fetching students', err);
      setError('Failed to fetch students. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (row, highlight) => (
        <div className="user-info-cell">
          <div className="user-avatar-mini" style={{ background: `hsl(${row.id * 45}, 70%, 60%)` }}>
            {row.name ? row.name.substring(0, 2).toUpperCase() : '?'}
          </div>
          <span className="font-bold">{highlight(row.name)}</span>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (row, highlight) => (
        <div className="email-cell">
          <Mail size={16} className="text-secondary mr-2" />
          {highlight(row.email)}
        </div>
      )
    },
    {
      key: 'courses_count',
      label: 'Courses',
      sortable: true,
      filterable: true,
      render: (row) => (
        <div className="courses-count-cell">
          <span className="font-bold">{row.courses_count || 0}</span>
        </div>
      )
    },
    {
      key: 'average_progress',
      label: 'Progress',
      sortable: true,
      render: (row) => {
        const prog = row.average_progress || 0;
        return (
          <div className="progress-cell-group">
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${prog}%`, background: prog > 80 ? '#10b981' : prog > 40 ? '#FF6B35' : '#f59e0b' }}
              ></div>
            </div>
            <span className="text-xs font-bold text-secondary">{Math.round(prog)}%</span>
          </div>
        );
      }
    },
    {
      key: 'joined_at',
      label: 'Joined',
      sortable: true,
      render: (row) => (
        <div className="date-cell">
          {formatDate(row.joined_at)}
        </div>
      )
    },
    {
      key: 'is_approved',
      label: 'Status',
      filterable: true,
      render: (row) => (
        <span className={`status-badge ${row.is_approved ? 'active' : 'inactive'}`}>
          {row.is_approved ? 'Active' : 'Pending'}
        </span>
      )
    }
  ];

  const handleDelete = (ids, isHard) => {
    confirmAction(
      `Are you sure you want to ${isHard ? 'permanently ' : ''}delete ${ids.length} users?`,
      async () => {
        try {
          const token = localStorage.getItem('token');
          await axios.post(`http://localhost:5001/api/auth/bulk-delete?hard=${isHard}`, { ids }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setStudents(students.filter(s => !ids.includes(s.id)));
          toast.success(`${isHard ? 'Permanently deleted' : 'Deleted'} ${ids.length} users`);
        } catch (err) {
          toast.error('Failed to delete users');
        }
      },
      isHard ? 'Permanently Delete' : 'Delete',
      '#ef4444'
    );
  };

  const handleRestore = async (ids) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5001/api/auth/bulk-restore', { ids }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(students.filter(s => !ids.includes(s.id)));
      toast.success(`Restored ${ids.length} users`);
    } catch (err) {
      toast.error('Failed to restore users');
    }
  };

  let bulkActions = [
    {
      label: 'Export',
      icon: <Download size={16} />,
      onClick: async (ids) => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get('http://localhost:5001/api/auth/export', {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob'
          });
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'users.csv');
          document.body.appendChild(link);
          link.click();
          toast.success(`Exported users successfully`);
        } catch (err) {
          toast.error('Failed to export users');
        }
      }
    }
  ];

  if (activeTab === 'active') {
    bulkActions.push({
      label: 'Archive',
      icon: <Archive size={16} />,
      onClick: async (ids) => {
        try {
          const token = localStorage.getItem('token');
          await axios.put('http://localhost:5001/api/auth/bulk-archive', { ids }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setStudents(students.filter(s => !ids.includes(s.id)));
          toast.success(`Archived ${ids.length} users`);
        } catch (err) {
          toast.error('Failed to archive users');
        }
      }
    });
    bulkActions.push({
      label: 'Delete',
      icon: <Trash2 size={16} />,
      type: 'delete',
      onClick: (ids) => handleDelete(ids, false)
    });
  } else if (activeTab === 'archive') {
    bulkActions.push({
      label: 'Restore',
      icon: <RefreshCw size={16} />,
      onClick: handleRestore
    });
    bulkActions.push({
      label: 'Delete',
      icon: <Trash2 size={16} />,
      type: 'delete',
      onClick: (ids) => handleDelete(ids, false)
    });
  } else if (activeTab === 'deleted') {
    bulkActions.push({
      label: 'Restore',
      icon: <RefreshCw size={16} />,
      onClick: handleRestore
    });
    bulkActions.push({
      label: 'Hard Delete',
      icon: <Trash size={16} />,
      type: 'delete',
      onClick: (ids) => handleDelete(ids, true)
    });
  }

  let rowActions = [
    {
      label: 'View Details',
      icon: <Eye size={16} />,
      onClick: (row) => toast.success(`Viewing details for ${row.name}`)
    }
  ];

  if (activeTab === 'active') {
    rowActions.push({
      label: 'Edit User',
      icon: <Edit2 size={16} />,
      onClick: (row) => toast.success(`Editing user: ${row.name}`)
    });
    rowActions.push({
      label: 'Archive',
      icon: <Archive size={16} />,
      onClick: async (row) => {
        try {
          const token = localStorage.getItem('token');
          await axios.put(`http://localhost:5001/api/auth/archive/${row.id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setStudents(students.filter(s => s.id !== row.id));
          toast.success(`Archived user: ${row.name}`);
        } catch (err) {
          toast.error('Failed to archive user');
        }
      }
    });
    rowActions.push({
      label: 'Delete',
      icon: <Trash2 size={16} />,
      type: 'delete',
      onClick: (row) => handleDelete([row.id], false)
    });
  } else if (activeTab === 'archive') {
    rowActions.push({
      label: 'Restore',
      icon: <RefreshCw size={16} />,
      onClick: (row) => handleRestore([row.id])
    });
    rowActions.push({
      label: 'Delete',
      icon: <Trash2 size={16} />,
      type: 'delete',
      onClick: (row) => handleDelete([row.id], false)
    });
  } else if (activeTab === 'deleted') {
    rowActions.push({
      label: 'Restore',
      icon: <RefreshCw size={16} />,
      onClick: (row) => handleRestore([row.id])
    });
    rowActions.push({
      label: 'Hard Delete',
      icon: <Trash size={16} />,
      type: 'delete',
      onClick: (row) => handleDelete([row.id], true)
    });
  }

  return (
    <div className="user-management-page">
      <div className="admin-header-row">
        <div>
          <h1 className="text-3xl font-bold mb-2">Users</h1>
          <p className="text-secondary">Manage and monitor student performance across the platform</p>
        </div>
      </div>

      <div className="admin-tabs-container">
        <button
          className={`admin-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active
          {activeTab === 'active' && <div className="admin-tab-indicator"></div>}
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'archive' ? 'active' : ''}`}
          onClick={() => setActiveTab('archive')}
        >
          Archived
          {activeTab === 'archive' && <div className="admin-tab-indicator"></div>}
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'deleted' ? 'active' : ''}`}
          onClick={() => setActiveTab('deleted')}
        >
          Deleted
          {activeTab === 'deleted' && <div className="admin-tab-indicator"></div>}
        </button>
      </div>

      <div className="table-container-card card glass" style={{ padding: 0 }}>
        <DataTable 
          data={students}
          columns={columns}
          bulkActions={bulkActions}
          rowActions={rowActions}
          searchPlaceholder="Search users by name, email..."
          isLoading={loading}
          error={error}
          errorConfig={{
            title: "Unable to Load Users",
            message: error,
            onRetry: fetchStudents,
            supportLink: "#"
          }}
          emptyConfig={{
            icon: <Users size={32} />,
            title: "No Users Found",
            message: "There are currently no students registered on the platform.",
            actionText: "Refresh List",
            onAction: fetchStudents
          }}
        />
      </div>
    </div>
  );
};

export default UserManagement;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  UserCheck, 
  UserX, 
  Loader2, 
  Users, 
  ShieldCheck, 
  BookOpen, 
  LayoutDashboard,
  CheckCircle2,
  AlertCircle,
  X,
  Mail,
  Trash2,
  Archive,
  Download,
  Eye,
  Edit2
} from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import { confirmAction } from '../../utils/confirmAction';

const AdminApproval = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvingId, setApprovingId] = useState(null);
  const [approvalResult, setApprovalResult] = useState(null);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/auth/pending-users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingUsers(response.data);
    } catch (err) {
      console.error('Error fetching pending users', err);
      setError('Failed to fetch pending requests. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const triggerApproveConfirm = (userId, userName) => {
    confirmAction(
<<<<<<< HEAD
      <>Are you sure you want to authorize <span style={{ color: '#FF6B35', fontWeight: 800 }}>{userName}</span>?</>,
      () => handleApprove(userId),
      'Confirm',
      'var(--primary-gradient)'
=======
      <>Are you sure you want to authorize <span style={{ color: '#8b5cf6', fontWeight: 800 }}>{userName}</span>?</>,
      () => handleApprove(userId),
      'Confirm',
      'linear-gradient(135deg, #8b5cf6, #ec4899)'
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
    );
  };

  const handleApprove = async (userId) => {
    setApprovingId(userId);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5001/api/auth/approve-user/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('User approved! OTP sent to their email.');
      // Remove from list
      setPendingUsers(pendingUsers.filter(u => u.id !== userId));
    } catch (err) {
      toast.error('Failed to approve user');
    } finally {
      setApprovingId(null);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'User Details',
      sortable: true,
      render: (row, highlight) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-gradient p-0.5">
            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden" style={{background: 'var(--surface-color)'}}>
              <span className="text-xs font-bold text-primary-color">
                {row.name ? row.name.charAt(0).toUpperCase() : '?'}
              </span>
            </div>
          </div>
          <div>
<<<<<<< HEAD
            <div className="font-bold text-primary">{highlight(row.name)}</div>
            <div className="text-xs text-secondary flex items-center gap-1">
=======
            <div className="font-bold text-white">{highlight(row.name)}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
              <Mail size={12} /> {highlight(row.email)}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      filterable: true,
      render: (row) => (
        <span className="category-badge">
          {row.role?.toUpperCase()}
        </span>
      )
    },
    {
      key: 'action',
      label: 'Action',
      render: (row) => (
        <div className="text-right">
          <button 
            onClick={() => triggerApproveConfirm(row.id, row.name)}
            disabled={approvingId === row.id}
            className="btn btn-primary px-6 py-2.5 flex items-center gap-2 ml-auto shadow-md"
          >
            {approvingId === row.id ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <UserCheck size={16} />
            )}
            Authorize User
          </button>
        </div>
      )
    }
  ];

  const bulkActions = [
    {
      label: 'Approve Selected',
      icon: <UserCheck size={16} />,
      onClick: (ids) => {
        confirmAction(
          `Are you sure you want to approve ${ids.length} users?`,
          () => {
            ids.forEach(id => handleApprove(id));
          },
          'Approve',
<<<<<<< HEAD
          'var(--primary-gradient)'
=======
          'linear-gradient(135deg, #8b5cf6, #ec4899)'
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
        );
      }
    },
    {
      label: 'Reject Selected',
      icon: <UserX size={16} />,
      type: 'delete',
      onClick: (ids) => {
        confirmAction(
          `Are you sure you want to reject ${ids.length} requests?`,
          async () => {
            try {
              const token = localStorage.getItem('token');
              await axios.post('http://localhost:5001/api/auth/bulk-delete', { ids }, {
                headers: { Authorization: `Bearer ${token}` }
              });
              setPendingUsers(pendingUsers.filter(u => !ids.includes(u.id)));
              toast.success(`Rejected ${ids.length} requests`);
            } catch (err) {
              toast.error('Failed to reject requests');
            }
          },
          'Reject',
          '#ef4444'
        );
      }
    }
  ];

  const rowActions = [
    {
      label: 'View Details',
      icon: <Eye size={16} />,
      onClick: (row) => toast.success(`Viewing details for ${row.name}`)
    },
    {
      label: 'Reject Request',
      icon: <UserX size={16} />,
      type: 'delete',
      onClick: (row) => {
        confirmAction(
          <>Are you sure you want to reject <span style={{ color: '#ef4444', fontWeight: 800 }}>{row.name}</span>'s request?</>,
          async () => {
            try {
              const token = localStorage.getItem('token');
              await axios.delete(`http://localhost:5001/api/auth/${row.id}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              setPendingUsers(pendingUsers.filter(u => u.id !== row.id));
              toast.success(`Rejected request for ${row.name}`);
            } catch (err) {
              toast.error('Failed to reject request');
            }
          },
          'Reject',
          '#ef4444'
        );
      }
    }
  ];

  return (
    <div className="admin-approvals-page max-w-[1400px] mx-auto">
      <div className="admin-header-row mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Pending Approvals</h1>
<<<<<<< HEAD
          <p className="text-secondary">Review and authorize new user registrations on UptoSkills</p>
=======
          <p className="text-gray-500">Review and authorize new user registrations on UptoSkills</p>
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-primary-color/10 text-primary-color px-4 py-2 rounded-xl text-sm font-bold border border-primary-color/20 flex items-center gap-2">
            <Users size={16} />
            {pendingUsers.length} Active Requests
          </span>
        </div>
      </div>

      <div className="admin-content-section">
        {approvalResult && (
          <div className="card glass mb-8 border-success-color/30 bg-success-color/5 p-4 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3 text-success-color">
              <CheckCircle2 size={20} />
              <p className="font-medium">{approvalResult.message}</p>
            </div>
<<<<<<< HEAD
            <button onClick={() => setApprovalResult(null)} className="text-secondary hover:text-primary transition-colors">
=======
            <button onClick={() => setApprovalResult(null)} className="text-gray-500 hover:text-white transition-colors">
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
              <X size={20} />
            </button>
          </div>
        )}

        <div className="admin-table-container card glass overflow-hidden" style={{ padding: 0 }}>
          <DataTable 
            data={pendingUsers}
            columns={columns}
            bulkActions={bulkActions}
            rowActions={rowActions}
            searchPlaceholder="Search requests by name or email..."
            isLoading={loading}
            error={error}
            errorConfig={{
              title: "Unable to Load Requests",
              message: error,
              onRetry: fetchPendingUsers,
              supportLink: "#"
            }}
            emptyConfig={{
              icon: <UserCheck size={32} />,
              title: "All Caught Up!",
              message: "There are no pending approval requests at the moment."
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminApproval;

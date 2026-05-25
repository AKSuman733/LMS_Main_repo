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
  Mail
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminApproval = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);
  const [approvalResult, setApprovalResult] = useState(null);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/auth/pending-users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingUsers(response.data);
    } catch (err) {
      console.error('Error fetching pending users', err);
    } finally {
      setLoading(false);
    }
  };

  const triggerApproveConfirm = (userId, userName) => {
    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '4px' }}>
        <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>
          Are you sure you want to authorize <span style={{ color: '#8b5cf6', fontWeight: 800 }}>{userName}</span>?
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'var(--surface-color-light)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = 'var(--border-color)'}
            onMouseOut={(e) => e.target.style.background = 'var(--surface-color-light)'}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleApprove(userId);
            }}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              border: 'none',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)'
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    ), {
      duration: 10000,
      position: 'top-center',
      style: {
        background: 'var(--surface-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '16px',
        minWidth: '320px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        color: 'var(--text-primary)'
      }
    });
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

  return (
    <div className="admin-approvals-page max-w-[1400px] mx-auto">
      <div className="admin-header-row mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Pending Approvals</h1>
          <p className="text-gray-500">Review and authorize new user registrations on UptoSkills</p>
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
            <button onClick={() => setApprovalResult(null)} className="text-gray-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        )}

        <div className="admin-table-container card glass overflow-hidden">
          {loading ? (
            <div className="text-center py-20">
              <Loader2 className="animate-spin mx-auto mb-4 text-primary-color" size={32} />
              <p className="text-gray-400 font-medium">Synchronizing pending requests...</p>
            </div>
          ) : pendingUsers.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCheck size={40} className="opacity-40" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">All Caught Up!</h3>
              <p>There are no pending approval requests at the moment.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User Details</th>
                  <th>Role</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary-gradient p-0.5">
                          <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden" style={{background: 'var(--surface-color)'}}>
                            <span className="text-xs font-bold text-primary-color">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-white">{user.name}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail size={12} /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">
                        {user.role?.toUpperCase()}
                      </span>
                    </td>
                    <td className="text-right">
                      <button 
                        onClick={() => triggerApproveConfirm(user.id, user.name)}
                        disabled={approvingId === user.id}
                        className="btn btn-primary px-6 py-2.5 flex items-center gap-2 ml-auto shadow-md"
                      >
                        {approvingId === user.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <UserCheck size={16} />
                        )}
                        Authorize User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminApproval;

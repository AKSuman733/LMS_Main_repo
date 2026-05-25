import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  Search, 
  MoreVertical, 
  Calendar,
  Mail,
  BookOpen,
  Filter
} from 'lucide-react';
import '../../styles/AdminLayout.css';

const UserManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/auth/all-students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(response.data);
    } catch (err) {
      console.error('Error fetching students', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="user-management-page">
      <div className="admin-header-row">
        <div>
          <h1 className="text-3xl font-bold mb-2">Users</h1>
          <p className="text-gray-500">Manage and monitor student performance across the platform</p>
        </div>
      </div>

      <div className="table-container-card card glass mt-8">
        <div className="table-header-toolbar">
          <div className="toolbar-left">
            <h3>User Accounts</h3>
          </div>
          <div className="toolbar-right">
            <div className="search-box-premium">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-dropdown-premium">
              <span>All statuses</span>
              <Filter size={16} />
            </div>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Courses</th>
                <th>Progress</th>
                <th>Joined</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-10">
                    <div className="spinner"></div>
                    <p className="mt-2 text-gray-500">Loading students...</p>
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10">
                    <p className="text-gray-500">No students found</p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="user-info-cell">
                        <div className="user-avatar-mini" style={{ background: `hsl(${student.id * 45}, 70%, 60%)` }}>
                          {student.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold">{student.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="email-cell">
                        <Mail size={14} className="text-gray-500 mr-2" />
                        {student.email}
                      </div>
                    </td>
                    <td>
                      <div className="courses-count-cell">
                        <span className="font-bold">{student.courses_count}</span>
                      </div>
                    </td>
                    <td>
                      <div className="progress-cell-group">
                        <div className="progress-bar-bg">
                          <div 
                            className="progress-bar-fill" 
                            style={{ width: `${student.average_progress}%`, background: student.average_progress > 80 ? '#10b981' : student.average_progress > 40 ? '#8b5cf6' : '#f59e0b' }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-gray-400">{Math.round(student.average_progress)}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">
                        {formatDate(student.joined_at)}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${student.is_approved ? 'active' : 'inactive'}`}>
                        {student.is_approved ? 'Active' : 'Pending'}
                      </span>
                    </td>
                    <td>
                      <button className="btn-icon">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

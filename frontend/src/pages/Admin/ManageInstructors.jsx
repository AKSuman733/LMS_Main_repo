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
  GraduationCap,
  Award
} from 'lucide-react';
import '../../styles/AdminLayout.css';

const ManageInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/auth/all-instructors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInstructors(response.data);
    } catch (err) {
      console.error('Error fetching instructors', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredInstructors = instructors.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (i.courses_list && i.courses_list.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="user-management-page">
      <div className="admin-header-row">
        <div>
          <h1 className="text-3xl font-bold mb-2">Instructors</h1>
          <p className="text-gray-500">Monitor registered platform instructors, their emails, and active courses they are providing</p>
        </div>
      </div>

      <div className="table-container-card card glass mt-8">
        <div className="table-header-toolbar">
          <div className="toolbar-left">
            <h3>Registered Instructors</h3>
          </div>
          <div className="toolbar-right">
            <div className="search-box-premium">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search instructors or courses..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-dropdown-premium">
              <span>All Statuses</span>
              <Filter size={16} />
            </div>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Instructor</th>
                <th>Email Address</th>
                <th>Courses Provided</th>
                <th>Course Catalog</th>
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
                    <p className="mt-2 text-gray-500">Loading instructors...</p>
                  </td>
                </tr>
              ) : filteredInstructors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10">
                    <p className="text-gray-500">No instructors found</p>
                  </td>
                </tr>
              ) : (
                filteredInstructors.map((inst) => (
                  <tr key={inst.id}>
                    <td>
                      <div className="user-info-cell">
                        <div 
                          className="user-avatar-mini" 
                          style={{ 
                            background: `linear-gradient(135deg, hsl(${inst.id * 75}, 70%, 50%), hsl(${(inst.id + 1) * 75}, 70%, 65%))` 
                          }}
                        >
                          {inst.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold block text-white">{inst.name}</span>
                          <span className="text-xs text-gray-400">ID: #{inst.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="email-cell text-gray-300">
                        <Mail size={14} className="text-gray-500 mr-2" />
                        {inst.email}
                      </div>
                    </td>
                    <td>
                      <div className="courses-count-cell">
                        <span className="font-extrabold text-primary-color bg-primary-color-light px-2.5 py-1 rounded-full text-sm">
                          {inst.courses_count} Course(s)
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="courses-list-cell max-w-xs overflow-hidden text-ellipsis">
                        {inst.courses_list && inst.courses_list !== 'No courses yet' ? (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {inst.courses_list.split(', ').map((course, idx) => (
                              <span 
                                key={idx}
                                style={{
                                  fontSize: '0.75rem',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  background: 'rgba(139, 92, 246, 0.1)',
                                  border: '1px solid rgba(139, 92, 246, 0.2)',
                                  color: '#a78bfa',
                                  fontWeight: 600,
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-500 italic text-sm">No courses registered</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="date-cell text-gray-400 text-sm">
                        {formatDate(inst.joined_at)}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${inst.is_approved ? 'active' : 'inactive'}`}>
                        {inst.is_approved ? 'Approved' : 'Pending Approval'}
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

export default ManageInstructors;

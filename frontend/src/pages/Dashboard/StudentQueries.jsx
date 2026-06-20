import { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, Search, Eye, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const StudentQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/contact/student/queries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQueries(res.data);
    } catch (err) {
      console.error('Error fetching queries:', err);
      toast.error('Failed to load your queries');
    } finally {
      setLoading(false);
    }
  };

  const filteredQueries = queries.filter(q => {
    const matchesSearch = 
      (q.subject && q.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (q.query_type && q.query_type.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeTab === 'Pending') return q.status === 'Pending';
    if (activeTab === 'Resolved') return q.status === 'Answered';
    return true; // 'All'
  });

  return (
    <div className="dashboard-content animate-fade-in" style={{ padding: '2rem' }}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
            <div style={{ padding: '10px', background: 'var(--surface-color-light)', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <MessageCircle size={28} className="text-blue-500" />
            </div>
            Support Queries
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '1.05rem' }}>Track your support requests and admin replies</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', minHeight: '650px', alignItems: 'flex-start' }}>
        
        {/* Left Side: Sidebar */}
        <div style={{ width: '360px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Search Box */}
          <div className="search-box-premium" style={{ width: '100%', borderRadius: '16px', background: 'var(--surface-color)', padding: '14px 20px', boxShadow: 'var(--shadow-sm)' }}>
            <Search size={20} className="text-secondary" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', fontSize: '1rem', color: 'var(--text-primary)' }}
            />
          </div>

          {/* Segmented Control */}
          <div style={{ display: 'flex', background: 'var(--surface-color-light)', padding: '6px', borderRadius: '14px', gap: '4px' }}>
            {['All', 'Pending', 'Resolved'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSelectedQuery(null); }}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  background: activeTab === tab ? 'var(--surface-color)' : 'transparent',
                  color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: activeTab === tab ? 'var(--border-color)' : 'transparent',
                  borderRadius: '10px',
                  fontWeight: activeTab === tab ? '600' : '500',
                  fontSize: '0.9rem',
                  boxShadow: activeTab === tab ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Query List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '500px', paddingRight: '4px' }} className="custom-scrollbar">
            {loading ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading your queries...</div>
            ) : filteredQueries.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>You haven't submitted any queries yet.</div>
            ) : (
              filteredQueries.map(q => (
                <div 
                  key={q.id} 
                  onClick={() => setSelectedQuery(q)}
                  style={{
                    padding: '20px',
                    background: 'var(--surface-color)',
                    border: '1px solid',
                    borderColor: selectedQuery?.id === q.id ? 'var(--primary-color)' : 'var(--border-color)',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: selectedQuery?.id === q.id ? '0 0 0 2px rgba(255, 107, 53, 0.2)' : 'var(--shadow-sm)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    if (selectedQuery?.id !== q.id) e.currentTarget.style.borderColor = 'var(--text-secondary)';
                  }}
                  onMouseOut={(e) => {
                    if (selectedQuery?.id !== q.id) e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      padding: '4px 10px', 
                      borderRadius: '8px', 
                      fontWeight: '700', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      background: q.status === 'Answered' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: q.status === 'Answered' ? 'var(--success-color)' : 'var(--warning-color)',
                      border: `1px solid ${q.status === 'Answered' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`
                    }}>
                      {q.status === 'Answered' ? 'RESOLVED' : 'PENDING'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                      {new Date(q.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '6px', lineHeight: '1.3' }}>
                    {q.subject}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{q.query_type}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Query Details & Reply */}
        <div style={{ flex: 1, height: '100%' }}>
          {selectedQuery ? (
            <div style={{ 
              background: 'var(--surface-color)', 
              borderRadius: '24px', 
              border: '1px solid var(--border-color)', 
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Card Header */}
              <div style={{ padding: '32px 32px 24px 32px', borderBottom: '1px solid var(--border-color)', background: 'var(--surface-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.2' }}>
                    {selectedQuery.subject}
                  </h2>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    padding: '6px 14px', 
                    borderRadius: '10px', 
                    fontWeight: '700', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    background: selectedQuery.status === 'Answered' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: selectedQuery.status === 'Answered' ? 'var(--success-color)' : 'var(--warning-color)',
                    border: `1px solid ${selectedQuery.status === 'Answered' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`
                  }}>
                    {selectedQuery.status === 'Answered' ? 'RESOLVED' : 'PENDING'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
                  <span><strong style={{ color: 'var(--text-primary)' }}>Type:</strong> {selectedQuery.query_type}</span>
                  <span>•</span>
                  <span>{new Date(selectedQuery.created_at).toLocaleString()}</span>
                </div>
              </div>

              <div style={{ padding: '32px', background: 'var(--bg-color)', flex: 1 }}>
                
                {/* Message Content Box */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ 
                    background: 'var(--surface-color)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', background: 'var(--surface-color-light)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--info-color)', letterSpacing: '0.5px' }}>MESSAGE CONTENT</span>
                    </div>
                    <div style={{ padding: '24px', color: 'var(--text-primary)', fontSize: '1rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {selectedQuery.message}
                    </div>
                  </div>
                </div>

                {selectedQuery.attachment_url && (
                  <div style={{ marginBottom: '24px' }}>
                    <a 
                      href={`http://localhost:5001${selectedQuery.attachment_url}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        borderRadius: '12px',
                        color: 'var(--info-color)',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)' }}
                    >
                      <Eye size={18} /> View Attached File
                    </a>
                  </div>
                )}

                {/* Admin Resolution Box */}
                <div>
                  {selectedQuery.status === 'Answered' ? (
                    <div style={{ 
                      background: 'rgba(16, 185, 129, 0.05)', 
                      border: '1px solid rgba(16, 185, 129, 0.2)', 
                      borderRadius: '16px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(16, 185, 129, 0.1)', background: 'rgba(16, 185, 129, 0.1)' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--success-color)', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle size={14} /> ADMIN RESOLUTION
                        </span>
                      </div>
                      <div style={{ padding: '24px', color: 'var(--text-primary)', fontSize: '1rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                        {selectedQuery.admin_reply}
                      </div>
                    </div>
                  ) : (
                    <div style={{ 
                      background: 'rgba(245, 158, 11, 0.05)', 
                      border: '1px solid rgba(245, 158, 11, 0.2)', 
                      borderRadius: '16px',
                      padding: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}>
                      <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', color: 'var(--warning-color)' }}>
                        <Clock size={24} />
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '700' }}>Your query is under review</h4>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>An admin will respond to your inquiry soon. You'll also receive an email notification.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%', 
              minHeight: '500px',
              background: 'var(--surface-color)', 
              borderRadius: '24px', 
              border: '1px dashed var(--border-color)',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--surface-color-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <MessageCircle size={40} style={{ opacity: 0.5 }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>Select a query</h3>
              <p style={{ fontSize: '0.95rem' }}>Click on any query from the list to view its details and responses.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentQueries;

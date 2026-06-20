import { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, CheckCircle, Search, Eye, Send, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import '../../styles/AdminLayout.css';

const AdminSupportQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/contact/admin/queries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQueries(res.data);
    } catch (err) {
      console.error('Error fetching queries:', err);
      toast.error('Failed to load support queries');
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) {
      toast.error('Reply message cannot be empty');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5001/api/contact/admin/reply/${selectedQuery.id}`, 
        { reply: replyMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Reply sent successfully!');
      setReplyMessage('');
      setSelectedQuery(null);
      fetchQueries();
    } catch (err) {
      console.error('Error sending reply:', err);
      toast.error('Failed to send reply');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredQueries = queries.filter(q => {
    const matchesSearch = 
      q.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (!matchesSearch) return false;
    
    if (activeTab === 'Pending') return q.status === 'Pending';
    if (activeTab === 'Resolved') return q.status === 'Answered';
    return true; // 'All'
  });

  return (
    <div className="admin-content-inner animate-fade-in" style={{ padding: '1rem' }}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
            <div style={{ padding: '10px', background: 'var(--surface-color-light)', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <MessageCircle size={28} className="text-blue-500" />
            </div>
            Support Queries
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '1.05rem' }}>View and respond to student inquiries</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', minHeight: '650px', alignItems: 'flex-start' }}>
        
        {/* Left Side: Sidebar */}
        <div style={{ width: '360px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Search Box */}
          <div className="search-box-premium" style={{ width: '100%', borderRadius: '16px', background: 'var(--surface-color)', padding: '14px 20px', boxShadow: 'var(--shadow-sm)' }}>
<<<<<<< HEAD
            <Search size={20} className="text-secondary" />
=======
            <Search size={20} className="text-gray-400" />
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
            <input
              type="text"
              placeholder="Search queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', fontSize: '1rem', color: 'var(--text-primary)', background: 'transparent', border: 'none', outline: 'none' }}
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
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading queries...</div>
            ) : filteredQueries.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>No queries found</div>
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
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{q.full_name}</span>
                  </p>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500', flexWrap: 'wrap' }}>
                  <span><strong style={{ color: 'var(--text-primary)' }}>User:</strong> {selectedQuery.full_name} ({selectedQuery.email})</span>
                  <span>•</span>
                  <span><strong style={{ color: 'var(--text-primary)' }}>Phone:</strong> {selectedQuery.phone_number}</span>
                  <span>•</span>
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

                {/* Admin Resolution / Draft Reply Box */}
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
                      overflow: 'hidden'
                    }}>
                      <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(245, 158, 11, 0.1)', background: 'rgba(245, 158, 11, 0.1)' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--warning-color)', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <AlertTriangle size={14} /> DRAFT REPLY
                        </span>
                      </div>
                      <div style={{ padding: '24px' }}>
                        <form onSubmit={handleReplySubmit}>
                          <textarea
                            style={{
                              width: '100%',
                              background: 'var(--surface-color)',
                              border: '1px solid var(--border-color)',
                              borderRadius: '12px',
                              padding: '16px',
                              color: 'var(--text-primary)',
                              minHeight: '120px',
                              resize: 'vertical',
                              outline: 'none',
                              fontSize: '1rem',
                              fontFamily: 'inherit',
                              marginBottom: '16px',
                              transition: 'all 0.2s'
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = 'var(--primary-color)';
                              e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255, 107, 53, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = 'var(--border-color)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                            placeholder={`Type your reply to ${selectedQuery.full_name}...`}
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            required
                          ></textarea>
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button 
                              type="submit" 
                              disabled={isSubmitting}
                              className="btn btn-primary"
                              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.95rem' }}
                            >
                              {isSubmitting ? 'Sending...' : <><Send size={18} /> Send Reply & Email</>}
                            </button>
                          </div>
                        </form>
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
              <p style={{ fontSize: '0.95rem' }}>Click on any query from the list to view details and send a reply.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSupportQueries;

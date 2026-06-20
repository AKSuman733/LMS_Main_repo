import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Bell, Check, CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('unread');
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await axios.get('http://localhost:5001/api/notifications/my-notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
<<<<<<< HEAD
      
=======
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
      setNotifications(res.data);
      setUnreadCount(res.data.filter(n => !n.is_read).length);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5001/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      toast.error('Failed to mark notification as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5001/api/notifications/read-all`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err) {
      toast.error('Failed to mark all as read');
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle2 size={18} color="#10b981" />;
      case 'warning': return <AlertTriangle size={18} color="#f59e0b" />;
      case 'error': return <XCircle size={18} color="#f43f5e" />;
      default: return <Info size={18} color="#3b82f6" />;
    }
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filteredNotifications = notifications.filter(n => activeTab === 'unread' ? !n.is_read : n.is_read);

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button 
        title="Notifications"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          borderRadius: '50%',
          background: 'transparent',
          border: 'none',
          color: '#cbd5e1',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '8px',
            width: '8px',
            height: '8px',
            backgroundColor: '#f43f5e',
            borderRadius: '50%',
            border: '2px solid #0f172a',
            boxSizing: 'content-box'
          }}></span>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 15px)',
          right: '0',
          width: '380px',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div>
              <h3 style={{ margin: 0, color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Notifications</h3>
              <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '12px' }}>
<<<<<<< HEAD
                You have <span style={{ color: '#FF6B35', fontWeight: 'bold' }}>{unreadCount}</span> unread
=======
                You have <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>{unreadCount}</span> unread
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
              </p>
            </div>
            {unreadCount > 0 && activeTab === 'unread' && (
              <button 
                onClick={markAllAsRead}
                style={{
                  background: 'transparent',
                  border: 'none',
<<<<<<< HEAD
                  color: '#FF6B35',
=======
                  color: '#8b5cf6',
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  transition: 'all 0.2s'
                }}
<<<<<<< HEAD
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 107, 53, 0.1)'}
=======
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)'}
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Segmented Control */}
          <div style={{ padding: '15px 20px 10px 20px' }}>
            <div style={{
              display: 'flex',
              background: 'rgba(0,0,0,0.3)',
              padding: '4px',
              borderRadius: '10px',
              gap: '4px'
            }}>
              <button 
                onClick={() => setActiveTab('unread')}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  background: activeTab === 'unread' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  color: activeTab === 'unread' ? 'white' : '#94a3b8',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeTab === 'unread' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Unread
              </button>
              <button 
                onClick={() => setActiveTab('read')}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  background: activeTab === 'read' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  color: activeTab === 'read' ? 'white' : '#94a3b8',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeTab === 'read' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Read
              </button>
            </div>
          </div>
          
          {/* Notification Grid List */}
          <div style={{
            maxHeight: '380px',
            overflowY: 'auto',
            padding: '10px 10px 20px 10px'
          }}>
            {filteredNotifications.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  color: '#64748b'
                }}>
                  <Bell size={28} strokeWidth={1.5} />
                </div>
                <p style={{ margin: 0, color: '#f8fafc', fontWeight: '600', fontSize: '16px' }}>You're all caught up</p>
                <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '14px' }}>No {activeTab} notifications right now.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    onClick={() => !notification.is_read && markAsRead(notification.id)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '40px 1fr 32px',
                      gap: '12px',
                      padding: '16px',
                      borderRadius: '16px',
<<<<<<< HEAD
                      background: !notification.is_read ? 'rgba(255, 107, 53, 0.05)' : 'transparent',
                      border: '1px solid',
                      borderColor: !notification.is_read ? 'rgba(255, 107, 53, 0.2)' : 'rgba(255,255,255,0.05)',
=======
                      background: !notification.is_read ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                      border: '1px solid',
                      borderColor: !notification.is_read ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.05)',
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      const btn = e.currentTarget.querySelector('.mark-read-btn');
                      if (btn) btn.style.opacity = '1';
                    }}
                    onMouseOut={(e) => {
<<<<<<< HEAD
                      e.currentTarget.style.background = !notification.is_read ? 'rgba(255, 107, 53, 0.05)' : 'transparent';
=======
                      e.currentTarget.style.background = !notification.is_read ? 'rgba(139, 92, 246, 0.05)' : 'transparent';
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                      const btn = e.currentTarget.querySelector('.mark-read-btn');
                      if (btn) btn.style.opacity = '0';
                    }}
                  >
                    {!notification.is_read && (
                      <div style={{
                        position: 'absolute',
                        left: '0',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '3px',
                        height: '24px',
<<<<<<< HEAD
                        background: '#FF6B35',
                        borderRadius: '0 4px 4px 0',
                        boxShadow: '0 0 10px rgba(255, 107, 53, 0.5)'
=======
                        background: '#8b5cf6',
                        borderRadius: '0 4px 4px 0',
                        boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                      }}></div>
                    )}
                    
                    {/* Icon */}
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {getIcon(notification.type)}
                    </div>
                    
                    {/* Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                        <h4 style={{ 
                          margin: 0, 
                          fontSize: '14px', 
                          fontWeight: !notification.is_read ? '700' : '500',
                          color: !notification.is_read ? 'white' : '#cbd5e1',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          paddingRight: '8px'
                        }}>
                          {notification.title}
                        </h4>
                        <span style={{ 
                          fontSize: '11px', 
                          color: !notification.is_read ? '#a78bfa' : '#64748b',
                          fontWeight: '500',
                          flexShrink: 0
                        }}>
                          {timeAgo(notification.created_at)}
                        </span>
                      </div>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '13px', 
                        lineHeight: '1.4', 
                        color: !notification.is_read ? '#e2e8f0' : '#64748b',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {notification.message}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {!notification.is_read && (
                        <button 
                          className="mark-read-btn"
                          title="Mark as read"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
<<<<<<< HEAD
                            background: 'rgba(255, 107, 53, 0.1)',
                            border: '1px solid rgba(255, 107, 53, 0.3)',
=======
                            background: 'rgba(139, 92, 246, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                            color: '#a78bfa',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            opacity: '0',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseOver={(e) => {
<<<<<<< HEAD
                            e.currentTarget.style.background = '#FF6B35';
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 107, 53, 0.1)';
=======
                            e.currentTarget.style.background = '#8b5cf6';
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                            e.currentTarget.style.color = '#a78bfa';
                          }}
                        >
                          <Check size={14} strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;

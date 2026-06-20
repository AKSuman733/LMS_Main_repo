import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Star, 
  Search, 
  Trash2,
  Archive,
  Eye,
  RefreshCw,
  Trash,
  PlusCircle,
  Edit2,
  X,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import { confirmAction } from '../../utils/confirmAction';
import '../../styles/AdminLayout.css';

const ManageCelebrities = () => {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('active');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', image_url: '', role: '', quote: '', badge: '' });
  const [editingId, setEditingId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchCelebrities();
  }, [activeTab]);

  const fetchCelebrities = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5001/api/celebrities?status=${activeTab}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCelebrities(response.data);
    } catch (err) {
      console.error('Error fetching celebrities', err);
      setError('Failed to fetch celebrities. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`http://localhost:5001/api/celebrities/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Celebrity updated successfully');
      } else {
        await axios.post('http://localhost:5001/api/celebrities', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Celebrity added successfully');
      }
      setIsModalOpen(false);
      setFormData({ name: '', description: '', image_url: '', role: '', quote: '', badge: '' });
      setEditingId(null);
      setPreviewUrl(null);
      fetchCelebrities();
    } catch (err) {
      toast.error('Failed to save celebrity');
    }
  };

  const openAddModal = () => {
    setFormData({ name: '', description: '', image_url: '', role: '', quote: '', badge: '' });
    setEditingId(null);
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  const openEditModal = (row) => {
    setFormData({ 
      name: row.name, 
      image_url: row.image_url || '',
      role: row.role || '',
      quote: row.quote || '',
      description: row.description || '',
      badge: row.badge || ''
    });
    setPreviewUrl(row.image_url || null);
    setEditingId(row.id);
    setIsModalOpen(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only JPG, PNG and WEBP formats are accepted');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const uploadData = new FormData();
      uploadData.append('file', file);
      
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:5001/api/upload', uploadData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setFormData({ ...formData, image_url: res.data.url });
        toast.success('Image uploaded successfully');
      } catch (err) {
        toast.error('Failed to upload image');
      }
    }
  };

  const handleDelete = (ids, isHard) => {
    confirmAction(
      `Are you sure you want to ${isHard ? 'permanently ' : ''}delete ${ids.length} celebrities?`,
      async () => {
        try {
          const token = localStorage.getItem('token');
          await axios.post(`http://localhost:5001/api/celebrities/bulk-delete?hard=${isHard}`, { ids }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCelebrities(celebrities.filter(c => !ids.includes(c.id)));
          toast.success(`${isHard ? 'Permanently deleted' : 'Deleted'} ${ids.length} celebrities`);
        } catch (err) {
          toast.error('Failed to delete celebrities');
        }
      },
      isHard ? 'Permanently Delete' : 'Delete',
      '#ef4444'
    );
  };

  const handleRestore = async (ids) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5001/api/celebrities/bulk-restore', { ids }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCelebrities(celebrities.filter(c => !ids.includes(c.id)));
      toast.success(`Restored ${ids.length} celebrities`);
    } catch (err) {
      toast.error('Failed to restore celebrities');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const columns = [
    {
      key: 'name',
      label: 'Celebrity',
      sortable: true,
      render: (row, highlight) => (
        <div className="user-info-cell">
          {row.image_url ? (
            <img src={row.image_url} alt={row.name} className="w-8 h-8 rounded-full object-cover mr-3" />
          ) : (
            <div className="user-avatar-mini" style={{ background: `hsl(${row.id * 45}, 70%, 60%)` }}>
              {row.name ? row.name.substring(0, 2).toUpperCase() : '?'}
            </div>
          )}
          <span className="font-bold">{highlight(row.name)}</span>
        </div>
      )
    },
    {
      key: 'bio',
      label: 'Bio',
      render: (row) => (
<<<<<<< HEAD
        <div className="text-secondary text-sm truncate max-w-xs">
=======
        <div className="text-gray-400 text-sm truncate max-w-xs">
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
          {row.description || row.bio || 'No bio available'}
        </div>
      )
    },
    {
      key: 'created_at',
      label: 'Added',
      sortable: true,
      render: (row) => (
        <div className="date-cell">
          {formatDate(row.created_at)}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      filterable: true,
      render: (row) => {
        let statusText = 'Active';
        let statusClass = 'active';
        
        if (row.is_deleted) {
          statusText = 'Deleted';
          statusClass = 'inactive';
        } else if (row.is_archived) {
          statusText = 'Archived';
          statusClass = 'inactive';
        }

        return (
          <span className={`status-badge ${statusClass}`}>
            {statusText}
          </span>
        );
      }
    }
  ];

  let bulkActions = [];

  if (activeTab === 'active') {
    bulkActions.push({
      label: 'Archive',
      icon: <Archive size={16} />,
      onClick: async (ids) => {
        try {
          const token = localStorage.getItem('token');
          await axios.put('http://localhost:5001/api/celebrities/bulk-archive', { ids }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCelebrities(celebrities.filter(c => !ids.includes(c.id)));
          toast.success(`Archived ${ids.length} celebrities`);
        } catch (err) {
          toast.error('Failed to archive celebrities');
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

  let rowActions = [];

  if (activeTab === 'active') {
    rowActions.push({
      label: 'Edit',
      icon: <Edit2 size={16} />,
      onClick: (row) => openEditModal(row)
    });
    rowActions.push({
      label: 'Archive',
      icon: <Archive size={16} />,
      onClick: async (row) => {
        try {
          const token = localStorage.getItem('token');
          await axios.put(`http://localhost:5001/api/celebrities/archive/${row.id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCelebrities(celebrities.filter(c => c.id !== row.id));
          toast.success(`Archived: ${row.name}`);
        } catch (err) {
          toast.error('Failed to archive');
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
          <h1 className="text-3xl font-bold mb-2">Celebrities</h1>
<<<<<<< HEAD
          <p className="text-secondary">Manage platform celebrities</p>
=======
          <p className="text-gray-500">Manage platform celebrities</p>
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
        </div>
        <button className="btn btn-primary flex items-center gap-2" onClick={openAddModal}>
          <PlusCircle size={20} />
          Add Celebrity
        </button>
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
          data={celebrities}
          columns={columns}
          bulkActions={bulkActions}
          rowActions={rowActions}
          searchPlaceholder="Search celebrities..."
          isLoading={loading}
          error={error}
          errorConfig={{
            title: "Unable to Load Celebrities",
            message: error,
            onRetry: fetchCelebrities,
            supportLink: "#"
          }}
          emptyConfig={{
            icon: <Star size={32} />,
            title: "No Celebrities Found",
            message: "There are currently no celebrities here.",
            actionText: "Add First Celebrity",
            onAction: openAddModal
          }}
        />
      </div>

      {isModalOpen && (
        <div className="course-form-modal">
          <div className="course-form-card card glass animate-fade-in">
            <div className="flex justify-between items-center mb-8 border-bottom-white pb-4">
              <div>
<<<<<<< HEAD
                <h2 className="text-2xl font-bold text-primary">{editingId ? 'Update Celebrity' : 'Add New Celebrity'}</h2>
                <p className="text-sm text-secondary">Fill in the details below</p>
=======
                <h2 className="text-2xl font-bold text-white">{editingId ? 'Update Celebrity' : 'Add New Celebrity'}</h2>
                <p className="text-sm text-gray-500">Fill in the details below</p>
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
              </div>
              <button onClick={() => setIsModalOpen(false)} className="close-btn-round">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    required
                    className="form-input-premium"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Image Upload</label>
                  <div 
                    className="image-upload-zone"
                    style={{ height: '64px' }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    {previewUrl ? (
                      <div className="preview-container">
                        <img src={previewUrl} alt="Preview" className="upload-preview" />
                        <div className="upload-overlay">
                          <Upload size={24} />
                          <span>Change</span>
                        </div>
                      </div>
                    ) : (
                      <div className="upload-placeholder" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row' }}>
                        <div className="icon-circle" style={{ width: '32px', height: '32px' }}>
                          <ImageIcon size={16} />
                        </div>
<<<<<<< HEAD
                        <p className="font-semibold text-primary text-sm" style={{ margin: 0 }}>Upload image</p>
=======
                        <p className="font-semibold text-white text-sm" style={{ margin: 0 }}>Upload image</p>
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Role Title</label>
                  <input
                    type="text"
                    className="form-input-premium"
                    placeholder="e.g. King Khan Style Lectures"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Badge</label>
                  <input
                    type="text"
                    className="form-input-premium"
                    placeholder="e.g. Bestseller"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Quote</label>
                <input
                  type="text"
                  className="form-input-premium"
                  placeholder='e.g. "Learn technical structures with premium, high-energy charisma!"'
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description / Bio</label>
                <textarea
                  className="form-input-premium min-h-[120px] resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="modal-footer pt-4">
                <button type="submit" className="btn btn-primary w-full py-4 text-lg font-bold shadow-lg flex items-center justify-center gap-2">
                  {editingId ? 'Save Changes' : 'Publish Celebrity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCelebrities;

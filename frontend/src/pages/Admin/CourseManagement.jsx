import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  X, 
  BookOpen,
  Loader2,
  Image as ImageIcon,
  Upload,
  Clock,
  IndianRupee,
  Eye,
  Archive,
  Download
} from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import { confirmAction } from '../../utils/confirmAction';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Java Programming',
    level: 'Beginner',
    price: 0,
    duration: '',
    thumbnail: ''
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const categories = [
    'Java Programming', 
    'Python', 
    'Full Stack Development', 
    'Cloud Computing', 
    'Data Science', 
    'DSA', 
    'AI', 
    'Machine Learning',
    'Web Development',
    'Mobile App Development'
  ];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5001/api/courses');
      setCourses(response.data);
    } catch (err) {
      console.error('Error fetching courses', err);
      setError('Failed to fetch courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
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
        // In a real app, you'd upload the file to a server here
        // For now, we'll store the base64 or a placeholder
        setFormData({ ...formData, thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setIsSubmitting(true);
    try {
      if (editingCourse) {
        await axios.put(`http://localhost:5001/api/courses/${editingCourse.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Course updated successfully!');
      } else {
        await axios.post('http://localhost:5001/api/courses/create', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Course created successfully!');
      }
      setShowModal(false);
      setEditingCourse(null);
      resetForm();
      fetchCourses();
    } catch (err) {
      toast.error('Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (course) => {
    confirmAction(
      <>Are you sure you want to delete <span style={{ color: '#ef4444', fontWeight: 800 }}>{course.title}</span>?</>,
      async () => {
        const token = localStorage.getItem('token');
        try {
          await axios.delete(`http://localhost:5001/api/courses/${course.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          toast.success('Course deleted successfully!');
          fetchCourses();
        } catch (err) {
          toast.error('Delete failed');
        }
      },
      'Delete',
      '#ef4444'
    );
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category || 'Java Programming',
      level: course.level || 'Beginner',
      price: course.price,
      duration: course.duration,
      thumbnail: course.thumbnail
    });
    setPreviewUrl(course.thumbnail);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Java Programming',
      level: 'Beginner',
      price: 0,
      duration: '',
      thumbnail: ''
    });
    setPreviewUrl(null);
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'title',
      label: 'Course Details',
      sortable: true,
      render: (row, highlight) => (
        <div className="flex items-center gap-4">
          <div className="table-img-wrapper">
            <img 
              src={row.thumbnail || 'https://via.placeholder.com/50'} 
              alt="" 
              className="course-table-img"
            />
          </div>
          <div>
            <div className="font-bold text-primary">{highlight(row.title)}</div>
            <div className="text-xs text-secondary flex items-center gap-1 mt-1">
              <Clock size={12} /> {highlight(row.duration)}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      filterable: true,
      render: (row, highlight) => (
        <span className="category-badge">
          {row.category ? highlight(row.category) : 'Uncategorized'}
        </span>
      )
    },
    {
      key: 'level',
      label: 'Difficulty',
      sortable: true,
      filterable: true,
      render: (row) => (
        <span className={`level-tag ${row.level?.toLowerCase()}`}>
          {row.level}
        </span>
      )
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (row) => (
        <div className="price-tag">
          {row.price === "0.00" || row.price === 0 ? (
            <span className="text-success-color font-bold">Free</span>
          ) : (
            <span className="flex items-center gap-0.5">
              <IndianRupee size={16} />{row.price}
            </span>
          )}
        </div>
      )
    }
  ];

  const bulkActions = [
    {
      label: 'Delete Selected',
      icon: <Trash2 size={16} />,
      type: 'delete',
      onClick: (ids) => {
        confirmAction(
          `Are you sure you want to delete ${ids.length} courses?`,
          async () => {
            try {
              const token = localStorage.getItem('token');
              await axios.post('http://localhost:5001/api/courses/bulk-delete', { ids }, {
                headers: { Authorization: `Bearer ${token}` }
              });
              setCourses(courses.filter(c => !ids.includes(c.id)));
              toast.success(`Deleted ${ids.length} courses`);
            } catch (err) {
              toast.error('Failed to delete courses');
            }
          },
          'Delete',
          '#ef4444'
        );
      }
    },
    {
      label: 'Export',
      icon: <Download size={16} />,
      onClick: async (ids) => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get('http://localhost:5001/api/courses/export/csv', {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob'
          });
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'courses.csv');
          document.body.appendChild(link);
          link.click();
          toast.success(`Exported courses successfully`);
        } catch (err) {
          toast.error('Failed to export courses');
        }
      }
    },
    {
      label: 'Archive',
      icon: <Archive size={16} />,
      onClick: (ids) => toast.success(`Archived ${ids.length} courses`)
    }
  ];

  const rowActions = [
    {
      label: 'View',
      icon: <Eye size={16} />,
      onClick: (row) => toast.success(`Viewing course: ${row.title}`)
    },
    {
      label: 'Edit',
      icon: <Edit2 size={16} />,
      onClick: (row) => openEditModal(row)
    },
    {
      label: 'Archive',
      icon: <Archive size={16} />,
      onClick: (row) => toast.success(`Course archived: ${row.title}`)
    },
    {
      label: 'Delete',
      icon: <Trash2 size={16} />,
      type: 'delete',
      onClick: (row) => handleDelete(row)
    }
  ];

  return (
    <div className="course-mgmt-page">
      <div className="admin-header-row mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Course Management</h1>
          <p className="text-secondary">Add, update or remove professional courses from UptoSkills</p>
        </div>
        <button 
          onClick={() => { resetForm(); setEditingCourse(null); setShowModal(true); }}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={20} /> Add New Course
        </button>
      </div>

      <div className="admin-table-container card glass overflow-hidden" style={{ padding: 0 }}>
        <DataTable 
          data={courses}
          columns={columns}
          bulkActions={bulkActions}
          rowActions={rowActions}
          searchPlaceholder="Search courses by title, category, duration..."
          isLoading={loading}
          error={error}
          errorConfig={{
            title: "Unable to Load Courses",
            message: error,
            onRetry: fetchCourses,
            supportLink: "#"
          }}
          emptyConfig={{
            icon: <BookOpen size={32} />,
            title: "No Courses Yet",
            message: "Ready to create your first course?",
            actionText: "+ Create Course",
            onAction: () => { resetForm(); setEditingCourse(null); setShowModal(true); }
          }}
        />
      </div>

      {showModal && (
        <div className="course-form-modal">
          <div className="course-form-card card glass animate-fade-in">
            <div className="flex justify-between items-center mb-8 border-bottom-white pb-4">
              <div>
                <h2 className="text-2xl font-bold text-primary">{editingCourse ? 'Update Course' : 'Create New Course'}</h2>
                <p className="text-sm text-secondary">Fill in the details below to {editingCourse ? 'update' : 'publish'} the course</p>
              </div>
              <button onClick={() => setShowModal(false)} className="close-btn-round">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="form-group">
                <label className="form-label">Course Title</label>
                <input 
                  type="text" 
                  className="form-input-premium"
                  placeholder="e.g. Advanced Java Programming"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-input-premium"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Level</label>
                  <select 
                    className="form-input-premium"
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                  >
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" size={16} />
                    <input 
                      type="number" 
                      min="0"
                      className="form-input-premium pl-10"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (val < 0) {
                          toast.error('Price cannot be negative');
                          return;
                        }
                        setFormData({...formData, price: e.target.value})
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" size={16} />
                    <input 
                      type="text" 
                      className="form-input-premium pl-10"
                      placeholder="e.g. 15 Hours"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Course Thumbnail</label>
                <div 
                  className="image-upload-zone"
                  onClick={() => fileInputRef.current.click()}
                >
                  {previewUrl ? (
                    <div className="preview-container">
                      <img src={previewUrl} alt="Preview" className="upload-preview" />
                      <div className="upload-overlay">
                        <Upload size={24} />
                        <span>Change Image</span>
                      </div>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <div className="icon-circle">
                        <ImageIcon size={32} />
                      </div>
                      <p className="font-semibold text-primary">Click to upload image</p>
                      <p className="text-xs text-secondary">JPG, PNG or WEBP (Max 2MB)</p>
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

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-input-premium min-h-[120px] resize-none"
                  placeholder="Detailed course curriculum and objectives..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="modal-footer pt-4">
                <button type="submit" className="btn btn-primary w-full py-4 text-lg font-bold shadow-lg flex items-center justify-center gap-2" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="animate-spin" size={24} /> Processing...</> : editingCourse ? 'Update Course Details' : 'Publish New Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;

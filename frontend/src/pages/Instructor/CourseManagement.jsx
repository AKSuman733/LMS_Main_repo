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
  IndianRupee
} from 'lucide-react';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
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
    thumbnail: '',
    celebrity: ''
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
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/courses/instructor-courses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data);
    } catch (err) {
      console.error('Error fetching courses', err);
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

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5001/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Course deleted successfully!');
      fetchCourses();
    } catch (err) {
      toast.error('Delete failed');
    }
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
      thumbnail: course.thumbnail,
      celebrity: course.celebrity || ''
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
      thumbnail: '',
      celebrity: ''
    });
    setPreviewUrl(null);
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="course-mgmt-page">
      <div className="admin-header-row mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Courses</h1>
          <p className="text-gray-500">Create and manage your educational content on UptoSkills</p>
        </div>
        <button 
          onClick={() => { resetForm(); setEditingCourse(null); setShowModal(true); }}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={20} /> Create New Course
        </button>
      </div>

      <div className="search-toolbar card glass mb-8 p-4 flex items-center gap-4">
        <div className="search-box-premium flex-1">
          <Search size={20} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="Search your courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-table-container card glass overflow-hidden">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Course Details</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-20">
                  <Loader2 className="animate-spin mx-auto mb-2 text-primary-color" />
                  <span className="text-gray-400">Loading your courses...</span>
                </td>
              </tr>
            ) : filteredCourses.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-20 text-gray-500">
                  You haven't created any courses yet.
                </td>
              </tr>
            ) : filteredCourses.map(course => (
              <tr key={course.id}>
                <td>
                  <div className="flex items-center gap-4">
                    <div className="table-img-wrapper">
                      <img 
                        src={course.thumbnail || 'https://via.placeholder.com/50'} 
                        alt="" 
                        className="course-table-img"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white">{course.title}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} /> {course.duration}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col gap-1 items-start">
                    <span className="category-badge text-xs">
                      {course.category || 'Uncategorized'}
                    </span>
                    {course.celebrity && (
                      <span className="category-badge text-xs font-semibold px-2 py-0.5 mt-1" style={{background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)'}}>
                        ⭐ {course.celebrity}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <span className={`level-tag ${course.level?.toLowerCase()}`}>
                    {course.level}
                  </span>
                </td>
                <td>
                  <div className="price-tag">
                    {course.price === "0.00" ? (
                      <span className="text-success-color font-bold">Free</span>
                    ) : (
                      <span className="flex items-center gap-0.5">
                        <IndianRupee size={14} />{course.price}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="action-btns">
                    <button onClick={() => openEditModal(course)} className="btn-icon" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => setCourseToDelete(course.id)} className="btn-icon delete" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="course-form-modal">
          <div className="course-form-card card glass animate-fade-in">
            <div className="flex justify-between items-center mb-8 border-bottom-white pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{editingCourse ? 'Update Course' : 'Create New Course'}</h2>
                <p className="text-sm text-gray-500">Fill in the details below to {editingCourse ? 'update' : 'publish'} your course</p>
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

              <div className="form-group">
                <label className="form-label text-white">Celebrity Presenter / Guide (Indian Celeb Explaining Course)</label>
                <select 
                  className="form-input-premium"
                  value={formData.celebrity}
                  onChange={(e) => setFormData({...formData, celebrity: e.target.value})}
                >
                  <option value="">No Celebrity (Standard Course)</option>
                  <option value="Shahrukh Khan">Shahrukh Khan (King Khan style learning)</option>
                  <option value="Salman Khan">Salman Khan (Bhaijaan style learning)</option>
                  <option value="Amir Khan">Amir Khan (Mr. Perfectionist learning)</option>
                  <option value="Amitabh Bachan">Amitabh Bachan (Big B styled lectures)</option>
                </select>
                <span className="text-xs text-gray-400 mt-1 block">
                  Assigning a celebrity will present this course to students as explained by or themed after their favorite superstar!
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
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
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
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
                      <p className="font-semibold text-white">Click to upload image</p>
                      <p className="text-xs text-gray-500">JPG, PNG or WEBP (Max 2MB)</p>
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

      {courseToDelete && (
        <div className="course-form-modal">
          <div className="course-form-card card glass animate-fade-in p-8 text-center" style={{maxWidth: '440px', background: 'rgba(26, 26, 46, 0.95)'}}>
            <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full" style={{background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', margin: '0 auto'}}>
              <Trash2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Delete Course?</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">Are you sure you want to delete this course? This action cannot be undone and all associated lectures will be permanently removed.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setCourseToDelete(null)} 
                className="btn py-3 px-6 rounded-xl font-bold transition-all text-sm flex-1"
                style={{background: 'var(--surface-color-light)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', cursor: 'pointer'}}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  handleDelete(courseToDelete);
                  setCourseToDelete(null);
                }} 
                className="btn py-3 px-6 rounded-xl font-bold transition-all text-sm flex-1"
                style={{background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', border: 'none', cursor: 'pointer'}}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;

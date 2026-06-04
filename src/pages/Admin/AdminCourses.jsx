import { useState, useEffect } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { getLocalCourses, saveLocalCourse, updateLocalCourse, deleteLocalCourse } from '../../utils/mockData';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import { useToast } from '../../components/ToastProvider';

const emptyForm = {
  title: '',
  description: '',
  category: '',
  level: 'Beginner',
  duration: ''
};

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const [viewMode, setViewMode] = useState('active');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const { addToast } = useToast();

  const fetchCourses = () => {
    setTimeout(() => {
      setCourses(getLocalCourses().map(c => ({ ...c, status: c.status || 'active' })));
      setLoading(false);
      setErrorState(false);
    }, 1000);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.category.trim() || !form.duration.trim()) {
      setFormError('Please fill title, category, and duration.');
      return;
    }

    if (form.id) {
      const updated = { ...form, title: form.title.trim(), description: form.description.trim(), category: form.category.trim(), duration: form.duration.trim() };
      setCourses(prev => prev.map(c => c.id === form.id ? { ...c, ...updated } : c));
      updateLocalCourse(updated);
      addToast({ type: 'success', message: 'Course updated successfully!' });
    } else {
      const newCourse = saveLocalCourse({
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category.trim(),
        duration: form.duration.trim()
      });
      setCourses(prev => [{ ...newCourse, status: 'active' }, ...prev]);
      addToast({ type: 'success', message: 'Course created successfully!' });
    }

    setForm(emptyForm);
    setFormError('');
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (courseToDelete) {
      if (viewMode === 'deleted') {
        // Permanently delete
        setCourses(prev => prev.filter(c => c.id !== courseToDelete.id));
        deleteLocalCourse(courseToDelete.id);
        addToast({ type: 'success', message: 'Course permanently deleted!' });
      } else {
        // Move to deleted
        setCourses(prev => prev.map(c => c.id === courseToDelete.id ? { ...c, status: 'deleted' } : c));
        updateLocalCourse({ id: courseToDelete.id, status: 'deleted' });
        addToast({ type: 'success', message: 'Course moved to trash!' });
      }
    }
    setDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  const columns = [
    { 
      key: 'title', 
      label: 'Course', 
      sortable: true,
      filterable: false,
      render: (row, highlight) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {highlight(row.title)}
        </div>
      )
    },
    { 
      key: 'category', 
      label: 'Category',
      sortable: true,
      filterable: true,
      render: (row, highlight) => (
        <span className="text-gray-500 dark:text-gray-300">{highlight(row.category)}</span>
      )
    },
    { 
      key: 'level', 
      label: 'Level',
      sortable: true,
      filterable: true,
      render: (row) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {row.level}
        </span>
      )
    },
    {
      key: 'duration',
      label: 'Duration',
      sortable: true,
      filterable: false,
      render: (row, highlight) => (
        <span className="text-gray-500 dark:text-gray-300">{highlight(row.duration)}</span>
      )
    }
  ];

  const rowActions = [
    {
      label: 'View',
      onClick: (row) => addToast({ type: 'info', message: `Viewing ${row.title}` })
    },
    ...(viewMode === 'active' ? [{
      label: 'Edit',
      onClick: (row) => {
        setForm(row);
        setIsModalOpen(true);
      }
    }] : []),
    ...(viewMode === 'active' ? [{
      label: 'Archive',
      onClick: (row) => {
        setCourses(prev => prev.map(c => c.id === row.id ? { ...c, status: 'archived' } : c));
        updateLocalCourse({ id: row.id, status: 'archived' });
        addToast({ type: 'success', message: `${row.title} archived.` });
      }
    }] : []),
    ...(viewMode !== 'active' ? [{
      label: 'Restore',
      onClick: (row) => {
        setCourses(prev => prev.map(c => c.id === row.id ? { ...c, status: 'active' } : c));
        updateLocalCourse({ id: row.id, status: 'active' });
        addToast({ type: 'success', message: `${row.title} restored.` });
      }
    }] : []),
    {
      label: viewMode === 'deleted' ? 'Delete Permanently' : 'Delete',
      destructive: true,
      onClick: (row) => {
        setCourseToDelete(row);
        setDeleteModalOpen(true);
      }
    }
  ];

  const bulkActions = [
    ...(viewMode === 'active' ? [{
      label: 'Archive Selected',
      onClick: (selectedIds) => {
        setCourses(prev => prev.map(c => {
          if (selectedIds.includes(c.id)) {
            updateLocalCourse({ id: c.id, status: 'archived' });
            return { ...c, status: 'archived' };
          }
          return c;
        }));
        addToast({ type: 'success', message: `${selectedIds.length} courses archived.` });
      }
    }] : []),
    ...(viewMode !== 'active' ? [{
      label: 'Restore Selected',
      onClick: (selectedIds) => {
        setCourses(prev => prev.map(c => {
          if (selectedIds.includes(c.id)) {
            updateLocalCourse({ id: c.id, status: 'active' });
            return { ...c, status: 'active' };
          }
          return c;
        }));
        addToast({ type: 'success', message: `${selectedIds.length} courses restored.` });
      }
    }] : []),
    {
      label: 'Export CSV',
      onClick: (selectedIds) => {
        const selectedCourses = courses.filter(c => selectedIds.includes(c.id));
        const headers = ['ID', 'Title', 'Category', 'Level', 'Duration', 'Status'];
        const csvContent = [
          headers.join(','),
          ...selectedCourses.map(c => [c.id, `"${c.title}"`, `"${c.category}"`, c.level, `"${c.duration}"`, c.status].join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `courses_export_${new Date().getTime()}.csv`;
        link.click();
        addToast({ type: 'success', message: `Exported ${selectedIds.length} courses to CSV.` });
      },
      keepSelection: true
    },
    {
      label: viewMode === 'deleted' ? 'Delete Permanently' : 'Delete Selected',
      destructive: true,
      onClick: (selectedIds) => {
        if (viewMode === 'deleted') {
          setCourses(prev => prev.filter(c => !selectedIds.includes(c.id)));
          selectedIds.forEach(id => deleteLocalCourse(id));
          addToast({ type: 'success', message: `${selectedIds.length} courses permanently deleted.` });
        } else {
          setCourses(prev => prev.map(c => {
            if (selectedIds.includes(c.id)) {
              updateLocalCourse({ id: c.id, status: 'deleted' });
              return { ...c, status: 'deleted' };
            }
            return c;
          }));
          addToast({ type: 'success', message: `${selectedIds.length} courses moved to trash.` });
        }
      }
    }
  ];

  const displayedCourses = courses.filter(c => c.status === viewMode);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button 
            onClick={() => setViewMode('active')}
            className={`px-4 py-2 rounded-lg font-medium transition ${viewMode === 'active' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}
          >
            Active
          </button>
          <button 
            onClick={() => setViewMode('archived')}
            className={`px-4 py-2 rounded-lg font-medium transition ${viewMode === 'archived' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}
          >
            Archived
          </button>
          <button 
            onClick={() => setViewMode('deleted')}
            className={`px-4 py-2 rounded-lg font-medium transition ${viewMode === 'deleted' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}
          >
            Deleted
          </button>
        </div>
        <button
          onClick={() => {
            setForm(emptyForm);
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          <span>Add Course</span>
        </button>
      </div>

      <DataTable 
        columns={columns}
        data={displayedCourses}
        isLoading={loading}
        isError={errorState}
        globalSearchFields={['title', 'category', 'duration']}
        onRowAction={rowActions}
        bulkActions={bulkActions}
        emptyState={{
          icon: <BookOpen className="w-12 h-12" />,
          title: "No Courses Yet",
          message: "Ready to create your first course?",
          action: (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              + Create Course
            </button>
          )
        }}
        errorState={{
          title: "Unable to Load Courses",
          action: (
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition">
              Retry
            </button>
          )
        }}
      />

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormError('');
        }}
        title={form.id ? "Edit Course" : "Add Course"}
        type="default"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              placeholder="React Basics"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              placeholder="Short course description"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                placeholder="Frontend"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Level</label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Duration</label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                placeholder="10 hours"
              />
            </div>
          </div>

          {formError && <p className="text-sm text-red-600 dark:text-red-400">{formError}</p>}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setFormError('');
              }}
              className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Save Course
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Are you sure?"
        type="confirm"
        isDestructive={true}
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
      >
        <p>This will move the course <strong>{courseToDelete?.title}</strong> to the deleted tab. You can permanently delete it from there.</p>
      </Modal>
    </div>
  );
};

export default AdminCourses;

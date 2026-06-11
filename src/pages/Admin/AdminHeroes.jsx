import { useState } from 'react';
import { Plus, CheckCircle, XCircle } from 'lucide-react';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import { getLocalHeroes, saveLocalHero, updateLocalHero, deleteLocalHero } from '../../utils/mockData';
import { useToast } from '../../hooks/useToast';

const AdminHeroes = () => {
  const [heroes, setHeroes] = useState(() => getLocalHeroes());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHero, setEditingHero] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [heroToDelete, setHeroToDelete] = useState(null);
  const [errors, setErrors] = useState({});
  const { addToast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    image: '',
    tags: '',
    status: 'Active'
  });

  const loadHeroes = () => {
    setHeroes(getLocalHeroes());
  };

  const handleOpenModal = (hero = null) => {
    if (hero) {
      setEditingHero(hero);
      setFormData({
        name: hero.name,
        title: hero.title || '',
        bio: hero.bio || '',
        image: hero.image || '',
        tags: hero.tags ? hero.tags.join(', ') : '',
        status: hero.status || 'Active'
      });
    } else {
      setEditingHero(null);
      setFormData({ name: '', title: '', bio: '', image: '', tags: '', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingHero(null);
    setErrors({});
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Hero name is required.';
    if (!formData.title.trim()) newErrors.title = 'Title / Role is required.';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      addToast({ type: 'error', message: 'Please fix the errors in the form.' });
      return;
    }

    const dataToSave = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (editingHero) {
      updateLocalHero({ ...editingHero, ...dataToSave });
      addToast({ type: 'success', message: 'Hero updated successfully!' });
    } else {
      saveLocalHero(dataToSave);
      addToast({ type: 'success', message: 'Hero added successfully!' });
    }
    loadHeroes();
    handleCloseModal();
  };

  const handleDeleteClick = (hero) => {
    setHeroToDelete(hero);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (heroToDelete) {
      deleteLocalHero(heroToDelete.id);
      loadHeroes();
      addToast({ type: 'success', message: 'Hero deleted.' });
    }
    setIsDeleteModalOpen(false);
    setHeroToDelete(null);
  };

  const toggleStatus = (hero) => {
    const newStatus = hero.status === 'Active' ? 'Inactive' : 'Active';
    updateLocalHero({ ...hero, status: newStatus });
    loadHeroes();
    addToast({ type: 'info', message: `Hero ${newStatus.toLowerCase()}.` });
  };

  const columns = [
    {
      key: 'name',
      label: 'Hero',
      render: (row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-300 dark:border-gray-600">
            {row.image ? (
              <img src={row.image} alt={row.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">N/A</div>
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{row.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{row.title}</div>
          </div>
        </div>
      )
    },
    {
      key: 'tags',
      label: 'Tags',
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.tags && row.tags.map((tag, i) => (
            <span key={i} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      filterable: true,
      render: (row) => (
        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {row.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          <span>{row.status}</span>
        </span>
      )
    }
  ];

  const rowActions = [
    { label: 'Edit Hero', onClick: (row) => handleOpenModal(row) },
    { label: 'Toggle Status', onClick: (row) => toggleStatus(row) },
    { label: 'Delete Hero', onClick: (row) => handleDeleteClick(row), destructive: true }
  ];

  const bulkActions = [
    {
      label: 'Export CSV',
      onClick: (selectedIds) => {
        const selectedHeroes = heroes.filter(h => selectedIds.includes(h.id));
        const headers = ['ID', 'Name', 'Title', 'Status'];
        const csvContent = [
          headers.join(','),
          ...selectedHeroes.map(h => [h.id, `"${h.name}"`, `"${h.title}"`, h.status].join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `heroes_export_${new Date().getTime()}.csv`;
        link.click();
        addToast({ type: 'success', message: `Exported ${selectedIds.length} heroes to CSV.` });
      },
      keepSelection: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Celebrity Heroes</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage course instructor avatars and styles.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Hero</span>
        </button>
      </div>

      <DataTable 
        columns={columns}
        data={heroes}
        globalSearchFields={['name', 'title', 'tags']}
        onRowAction={rowActions}
        bulkActions={bulkActions}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingHero ? "Edit Hero" : "Add New Hero"}
        type="confirm"
        confirmText="Save Hero"
        onConfirm={handleSave}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="heroName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input 
              id="heroName"
              type="text" 
              value={formData.name}
              onChange={(e) => {
                setFormData({...formData, name: e.target.value});
                if (errors.name) setErrors({...errors, name: ''});
              }}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              placeholder="e.g. Mass Hero Style (Mahesh Babu)"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500" id="name-error" role="alert">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title / Role</label>
            <input 
              id="heroTitle"
              type="text" 
              value={formData.title}
              onChange={(e) => {
                setFormData({...formData, title: e.target.value});
                if (errors.title) setErrors({...errors, title: ''});
              }}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${errors.title ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              placeholder="e.g. Action Star"
            />
            {errors.title && <p className="mt-1 text-xs text-red-500" id="title-error" role="alert">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma separated)</label>
            <input 
              type="text" 
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g. Action, Mass, Telugu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
            <textarea 
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
              placeholder="Short description..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Image</label>
            <div className="flex items-center space-x-4">
              {formData.image && (
                <div className="w-16 h-16 rounded-full overflow-hidden border">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-300"
              />
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Or provide an image URL:
              <input 
                type="text" 
                value={formData.image && formData.image.startsWith('http') ? formData.image : ''}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full mt-1 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Hero"
        type="alert"
        isDestructive={true}
        confirmText="Delete"
        onConfirm={confirmDelete}
      >
        <p>Are you sure you want to delete <strong>{heroToDelete?.name}</strong>? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default AdminHeroes;

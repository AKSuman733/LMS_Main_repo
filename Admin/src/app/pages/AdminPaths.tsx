import React, { useState } from 'react';
import { Search, Plus, Map, BookOpen, Clock, BarChart, Trash2, Edit, X, Check } from 'lucide-react';
import { mockCourses } from '../../utils/mockCourses';

interface PathItem {
  id: string;
  title: string;
  category: string;
  coursesCount: number;
  hours: number;
  lessons: number;
  level: string;
  enrolled: string;
  coursesAssigned: string[]; // Course IDs
}

export function AdminPaths() {
  const [paths, setPaths] = useState<PathItem[]>([
    {
      id: 'path-1',
      title: 'AI Engineering Mastery',
      category: 'AI & ML',
      coursesCount: 3,
      hours: 48,
      lessons: 64,
      level: 'Advanced',
      enrolled: '12.4k',
      coursesAssigned: ['course-1', 'course-2', 'course-3']
    },
    {
      id: 'path-2',
      title: 'Full-Stack Web Development',
      category: 'Web Dev',
      coursesCount: 4,
      hours: 32,
      lessons: 40,
      level: 'Beginner',
      enrolled: '15.6k',
      coursesAssigned: ['course-1', 'course-2']
    },
    {
      id: 'path-3',
      title: 'Business Analytics & Data Insights',
      category: 'Analytics',
      coursesCount: 3,
      hours: 24,
      lessons: 30,
      level: 'Beginner',
      enrolled: '11.2k',
      coursesAssigned: ['course-3', 'course-4']
    }
  ]);

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPath, setEditingPath] = useState<PathItem | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    category: 'AI & ML',
    level: 'Beginner',
    hours: 20,
    lessons: 25,
    coursesAssigned: [] as string[]
  });

  const [toast, setToast] = useState('');

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleOpenAdd = () => {
    setEditingPath(null);
    setFormData({
      title: '',
      category: 'AI & ML',
      level: 'Beginner',
      hours: 20,
      lessons: 25,
      coursesAssigned: []
    });
    setShowModal(true);
  };

  const handleOpenEdit = (path: PathItem) => {
    setEditingPath(path);
    setFormData({
      title: path.title,
      category: path.category,
      level: path.level,
      hours: path.hours,
      lessons: path.lessons,
      coursesAssigned: [...path.coursesAssigned]
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setPaths(prev => prev.filter(p => p.id !== id));
    triggerToast('Learning Path deleted successfully ✓');
  };

  const handleToggleCourse = (courseId: string) => {
    setFormData(prev => {
      const isAssigned = prev.coursesAssigned.includes(courseId);
      const coursesAssigned = isAssigned
        ? prev.coursesAssigned.filter(id => id !== courseId)
        : [...prev.coursesAssigned, courseId];
      return { ...prev, coursesAssigned };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingPath) {
      // Edit
      setPaths(prev => prev.map(p => p.id === editingPath.id ? {
        ...p,
        title: formData.title,
        category: formData.category,
        level: formData.level,
        hours: Number(formData.hours),
        lessons: Number(formData.lessons),
        coursesCount: formData.coursesAssigned.length,
        coursesAssigned: formData.coursesAssigned
      } : p));
      triggerToast('Learning Path updated ✓');
    } else {
      // Add
      const newPath: PathItem = {
        id: 'path-' + Date.now(),
        title: formData.title,
        category: formData.category,
        level: formData.level,
        hours: Number(formData.hours),
        lessons: Number(formData.lessons),
        coursesCount: formData.coursesAssigned.length,
        enrolled: '0',
        coursesAssigned: formData.coursesAssigned
      };
      setPaths(prev => [newPath, ...prev]);
      triggerToast('Learning Path added ✓');
    }
    setShowModal(false);
  };

  const filteredPaths = paths.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#0A0F1E] text-white p-[40px] min-h-[calc(100vh-64px)] font-sans relative overflow-x-hidden">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 px-5 py-3.5 rounded-xl shadow-2xl z-50 bg-[#111827] border border-[#00C97B] text-[#00E88A] font-bold text-[14px]">
          {toast}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-[28px] font-extrabold text-white tracking-tight leading-tight">
            Learning Paths Management
          </h2>
          <p className="text-[14px] text-[#9CA3AF] mt-1">
            Build step-by-step career path roadmaps and map courses to them.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="h-11 px-5 bg-[#FF6B2B] hover:bg-[#FF8C42] text-white text-[14px] font-bold rounded-[10px] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.97] border-none"
        >
          <Plus size={18} />
          Create Path
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-[#111827] border border-[#1E2D45] rounded-[14px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 shadow-sm">
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search paths or categories..."
            className="w-full h-[40px] pl-10 pr-4 bg-[#1A2540] border border-[#1E2D45] text-white text-[13px] font-medium rounded-lg outline-none focus:border-[#FF6B2B] transition-colors"
          />
        </div>
        <div className="text-[13px] text-[#9CA3AF] font-bold">
          Total Paths: {paths.length}
        </div>
      </div>

      {/* Grid of Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaths.map((path) => (
          <div 
            key={path.id}
            className="bg-[#111827] border border-[#1E2D45] rounded-[16px] p-5 flex flex-col justify-between hover:border-[#FF6B2B]/40 hover:shadow-[0_4px_20px_rgba(255,107,43,0.08)] transition-all duration-300 active:scale-[0.97]"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="inline-block bg-[#FF6B2B]/10 text-[#FF8C42] border border-[#FF6B2B]/20 text-[10px] font-bold px-2 py-0.5 rounded-[4px] uppercase">
                  {path.category}
                </span>
                <span className="text-[11px] text-[#9CA3AF] font-bold uppercase tracking-wider">
                  {path.level}
                </span>
              </div>
              <h3 className="text-[18px] font-bold text-white mb-4 leading-snug">{path.title}</h3>
              
              <div className="grid grid-cols-3 gap-2 bg-[#1A2540] border border-[#1E2D45] p-3 rounded-lg text-[12px] text-[#9CA3AF] mb-4">
                <div className="flex flex-col items-center">
                  <BookOpen size={14} className="text-[#FF6B2B] mb-1" />
                  <span className="font-bold text-white">{path.coursesCount}</span>
                  <span>Courses</span>
                </div>
                <div className="flex flex-col items-center border-x border-[#1E2D45]">
                  <Clock size={14} className="text-[#4F8EF7] mb-1" />
                  <span className="font-bold text-white">{path.hours}h</span>
                  <span>Duration</span>
                </div>
                <div className="flex flex-col items-center">
                  <BarChart size={14} className="text-[#00C97B] mb-1" />
                  <span className="font-bold text-white">{path.enrolled}</span>
                  <span>Enrolled</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-[#1E2D45] pt-3.5 mt-2">
              <button 
                onClick={() => handleOpenEdit(path)}
                className="w-8 h-8 rounded-md bg-transparent hover:bg-[#1A2540] text-[#9CA3AF] hover:text-[#FF6B2B] flex items-center justify-center transition-all cursor-pointer border-none focus:outline-none"
                title="Edit Path"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => handleDelete(path.id)}
                className="w-8 h-8 rounded-md bg-transparent hover:bg-[#1A2540] text-[#9CA3AF] hover:text-[#EF4444] flex items-center justify-center transition-all cursor-pointer border-none focus:outline-none"
                title="Delete Path"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-over Path Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-end font-sans">
          {/* Backdrop */}
          <div onClick={() => setShowModal(false)} className="fixed inset-0 bg-[#0A0F1E]/80 backdrop-blur-sm" />

          {/* Form container */}
          <div className="relative w-[500px] max-w-full bg-[#111827] border-l border-[#1E2D45] h-full flex flex-col shadow-2xl z-50 text-white animate-[slideIn_0.22s_ease-out_forwards]">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
            `}} />
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#1E2D45] flex items-center justify-between bg-[#111827]">
              <h2 className="text-[18px] font-bold text-white">
                {editingPath ? 'Edit Learning Path' : 'Create Learning Path'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-[#1A2540] text-[#9CA3AF] hover:text-white flex items-center justify-center cursor-pointer border-none"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 pb-28">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] text-[#9CA3AF] font-bold">Path Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Front-End Development roadmap"
                  className="w-full h-11 px-4 bg-[#1A2540] border border-[#1E2D45] rounded-lg text-white text-[14px] outline-none focus:border-[#FF6B2B] transition-colors"
                />
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] text-[#9CA3AF] font-bold">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full h-11 px-4 bg-[#1A2540] border border-[#1E2D45] rounded-lg text-white text-[14px] outline-none focus:border-[#FF6B2B] transition-colors cursor-pointer"
                  >
                    <option value="AI & ML">AI & ML</option>
                    <option value="Web Dev">Web Dev</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Analytics">Analytics</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] text-[#9CA3AF] font-bold">Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                    className="w-full h-11 px-4 bg-[#1A2540] border border-[#1E2D45] rounded-lg text-white text-[14px] outline-none focus:border-[#FF6B2B] transition-colors cursor-pointer"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Hours / Lessons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] text-[#9CA3AF] font-bold">Total Hours</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={formData.hours}
                    onChange={(e) => setFormData(prev => ({ ...prev, hours: Number(e.target.value) }))}
                    className="w-full h-11 px-4 bg-[#1A2540] border border-[#1E2D45] rounded-lg text-white text-[14px] outline-none focus:border-[#FF6B2B]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] text-[#9CA3AF] font-bold">Total Lessons</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={formData.lessons}
                    onChange={(e) => setFormData(prev => ({ ...prev, lessons: Number(e.target.value) }))}
                    className="w-full h-11 px-4 bg-[#1A2540] border border-[#1E2D45] rounded-lg text-white text-[14px] outline-none focus:border-[#FF6B2B]"
                  />
                </div>
              </div>

              {/* Course Checklist */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] text-[#9CA3AF] font-bold">Assign Courses (Select 2+)</label>
                <div className="bg-[#1A2540] border border-[#1E2D45] rounded-lg p-3 max-h-[200px] overflow-y-auto space-y-2.5">
                  {mockCourses.map((course) => {
                    const isChecked = formData.coursesAssigned.includes(course.id);
                    return (
                      <div 
                        key={course.id}
                        onClick={() => handleToggleCourse(course.id)}
                        className={`flex items-center justify-between p-2 rounded-md border transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-[#FF6B2B]/10 border-[#FF6B2B] text-white' 
                            : 'bg-[#111827] border-transparent text-[#9CA3AF] hover:text-white'
                        }`}
                      >
                        <span className="text-[13px] font-semibold truncate pr-4">{course.title}</span>
                        {isChecked ? (
                          <Check size={14} className="text-[#FF6B2B] flex-shrink-0" />
                        ) : (
                          <span className="w-3.5 h-3.5 border border-[#1E2D45] rounded-sm flex-shrink-0"></span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#111827] border-t border-[#1E2D45] p-5 flex gap-3 z-50">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 h-11 bg-transparent border border-[#1E2D45] text-white hover:bg-[#1A2540] font-semibold text-[14px] rounded-lg transition-colors cursor-pointer focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] h-11 bg-[#FF6B2B] hover:bg-[#FF8C42] text-white font-bold text-[14px] rounded-lg transition-colors cursor-pointer border-none active:scale-[0.97]"
                >
                  {editingPath ? 'Update Path' : 'Create Path'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPaths;

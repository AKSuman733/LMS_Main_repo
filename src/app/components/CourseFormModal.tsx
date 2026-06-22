import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2 } from 'lucide-react';

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: any) => void;
  course: any | null;
}

export function CourseFormModal({ isOpen, onClose, onSave, course }: CourseFormModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'course',
    instructor: '',
    instructorAvatar: 'MI',
    level: 'Beginner',
    durationLabel: '',
    lessons: 0,
    topics: [] as string[],
    tools: [] as string[],
    description: '',
    thumbnail: '',
    status: 'draft',
    isNew: false,
    color: '#7C3AED',
  });

  const [topicInput, setTopicInput] = useState('');
  const [toolInput, setToolInput] = useState('');

  // Suggestions lists
  const topicSuggestions = ['Graph RAG', 'AI Agents', 'Generative AI', 'Prompt Engineering', 'LLMOps', 'Machine Learning', 'Deep Learning', 'Data Science'];
  const toolSuggestions = ['Python', 'LangChain', 'OpenAI', 'Docker', 'Scikit-learn', 'Gemini', 'Claude', 'Neo4j', 'TensorFlow'];

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        type: course.type || 'course',
        instructor: course.instructor || '',
        instructorAvatar: course.instructorAvatar || 'MI',
        level: course.level || 'Beginner',
        durationLabel: course.durationLabel || '',
        lessons: course.lessons || 0,
        topics: course.topics ? [...course.topics] : [],
        tools: course.tools ? [...course.tools] : [],
        description: course.description || '',
        thumbnail: course.thumbnail || '',
        status: course.status || 'draft',
        isNew: !!course.isNew,
        color: course.color || '#7C3AED',
      });
    } else {
      setFormData({
        title: '',
        type: 'course',
        instructor: '',
        instructorAvatar: 'MI',
        level: 'Beginner',
        durationLabel: '',
        lessons: 0,
        topics: [],
        tools: [],
        description: '',
        thumbnail: '',
        status: 'draft',
        isNew: false,
        color: '#7C3AED',
      });
    }
    setTopicInput('');
    setToolInput('');
  }, [course, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Topics handlers
  const addTopic = (tag: string) => {
    const clean = tag.trim();
    if (clean && !formData.topics.includes(clean)) {
      setFormData((prev) => ({ ...prev, topics: [...prev.topics, clean] }));
    }
    setTopicInput('');
  };

  const handleTopicKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTopic(topicInput);
    }
  };

  const removeTopic = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index),
    }));
  };

  // Tools handlers
  const addTool = (tag: string) => {
    const clean = tag.trim();
    if (clean && !formData.tools.includes(clean)) {
      setFormData((prev) => ({ ...prev, tools: [...prev.tools, clean] }));
    }
    setToolInput('');
  };

  const handleToolKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTool(toolInput);
    }
  };

  const removeTool = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    // Generate automatic duration category based on label
    let duration = '1–4 hours';
    const hours = parseInt(formData.durationLabel);
    if (!isNaN(hours)) {
      if (hours < 1) duration = '< 1 hour';
      else if (hours > 4) duration = '> 4 hours';
    } else if (formData.durationLabel.toLowerCase().includes('min')) {
      duration = '< 1 hour';
    }

    // Generate initials for avatar
    let instructorAvatar = 'MI';
    if (formData.instructor) {
      const parts = formData.instructor.split(' ');
      if (parts.length >= 2) {
        instructorAvatar = (parts[0][0] + parts[1][0]).toUpperCase();
      } else {
        instructorAvatar = parts[0].substring(0, 2).toUpperCase();
      }
    }

    // Set colors matching specific course levels/types
    let color = formData.color;
    if (!course) {
      if (formData.type === 'learning-path') {
        color = '#059669'; // Emerald
      } else if (formData.level === 'Advanced') {
        color = '#DC2626'; // Red
      } else if (formData.level === 'Intermediate') {
        color = '#2D1B69'; // Indigo
      } else {
        color = '#7C3AED'; // Purple
      }
    }

    onSave({
      ...formData,
      duration,
      instructorAvatar,
      color,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Slide-Over Panel */}
      <div
        className="relative w-[560px] max-w-full bg-[#1E2139] h-full flex flex-col shadow-[-8px_0_32px_rgba(0,0,0,0.4)] z-50 text-white"
        style={{
          animation: 'slideIn 0.25s ease-out forwards',
        }}
      >
        {/* Style tag for slide animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}} />

        {/* Panel Header */}
        <div className="px-6 py-5 border-b border-[#2A2D3E] flex items-center justify-between flex-shrink-0">
          <h2 className="text-[18px] font-bold text-white">
            {course ? 'Edit Course' : 'Add New Course'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2A2D3E] text-white flex items-center justify-center hover:bg-[#3D405B] transition-colors cursor-pointer focus:outline-none"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 pb-28">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-[#9CA3AF] font-semibold">Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter course title"
              required
              className="w-full h-11 px-4 bg-[#252840] border border-[#2A2D3E] rounded-lg text-white text-[14px] outline-none focus:border-[#F59E0B] transition-colors"
            />
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-2 gap-4">
            {/* Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] text-[#9CA3AF] font-semibold">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full h-11 px-4 bg-[#252840] border border-[#2A2D3E] rounded-lg text-white text-[14px] outline-none focus:border-[#F59E0B] transition-colors cursor-pointer"
              >
                <option value="course">Course</option>
                <option value="learning-path">Learning Path</option>
              </select>
            </div>

            {/* Level */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] text-[#9CA3AF] font-semibold">Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full h-11 px-4 bg-[#252840] border border-[#2A2D3E] rounded-lg text-white text-[14px] outline-none focus:border-[#F59E0B] transition-colors cursor-pointer"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Instructor */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] text-[#9CA3AF] font-semibold">Instructor Name</label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                placeholder="e.g. Krish Naik"
                required
                className="w-full h-11 px-4 bg-[#252840] border border-[#2A2D3E] rounded-lg text-white text-[14px] outline-none focus:border-[#F59E0B] transition-colors"
              />
            </div>

            {/* Lessons */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] text-[#9CA3AF] font-semibold">Lessons Count</label>
              <input
                type="number"
                name="lessons"
                value={formData.lessons || ''}
                onChange={handleChange}
                placeholder="e.g. 5"
                required
                min={0}
                className="w-full h-11 px-4 bg-[#252840] border border-[#2A2D3E] rounded-lg text-white text-[14px] outline-none focus:border-[#F59E0B] transition-colors"
              />
            </div>
          </div>

          {/* Duration label */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-[#9CA3AF] font-semibold">Duration Label</label>
            <input
              type="text"
              name="durationLabel"
              value={formData.durationLabel}
              onChange={handleChange}
              placeholder="e.g. 5 Hours or 45 Mins"
              required
              className="w-full h-11 px-4 bg-[#252840] border border-[#2A2D3E] rounded-lg text-white text-[14px] outline-none focus:border-[#F59E0B] transition-colors"
            />
          </div>

          {/* Multi-tag: Topics */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-[#9CA3AF] font-semibold">Topics</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.topics.map((topic, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-[#F59E0B] border border-amber-500/30 rounded-full text-[12px] font-semibold"
                >
                  {topic}
                  <button
                    type="button"
                    onClick={() => removeTopic(i)}
                    className="text-[#F59E0B] hover:text-white transition-colors text-[14px] leading-none focus:outline-none cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={handleTopicKeyDown}
              placeholder="Add topic (press Enter or comma)"
              className="w-full h-11 px-4 bg-[#252840] border border-[#2A2D3E] rounded-lg text-white text-[14px] outline-none focus:border-[#F59E0B] transition-colors"
            />
            {/* Clickable Suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {topicSuggestions
                .filter((s) => !formData.topics.includes(s))
                .map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => addTopic(suggestion)}
                    className="px-2.5 py-1 bg-[#252840] border border-[#2A2D3E] hover:border-amber-500/50 hover:bg-amber-500/10 text-white/60 hover:text-[#F59E0B] rounded-md text-[11px] font-medium transition-all cursor-pointer focus:outline-none"
                  >
                    + {suggestion}
                  </button>
                ))}
            </div>
          </div>

          {/* Multi-tag: Tools */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-[#9CA3AF] font-semibold">Tools</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tools.map((tool, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-[#F59E0B] border border-amber-500/30 rounded-full text-[12px] font-semibold"
                >
                  {tool}
                  <button
                    type="button"
                    onClick={() => removeTool(i)}
                    className="text-[#F59E0B] hover:text-white transition-colors text-[14px] leading-none focus:outline-none cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={toolInput}
              onChange={(e) => setToolInput(e.target.value)}
              onKeyDown={handleToolKeyDown}
              placeholder="Add tool (press Enter or comma)"
              className="w-full h-11 px-4 bg-[#252840] border border-[#2A2D3E] rounded-lg text-white text-[14px] outline-none focus:border-[#F59E0B] transition-colors"
            />
            {/* Clickable Suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {toolSuggestions
                .filter((s) => !formData.tools.includes(s))
                .map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => addTool(suggestion)}
                    className="px-2.5 py-1 bg-[#252840] border border-[#2A2D3E] hover:border-amber-500/50 hover:bg-amber-500/10 text-white/60 hover:text-[#F59E0B] rounded-md text-[11px] font-medium transition-all cursor-pointer focus:outline-none"
                  >
                    + {suggestion}
                  </button>
                ))}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-[#9CA3AF] font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Course description..."
              required
              rows={3}
              className="w-full p-4 bg-[#252840] border border-[#2A2D3E] rounded-lg text-white text-[14px] outline-none focus:border-[#F59E0B] transition-colors resize-none h-[100px]"
            />
          </div>

          {/* Thumbnail URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-[#9CA3AF] font-semibold">Thumbnail URL</label>
            <div className="flex gap-3">
              <input
                type="text"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                required
                className="flex-1 h-11 px-4 bg-[#252840] border border-[#2A2D3E] rounded-lg text-white text-[14px] outline-none focus:border-[#F59E0B] transition-colors"
              />
              {formData.thumbnail && formData.thumbnail.startsWith('http') && (
                <img
                  src={formData.thumbnail}
                  alt="Preview"
                  className="w-[60px] h-[40px] rounded-md object-cover border border-[#2A2D3E]"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              )}
            </div>
          </div>

          {/* Status Row & Checkbox group */}
          <div className="grid grid-cols-2 gap-4 items-center pt-2">
            {/* Status toggle switch */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] text-[#9CA3AF] font-semibold">Status</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      status: prev.status === 'published' ? 'draft' : 'published',
                    }))
                  }
                  className={`relative w-10 h-[22px] rounded-full transition-colors focus:outline-none cursor-pointer ${
                    formData.status === 'published' ? 'bg-[#F59E0B]' : 'bg-[#4B5563]'
                  }`}
                >
                  <div
                    className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full transition-transform ${
                      formData.status === 'published' ? 'translate-x-[20px]' : 'translate-x-[2px]'
                    }`}
                  />
                </button>
                <span className="text-[13px] font-semibold">
                  {formData.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>

            {/* Is New checkbox */}
            <div className="flex flex-col gap-1.5 justify-end h-full">
              <label className="flex items-center gap-2 cursor-pointer select-none py-1">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 rounded border-[#2A2D3E] bg-[#252840] accent-[#F59E0B] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[13px] text-white font-medium">Show "New" badge</span>
              </label>
            </div>
          </div>

          {/* Fixed Form Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#1E2139] border-t border-[#2A2D3E] p-5 flex gap-3 flex-shrink-0 z-50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 bg-transparent border border-[#2A2D3E] text-white hover:bg-white/5 font-semibold text-[14px] rounded-lg transition-colors cursor-pointer focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] h-11 bg-[#F59E0B] hover:bg-[#D97706] text-[#1A1A2E] font-bold text-[14px] rounded-lg transition-colors cursor-pointer focus:outline-none"
            >
              {course ? 'Update Course' : 'Save Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Separate centered Delete Confirmation Modal
interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  courseTitle: string;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, courseTitle }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

      {/* Centered Modal */}
      <div className="relative w-full max-w-[400px] bg-[#1E2139] rounded-[20px] shadow-2xl p-6 text-center text-white border border-[#2A2D3E] z-50 animate-scale-up">
        {/* Style tag for scale animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scaleUp {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-scale-up {
            animation: scaleUp 0.18s ease-out forwards;
          }
        `}} />

        {/* Warning Icon */}
        <div className="mx-auto w-[64px] h-[64px] rounded-full bg-[#EF4444]/15 flex items-center justify-center mb-4 text-[#EF4444]">
          <Trash2 size={32} />
        </div>

        <h3 className="text-[20px] font-bold text-white mb-2">Delete this course?</h3>
        
        <p className="text-[15px] font-semibold text-[#F59E0B] px-3 truncate mb-3">
          "{courseTitle}"
        </p>

        <p className="text-[13px] text-white/50 mb-6 leading-relaxed">
          This action cannot be undone. All enrollment data will be lost.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-11 bg-transparent border border-[#2A2D3E] hover:bg-white/5 text-white font-semibold text-[14px] rounded-lg transition-colors cursor-pointer focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-11 bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-[14px] rounded-lg transition-colors cursor-pointer focus:outline-none"
          >
            Delete Course
          </button>
        </div>
      </div>
    </div>
  );
}

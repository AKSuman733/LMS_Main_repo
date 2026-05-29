import React, { useState } from 'react';
import Toast from '../../components/Toast';

function AddCourse() {
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [fileInfo, setFileInfo] = useState(null);
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const maxFileSize = 2 * 1024 * 1024; // 2MB

  function validate() {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    if (!instructor.trim()) e.instructor = 'Instructor name is required';
    const priceNum = Number(price);
    if (!price || isNaN(priceNum) || priceNum < 0) e.price = 'Enter a valid price (>= 0)';
    if (!description.trim()) e.description = 'Description is required';
    if (fileInfo && fileInfo.size > maxFileSize) e.file = 'File too large (max 2MB)';
    if (thumbnailUrl && !/^https?:\/\/.+\.(png|jpg|jpeg|webp|gif)$/i.test(thumbnailUrl)) e.thumbnail = 'Provide a direct image URL (png/jpg/webp/gif)';
    return e;
  }

  function onFileChange(e) {
    const f = e.target.files[0];
    if (!f) return setFileInfo(null);
    setFileInfo({ name: f.name, size: f.size, type: f.type });
    if (f.size > maxFileSize) setErrors((s) => ({ ...s, file: 'File too large (max 2MB)' }));
    else setErrors((s) => ({ ...s, file: undefined }));
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    try {
      // simulate API call
      await new Promise((r) => setTimeout(r, 900));
      setToast({ type: 'success', message: 'Course created successfully!' });
      setTitle('');
      setInstructor('');
      setPrice('');
      setCategory('Web Development');
      setThumbnailUrl('');
      setFileInfo(null);
      setDescription('');
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to create course. Try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-white p-8">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-orange-400 font-semibold mb-3">Admin Panel</p>
          <h1 className="text-5xl font-black">Add New Course</h1>
        </div>

        <form className="bg-white/5 border border-white/10 rounded-3xl p-8" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-gray-300">Title <span className="text-red-500">*</span></label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full bg-[#0B1120] border ${errors.title ? 'border-red-500' : title ? 'border-green-500' : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
              />
              {errors.title && <div className="text-sm text-red-400 mt-1">{errors.title}</div>}
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Instructor <span className="text-red-500">*</span></label>
              <input
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className={`w-full bg-[#0B1120] border ${errors.instructor ? 'border-red-500' : instructor ? 'border-green-500' : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
              />
              {errors.instructor && <div className="text-sm text-red-400 mt-1">{errors.instructor}</div>}
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Price (INR) <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                className={`w-full bg-[#0B1120] border ${errors.price ? 'border-red-500' : price ? 'border-green-500' : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
              />
              {errors.price && <div className="text-sm text-red-400 mt-1">{errors.price}</div>}
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#0B1120] border border-white/10 rounded-2xl px-5 py-4 outline-none">
                <option>Web Development</option>
                <option>Data Structures</option>
                <option>UI/UX Design</option>
                <option>System Design</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-2 text-gray-300">Thumbnail URL</label>
            <input
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://.../image.jpg"
              className={`w-full bg-[#0B1120] border ${errors.thumbnail ? 'border-red-500' : thumbnailUrl ? 'border-green-500' : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
            />
            {errors.thumbnail && <div className="text-sm text-red-400 mt-1">{errors.thumbnail}</div>}
          </div>

          <div className="mt-6">
            <label className="block mb-2 text-gray-300">Or upload image (max 2MB)</label>
            <input type="file" accept="image/*" onChange={onFileChange} />
            {fileInfo && <div className="text-sm text-gray-300 mt-2">{fileInfo.name} — {(fileInfo.size / 1024).toFixed(0)} KB</div>}
            {errors.file && <div className="text-sm text-red-400 mt-1">{errors.file}</div>}
          </div>

          <div className="mt-6">
            <label className="block mb-2 text-gray-300">Course Description <span className="text-red-500">*</span></label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="6" className={`w-full bg-[#0B1120] border ${errors.description ? 'border-red-500' : description ? 'border-green-500' : 'border-white/10'} rounded-2xl px-5 py-4 outline-none resize-none`} />
            {errors.description && <div className="text-sm text-red-400 mt-1">{errors.description}</div>}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button type="submit" disabled={submitting} className="px-6 py-3 rounded-2xl font-bold" style={{ background: '#FF6B35', color: 'white', height: 45 }}>
              {submitting ? 'Loading...' : 'Create Course'}
            </button>

            <button type="button" onClick={() => { setTitle(''); setInstructor(''); setPrice(''); setThumbnailUrl(''); setDescription(''); setFileInfo(null); setErrors({}); }} className="px-6 py-3 rounded-2xl border border-white/10">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
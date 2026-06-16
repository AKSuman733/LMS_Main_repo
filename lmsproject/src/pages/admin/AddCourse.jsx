import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
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
    <AdminLayout title="Add Course" subtitle="Create a course with rich details and upload options.">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div className="max-w-5xl mx-auto">
        <div className="mb-10 space-y-3">
          <p className="text-orange-400 font-semibold uppercase tracking-[0.2em]">Admin Panel</p>
          <h1 className="text-5xl font-black">Add New Course</h1>
        </div>

        <form className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/10" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="course-title" className="block mb-2 text-gray-300">Title <span className="text-red-500">*</span></label>
              <input
                id="course-title"
                required
                aria-required="true"
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? 'course-title-error' : undefined}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full bg-[#0B1120] border ${errors.title ? 'border-red-500' : title ? 'border-green-500' : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
              />
              {errors.title && <div id="course-title-error" className="text-sm text-red-400 mt-1">{errors.title}</div>}
            </div>

            <div>
              <label htmlFor="course-instructor" className="block mb-2 text-gray-300">Instructor <span className="text-red-500">*</span></label>
              <input
                id="course-instructor"
                required
                aria-required="true"
                aria-invalid={!!errors.instructor}
                aria-describedby={errors.instructor ? 'course-instructor-error' : undefined}
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className={`w-full bg-[#0B1120] border ${errors.instructor ? 'border-red-500' : instructor ? 'border-green-500' : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
              />
              {errors.instructor && <div id="course-instructor-error" className="text-sm text-red-400 mt-1">{errors.instructor}</div>}
            </div>

            <div>
              <label htmlFor="course-price" className="block mb-2 text-gray-300">Price (INR) <span className="text-red-500">*</span></label>
              <input
                id="course-price"
                type="number"
                required
                aria-required="true"
                aria-invalid={!!errors.price}
                aria-describedby={errors.price ? 'course-price-error' : undefined}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
                className={`w-full bg-[#0B1120] border ${errors.price ? 'border-red-500' : price ? 'border-green-500' : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
              />
              {errors.price && <div id="course-price-error" className="text-sm text-red-400 mt-1">{errors.price}</div>}
            </div>

            <div>
              <label htmlFor="course-category" className="block mb-2 text-gray-300">Category</label>
              <select
                id="course-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0B1120] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              >
                <option>Web Development</option>
                <option>Data Structures</option>
                <option>UI/UX Design</option>
                <option>System Design</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="course-thumbnail" className="block mb-2 text-gray-300">Thumbnail URL</label>
            <input
              id="course-thumbnail"
              aria-invalid={!!errors.thumbnail}
              aria-describedby={errors.thumbnail ? 'course-thumbnail-error' : undefined}
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://.../image.jpg"
              className={`w-full bg-[#0B1120] border ${errors.thumbnail ? 'border-red-500' : thumbnailUrl ? 'border-green-500' : 'border-white/10'} rounded-3xl px-5 py-4 outline-none transition focus:border-orange-500`}
            />
            {errors.thumbnail && <div id="course-thumbnail-error" className="text-sm text-red-400 mt-1">{errors.thumbnail}</div>}
          </div>

          <div className="mt-6">
            <label htmlFor="course-file" className="block mb-2 text-gray-300">Or upload image (max 2MB)</label>
            <label htmlFor="course-file" className="inline-flex cursor-pointer items-center gap-2 rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white transition hover:bg-slate-900">
              Upload file
              <input id="course-file" type="file" accept="image/*" onChange={onFileChange} className="hidden" />
            </label>
            {fileInfo && <div className="text-sm text-gray-300 mt-2">{fileInfo.name} — {(fileInfo.size / 1024).toFixed(0)} KB</div>}
            {errors.file && <div id="course-file-error" className="text-sm text-red-400 mt-1">{errors.file}</div>}
          </div>

          <div className="mt-6">
            <label htmlFor="course-description" className="block mb-2 text-gray-300">Course Description <span className="text-red-500">*</span></label>
            <textarea
              id="course-description"
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? 'course-description-error' : undefined}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              className={`w-full bg-[#0B1120] border ${errors.description ? 'border-red-500' : description ? 'border-green-500' : 'border-white/10'} rounded-3xl px-5 py-4 outline-none resize-none transition focus:border-orange-500`}
            />
            {errors.description && <div id="course-description-error" className="text-sm text-red-400 mt-1">{errors.description}</div>}
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-3xl bg-orange-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-orange-700"
            >
              {submitting ? 'Loading...' : 'Create Course'}
            </button>

            <button
              type="button"
              onClick={() => {
                setTitle('');
                setInstructor('');
                setPrice('');
                setThumbnailUrl('');
                setDescription('');
                setFileInfo(null);
                setErrors({});
              }}
              className="rounded-3xl border border-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:border-orange-300 hover:text-orange-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddCourse;
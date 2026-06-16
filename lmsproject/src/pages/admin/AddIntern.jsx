import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Toast from '../../components/Toast';

function AddIntern() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Software Engineering');
  const [startDate, setStartDate] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Intern name is required';
    if (!email.trim()) e.email = 'Email is required';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!startDate) e.startDate = 'Start date is required';
    return e;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    setToast({ type: 'success', message: 'Intern added successfully!' });
    setName('');
    setEmail('');
    setDepartment('Software Engineering');
    setStartDate('');
    setErrors({});
  };

  return (
    <AdminLayout title="Add Intern" subtitle="Create an intern record and schedule onboarding.">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 space-y-3">
          <p className="text-orange-400 font-semibold uppercase tracking-[0.2em]">Admin Panel</p>
          <h1 className="text-5xl font-black">Add New Intern</h1>
          <p className="text-gray-400">Create an intern record and schedule their onboarding.</p>
        </div>

        <form className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/10" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="intern-name" className="block mb-2 text-gray-300">Intern Name</label>
              <input
                id="intern-name"
                required
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'intern-name-error' : undefined}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full bg-[#0B1120] border ${errors.name ? 'border-red-500' : name ? 'border-green-500' : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
              />
              {errors.name && <div id="intern-name-error" className="text-sm text-red-400 mt-1">{errors.name}</div>}
            </div>

            <div>
              <label htmlFor="intern-email" className="block mb-2 text-gray-300">Email Address</label>
              <input
                id="intern-email"
                type="email"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'intern-email-error' : undefined}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-[#0B1120] border ${errors.email ? 'border-red-500' : email ? 'border-green-500' : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
              />
              {errors.email && <div id="intern-email-error" className="text-sm text-red-400 mt-1">{errors.email}</div>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="intern-department" className="block mb-2 text-gray-300">Department</label>
              <select
                id="intern-department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-[#0B1120] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              >
                <option>Software Engineering</option>
                <option>Design</option>
                <option>Data Science</option>
                <option>Customer Success</option>
              </select>
            </div>

            <div>
              <label htmlFor="intern-start-date" className="block mb-2 text-gray-300">Start Date</label>
              <input
                id="intern-start-date"
                type="date"
                required
                aria-required="true"
                aria-invalid={!!errors.startDate}
                aria-describedby={errors.startDate ? 'intern-start-date-error' : undefined}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`w-full bg-[#0B1120] border ${errors.startDate ? 'border-red-500' : startDate ? 'border-green-500' : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
              />
              {errors.startDate && <div id="intern-start-date-error" className="text-sm text-red-400 mt-1">{errors.startDate}</div>}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-3xl bg-orange-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-orange-700"
            >
              {submitting ? 'Saving...' : 'Save Intern'}
            </button>
            <button
              type="button"
              onClick={() => {
                setName('');
                setEmail('');
                setDepartment('Software Engineering');
                setStartDate('');
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

export default AddIntern;

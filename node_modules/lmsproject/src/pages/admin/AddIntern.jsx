import { useState } from 'react';
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
    <div className="min-h-screen bg-[#070B14] text-white p-8">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-orange-400 font-semibold mb-3">Admin Panel</p>
          <h1 className="text-5xl font-black">Add New Intern</h1>
          <p className="text-gray-400 mt-2">Create an intern record and schedule their onboarding.</p>
        </div>

        <form className="bg-white/5 border border-white/10 rounded-3xl p-8" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-gray-300">Intern Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full bg-[#0B1120] border ${errors.name ? 'border-red-500' : name ? 'border-green-500' : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
              />
              {errors.name && <div className="text-sm text-red-400 mt-1">{errors.name}</div>}
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-[#0B1120] border ${errors.email ? 'border-red-500' : email ? 'border-green-500' : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
              />
              {errors.email && <div className="text-sm text-red-400 mt-1">{errors.email}</div>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block mb-2 text-gray-300">Department</label>
              <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full bg-[#0B1120] border border-white/10 rounded-2xl px-5 py-4 outline-none">
                <option>Software Engineering</option>
                <option>Design</option>
                <option>Data Science</option>
                <option>Customer Success</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`w-full bg-[#0B1120] border ${errors.startDate ? 'border-red-500' : startDate ? 'border-green-500' : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
              />
              {errors.startDate && <div className="text-sm text-red-400 mt-1">{errors.startDate}</div>}
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button type="submit" disabled={submitting} className="bg-orange-600 px-6 py-3 rounded-2xl font-bold text-white transition hover:bg-orange-500">
              {submitting ? 'Saving...' : 'Save Intern'}
            </button>
            <button type="button" onClick={() => { setName(''); setEmail(''); setDepartment('Software Engineering'); setStartDate(''); setErrors({}); }} className="border border-white/10 px-6 py-3 rounded-2xl text-white">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddIntern;

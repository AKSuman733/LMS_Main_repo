import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Toast from '../../components/Toast';

const initialItems = [
  { id: 1, title: 'New course submission: React Launchpad', type: 'Course', status: 'pending' },
  { id: 2, title: 'Intern onboarding request: Priya', type: 'Intern', status: 'pending' },
  { id: 3, title: 'Certificate approval: Fullstack Pro', type: 'Certificate', status: 'pending' },
];

function Approvals() {
  const [items, setItems] = useState(initialItems);
  const [toast, setToast] = useState(null);

  const updateStatus = (id, status) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
    setToast({ type: 'success', message: `Request ${status === 'approved' ? 'approved' : 'rejected'}.` });
  };

  return (
    <AdminLayout title="Approvals" subtitle="Process pending approvals with a single click.">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-3">
          <p className="text-orange-400 font-semibold uppercase tracking-[0.2em]">Admin Panel</p>
          <h1 className="text-5xl font-black">Pending Approvals</h1>
          <p className="text-gray-400">Review requests and update their status instantly.</p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="group rounded-3xl border border-white/10 bg-white/5 p-6 sm:flex sm:items-center sm:justify-between gap-4 transition hover:-translate-y-0.5 hover:bg-white/10">
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-2">{item.type} request</p>
                <h2 className="text-2xl font-bold mb-1">{item.title}</h2>
                <span className={`inline-flex rounded-full px-3 py-1 text-sm ${item.status === 'pending' ? 'bg-yellow-500/15 text-yellow-300' : item.status === 'approved' ? 'bg-green-500/15 text-green-300' : 'bg-red-500/15 text-red-300'}`}>
                  {item.status.toUpperCase()}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 mt-6 sm:mt-0">
                <button onClick={() => updateStatus(item.id, 'approved')} disabled={item.status !== 'pending'} className="rounded-3xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-500 disabled:bg-white/10 disabled:text-gray-400">
                  Approve
                </button>
                <button onClick={() => updateStatus(item.id, 'rejected')} disabled={item.status !== 'pending'} className="rounded-3xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:bg-white/10 disabled:text-gray-400">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Approvals;

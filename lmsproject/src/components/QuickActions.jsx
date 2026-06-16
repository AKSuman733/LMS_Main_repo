import { BookOpen, PlusCircle, CheckCircle2, BarChart3 } from 'lucide-react';

function QuickActions({ onNewCourse, onNewIntern, onApprove, onReports }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <button
        onClick={onNewCourse}
        className="group inline-flex items-center justify-center gap-2 rounded-3xl bg-orange-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
      >
        <PlusCircle size={18} />
        New Course
      </button>

      <button
        onClick={onNewIntern}
        className="group inline-flex items-center justify-center gap-2 rounded-3xl bg-indigo-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
      >
        <BookOpen size={18} />
        New Intern
      </button>

      <button
        onClick={onApprove}
        className="group inline-flex items-center justify-center gap-2 rounded-3xl border border-orange-500/30 bg-slate-950/80 px-5 py-4 text-sm font-semibold text-orange-300 transition hover:border-orange-400 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
      >
        <CheckCircle2 size={18} />
        Approve Pending
      </button>

      <button
        onClick={onReports}
        className="group inline-flex items-center justify-center gap-2 rounded-3xl border border-orange-500/30 bg-slate-950/80 px-5 py-4 text-sm font-semibold text-orange-300 transition hover:border-orange-400 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
      >
        <BarChart3 size={18} />
        View Reports
      </button>
    </div>
  );
}

export default QuickActions;

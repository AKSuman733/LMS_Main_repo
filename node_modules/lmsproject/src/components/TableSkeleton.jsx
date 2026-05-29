import React from 'react';

function TableSkeleton({ columns = 6 }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="grid grid-cols-1 gap-4 p-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="animate-pulse rounded-3xl bg-slate-700/10 p-5">
            <div className="mb-4 h-4 w-1/2 rounded-full bg-slate-400/40" />
            <div className="grid gap-3 md:grid-cols-6">
              {Array.from({ length: columns }).map((__, cellIndex) => (
                <div key={cellIndex} className="h-6 rounded-full bg-slate-400/40" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableSkeleton;

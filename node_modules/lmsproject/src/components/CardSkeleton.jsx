import React from 'react';

function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="h-5 w-2/3 rounded-full bg-slate-400/40 mb-4" />
      <div className="h-10 w-1/3 rounded-2xl bg-slate-400/40" />
    </div>
  );
}

export default CardSkeleton;

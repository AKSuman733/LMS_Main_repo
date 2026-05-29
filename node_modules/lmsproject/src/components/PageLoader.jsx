import React from 'react';

function PageLoader({ message = 'Loading...' }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 rounded-3xl bg-white/5 p-10 text-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-orange-500" />
      <p className="text-lg font-semibold text-white">{message}</p>
    </div>
  );
}

export default PageLoader;

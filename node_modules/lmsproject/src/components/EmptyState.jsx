import React from 'react';

function EmptyState({ icon = '■', title, message, actionLabel, onAction }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-orange-600">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 mb-6">{message}</p>
      {actionLabel && (
        <button onClick={onAction} className="rounded-2xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-500">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;

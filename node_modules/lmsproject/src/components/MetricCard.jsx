import React from 'react';
import { tokens } from '../designTokens';

function MetricCard({ label, value, accent, status }) {
  const accentColor = accent || tokens.colors.primary;
  return (
    <div className="rounded-xl bg-white/3 p-4 flex flex-col justify-between" style={{ boxShadow: tokens.shadows.sm, background: 'rgba(255,255,255,0.02)' }}>
      <div className="flex items-start gap-4">
        <div className="w-2 rounded-sm" style={{ background: accentColor, height: '100%' }} />
        <div className="flex-1">
          <div className="text-sm text-gray-300">{label}</div>
          <div className="mt-2 flex items-center gap-3">
            <div className="text-lg font-bold text-white">{value}</div>
            {status && <div className="text-sm text-gray-400">{status}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetricCard;

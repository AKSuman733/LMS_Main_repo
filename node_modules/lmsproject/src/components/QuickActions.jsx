import React from 'react';
import { tokens } from '../designTokens';

function QuickActions({ onNewCourse, onNewIntern, onApprove, onReports }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <button
        onClick={onNewCourse}
        className="w-full flex items-center justify-center text-white font-semibold rounded-xl"
        style={{ background: tokens.colors.primary, height: 45, boxShadow: tokens.shadows.sm }}
      >
        + New Course
      </button>

      <button
        onClick={onNewIntern}
        className="w-full flex items-center justify-center text-white font-semibold rounded-xl"
        style={{ background: tokens.colors.primary, height: 45, boxShadow: tokens.shadows.sm }}
      >
        + New Intern
      </button>

      <button
        onClick={onApprove}
        className="w-full flex items-center justify-center font-semibold rounded-xl"
        style={{ border: `2px solid ${tokens.colors.secondary}`, color: tokens.colors.secondary, height: 45 }}
      >
        Approve Pending
      </button>

      <button
        onClick={onReports}
        className="w-full flex items-center justify-center font-semibold rounded-xl"
        style={{ border: `2px solid ${tokens.colors.secondary}`, color: tokens.colors.secondary, height: 45 }}
      >
        View Reports
      </button>
    </div>
  );
}

export default QuickActions;

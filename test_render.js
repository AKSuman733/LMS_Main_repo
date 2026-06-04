import { renderToString } from 'react-dom/server';
import React from 'react';
import StudentDashboard from './src/pages/Dashboard/StudentDashboard.jsx';

try {
  renderToString(React.createElement(StudentDashboard));
  console.log("Rendered successfully");
} catch (e) {
  console.error("Render crashed:", e);
}

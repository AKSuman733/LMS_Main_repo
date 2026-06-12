import React from 'react';
import './SkeletonTable.css';

const SkeletonTable = ({ columns = 5, rows = 5 }) => {
  return (
    <div className="skeleton-table-wrapper">
      <div className="skeleton-header-toolbar">
        <div className="skeleton-search pulse-anim"></div>
        <div className="skeleton-btn pulse-anim"></div>
      </div>
      
      <div className="skeleton-table-container">
        <table className="skeleton-table">
          <thead>
            <tr>
              {[...Array(columns)].map((_, i) => (
                <th key={i}>
                  <div className="skeleton-th pulse-anim"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(columns)].map((_, colIndex) => (
                  <td key={colIndex}>
                    <div className="skeleton-td pulse-anim" style={{ width: `${Math.random() * 40 + 40}%` }}></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="skeleton-pagination">
        <div className="skeleton-page-info pulse-anim"></div>
        <div className="skeleton-page-controls pulse-anim"></div>
      </div>
    </div>
  );
};

export default SkeletonTable;

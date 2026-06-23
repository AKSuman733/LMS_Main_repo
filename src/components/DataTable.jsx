import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, ChevronUp, ChevronsUpDown, 
  Search, MoreVertical, X, Filter
} from 'lucide-react';

const DataTable = ({
  columns,
  data,
  isLoading,
  isError,
  emptyState,
  errorState,
  onRowAction,
  bulkActions,
  globalSearchFields = []
}) => {
  const [globalSearch, setGlobalSearch] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});
  const [selectedRowIds, setSelectedRowIds] = useState(new Set());
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [jumpPage, setJumpPage] = useState('');

  // Active filter dropdown state
  const [activeFilterCol, setActiveFilterCol] = useState(null);

  // Sorting logic
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter toggle logic
  const toggleFilter = (colKey, value) => {
    setFilters(prev => {
      const current = prev[colKey] || new Set();
      const updated = new Set(current);
      if (updated.has(value)) {
        updated.delete(value);
      } else {
        updated.add(value);
      }
      return { ...prev, [colKey]: updated };
    });
    setCurrentPage(1); // Reset to first page
  };

  const clearFilters = () => {
    setFilters({});
    setGlobalSearch('');
    setCurrentPage(1);
  };

  // Select logic
  const toggleSelectAll = (isAllSelected, currentPageRowIds) => {
    if (isAllSelected) {
      setSelectedRowIds(new Set());
    } else {
      setSelectedRowIds(new Set(currentPageRowIds));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedRowIds(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  // Derived data
  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Global Search
    if (globalSearch && globalSearchFields.length > 0) {
      const searchLower = globalSearch.toLowerCase();
      result = result.filter(item => 
        globalSearchFields.some(field => 
          String(item[field]).toLowerCase().includes(searchLower)
        )
      );
    }

    // Column Filters
    Object.entries(filters).forEach(([key, filterSet]) => {
      if (filterSet.size > 0) {
        result = result.filter(item => filterSet.has(String(item[key])));
      }
    });

    // Sorting
    if (sortConfig !== null) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, globalSearch, filters, sortConfig, globalSearchFields]);

  // Pagination
  const totalRows = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage) || 1;
  const currentData = filteredAndSortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  
  const currentPageRowIds = currentData.map(row => row.id);
  const isAllSelected = currentPageRowIds.length > 0 && currentPageRowIds.every(id => selectedRowIds.has(id));
  const isIndeterminate = selectedRowIds.size > 0 && !isAllSelected;

  const hasActiveFilters = Object.values(filters).some(set => set.size > 0) || globalSearch.trim().length > 0;

  // Handle jump page
  const handleJumpPage = (e) => {
    e.preventDefault();
    const page = parseInt(jumpPage, 10);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
    setJumpPage('');
  };

  // Get unique values for filters
  const getUniqueValues = (key) => {
    const vals = data.map(item => String(item[key]));
    return [...new Set(vals)].filter(Boolean).sort();
  };

  const highlightText = (text) => {
    if (!globalSearch.trim()) return text;
    const parts = String(text).split(new RegExp(`(${globalSearch})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === globalSearch.toLowerCase() ? 
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 text-inherit">{part}</mark> : part
        )}
      </span>
    );
  };

  // Render logic
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
        <div className="mb-4 text-gray-400 dark:text-gray-500">
          {errorState?.icon || <X className="w-12 h-12" />}
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {errorState?.title || "Error loading data"}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">
          {errorState?.message || "We encountered an error. Please try again."}
        </p>
        {errorState?.action}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {globalSearchFields.length > 0 && (
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={globalSearch}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          )}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-brand-orange hover:text-orange-800 dark:text-brand-orange-light dark:hover:text-brand-orange-light flex items-center whitespace-nowrap"
            >
              Clear filters
            </button>
          )}
        </div>

        {selectedRowIds.size > 0 && bulkActions && bulkActions.length > 0 && (
          <div className="flex items-center space-x-2 bg-orange-50 dark:bg-orange-900/30 px-4 py-2 rounded-lg border border-orange-100 dark:border-orange-800">
            <span className="text-sm font-medium text-orange-800 dark:text-blue-200">
              {selectedRowIds.size} selected
            </span>
            <div className="h-4 w-px bg-blue-200 dark:bg-brand-orange-dark mx-2"></div>
            {bulkActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  action.onClick(Array.from(selectedRowIds));
                  if (!action.keepSelection) setSelectedRowIds(new Set());
                }}
                className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
                  action.destructive 
                  ? 'text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/50' 
                  : 'text-brand-orange hover:bg-orange-100 dark:text-brand-orange-light dark:hover:bg-orange-800/50'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="bg-[#F3F1ED] dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 w-12">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={input => {
                        if (input) input.indeterminate = isIndeterminate;
                      }}
                      onChange={() => toggleSelectAll(isAllSelected, currentPageRowIds)}
                      className="w-4 h-4 text-brand-orange bg-white border-gray-300 rounded focus:ring-brand-orange focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                      aria-label="Select all rows"
                    />
                  </div>
                </th>
                {columns.map(col => (
                  <th 
                    key={col.key} 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider relative"
                  >
                    <div className="flex items-center space-x-1">
                      <div 
                        className={`flex items-center space-x-1 ${col.sortable !== false ? 'cursor-pointer hover:text-gray-900 dark:hover:text-white' : ''}`}
                        onClick={() => col.sortable !== false && handleSort(col.key)}
                      >
                        <span>{col.label}</span>
                        {col.sortable !== false && (
                          <span className="text-gray-400 flex flex-col -space-y-2">
                            {sortConfig?.key === col.key ? (
                              sortConfig.direction === 'asc' ? <ChevronUp className="w-3 h-3 text-brand-orange" /> : <ChevronDown className="w-3 h-3 text-brand-orange" />
                            ) : (
                              <ChevronsUpDown className="w-3 h-3" />
                            )}
                          </span>
                        )}
                      </div>
                      
                      {col.filterable && (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveFilterCol(activeFilterCol === col.key ? null : col.key);
                            }}
                            className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${filters[col.key]?.size > 0 ? 'text-brand-orange' : 'text-gray-400'}`}
                          >
                            <Filter className="w-3 h-3" />
                          </button>
                          
                          {activeFilterCol === col.key && (
                            <div className="absolute top-full mt-1 left-0 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-50 py-2">
                              <div className="px-3 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b dark:border-gray-700 mb-2">
                                Filter by {col.label}
                              </div>
                              <div className="max-h-48 overflow-y-auto">
                                {getUniqueValues(col.key).map(val => (
                                  <label key={val} className="flex items-center px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={filters[col.key]?.has(val) || false}
                                      onChange={() => toggleFilter(col.key, val)}
                                      className="w-4 h-4 text-brand-orange rounded border-gray-300 focus:ring-brand-orange dark:border-gray-600 dark:bg-gray-700 mr-2"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{val}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
                {onRowAction && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={`skeleton-${idx}`} className={idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-[#F9F8F6] dark:bg-gray-800/50'}>
                    <td className="px-6 py-4"><div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div></td>
                    {columns.map(col => (
                      <td key={`skel-${col.key}`} className="px-6 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                      </td>
                    ))}
                    {onRowAction && (
                      <td className="px-6 py-4 text-right">
                        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full inline-block animate-pulse"></div>
                      </td>
                    )}
                  </tr>
                ))
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (onRowAction ? 2 : 1)} className="px-6 py-16">
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-4 text-gray-400 dark:text-gray-500">
                        {emptyState?.icon || <Filter className="w-12 h-12" />}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {emptyState?.title || "No results found"}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">
                        {emptyState?.message || "Try adjusting your search or filters to find what you're looking for."}
                      </p>
                      {emptyState?.action}
                    </div>
                  </td>
                </tr>
              ) : (
                currentData.map((row, idx) => (
                  <tr 
                    key={row.id} 
                    className={`
                      ${idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-[#F9F8F6] dark:bg-gray-800/80'} 
                      hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors group
                    `}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={selectedRowIds.has(row.id)}
                          onChange={() => toggleSelectRow(row.id)}
                          className="w-4 h-4 text-brand-orange bg-white border-gray-300 rounded focus:ring-brand-orange focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                        />
                      </div>
                    </td>
                    {columns.map(col => (
                      <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                        {col.render 
                          ? col.render(row, highlightText) 
                          : <span className="text-sm text-gray-900 dark:text-white">{highlightText(row[col.key])}</span>}
                      </td>
                    ))}
                    {onRowAction && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <RowActionMenu row={row} actions={onRowAction} />
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!isLoading && currentData.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Showing {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows} results
              </span>
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">Rows per page:</label>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded text-sm focus:ring-brand-orange focus:border-brand-orange"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm"
              >
                Next
              </button>
              
              <form onSubmit={handleJumpPage} className="flex items-center ml-4 space-x-2">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={jumpPage}
                  onChange={(e) => setJumpPage(e.target.value)}
                  placeholder="Go to"
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-brand-orange focus:border-brand-orange dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                <button type="submit" className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300">
                  Go
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Row Action Menu Component (Dropdown)
const RowActionMenu = ({ row, actions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = React.useRef(null);
  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        ref={buttonRef}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Row actions"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10 border border-gray-200 dark:border-gray-700 animate-scale-in focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsOpen(false);
                  action.onClick(row);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  action.destructive 
                    ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700'
                } focus:outline-none`}
                role="menuitem"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;

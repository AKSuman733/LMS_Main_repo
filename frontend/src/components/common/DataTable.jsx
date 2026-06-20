import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight, 
  Search, MoreVertical, Eye, Edit2, Trash2, Archive,
  Filter, Download, AlertCircle, Database
} from 'lucide-react';
import SkeletonTable from './SkeletonTable';
import { EmptyState, ErrorState } from './StateDisplays';
import './DataTable.css';

const DataTable = ({ 
  data = [], 
  columns = [], 
  bulkActions = [], 
  rowActions = [], 
  searchPlaceholder = "Search...",
  keyField = "id",
  isLoading = false,
  error = null,
  errorConfig = null,
  emptyConfig = null
}) => {
  const [globalSearch, setGlobalSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [selectedRowIds, setSelectedRowIds] = useState(new Set());
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [jumpPage, setJumpPage] = useState('');

  // UI state
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [openFilterKey, setOpenFilterKey] = useState(null);
  
  const tableRef = useRef(null);

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setOpenActionMenuId(null);
        setOpenFilterKey(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = processedData.map(row => row[keyField]);
      setSelectedRowIds(new Set(allIds));
    } else {
      setSelectedRowIds(new Set());
    }
  };

  const toggleSelectRow = (id) => {
    const newSelected = new Set(selectedRowIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRowIds(newSelected);
  };

  // Process data (Filter -> Search -> Sort)
  const processedData = useMemo(() => {
    let result = [...data];

    // 1. Filter
    Object.keys(filters).forEach(key => {
      const activeFilters = filters[key];
      if (activeFilters && activeFilters.length > 0) {
        result = result.filter(row => activeFilters.includes(String(row[key])));
      }
    });

    // 2. Search
    if (globalSearch) {
      const lowerSearch = globalSearch.toLowerCase();
      result = result.filter(row => {
        return Object.values(row).some(val => 
          String(val).toLowerCase().includes(lowerSearch)
        );
      });
    }

    // 3. Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, filters, globalSearch, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  const paginatedData = processedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Reset pagination when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [globalSearch, filters]);

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = String(text).split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={i} className="highlight">{part}</span> : part
    );
  };

  const getUniqueValuesForColumn = (key) => {
    const values = data.map(row => String(row[key]));
    return [...new Set(values)].filter(Boolean);
  };

  const toggleFilter = (key, value) => {
    const currentFilters = filters[key] || [];
    let newFilters;
    if (currentFilters.includes(value)) {
      newFilters = currentFilters.filter(v => v !== value);
    } else {
      newFilters = [...currentFilters, value];
    }
    
    setFilters(prev => ({
      ...prev,
      [key]: newFilters
    }));
  };

  if (isLoading) {
    return <SkeletonTable columns={columns.length} rows={5} />;
  }

  if (error) {
    return (
      <ErrorState 
        icon={<AlertCircle />}
        title={errorConfig?.title || "Unable to Load Data"}
        message={errorConfig?.message || error || "We encountered an error. Please try again."}
        onRetry={errorConfig?.onRetry}
        supportLink={errorConfig?.supportLink || "#"}
      />
    );
  }

  if (data.length === 0 && !globalSearch && Object.keys(filters).length === 0) {
    return (
      <EmptyState 
        icon={emptyConfig?.icon || <Database />}
        title={emptyConfig?.title || "No Data Available"}
        message={emptyConfig?.message || "There are currently no records to display."}
        actionText={emptyConfig?.actionText}
        onAction={emptyConfig?.onAction}
      />
    );
  }

  return (
    <div className="datatable-container" ref={tableRef}>
      <div className="datatable-header-toolbar">
        <div className="datatable-search">
          <Search size={18} />
          <input 
            type="text" 
            placeholder={searchPlaceholder}
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
        </div>
        
        {selectedRowIds.size > 0 && (
          <div className="datatable-bulk-actions animate-fade-in">
            <span>{selectedRowIds.size} selected</span>
            {bulkActions.map((action, idx) => (
              <button 
                key={idx} 
                className={`btn-bulk ${action.type || ''}`}
                onClick={() => action.onClick(Array.from(selectedRowIds))}
              >
                {action.icon && action.icon}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

<<<<<<< HEAD
      <div className="datatable-wrapper table-responsive">
=======
      <div className="datatable-wrapper">
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
        <table className="datatable">
          <thead>
            <tr>
              <th className="checkbox-cell">
                <input 
                  type="checkbox" 
                  className="custom-checkbox"
                  checked={processedData.length > 0 && selectedRowIds.size === processedData.length}
                  onChange={toggleSelectAll}
                />
              </th>
              {columns.map((col) => (
                <th key={col.key}>
                  <div className="datatable-th-content">
                    <span 
                      style={{ flex: col.sortable ? 1 : 'none' }}
                      onClick={() => col.sortable && handleSort(col.key)}
                    >
                      {col.label}
                    </span>
                    
                    {col.sortable && (
                      <div className="sort-icon-group" onClick={() => handleSort(col.key)}>
                        <ChevronUp size={12} className={`sort-icon ${sortConfig.key === col.key && sortConfig.direction === 'asc' ? 'active' : ''}`} style={{ marginBottom: '-4px' }} />
                        <ChevronDown size={12} className={`sort-icon ${sortConfig.key === col.key && sortConfig.direction === 'desc' ? 'active' : ''}`} />
                      </div>
                    )}

                    {col.filterable && (
                      <div style={{ position: 'relative' }}>
                        <Filter 
                          size={14} 
<<<<<<< HEAD
                          style={{ cursor: 'pointer', color: (filters[col.key] && filters[col.key].length > 0) ? '#FF6B35' : '#9ca3af' }}
=======
                          style={{ cursor: 'pointer', color: (filters[col.key] && filters[col.key].length > 0) ? '#8b5cf6' : '#9ca3af' }}
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenFilterKey(openFilterKey === col.key ? null : col.key);
                          }}
                        />
                        {openFilterKey === col.key && (
                          <div className="filter-popover" onClick={e => e.stopPropagation()}>
                            <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '13px' }}>Filter by {col.label}</div>
                            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                              {getUniqueValuesForColumn(col.key).map(val => (
                                <label key={val} className="filter-option">
                                  <input 
                                    type="checkbox" 
                                    className="custom-checkbox"
                                    checked={(filters[col.key] || []).includes(val)}
                                    onChange={() => toggleFilter(col.key, val)}
                                  />
                                  {val}
                                </label>
                              ))}
                            </div>
                            <div className="filter-actions">
                              <button 
                                className="btn-filter-clear"
                                onClick={() => setFilters(prev => ({...prev, [col.key]: []}))}
                              >
                                Clear
                              </button>
                              <button 
                                className="btn-filter-apply"
                                onClick={() => setOpenFilterKey(null)}
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}
              {rowActions.length > 0 && <th style={{ width: '60px' }}></th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (rowActions.length > 0 ? 2 : 1)} style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  No data found
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={row[keyField]}>
                  <td className="checkbox-cell">
                    <input 
                      type="checkbox" 
                      className="custom-checkbox"
                      checked={selectedRowIds.has(row[keyField])}
                      onChange={() => toggleSelectRow(row[keyField])}
                    />
                  </td>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render 
                        ? col.render(row, (text) => highlightText(text, globalSearch)) 
                        : highlightText(row[col.key], globalSearch)}
                    </td>
                  ))}
                  {rowActions.length > 0 && (
                    <td className="row-actions-cell">
                      <button 
                        className="btn-icon-dots"
                        onClick={() => setOpenActionMenuId(openActionMenuId === row[keyField] ? null : row[keyField])}
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {openActionMenuId === row[keyField] && (
                        <div className="actions-popover">
                          {rowActions.map((action, idx) => {
                            if (action.show && !action.show(row)) return null;
                            return (
                              <button 
                                key={idx} 
                                className={action.type === 'delete' ? 'delete-action' : ''}
                                onClick={() => {
                                  action.onClick(row);
                                  setOpenActionMenuId(null);
                                }}
                              >
                                {action.icon && action.icon}
                                {action.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="datatable-pagination">
        <div className="rows-per-page">
          <span>Rows per page:</span>
          <select 
            value={rowsPerPage} 
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="pagination-info">
          Showing {processedData.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} - {Math.min(currentPage * rowsPerPage, processedData.length)} of {processedData.length} results
        </div>

        <div className="pagination-controls">
          <div className="page-jump">
            <span>Jump to:</span>
            <input 
              type="number" 
              min={1} 
              max={totalPages || 1}
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  let p = Number(jumpPage);
                  if (p >= 1 && p <= totalPages) setCurrentPage(p);
                  setJumpPage('');
                }
              }}
            />
          </div>
          <div className="page-buttons">
            <button 
              className="btn-page" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              className="btn-page" 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Filter, Search, MoreVertical, X, Download, Archive, Trash, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export const highlightText = (text, search) => {
    if (!search || !text) return text;
    const strText = String(text);
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = strText.split(regex);
    return parts.map((part, index) => 
        regex.test(part) ? <mark key={index} className="enhanced-table-highlight">{part}</mark> : part
    );
};

const EnhancedTable = ({
    data = [],
    columns = [],
    searchPlaceholder = "Search...",
    onRowAction = () => {},
    onBulkAction = () => {},
    defaultSortKey = null,
    defaultSortDir = "asc",
    isArchivedMode = false,
    loading = false
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: defaultSortKey, direction: defaultSortDir });
    const [filters, setFilters] = useState({});
    const [activeFilterDropdown, setActiveFilterDropdown] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [activeRowMenu, setActiveRowMenu] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [jumpInput, setJumpInput] = useState("");

    const rowMenuRef = useRef(null);
    const filterDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (rowMenuRef.current && !rowMenuRef.current.contains(e.target)) {
                setActiveRowMenu(null);
            }
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
                setActiveFilterDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        setJumpInput("");
    }, [searchQuery, filters]);

    const getColumnFilterOptions = (column) => {
        if (column.filterOptions) return column.filterOptions;
        const unique = new Set();
        data.forEach(row => {
            const val = row[column.key];
            if (val !== undefined && val !== null) {
                if (typeof val === 'boolean') {
                    if (column.key === 'approved') {
                        unique.add(val ? 'Active' : 'Pending Approval');
                    } else if (column.key === 'completed') {
                        unique.add(val ? 'Completed' : 'In Progress');
                    } else {
                        unique.add(val ? 'True' : 'False');
                    }
                } else {
                    unique.add(String(val));
                }
            }
        });
        return Array.from(unique);
    };

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const getProcessedData = () => {
        let result = data.filter(row => {
            if (searchQuery) {
                const matchesSearch = columns.some(col => {
                    if (!col.searchable) return false;
                    const val = row[col.key];
                    return val !== undefined && val !== null && String(val).toLowerCase().includes(searchQuery.toLowerCase());
                });
                if (!matchesSearch) return false;
            }

            for (const key of Object.keys(filters)) {
                const selectedValues = filters[key];
                if (selectedValues && selectedValues.length > 0) {
                    const rowValue = row[key];
                    const matchesValue = selectedValues.some(val => {
                        if (typeof rowValue === 'boolean') {
                            const displayVal = key === 'approved' 
                                ? (rowValue ? 'Active' : 'Pending Approval')
                                : (rowValue ? 'Completed' : 'In Progress');
                            return val === displayVal;
                        }
                        return String(rowValue).toLowerCase() === String(val).toLowerCase();
                    });
                    if (!matchesValue) return false;
                }
            }
            return true;
        });

        if (sortConfig.key) {
            result.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];

                if (valA === undefined || valA === null) return 1;
                if (valB === undefined || valB === null) return -1;

                let comparison = 0;
                if (typeof valA === 'string' && typeof valB === 'string') {
                    comparison = valA.localeCompare(valB);
                } else {
                    comparison = valA < valB ? -1 : valA > valB ? 1 : 0;
                }
                return sortConfig.direction === "asc" ? comparison : -comparison;
            });
        }

        return result;
    };

    const processedData = getProcessedData();

    const totalRows = processedData.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage) || 1;
    const paginatedData = processedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const startRow = totalRows === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
    const endRow = Math.min(currentPage * rowsPerPage, totalRows);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleJumpPage = (e) => {
        e.preventDefault();
        const parsed = parseInt(jumpInput, 10);
        if (parsed >= 1 && parsed <= totalPages) {
            setCurrentPage(parsed);
            setJumpInput("");
        } else {
            toast.error(`Please enter a page between 1 and ${totalPages}`);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const pageIds = paginatedData.map(row => row.id);
            setSelectedRows(prev => Array.from(new Set([...prev, ...pageIds])));
        } else {
            const pageIds = paginatedData.map(row => row.id);
            setSelectedRows(prev => prev.filter(id => !pageIds.includes(id)));
        }
    };

    const handleSelectRow = (id, checked) => {
        if (checked) {
            setSelectedRows(prev => [...prev, id]);
        } else {
            setSelectedRows(prev => prev.filter(rowId => rowId !== id));
        }
    };

    const isAllPageSelected = () => {
        if (paginatedData.length === 0) return false;
        return paginatedData.every(row => selectedRows.includes(row.id));
    };

    const handleFilterCheckbox = (columnKey, option, checked) => {
        setFilters(prev => {
            const currentSelected = prev[columnKey] || [];
            let newSelected;
            if (checked) {
                newSelected = [...currentSelected, option];
            } else {
                newSelected = currentSelected.filter(item => item !== option);
            }
            return {
                ...prev,
                [columnKey]: newSelected
            };
        });
    };

    const clearColumnFilter = (columnKey) => {
        setFilters(prev => {
            const copy = { ...prev };
            delete copy[columnKey];
            return copy;
        });
        setActiveFilterDropdown(null);
    };

    const clearAllFilters = () => {
        setFilters({});
        setSearchQuery("");
        setSelectedRows([]);
        toast.success("Filters and search cleared!");
    };

    const handleExportCSV = () => {
        const rowsToExport = data.filter(row => selectedRows.includes(row.id));
        if (rowsToExport.length === 0) return;

        const csvHeaders = columns.map(col => `"${col.label.replace(/"/g, '""')}"`).join(",");
        
        const csvLines = rowsToExport.map(row => {
            return columns.map(col => {
                let cellVal = row[col.key];
                if (typeof cellVal === 'boolean') {
                    cellVal = col.key === 'approved' 
                        ? (cellVal ? 'Active' : 'Pending Approval') 
                        : (cellVal ? 'Completed' : 'In Progress');
                }
                const cleanCell = cellVal !== undefined && cellVal !== null ? String(cellVal) : "";
                return `"${cleanCell.replace(/"/g, '""')}"`;
            }).join(",");
        });

        const csvContent = [csvHeaders, ...csvLines].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `LMS_Export_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`Successfully exported ${rowsToExport.length} rows to CSV!`);
    };

    const triggerBulkAction = (action) => {
        if (action === "export") {
            handleExportCSV();
        } else {
            onBulkAction(action, selectedRows);
            setSelectedRows([]);
        }
    };

    const toggleFilterDropdown = (columnKey, e) => {
        e.stopPropagation();
        if (activeFilterDropdown === columnKey) {
            setActiveFilterDropdown(null);
        } else {
            setActiveFilterDropdown(columnKey);
        }
    };

    const toggleRowMenu = (rowId, e) => {
        e.stopPropagation();
        if (activeRowMenu === rowId) {
            setActiveRowMenu(null);
        } else {
            setActiveRowMenu(rowId);
        }
    };

    return (
        <div className="enhanced-table-container">
            <div className="enhanced-table-toolbar">
                <div className="enhanced-table-search-wrapper">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        className="enhanced-table-search-input"
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button className="clear-search-btn" onClick={() => setSearchQuery("")}>
                            <X size={16} />
                        </button>
                    )}
                </div>

                {(Object.keys(filters).some(k => filters[k]?.length > 0) || searchQuery) && (
                    <button className="clear-all-filters-btn" onClick={clearAllFilters}>
                        <RefreshCw size={14} /> Clear all filters
                    </button>
                )}

                {selectedRows.length > 0 && (
                    <div className="enhanced-table-bulk-actions">
                        <span className="bulk-selection-count">
                            <strong>{selectedRows.length}</strong> selected
                        </span>
                        <div className="bulk-actions-buttons">
                            <button className="bulk-action-btn export" onClick={() => triggerBulkAction("export")}>
                                <Download size={15} /> Export Selected
                            </button>
                            <button className="bulk-action-btn archive" onClick={() => triggerBulkAction(isArchivedMode ? "unarchive" : "archive")}>
                                <Archive size={15} /> {isArchivedMode ? "Unarchive Selected" : "Archive Selected"}
                            </button>
                            <button className="bulk-action-btn delete" onClick={() => triggerBulkAction("delete")}>
                                <Trash size={15} /> Delete Selected
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="enhanced-table-scroll-wrapper">
                <table className="enhanced-custom-table">
                    <thead>
                        <tr>
                            <th className="checkbox-cell">
                                <label className="table-custom-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={isAllPageSelected()}
                                        onChange={handleSelectAll}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </th>

                            {columns.map(col => {
                                const isSorted = sortConfig.key === col.key;
                                const isFilterActive = filters[col.key]?.length > 0;
                                return (
                                    <th 
                                        key={col.key}
                                        style={{ width: col.width }}
                                        className={`${col.sortable ? 'sortable-header' : ''} ${isSorted ? 'active-sort' : ''}`}
                                    >
                                        <div className="header-cell-inner">
                                            <span 
                                                className="header-label-click"
                                                onClick={() => col.sortable && handleSort(col.key)}
                                            >
                                                {col.label}
                                                {col.sortable && (
                                                    <span className="sort-arrows">
                                                        {isSorted ? (
                                                            sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                                                        ) : (
                                                            <span className="sort-placeholder">↕</span>
                                                        )}
                                                    </span>
                                                )}
                                            </span>

                                            {col.filterable && (
                                                <div className="filter-dropdown-wrapper">
                                                    <button 
                                                        className={`filter-toggle-btn ${isFilterActive ? 'active-filter' : ''}`}
                                                        onClick={(e) => toggleFilterDropdown(col.key, e)}
                                                        title={`Filter by ${col.label}`}
                                                    >
                                                        <Filter size={12} />
                                                    </button>

                                                    {activeFilterDropdown === col.key && (
                                                        <div className="filter-popup-dropdown" ref={filterDropdownRef}>
                                                            <div className="filter-popup-header">
                                                                <span>Filter {col.label}</span>
                                                                {isFilterActive && (
                                                                    <button className="clear-single-filter-link" onClick={() => clearColumnFilter(col.key)}>
                                                                        Clear
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <div className="filter-popup-options">
                                                                {getColumnFilterOptions(col).map(opt => {
                                                                    const isChecked = (filters[col.key] || []).includes(opt);
                                                                    return (
                                                                        <label key={opt} className="filter-popup-option-row">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={isChecked}
                                                                                onChange={(e) => handleFilterCheckbox(col.key, opt, e.target.checked)}
                                                                            />
                                                                            <span className="filter-option-text">{opt}</span>
                                                                        </label>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                );
                            })}
                            
                            <th className="actions-header-cell">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, rowIndex) => (
                                    <tr key={`skeleton-row-${rowIndex}`} className="skeleton-row">
                                        <td className="checkbox-cell">
                                            <div className="skeleton-checkbox skeleton-pulse"></div>
                                        </td>
                                        {columns.map((col, colIndex) => (
                                            <td key={`skeleton-cell-${colIndex}`} style={{ width: col.width }}>
                                                <div 
                                                    className="skeleton-bar skeleton-pulse" 
                                                    style={{ 
                                                        width: colIndex % 3 === 0 ? '70%' : colIndex % 3 === 1 ? '85%' : '55%',
                                                        margin: col.alignment === 'center' ? '0 auto' : '0'
                                                    }}
                                                ></div>
                                            </td>
                                        ))}
                                        <td className="actions-cell">
                                            <div className="skeleton-actions-btn skeleton-pulse"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : paginatedData.length === 0 ? (
                                <motion.tr
                                    key="no-data"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <td colSpan={columns.length + 2} className="no-data-placeholder">
                                        No records found matching filters or search terms.
                                    </td>
                                </motion.tr>
                            ) : (
                                paginatedData.map((row, index) => {
                                    const isSelected = selectedRows.includes(row.id);
                                    return (
                                        <motion.tr 
                                            key={row.id} 
                                            layout
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.22, ease: "easeOut" }}
                                            className={`${isSelected ? 'row-selected' : ''} ${index % 2 === 0 ? 'row-even' : 'row-odd'}`}
                                        >
                                            <td className="checkbox-cell">
                                                <label className="table-custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </td>

                                            {columns.map(col => (
                                                <td key={col.key}>
                                                    {col.renderCell 
                                                        ? col.renderCell(row, searchQuery) 
                                                        : (col.searchable 
                                                            ? highlightText(row[col.key], searchQuery) 
                                                            : (row[col.key] !== undefined && row[col.key] !== null ? String(row[col.key]) : "")
                                                          )
                                                    }
                                                </td>
                                            ))}

                                            <td className="actions-cell">
                                                <div className="row-action-menu-wrapper">
                                                    <button 
                                                        className="row-dots-btn"
                                                        onClick={(e) => toggleRowMenu(row.id, e)}
                                                    >
                                                        <MoreVertical size={16} />
                                                    </button>

                                                    {activeRowMenu === row.id && (
                                                        <div className="row-actions-dropdown" ref={rowMenuRef}>
                                                            <button className="row-action-item" onClick={() => { onRowAction("view", row); setActiveRowMenu(null); }}>
                                                                👁️ View details
                                                            </button>
                                                            <button className="row-action-item" onClick={() => { onRowAction("edit", row); setActiveRowMenu(null); }}>
                                                                ✏️ Edit record
                                                            </button>
                                                            {row.approved !== undefined && (
                                                                row.approved ? (
                                                                    <button className="row-action-item" onClick={() => { onRowAction("suspend", row); setActiveRowMenu(null); }}>
                                                                        🔴 Suspend
                                                                    </button>
                                                                ) : (
                                                                    <button className="row-action-item" onClick={() => { onRowAction("approve", row); setActiveRowMenu(null); }}>
                                                                        🟢 Approve
                                                                    </button>
                                                                )
                                                            )}
                                                            <button className="row-action-item" onClick={() => { onRowAction(isArchivedMode ? "unarchive" : "archive", row); setActiveRowMenu(null); }}>
                                                                📦 {isArchivedMode ? "Unarchive row" : "Archive row"}
                                                            </button>
                                                            <button className="row-action-item delete" onClick={() => { onRowAction("delete", row); setActiveRowMenu(null); }}>
                                                                🗑️ Delete record
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            <div className={`enhanced-table-pagination ${loading ? 'enhanced-table-pagination-loading' : ''}`}>
                <div className="pagination-info">
                    {loading ? (
                        <span>Loading records...</span>
                    ) : (
                        <>Showing <strong>{startRow}</strong> to <strong>{endRow}</strong> of <strong>{totalRows}</strong> records</>
                    )}
                </div>

                <div className="pagination-controls-right">
                    <div className="rows-per-page">
                        <span className="pagination-label">Rows per page:</span>
                        <select 
                            className="pagination-select"
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

                    <div className="pagination-pages-nav">
                        <button 
                            className="nav-arrow-btn" 
                            disabled={currentPage === 1}
                            onClick={handlePrevPage}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        
                        <span className="nav-pages-display">
                            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                        </span>

                        <button 
                            className="nav-arrow-btn" 
                            disabled={currentPage === totalPages}
                            onClick={handleNextPage}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    <form onSubmit={handleJumpPage} className="jump-to-page-form">
                        <span className="pagination-label">Go to:</span>
                        <input
                            type="number"
                            className="jump-page-input"
                            min={1}
                            max={totalPages}
                            value={jumpInput}
                            onChange={(e) => setJumpInput(e.target.value)}
                            placeholder="Page #"
                        />
                        <button type="submit" className="jump-page-submit-btn">Go</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EnhancedTable;

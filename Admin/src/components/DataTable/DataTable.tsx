import React, { useState, useEffect, useRef } from 'react';
import { colors, spacing, radius, shadows, transitions, zIndex } from '../../designTokens';
import { useToast } from '../Toast/ToastProvider';
import { ConfirmModal } from '../Modal/ModalSystem';
import { TableSkeleton } from '../Skeleton/TableSkeleton';
import {
  IconChevronUp,
  IconChevronDown,
  IconSelector,
  IconDotsVertical,
  IconChevronRight,
  IconSearch,
  IconFilter,
  IconCheck,
  IconX,
  IconTrash,
  IconDownload,
  IconCalendar,
  IconBook,
  IconUser,
  IconClock,
  IconAlertTriangle,
  IconInfoCircle,
  IconCircleCheck,
  IconCircleX
} from '@tabler/icons-react';

// --- TYPES ---
export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: string[];
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: string;
  title?: string;
  onAdd?: () => void;
  addLabel?: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onView?: (row: T) => void;
  onArchive?: (row: T) => void;
  onExport?: (rows: T[]) => void;
  loading?: boolean;
  emptyState?: React.ReactNode;
  rowsPerPageOptions?: number[];
}

// --- CUSTOM PIXEL-PERFECT CHECKBOX COMPONENT ---
interface CustomCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function CustomCheckbox({ checked, indeterminate, onChange, disabled }: CustomCheckboxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!disabled) onChange(!checked);
    }
  };

  // Build standard styles based on spec
  let bg = '#FFFFFF';
  let border = '1px solid #D1D5DB';
  let content = null;

  if (checked) {
    bg = '#FF6B35';
    border = '1px solid #FF6B35';
    content = <IconCheck size={10} strokeWidth={3} className="text-white" />;
  } else if (indeterminate) {
    bg = 'rgba(255, 107, 53, 0.3)';
    border = '1px solid #FF6B35';
    content = <div className="w-1.5 h-0.5 bg-[#FF6B35] rounded-full" />;
  } else if (isHovered && !disabled) {
    bg = '#FFF0EB';
    border = '1px solid #FF6B35';
  }

  const focusStyle = isFocused ? { outline: '2px solid #FF6B35', outlineOffset: '2px' } : {};

  return (
    <div
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{
        width: '16px',
        height: '16px',
        borderRadius: '4px',
        backgroundColor: bg,
        border: border,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 150ms ease',
        boxSizing: 'border-box',
        ...focusStyle
      }}
    >
      {content}
    </div>
  );
}

// --- DATA TABLE IMPLEMENTATION ---
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyField,
  title = 'Records',
  onAdd,
  addLabel = 'Add',
  onEdit,
  onDelete,
  onView,
  onArchive,
  onExport,
  loading = false,
  emptyState,
  rowsPerPageOptions = [10, 25, 50, 100]
}: DataTableProps<T>) {
  
  // --- STATE ---
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({});
  const [tempFilters, setTempFilters] = useState<Record<string, string[]>>({});
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [openFilterCol, setOpenFilterCol] = useState<string | null>(null);
  const [openActionRow, setOpenActionRow] = useState<any | null>(null);
  const [jumpPage, setJumpPage] = useState('');
  const [deletingRow, setDeletingRow] = useState<T | null>(null);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { showSuccess, showError } = useToast();

  // Monitor screen size
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- OUTSIDE CLICK LISTENER ---
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.action-menu-container')) {
        setOpenActionRow(null);
      }
      if (!target.closest('.filter-dropdown-container')) {
        setOpenFilterCol(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Responsive Breakpoint Computations
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  // --- DATA PROCESSING ---
  // 1. Global search filter
  let processed = data.filter((row) =>
    Object.values(row).some((v) =>
      String(v ?? '')
        .toLowerCase()
        .includes(globalSearch.toLowerCase())
    )
  );

  // 2. Column filters
  Object.entries(columnFilters).forEach(([key, values]) => {
    if (values && values.length > 0) {
      processed = processed.filter((row) => {
        const cellValue = String(row[key] ?? '');
        return values.includes(cellValue);
      });
    }
  });

  // 3. Sort
  if (sortKey) {
    processed = [...processed].sort((a, b) => {
      const av = String(a[sortKey] ?? '').toLowerCase();
      const bv = String(b[sortKey] ?? '').toLowerCase();
      const cmp = av.localeCompare(bv, undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }

  // 4. Pagination math
  const total = processed.length;
  const totalPages = Math.ceil(total / rowsPerPage);
  
  // Auto-clamp page if filtering leaves us out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIdx = total === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endIdx = Math.min(currentPage * rowsPerPage, total);
  const paginated = processed.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const paginatedKeys = paginated.map((row) => row[keyField]);
  const allPaginatedSelected = paginatedKeys.length > 0 && paginatedKeys.every((k) => selectedRows.includes(k));
  const somePaginatedSelected = paginatedKeys.some((k) => selectedRows.includes(k)) && !allPaginatedSelected;

  // --- HANDLERS ---
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => {
        const next = [...prev];
        paginatedKeys.forEach((k) => {
          if (!next.includes(k)) next.push(k);
        });
        return next;
      });
    } else {
      setSelectedRows((prev) => prev.filter((k) => !paginatedKeys.includes(k)));
    }
  };

  const handleSelectRow = (key: any, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, key]);
    } else {
      setSelectedRows((prev) => prev.filter((k) => k !== key));
    }
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === 'asc') {
        setSortDir('desc');
      } else {
        setSortKey(null);
      }
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleFilterToggle = (colKey: string, option: string) => {
    setTempFilters((prev) => {
      const active = prev[colKey] || [];
      const next = active.includes(option)
        ? active.filter((o) => o !== option)
        : [...active, option];
      return { ...prev, [colKey]: next };
    });
  };

  const applyColumnFilter = (colKey: string) => {
    setColumnFilters((prev) => ({
      ...prev,
      [colKey]: tempFilters[colKey] || [],
    }));
    setOpenFilterCol(null);
    setCurrentPage(1);
  };

  const clearColumnFilter = (colKey: string) => {
    setTempFilters((prev) => ({ ...prev, [colKey]: [] }));
    setColumnFilters((prev) => {
      const next = { ...prev };
      delete next[colKey];
      return next;
    });
    setOpenFilterCol(null);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setColumnFilters({});
    setTempFilters({});
    setCurrentPage(1);
  };

  const activeFiltersCount = Object.values(columnFilters).filter((arr) => arr.length > 0).length;

  // --- ACTIONS ---
  const handleSingleDelete = (row: T) => {
    setDeletingRow(row);
  };

  const handleSingleDeleteConfirm = () => {
    if (onDelete && deletingRow) {
      try {
        onDelete(deletingRow);
        showSuccess('Item Deleted', 'The item was deleted successfully.');
      } catch (err: any) {
        showError('Delete Failed', err?.message || 'Could not delete item.');
      }
    }
    setDeletingRow(null);
  };

  const handleBulkDeleteConfirm = () => {
    if (onDelete) {
      try {
        const selectedData = data.filter((row) => selectedRows.includes(row[keyField]));
        selectedData.forEach((row) => onDelete(row));
        showSuccess('Items Deleted', `Successfully deleted ${selectedRows.length} items.`);
      } catch (err: any) {
        showError('Bulk Delete Failed', err?.message || 'Could not delete items.');
      }
    }
    setSelectedRows([]);
    setIsBulkDeleteOpen(false);
  };

  const handleSingleArchive = (row: T) => {
    if (onArchive) {
      onArchive(row);
      showSuccess('Item Archived', 'The item has been successfully archived.');
    }
  };

  const handleBulkArchive = () => {
    if (onArchive) {
      const selectedData = data.filter((row) => selectedRows.includes(row[keyField]));
      selectedData.forEach((row) => onArchive(row));
      showSuccess('Items Archived', `Successfully archived ${selectedRows.length} items.`);
    }
    setSelectedRows([]);
  };

  const handleExportCSV = (rowsToExport: T[]) => {
    if (onExport) {
      onExport(rowsToExport);
      return;
    }
    const headers = columns.map((c) => c.label).join(',');
    const csvRows = rowsToExport
      .map((row) =>
        columns
          .map((c) => {
            const val = row[c.key as keyof T];
            return `"${String(val ?? '').replace(/"/g, '""')}"`;
          })
          .join(',')
      )
      .join('\n');

    const blob = new Blob([headers + '\n' + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `export-${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSuccess('Export complete', 'CSV file downloaded successfully.');
  };

  const handleJump = () => {
    const pageNum = parseInt(jumpPage, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setJumpPage('');
    } else {
      showError('Invalid Page', `Please enter a valid page number between 1 and ${totalPages}.`);
    }
  };

  // --- HIGHLIGHTER ---
  const highlightText = (text: any, search: string): React.ReactNode => {
    const str = String(text ?? '');
    if (!search) return str;
    const parts = str.split(new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <mark
              key={i}
              style={{
                background: '#FFE4D6',
                color: '#FF6B35',
                borderRadius: '2px',
                padding: '0 2px',
                fontWeight: 600,
              }}
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // --- STATUS PILL / ICON FORMATTER ---
  const renderStatus = (val: string) => {
    const lower = val.toLowerCase();
    const isActive = ['active', 'completed', 'paid', 'approved', 'success'].includes(lower);
    const isInactive = ['inactive', 'cancelled', 'failed', 'rejected'].includes(lower);
    const isPending = ['pending', 'on hold'].includes(lower);
    const isWarning = ['warning'].includes(lower);
    const isInfo = ['info', 'details'].includes(lower);

    // Default status icons specification (16px SM, colored):
    // success -> circle-check filled green
    // inactive -> circle-x filled red
    // pending -> clock stroke amber
    // warning -> alert-triangle stroke amber
    // info -> info-circle stroke blue

    let icon = <IconInfoCircle size={16} className="text-[#3B82F6]" />;
    let text = colors.textSecondary;
    let bg = colors.surfaceAlt;

    if (isActive) {
      icon = <IconCircleCheck size={16} fill="#22C55E" className="text-white" />;
      text = '#22C55E';
      bg = '#F0FDF4';
    } else if (isInactive) {
      icon = <IconCircleX size={16} fill="#EF4444" className="text-white" />;
      text = '#EF4444';
      bg = '#FEF2F2';
    } else if (isPending) {
      icon = <IconClock size={16} className="text-[#F59E0B]" strokeWidth={2} />;
      text = '#F59E0B';
      bg = '#FFFBEB';
    } else if (isWarning) {
      icon = <IconAlertTriangle size={16} className="text-[#F59E0B]" strokeWidth={2} />;
      text = '#F59E0B';
      bg = '#FFFBEB';
    } else if (isInfo) {
      icon = <IconInfoCircle size={16} className="text-[#3B82F6]" strokeWidth={2} />;
      text = '#3B82F6';
      bg = '#EFF6FF';
    }

    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '2px 10px',
          fontSize: '12px',
          fontWeight: 600,
          borderRadius: radius.full,
          backgroundColor: bg,
          color: text,
        }}
      >
        {icon}
        <span className="capitalize">{val}</span>
      </span>
    );
  };

  // --- PAGINATION PAGE RANGES ---
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  // Filter columns that should hide on Tablet view ( Date / Enrolled )
  const isTabletHidden = (key: string) => {
    const lowerKey = String(key).toLowerCase();
    return isTablet && (lowerKey.includes('date') || lowerKey.includes('enrolled') || lowerKey === 'joined');
  };

  // Render check
  const showColumns = columns.filter(col => !isTabletHidden(col.key as string));

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.md,
      }}
    >
      <style>{`
        /* Scrollbar styles for horizontal scrolling tables on tablet */
        .table-scrollable-container::-webkit-scrollbar {
          height: 6px;
        }
        .table-scrollable-container::-webkit-scrollbar-track {
          background: #F3F1ED;
          border-radius: 4px;
        }
        .table-scrollable-container::-webkit-scrollbar-thumb {
          background: #FF6B35;
          border-radius: 4px;
        }
        .table-scrollable-container::-webkit-scrollbar-thumb:hover {
          background: #E85520;
        }

        /* Keyboard navigation row highlight outlines */
        .table-row-focus:focus-within {
          outline: 2px solid #FF6B35;
          outline-offset: -2px;
        }
      `}</style>

      {/* --- TOP TOOLBAR --- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
        {/* Row 1 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
              {title}
            </h2>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: colors.primary,
                background: colors.primaryLight,
                padding: '2px 8px',
                borderRadius: radius.full,
              }}
            >
              {total} results
            </span>
          </div>

          {onAdd && (
            <button
              onClick={onAdd}
              style={{
                height: '40px',
                padding: `0 ${spacing.md}`,
                background: colors.primary,
                color: colors.white,
                borderRadius: radius.md,
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: shadows.button,
                transition: transitions.fast,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = colors.primaryDark)}
              onMouseLeave={(e) => (e.currentTarget.style.background = colors.primary)}
            >
              <IconCheck size={16} />
              {addLabel}
            </button>
          )}
        </div>

        {/* Row 2 (Search and active filter chips) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, flexWrap: 'wrap', width: '100%' }}>
          {/* Global search */}
          <div style={{ position: 'relative', width: isMobile ? '100%' : '320px' }}>
            <span
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: colors.textMuted,
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              <IconSearch size={18} />
            </span>
            <input
              type="text"
              placeholder="Search database..."
              value={globalSearch}
              onChange={(e) => {
                setGlobalSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 border border-gray-200 pl-[38px] pr-4 rounded-full text-[14px] outline-none transition-all focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/12 hover:bg-[#FAFAFA] bg-white box-border"
            />
          </div>

          {/* Active filters state indicator */}
          {activeFiltersCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: colors.primary,
                  background: colors.primaryLight,
                  padding: '4px 10px',
                  borderRadius: radius.full,
                }}
              >
                Filters active: {activeFiltersCount}
              </span>
              <button
                onClick={clearAllFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: colors.secondary,
                  cursor: 'pointer',
                  padding: 0,
                  transition: transitions.fast,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.secondaryDark)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.secondary)}
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- BULK ACTION BAR --- */}
      {selectedRows.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: `${spacing.sm} ${spacing.md}`,
            backgroundColor: '#FF6B35', // bulk bar orange bg on selection
            color: '#FFFFFF',
            borderRadius: radius.md,
            boxShadow: shadows.md,
            animation: 'slideDownBar 0.2s ease-out forwards',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 700 }}>
            {selectedRows.length} selected
          </span>

          <div style={{ display: 'flex', gap: spacing.xs }}>
            <button
              onClick={() => handleExportCSV(data.filter((row) => selectedRows.includes(row[keyField])))}
              style={{
                height: '32px',
                padding: `0 ${spacing.sm}`,
                borderRadius: radius.sm,
                border: '1px solid rgba(255,255,255,0.4)',
                background: 'transparent',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: transitions.fast,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <IconDownload size={14} className="inline mr-1" />
              Export CSV
            </button>
            {onDelete && (
              <button
                onClick={() => setIsBulkDeleteOpen(true)}
                style={{
                  height: '32px',
                  padding: `0 ${spacing.sm}`,
                  borderRadius: radius.sm,
                  border: 'none',
                  background: '#FFFFFF',
                  color: colors.primary,
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: shadows.xs,
                  transition: transitions.fast,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#FFF0EB')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
              >
                <IconTrash size={14} className="inline mr-1 text-[#FF6B35]" />
                Delete Selected
              </button>
            )}
          </div>
        </div>
      )}

      {/* --- TABLE CONTENT WRAPPER --- */}
      {loading ? (
        <TableSkeleton
          columns={showColumns.length}
          rows={rowsPerPage}
          hasCheckbox={true}
          hasActions={onEdit || onDelete || onView || onArchive ? true : false}
        />
      ) : paginated.length === 0 ? (
        emptyState || (
          <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted }}>
            No records matched your filters.
          </div>
        )
      ) : isMobile ? (
        
        // ============================================
        // MOBILE CARD LIST REPRESENTATION (375px)
        // ============================================
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {paginated.map((row) => {
            const rowKey = row[keyField];
            const isSelected = selectedRows.includes(rowKey);

            // Card values
            const nameVal = row.name || row.title || 'Record';
            const emailVal = row.email || row.category || '';
            const statusVal = row.status || 'Active';
            const roleVal = row.role || row.level || '';
            const enrolledVal = row.enrolled || row.duration || '';
            const dateVal = row.joined || row.date || row.joinedDate || '';

            return (
              <div
                key={rowKey}
                style={{
                  backgroundColor: isSelected ? '#FFF0EB' : '#FFFFFF',
                  border: isSelected ? '1px solid #FF6B35' : '1px solid #E2E8F0',
                  borderLeft: isSelected ? '3px solid #FF6B35' : '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'all 150ms ease',
                }}
              >
                {/* TOP ROW: Checkbox | Avatar + Name/Email | Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CustomCheckbox
                    checked={isSelected}
                    onChange={(checked) => handleSelectRow(rowKey, checked)}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E85520] text-white font-bold text-[13px] flex items-center justify-center flex-shrink-0">
                      {String(nameVal).charAt(0).toUpperCase()}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A202C', truncate: true }}>
                        {nameVal}
                      </div>
                      <div style={{ fontSize: '12px', color: '#718096', truncate: true }}>
                        {emailVal}
                      </div>
                    </div>
                  </div>
                  <div>
                    {renderStatus(String(statusVal))}
                  </div>
                </div>

                {/* MIDDLE ROW: Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                  {roleVal && (
                    <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-[#4A5568] text-[11px] font-semibold flex items-center gap-1">
                      <IconUser size={12} />
                      {roleVal}
                    </span>
                  )}
                  {enrolledVal && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E6F7F6] text-[#00B5A5] text-[11px] font-semibold flex items-center gap-1">
                      <IconBook size={12} />
                      {enrolledVal} enrolled
                    </span>
                  )}
                  {dateVal && (
                    <span className="px-2.5 py-0.5 rounded-full bg-gray-50 text-[#718096] text-[11px] font-medium flex items-center gap-1">
                      <IconCalendar size={12} />
                      {dateVal}
                    </span>
                  )}
                </div>

                {/* BOTTOM ROW: Actions layout (44px touch targets) */}
                <div
                  style={{
                    marginTop: '8px',
                    borderTop: '1px solid #F1F5F9',
                    paddingTop: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {onView && (
                      <button
                        onClick={() => onView(row)}
                        style={{
                          height: '44px',
                          background: 'none',
                          border: 'none',
                          color: '#00B5A5',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 4px',
                        }}
                      >
                        View
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        style={{
                          height: '44px',
                          background: 'none',
                          border: 'none',
                          color: '#718096',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 4px',
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  {onDelete && (
                    <button
                      onClick={() => handleSingleDelete(row)}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '8px',
                        backgroundColor: '#FEF2F2',
                        border: 'none',
                        color: '#EF4444',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: transitions.fast,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEE2E2')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                    >
                      <IconTrash size={18} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        
        // ============================================
        // DESKTOP & TABLET HORIZONTAL SCROLL TABLE
        // ============================================
        <div>
          <div
            className="table-scrollable-container"
            style={{
              width: '100%',
              overflowX: 'auto',
              background: colors.white,
              borderRadius: radius.lg,
              border: `1px solid ${colors.border}`,
              boxShadow: shadows.xs,
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead style={{ background: '#F3F1ED', borderBottom: `1px solid ${colors.border}` }}>
                <tr>
                  {/* Select All Checkbox th */}
                  <th style={{ padding: '16px 12px', width: '40px', textAlign: 'center' }}>
                    <CustomCheckbox
                      checked={allPaginatedSelected}
                      indeterminate={somePaginatedSelected}
                      onChange={handleSelectAll}
                    />
                  </th>

                  {/* Column Headers */}
                  {columns.map((col, index) => {
                    if (isTabletHidden(col.key as string)) return null;

                    const isSorted = sortKey === col.key;
                    const activeFilter = columnFilters[col.key as string]?.length > 0;
                    
                    // First column sticky frozen check on scroll
                    const isFirst = index === 0;
                    const stickyStyles: React.CSSProperties = isFirst && isTablet 
                      ? { position: 'sticky', left: 0, backgroundColor: '#F3F1ED', zIndex: 10, boxShadow: '2px 0 5px rgba(0,0,0,0.05)' } 
                      : {};

                    return (
                      <th
                        key={col.key as string}
                        style={{
                          padding: '14px 16px',
                          fontSize: '11px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          color: isSorted ? colors.primary : '#718096',
                          borderBottom: isSorted ? `2px solid ${colors.primary}` : 'none',
                          width: col.width,
                          position: 'relative',
                          backgroundColor: activeFilter ? 'rgba(255, 107, 53, 0.04)' : 'transparent',
                          transition: 'background-color 150ms ease',
                          ...stickyStyles
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {/* Sort Trigger */}
                          {col.sortable ? (
                            <div
                              onClick={() => handleSort(col.key as string)}
                              style={{
                                cursor: 'pointer',
                                userSelect: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                width: '100%',
                              }}
                              className="hover:text-[#FF6B35] transition-colors"
                            >
                              <span>{col.label}</span>
                              <span style={{ color: isSorted ? colors.primary : '#9CA3AF', display: 'flex', alignItems: 'center' }}>
                                {isSorted ? (
                                  sortDir === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                                ) : (
                                  <IconSelector size={14} />
                                )}
                              </span>
                            </div>
                          ) : (
                            <span>{col.label}</span>
                          )}

                          {/* Filter Trigger */}
                          {col.filterable && col.filterOptions && (
                            <div className="filter-dropdown-container" style={{ position: 'relative' }}>
                              <button
                                onClick={() => setOpenFilterCol(openFilterCol === col.key ? null : (col.key as string))}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  padding: '2px 4px',
                                  borderRadius: radius.sm,
                                  color: activeFilter ? colors.primary : '#718096',
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                                className="hover:bg-gray-100 hover:text-[#FF6B35] transition-all"
                              >
                                <IconFilter size={13} fill={activeFilter ? colors.primary : 'none'} />
                              </button>

                              {openFilterCol === col.key && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    marginTop: '6px',
                                    background: colors.white,
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: radius.md,
                                    boxShadow: shadows.lg,
                                    padding: spacing.sm,
                                    zIndex: zIndex.dropdown,
                                    minWidth: '160px',
                                    textTransform: 'none',
                                    letterSpacing: 'normal',
                                  }}
                                >
                                  <div style={{ maxHeight: '150px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {col.filterOptions.map((opt) => {
                                      const tempSelected = tempFilters[col.key as string] || columnFilters[col.key as string] || [];
                                      const isChecked = tempSelected.includes(opt);

                                      return (
                                        <label
                                          key={opt}
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '12px',
                                            color: colors.textPrimary,
                                            cursor: 'pointer',
                                          }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => handleFilterToggle(col.key as string, opt)}
                                            style={{ accentColor: colors.primary }}
                                          />
                                          <span>{opt}</span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      marginTop: spacing.sm,
                                      borderTop: `1px solid ${colors.borderLight}`,
                                      paddingTop: '6px',
                                    }}
                                  >
                                    <button
                                      onClick={() => clearColumnFilter(col.key as string)}
                                      style={{
                                        background: 'none',
                                        border: 'none',
                                        color: colors.textMuted,
                                        fontSize: '11px',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      Clear
                                    </button>
                                    <button
                                      onClick={() => applyColumnFilter(col.key as string)}
                                      style={{
                                        background: colors.primary,
                                        border: 'none',
                                        color: colors.white,
                                        borderRadius: radius.sm,
                                        padding: '2px 8px',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                      }}
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
                    );
                  })}

                  {/* Actions column header if actions exist */}
                  {(onEdit || onDelete || onView || onArchive) && (
                    <th style={{ padding: '14px 16px', width: '80px', textAlign: 'right', color: '#718096', fontSize: '11px', textTransform: 'uppercase' }}>Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {paginated.map((row, rowIndex) => {
                  const rowKey = row[keyField];
                  const isSelected = selectedRows.includes(rowKey);

                  return (
                    <tr
                      key={rowKey}
                      className="table-row-focus"
                      style={{
                        backgroundColor: isSelected
                          ? '#FFF0EB' // Orange selection tint
                          : rowIndex % 2 === 0
                          ? colors.white
                          : '#F9F8F6', // striped rows
                        borderLeft: isSelected ? '3px solid #FF6B35' : '3px solid transparent',
                        transition: 'all 150ms ease-out',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = '#FFF5F0'; // hover ANY row light orange
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = rowIndex % 2 === 0 ? colors.white : '#F9F8F6';
                        }
                      }}
                    >
                      {/* Row checkbox td */}
                      <td style={{ padding: '12px', textAlign: 'center', verticalAlign: 'middle' }}>
                        <CustomCheckbox
                          checked={isSelected}
                          onChange={(checked) => handleSelectRow(rowKey, checked)}
                        />
                      </td>

                      {/* Columns td */}
                      {columns.map((col, index) => {
                        if (isTabletHidden(col.key as string)) return null;
                        const cellVal = row[col.key as keyof T];

                        // Freeze first column (sticky) on tablet
                        const isFirst = index === 0;
                        const stickyCellStyles: React.CSSProperties = isFirst && isTablet 
                          ? { 
                              position: 'sticky', 
                              left: 0, 
                              backgroundColor: isSelected ? '#FFF0EB' : rowIndex % 2 === 0 ? colors.white : '#F9F8F6', 
                              zIndex: 5,
                              boxShadow: '2px 0 5px rgba(0,0,0,0.03)',
                              fontWeight: 700 
                            } 
                          : {};

                        return (
                          <td
                            key={col.key as string}
                            style={{
                              padding: '12px 16px',
                              fontSize: '13px',
                              color: colors.textSecondary,
                              verticalAlign: 'middle',
                              ...stickyCellStyles
                            }}
                          >
                            {col.render ? (
                              col.render(cellVal, row)
                            ) : col.key === 'status' ? (
                              renderStatus(String(cellVal))
                            ) : (
                              highlightText(cellVal, globalSearch)
                            )}
                          </td>
                        );
                      })}

                      {/* Action dropdown td */}
                      {(onEdit || onDelete || onView || onArchive) && (
                        <td style={{ padding: '12px 16px', textAlign: 'right', verticalAlign: 'middle' }}>
                          <div className="action-menu-container" style={{ position: 'relative', display: 'inline-block' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenActionRow(openActionRow === rowKey ? null : rowKey);
                              }}
                              style={{
                                width: '28px', // size spec 28px circle
                                height: '28px',
                                borderRadius: radius.full,
                                backgroundColor: openActionRow === rowKey ? '#FFE4D6' : 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: openActionRow === rowKey ? '#FF6B35' : '#9CA3AF',
                                transition: transitions.fast,
                              }}
                              onMouseEnter={(e) => {
                                if (openActionRow !== rowKey) {
                                  e.currentTarget.style.backgroundColor = '#F3F1ED';
                                  e.currentTarget.style.color = '#374151';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (openActionRow !== rowKey) {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                  e.currentTarget.style.color = '#9CA3AF';
                                }
                              }}
                            >
                              <IconDotsVertical size={16} />
                            </button>

                            {openActionRow === rowKey && (
                              <div
                                style={{
                                  position: 'absolute',
                                  right: 0,
                                  top: '100%',
                                  marginTop: '4px',
                                  background: colors.white,
                                  border: `1px solid ${colors.border}`,
                                  borderRadius: '8px',
                                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)', // shadow spec
                                  width: '160px',
                                  zIndex: zIndex.dropdown,
                                  overflow: 'hidden',
                                  textAlign: 'left',
                                }}
                              >
                                {onView && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onView(row);
                                      setOpenActionRow(null);
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: '8px 12px',
                                      border: 'none',
                                      background: 'none',
                                      textAlign: 'left',
                                      fontSize: '13px',
                                      color: colors.textSecondary,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                    }}
                                    className="hover:bg-[#FFF5F0] hover:text-[#FF6B35] transition-colors"
                                  >
                                    <IconCheck size={14} className="text-[#FF6B35]" /> View Detail
                                  </button>
                                )}
                                {onEdit && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onEdit(row);
                                      setOpenActionRow(null);
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: '8px 12px',
                                      border: 'none',
                                      background: 'none',
                                      textAlign: 'left',
                                      fontSize: '13px',
                                      color: colors.textSecondary,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                    }}
                                    className="hover:bg-[#FFF5F0] hover:text-[#FF6B35] transition-colors"
                                  >
                                    <IconChevronRight size={14} className="text-[#FF6B35]" /> Edit Record
                                  </button>
                                )}
                                {onArchive && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSingleArchive(row);
                                      setOpenActionRow(null);
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: '8px 12px',
                                      border: 'none',
                                      background: 'none',
                                      textAlign: 'left',
                                      fontSize: '13px',
                                      color: colors.textSecondary,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                    }}
                                    className="hover:bg-[#FFF5F0] hover:text-[#FF6B35] transition-colors"
                                  >
                                    <IconX size={14} className="text-[#FF6B35]" /> Archive Item
                                  </button>
                                )}
                                {onDelete && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSingleDelete(row);
                                      setOpenActionRow(null);
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: '8px 12px',
                                      border: 'none',
                                      background: 'none',
                                      textAlign: 'left',
                                      fontSize: '13px',
                                      color: colors.error,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                      borderTop: `1px solid ${colors.borderLight}`,
                                    }}
                                    className="hover:bg-[#FEF2F2] hover:text-[#DC2626] transition-colors font-semibold"
                                  >
                                    <IconTrash size={14} className="text-[#DC2626]" /> Delete Row
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Scroll hint on Tablet */}
          {isTablet && (
            <div className="text-[12px] text-gray-500 italic mt-2 text-right">
              Swipe horizontally to view more details ➔
            </div>
          )}
        </div>
      )}

      {/* --- PAGINATION & FOOTER --- */}
      {!loading && total > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: `${spacing.sm} ${spacing.md}`,
            borderTop: `1px solid ${colors.border}`,
            flexWrap: 'wrap',
            gap: spacing.sm,
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Left Text */}
          <div style={{ fontSize: '13px', color: colors.textMuted }}>
            Showing {startIdx}–{endIdx} of {total} results
          </div>

          {/* Simplified pagination on Mobile vs full on Desktop */}
          {isMobile ? (
            <div style={{ display: 'flex', gap: '8px', width: '100%', flex: 1, justifyContent: 'space-between', marginTop: '4px' }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="flex-1 h-11 rounded-lg border border-gray-200 bg-white font-semibold text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center transition-all hover:bg-gray-50"
              >
                &lt; Prev
              </button>
              <div className="flex items-center justify-center px-4 text-[13px] font-semibold text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex-1 h-11 rounded-lg border border-gray-200 bg-white font-semibold text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center transition-all hover:bg-gray-50"
              >
                Next &gt;
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: radius.md,
                  border: `1px solid ${colors.border}`,
                  background: colors.white,
                  color: currentPage === 1 ? colors.textDisabled : colors.textSecondary,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: transitions.fast,
                }}
                onMouseEnter={(e) => {
                  if (currentPage > 1) e.currentTarget.style.backgroundColor = colors.background;
                }}
                onMouseLeave={(e) => {
                  if (currentPage > 1) e.currentTarget.style.backgroundColor = colors.white;
                }}
              >
                &lt;
              </button>

              {getPageNumbers().map((num, i) => {
                if (num === '...') {
                  return (
                    <span key={`ellipsis-${i}`} style={{ padding: '0 6px', color: colors.textMuted }}>
                      ...
                    </span>
                  );
                }

                const isCurrent = currentPage === num;

                return (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num as number)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: radius.md,
                      border: 'none',
                      background: isCurrent ? colors.primary : colors.white,
                      color: isCurrent ? colors.white : colors.textSecondary,
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: transitions.fast,
                    }}
                    onMouseEnter={(e) => {
                      if (!isCurrent) e.currentTarget.style.backgroundColor = colors.primaryLight;
                    }}
                    onMouseLeave={(e) => {
                      if (!isCurrent) e.currentTarget.style.backgroundColor = colors.white;
                    }}
                  >
                    {num}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: radius.md,
                  border: `1px solid ${colors.border}`,
                  background: colors.white,
                  color: currentPage === totalPages ? colors.textDisabled : colors.textSecondary,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: transitions.fast,
                }}
                onMouseEnter={(e) => {
                  if (currentPage < totalPages) e.currentTarget.style.backgroundColor = colors.background;
                }}
                onMouseLeave={(e) => {
                  if (currentPage < totalPages) e.currentTarget.style.backgroundColor = colors.white;
                }}
              >
                &gt;
              </button>

              {/* Jump to page */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: spacing.sm }}>
                <input
                  type="number"
                  value={jumpPage}
                  onChange={(e) => setJumpPage(e.target.value)}
                  placeholder="Jump"
                  style={{
                    width: '50px',
                    height: '32px',
                    borderRadius: radius.md,
                    border: `1px solid ${colors.border}`,
                    textAlign: 'center',
                    fontSize: '12px',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={handleJump}
                  style={{
                    height: '32px',
                    padding: `0 ${spacing.sm}`,
                    borderRadius: radius.md,
                    border: 'none',
                    background: colors.primary,
                    color: colors.white,
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Go
                </button>
              </div>
            </div>
          )}

          {/* Right Selector (Desktop/Tablet Only) */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: colors.textSecondary }}>
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{
                  height: '32px',
                  padding: '0 6px',
                  borderRadius: radius.md,
                  border: `1px solid ${colors.border}`,
                  background: colors.white,
                  outline: 'none',
                }}
              >
                {rowsPerPageOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* --- CONFIRMATION MODALS --- */}
      <ConfirmModal
        isOpen={deletingRow !== null}
        onClose={() => setDeletingRow(null)}
        onConfirm={handleSingleDeleteConfirm}
        title="Delete Record"
        message="Are you sure you want to delete this record? This action is permanent and cannot be undone."
        itemName={deletingRow ? String(deletingRow[keyField] ?? '') : undefined}
        confirmLabel="Delete"
        confirmVariant="danger"
      />

      <ConfirmModal
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Multiple Records"
        message={`Are you sure you want to delete all ${selectedRows.length} selected records? This action is permanent and cannot be undone.`}
        confirmLabel={`Delete (${selectedRows.length})`}
        confirmVariant="danger"
      />
    </div>
  );
}

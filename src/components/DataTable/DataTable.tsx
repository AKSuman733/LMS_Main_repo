import React, { useState, useEffect, useRef } from 'react'
import { colors, spacing, radius, shadows, transitions, zIndex } from '../../designTokens'
import { useToast } from '../Toast/ToastProvider'
import { ConfirmModal } from '../Modal/ModalSystem'
import { TableSkeleton } from '../Skeleton/TableSkeleton'

// --- TYPES ---
export interface Column<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  filterable?: boolean
  filterOptions?: string[]
  width?: string
  render?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: string
  title?: string
  onAdd?: () => void
  addLabel?: string
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  onView?: (row: T) => void
  onArchive?: (row: T) => void
  onExport?: (rows: T[]) => void
  loading?: boolean
  emptyState?: React.ReactNode
  rowsPerPageOptions?: number[]
}

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
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({})
  const [tempFilters, setTempFilters] = useState<Record<string, string[]>>({})
  const [globalSearch, setGlobalSearch] = useState('')
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0])
  const [openFilterCol, setOpenFilterCol] = useState<string | null>(null)
  const [openActionRow, setOpenActionRow] = useState<any | null>(null)
  const [jumpPage, setJumpPage] = useState('')
  const [deletingRow, setDeletingRow] = useState<T | null>(null)
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false)

  const { showSuccess, showError } = useToast()
  const selectAllRef = useRef<HTMLInputElement>(null)

  // --- OUTSIDE CLICK LISTENER ---
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.action-menu-container')) {
        setOpenActionRow(null)
      }
      if (!target.closest('.filter-dropdown-container')) {
        setOpenFilterCol(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // --- DATA PROCESSING ---
  // 1. Global search filter
  let processed = data.filter((row) =>
    Object.values(row).some((v) =>
      String(v ?? '')
        .toLowerCase()
        .includes(globalSearch.toLowerCase())
    )
  )

  // 2. Column filters
  Object.entries(columnFilters).forEach(([key, values]) => {
    if (values && values.length > 0) {
      processed = processed.filter((row) => {
        const cellValue = String(row[key] ?? '')
        return values.includes(cellValue)
      })
    }
  })

  // 3. Sort
  if (sortKey) {
    processed = [...processed].sort((a, b) => {
      const av = String(a[sortKey] ?? '').toLowerCase()
      const bv = String(b[sortKey] ?? '').toLowerCase()
      const cmp = av.localeCompare(bv, undefined, { numeric: true })
      return sortDir === 'asc' ? cmp : -cmp
    })
  }

  // 4. Pagination math
  const total = processed.length
  const totalPages = Math.ceil(total / rowsPerPage)
  
  // Auto-clamp page if filtering leaves us out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  const startIdx = total === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1
  const endIdx = Math.min(currentPage * rowsPerPage, total)
  const paginated = processed.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const paginatedKeys = paginated.map((row) => row[keyField])
  const allPaginatedSelected = paginatedKeys.length > 0 && paginatedKeys.every((k) => selectedRows.includes(k))
  const somePaginatedSelected = paginatedKeys.some((k) => selectedRows.includes(k)) && !allPaginatedSelected

  // Update selectAll checkbox indeterminate state
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = somePaginatedSelected
    }
  }, [somePaginatedSelected])

  // --- HANDLERS ---
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows((prev) => {
        const next = [...prev]
        paginatedKeys.forEach((k) => {
          if (!next.includes(k)) next.push(k)
        })
        return next
      })
    } else {
      setSelectedRows((prev) => prev.filter((k) => !paginatedKeys.includes(k)))
    }
  }

  const handleSelectRow = (key: any, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, key])
    } else {
      setSelectedRows((prev) => prev.filter((k) => k !== key))
    }
  }

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === 'asc') {
        setSortDir('desc')
      } else {
        setSortKey(null)
      }
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const handleFilterToggle = (colKey: string, option: string) => {
    setTempFilters((prev) => {
      const active = prev[colKey] || []
      const next = active.includes(option)
        ? active.filter((o) => o !== option)
        : [...active, option]
      return { ...prev, [colKey]: next }
    })
  }

  const applyColumnFilter = (colKey: string) => {
    setColumnFilters((prev) => ({
      ...prev,
      [colKey]: tempFilters[colKey] || [],
    }))
    setOpenFilterCol(null)
    setCurrentPage(1)
  }

  const clearColumnFilter = (colKey: string) => {
    setTempFilters((prev) => ({ ...prev, [colKey]: [] }))
    setColumnFilters((prev) => {
      const next = { ...prev }
      delete next[colKey]
      return next
    })
    setOpenFilterCol(null)
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setColumnFilters({})
    setTempFilters({})
    setCurrentPage(1)
  }

  const activeFiltersCount = Object.values(columnFilters).filter((arr) => arr.length > 0).length

  // --- ACTIONS ---
  const handleSingleDelete = (row: T) => {
    setDeletingRow(row)
  }

  const handleSingleDeleteConfirm = () => {
    if (onDelete && deletingRow) {
      try {
        onDelete(deletingRow)
        showSuccess('Item Deleted', 'The item was deleted successfully.')
      } catch (err: any) {
        showError('Delete Failed', err?.message || 'Could not delete item.')
      }
    }
    setDeletingRow(null)
  }

  const handleBulkDeleteConfirm = () => {
    if (onDelete) {
      try {
        const selectedData = data.filter((row) => selectedRows.includes(row[keyField]))
        selectedData.forEach((row) => onDelete(row))
        showSuccess('Items Deleted', `Successfully deleted ${selectedRows.length} items.`)
      } catch (err: any) {
        showError('Bulk Delete Failed', err?.message || 'Could not delete items.')
      }
    }
    setSelectedRows([])
    setIsBulkDeleteOpen(false)
  }

  const handleSingleArchive = (row: T) => {
    if (onArchive) {
      onArchive(row)
      showSuccess('Item Archived', 'The item has been successfully archived.')
    }
  }

  const handleBulkArchive = () => {
    if (onArchive) {
      const selectedData = data.filter((row) => selectedRows.includes(row[keyField]))
      selectedData.forEach((row) => onArchive(row))
      showSuccess('Items Archived', `Successfully archived ${selectedRows.length} items.`)
    }
    setSelectedRows([])
  }

  const handleExportCSV = (rowsToExport: T[]) => {
    if (onExport) {
      onExport(rowsToExport)
      return
    }
    const headers = columns.map((c) => c.label).join(',')
    const csvRows = rowsToExport
      .map((row) =>
        columns
          .map((c) => {
            const val = row[c.key as keyof T]
            return `"${String(val ?? '').replace(/"/g, '""')}"`
          })
          .join(',')
      )
      .join('\n')

    const blob = new Blob([headers + '\n' + csvRows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `export-${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showSuccess('Export complete', 'CSV file downloaded successfully.')
  }

  // --- HIGHLIGHTER ---
  const highlightText = (text: any, search: string): React.ReactNode => {
    const str = String(text ?? '')
    if (!search) return str
    const parts = str.split(new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'))
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <mark
              key={i}
              style={{
                background: '#FFE0B2',
                color: '#E65100',
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
    )
  }

  // --- STATUS PILL FORMATTER ---
  const renderStatusPill = (val: string) => {
    const lower = val.toLowerCase()
    const isSuccess = ['active', 'completed', 'paid', 'approved'].includes(lower)
    const isWarning = ['pending', 'warning', 'on hold'].includes(lower)
    const isDanger = ['inactive', 'cancelled', 'failed', 'rejected'].includes(lower)

    let bg = colors.surfaceAlt
    let text = colors.textSecondary

    if (isSuccess) {
      bg = colors.successLight
      text = colors.successDark
    } else if (isWarning) {
      bg = colors.warningLight
      text = colors.warningDark
    } else if (isDanger) {
      bg = colors.errorLight
      text = colors.errorDark
    }

    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '2px 8px',
          fontSize: '12px',
          fontWeight: 600,
          borderRadius: radius.full,
          backgroundColor: bg,
          color: text,
        }}
      >
        {val}
      </span>
    )
  }

  // --- PAGINATION PAGE RANGES ---
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    return pages
  }

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
        @keyframes slideDownBar {
          from { transform: translateY(-12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
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
                color: colors.textMuted,
                background: colors.surfaceAlt,
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
              {addLabel}
            </button>
          )}
        </div>

        {/* Row 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, flexWrap: 'wrap' }}>
          {/* Global search */}
          <div style={{ position: 'relative', width: '280px' }}>
            <span
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: colors.textMuted,
                fontSize: '14px',
                pointerEvents: 'none',
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search all..."
              value={globalSearch}
              onChange={(e) => {
                setGlobalSearch(e.target.value)
                setCurrentPage(1)
              }}
              style={{
                width: '100%',
                height: '38px',
                paddingLeft: '34px',
                paddingRight: '12px',
                borderRadius: radius.md,
                border: `1px solid ${colors.border}`,
                background: colors.white,
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: transitions.fast,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.primary
                e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primaryLight}`
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = colors.border
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Active filters state indicator */}
          {activeFiltersCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
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
                Clear All Filters
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
            backgroundColor: '#FFF5F0',
            border: `1px solid #FFD4C0`,
            borderRadius: radius.md,
            boxShadow: shadows.sm,
            animation: 'slideDownBar 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 700, color: colors.primary }}>
            {selectedRows.length} rows selected
          </span>

          <div style={{ display: 'flex', gap: spacing.xs }}>
            <button
              onClick={() => handleExportCSV(data.filter((row) => selectedRows.includes(row[keyField])))}
              style={{
                height: '32px',
                padding: `0 ${spacing.sm}`,
                borderRadius: radius.md,
                border: `1px solid ${colors.secondary}`,
                background: 'transparent',
                color: colors.secondary,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: transitions.fast,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.secondaryLight
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Export Selected
            </button>
            {onArchive && (
              <button
                onClick={handleBulkArchive}
                style={{
                  height: '32px',
                  padding: `0 ${spacing.sm}`,
                  borderRadius: radius.md,
                  border: `1px solid ${colors.textMuted}`,
                  background: 'transparent',
                  color: colors.textSecondary,
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: transitions.fast,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.surfaceAlt
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Archive Selected
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => setIsBulkDeleteOpen(true)}
                style={{
                  height: '32px',
                  padding: `0 ${spacing.sm}`,
                  borderRadius: radius.md,
                  border: 'none',
                  background: colors.error,
                  color: colors.white,
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 1px 4px rgba(239,68,68,0.2)',
                  transition: transitions.fast,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = colors.errorDark)}
                onMouseLeave={(e) => (e.currentTarget.style.background = colors.error)}
              >
                Delete Selected
              </button>
            )}
          </div>
        </div>
      )}

      {/* --- TABLE CONTENT WRAPPER --- */}
      {loading ? (
        <TableSkeleton
          columns={columns.length}
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
      ) : (
        <div
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
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    checked={allPaginatedSelected}
                    onChange={handleSelectAll}
                    style={{
                      width: '16px',
                      height: '16px',
                      cursor: 'pointer',
                      accentColor: colors.primary,
                    }}
                  />
                </th>

                {/* Column Headers */}
                {columns.map((col) => {
                  const isSorted = sortKey === col.key
                  const activeFilter = columnFilters[col.key as string]?.length > 0
                  
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
                            }}
                          >
                            <span>{col.label}</span>
                            <span style={{ fontSize: '10px', color: isSorted ? colors.primary : colors.textDisabled }}>
                              {!isSorted ? '↑↓' : sortDir === 'asc' ? '↑' : '↓'}
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
                                fontSize: '10px',
                                padding: '2px 4px',
                                borderRadius: radius.sm,
                                color: activeFilter ? colors.primary : colors.textMuted,
                              }}
                            >
                              🔽
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
                                    const tempSelected = tempFilters[col.key as string] || columnFilters[col.key as string] || []
                                    const isChecked = tempSelected.includes(opt)

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
                                    )
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
                  )
                })}

                {/* Actions column header if actions exist */}
                {(onEdit || onDelete || onView || onArchive) && (
                  <th style={{ padding: '14px 16px', width: '80px', textAlign: 'right' }}>Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, rowIndex) => {
                const rowKey = row[keyField]
                const isSelected = selectedRows.includes(rowKey)

                return (
                  <tr
                    key={rowKey}
                    style={{
                      borderBottom: `1px solid ${colors.borderLight}`,
                      backgroundColor: isSelected
                        ? 'rgba(255, 107, 53, 0.03)'
                        : rowIndex % 2 === 0
                        ? colors.white
                        : '#F9F8F6',
                      transition: transitions.fast,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = '#FFF5F0'
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = rowIndex % 2 === 0 ? colors.white : '#F9F8F6'
                      }
                    }}
                  >
                    {/* Row checkbox td */}
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectRow(rowKey, e.target.checked)}
                        style={{
                          width: '16px',
                          height: '16px',
                          cursor: 'pointer',
                          accentColor: colors.primary,
                        }}
                      />
                    </td>

                    {/* Columns td */}
                    {columns.map((col) => {
                      const cellVal = row[col.key as keyof T]
                      return (
                        <td
                          key={col.key as string}
                          style={{
                            padding: '12px 16px',
                            fontSize: '13px',
                            color: colors.textSecondary,
                            verticalAlign: 'middle',
                          }}
                        >
                          {col.render ? (
                            col.render(cellVal, row)
                          ) : col.key === 'status' ? (
                            renderStatusPill(String(cellVal))
                          ) : (
                            highlightText(cellVal, globalSearch)
                          )}
                        </td>
                      )
                    })}

                    {/* Action dropdown td */}
                    {(onEdit || onDelete || onView || onArchive) && (
                      <td style={{ padding: '12px 16px', textAlign: 'right', verticalAlign: 'middle' }}>
                        <div className="action-menu-container" style={{ position: 'relative', display: 'inline-block' }}>
                          <button
                            onClick={() => setOpenActionRow(openActionRow === rowKey ? null : rowKey)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: radius.full,
                              backgroundColor: colors.surfaceAlt,
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '14px',
                              fontWeight: 'bold',
                              color: colors.textSecondary,
                              transition: transitions.fast,
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.border)}
                            onMouseLeave={(e) => {
                              if (openActionRow !== rowKey) e.currentTarget.style.backgroundColor = colors.surfaceAlt
                            }}
                          >
                            ⋮
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
                                borderRadius: radius.md,
                                boxShadow: shadows.md,
                                width: '160px',
                                zIndex: zIndex.dropdown,
                                overflow: 'hidden',
                                textAlign: 'left',
                              }}
                            >
                              {onView && (
                                <button
                                  onClick={() => {
                                    onView(row)
                                    setOpenActionRow(null)
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
                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.background)}
                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                >
                                  <span>👁️</span> View
                                </button>
                              )}
                              {onEdit && (
                                <button
                                  onClick={() => {
                                    onEdit(row)
                                    setOpenActionRow(null)
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
                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.background)}
                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                >
                                  <span>✏️</span> Edit
                                </button>
                              )}
                              {onArchive && (
                                <button
                                  onClick={() => {
                                    handleSingleArchive(row)
                                    setOpenActionRow(null)
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
                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.background)}
                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                >
                                  <span>📦</span> Archive
                                </button>
                              )}
                              {onDelete && (
                                <button
                                  onClick={() => {
                                    handleSingleDelete(row)
                                    setOpenActionRow(null)
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
                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.errorLight)}
                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                >
                                  <span>🗑️</span> Delete
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
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
          }}
        >
          {/* Left Text */}
          <div style={{ fontSize: '13px', color: colors.textMuted }}>
            Showing {startIdx}–{endIdx} of {total} results
          </div>

          {/* Page links */}
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
                if (currentPage > 1) e.currentTarget.style.backgroundColor = colors.background
              }}
              onMouseLeave={(e) => {
                if (currentPage > 1) e.currentTarget.style.backgroundColor = colors.white
              }}
            >
              ←
            </button>

            {getPageNumbers().map((num, i) => {
              if (num === '...') {
                return (
                  <span key={`ellipsis-${i}`} style={{ padding: '0 6px', color: colors.textMuted }}>
                    ...
                  </span>
                )
              }

              const isCurrent = currentPage === num

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
                    if (!isCurrent) e.currentTarget.style.backgroundColor = colors.primaryLight
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) e.currentTarget.style.backgroundColor = colors.white
                  }}
                >
                  {num}
                </button>
              )
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
                if (currentPage < totalPages) e.currentTarget.style.backgroundColor = colors.background
              }}
              onMouseLeave={(e) => {
                if (currentPage < totalPages) e.currentTarget.style.backgroundColor = colors.white
              }}
            >
              →
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

          {/* Right Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: colors.textSecondary }}>
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value))
                setCurrentPage(1)
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
  )
}

import { useMemo, useState } from 'react';
import Modal from './Modal';
import TableSkeleton from './TableSkeleton';
import Toast from './Toast';
import EmptyState from './EmptyState';

function escapeRegExp(value) {
  return value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function highlightText(text, query) {
  if (!query) return text;
  const parts = text.toString().split(new RegExp(`(${escapeRegExp(query)})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="bg-yellow-200 text-slate-900 rounded-sm px-0.5">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

function sortValues(a, b) {
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return a.toString().localeCompare(b.toString(), undefined, { sensitivity: 'base' });
}

function DataTable({
  title,
  columns,
  data,
  loading,
  error,
  emptyState,
  onView,
  onEdit,
  onDelete,
  onArchive,
  onBulkDelete,
  onBulkExport,
  onBulkArchive,
}) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const [selected, setSelected] = useState([]);
  const [openFilter, setOpenFilter] = useState(null);
  const [menuRow, setMenuRow] = useState(null);
  const [modal, setModal] = useState({ open: false, type: 'confirm', payload: null, action: '' });
  const [toast, setToast] = useState(null);

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data
      .filter((row) => {
        const matchesSearch = query
          ? columns.some((column) => {
              if (!column.searchable) return false;
              const value = row[column.key];
              return value != null && value.toString().toLowerCase().includes(query);
            })
          : true;

        const matchesFilters = columns.every((column) => {
          if (!column.filterOptions) return true;
          const selectedOptions = filters[column.key] || [];
          if (!selectedOptions.length) return true;
          return selectedOptions.includes(row[column.key]);
        });

        return matchesSearch && matchesFilters;
      })
      .sort((a, b) => {
        if (!sortKey) return 0;
        const valueA = a[sortKey];
        const valueB = b[sortKey];
        const sorted = sortValues(valueA, valueB);
        return sortDir === 'asc' ? sorted : -sorted;
      });
  }, [data, search, filters, sortKey, sortDir, columns]);

  const pageCount = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const safePage = Math.min(page, pageCount);
  const paginatedData = filteredData.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  const allSelected = paginatedData.length > 0 && paginatedData.every((row) => selected.includes(row.id));
  const selectedCount = selected.length;

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleFilterChange = (columnKey, option) => {
    setFilters((current) => {
      const next = current[columnKey] || [];
      const exists = next.includes(option);
      return {
        ...current,
        [columnKey]: exists ? next.filter((item) => item !== option) : [...next, option],
      };
    });
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelected((current) => current.filter((id) => !paginatedData.some((row) => row.id === id)));
    } else {
      setSelected((current) => [...new Set([...current, ...paginatedData.map((row) => row.id)])]);
    }
  };

  const handleSelectRow = (id) => {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const openConfirm = (action, payload) => {
    setModal({ open: true, type: action === 'alert' ? 'alert' : 'confirm', action, payload });
    setMenuRow(null);
  };

  const closeModal = () => setModal({ ...modal, open: false });

  const handleConfirm = () => {
    const { action, payload } = modal;
    if (action === 'delete') {
      onDelete?.(payload);
      setToast({ type: 'error', message: 'Item deleted successfully.' });
    }
    if (action === 'archive') {
      onArchive?.(payload);
      setToast({ type: 'warning', message: 'Item archived.' });
    }
    if (action === 'bulkDelete') {
      onBulkDelete?.(selected);
      setToast({ type: 'error', message: 'Selected items deleted.' });
      setSelected([]);
    }
    if (action === 'bulkArchive') {
      onBulkArchive?.(selected);
      setToast({ type: 'warning', message: 'Selected items archived.' });
      setSelected([]);
    }
    closeModal();
  };

  const handleBulkExport = () => {
    onBulkExport?.(selected);
    setToast({ type: 'success', message: `${selected.length} items exported.` });
  };

  const handleClearFilters = () => setFilters({});

  if (error) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
        <div className="max-w-xl mx-auto">
          <div className="mb-6 text-center text-white">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-2xl text-red-700">■■</div>
            <h3 className="text-2xl font-bold">{error.title || 'Unable to load data'}</h3>
            <p className="text-gray-400 mt-2">{error.message || 'We encountered an error. Please try again.'}</p>
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button onClick={error.onRetry} className="rounded-2xl bg-orange-600 px-6 py-3 text-white hover:bg-orange-500">
              Retry
            </button>
            {error.onSupport && (
              <button onClick={error.onSupport} className="rounded-2xl border border-white/10 px-6 py-3 text-white hover:bg-white/5">
                Contact Support
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <TableSkeleton columns={columns.length + 2} />;
  }

  if (!filteredData.length) {
    return <EmptyState icon="■" title={emptyState.title} message={emptyState.message} actionLabel={emptyState.actionLabel} onAction={emptyState.onAction} />;
  }

  return (
    <div className="space-y-6">
      {toast && <Toast type={toast.type} message={toast.message} duration={toast.type === 'success' ? 3000 : toast.type === 'error' ? 5000 : 4000} onClose={() => setToast(null)} />}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-gray-400">Search, filter, sort, and manage table results.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search records..."
              className="rounded-2xl border border-white/10 bg-[#0B1120] px-4 py-3 text-white outline-none focus:border-orange-500"
            />
            {selectedCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-900/70 px-4 py-3 text-sm text-white">
                <span>{selectedCount} selected</span>
              </div>
            )}
          </div>
        </div>

        {selectedCount > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl bg-slate-900/70 p-4 text-sm text-white">
            <button onClick={() => openConfirm('bulkDelete')} className="rounded-2xl bg-red-600 px-4 py-2 font-semibold hover:bg-red-500">
              Delete Selected
            </button>
            <button onClick={handleBulkExport} className="rounded-2xl bg-green-600 px-4 py-2 font-semibold hover:bg-green-500">
              Export
            </button>
            <button onClick={() => openConfirm('bulkArchive')} className="rounded-2xl bg-amber-500 px-4 py-2 font-semibold text-slate-900 hover:bg-amber-400">
              Archive
            </button>
          </div>
        )}

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white text-slate-900 shadow-sm">
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-[#F3F1ED] text-sm text-slate-900">
              <tr>
                <th className="border-b border-slate-200 px-4 py-4">
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={allSelected} onChange={handleSelectAll} className="h-4 w-4 rounded border-slate-300 text-orange-600" />
                  </label>
                </th>
                {columns.map((column) => (
                  <th key={column.key} className="border-b border-slate-200 px-4 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      <button type="button" className="flex items-center gap-1 font-semibold" onClick={() => column.sortable && toggleSort(column.key)}>
                        {column.label}
                        {sortKey === column.key && (
                          <span>{sortDir === 'asc' ? '▲' : '▼'}</span>
                        )}
                      </button>
                      {column.filterOptions && (
                        <div className="relative">
                          <button type="button" onClick={() => setOpenFilter(openFilter === column.key ? null : column.key)} className="rounded-full border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                            Filter
                          </button>
                          {openFilter === column.key && (
                            <div className="absolute right-0 top-10 z-20 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                              <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-800">
                                <span>Filter {column.label}</span>
                                <button type="button" onClick={() => setFilters((current) => ({ ...current, [column.key]: [] }))} className="text-orange-600 hover:text-orange-500">
                                  Clear
                                </button>
                              </div>
                              <div className="space-y-2 max-h-40 overflow-y-auto">
                                {column.filterOptions.map((option) => (
                                  <label key={option} className="flex items-center gap-2 text-sm text-slate-700">
                                    <input
                                      type="checkbox"
                                      checked={(filters[column.key] || []).includes(option)}
                                      onChange={() => handleFilterChange(column.key, option)}
                                      className="h-4 w-4 rounded border-slate-300 text-orange-600"
                                    />
                                    {option}
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
                <th className="border-b border-slate-200 px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => (
                <tr key={row.id} className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#F9F8F6]'} hover:bg-[#FFF5F0]`}>
                  <td className="border-b border-slate-200 px-4 py-4 align-middle">
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" checked={selected.includes(row.id)} onChange={() => handleSelectRow(row.id)} className="h-4 w-4 rounded border-slate-300 text-orange-600" />
                    </label>
                  </td>
                  {columns.map((column) => (
                    <td key={column.key} className="border-b border-slate-200 px-4 py-4 align-middle text-sm text-slate-900">
                      {column.render ? column.render(row[column.key], row) : highlightText(row[column.key] ?? '', search)}
                    </td>
                  ))}
                  <td className="border-b border-slate-200 px-4 py-4 align-middle">
                    <div className="relative inline-flex">
                      <button type="button" onClick={() => setMenuRow(menuRow === row.id ? null : row.id)} className="rounded-full border border-slate-300 bg-white px-3 py-2 text-slate-700 hover:bg-slate-100">
                        ⋯
                      </button>
                      {menuRow === row.id && (
                        <div className="absolute right-0 top-12 z-20 w-40 rounded-2xl border border-slate-200 bg-white shadow-xl">
                          <button type="button" onClick={() => { onView?.(row); setMenuRow(null); }} className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100">View</button>
                          <button type="button" onClick={() => { onEdit?.(row); setMenuRow(null); }} className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100">Edit</button>
                          <button type="button" onClick={() => openConfirm('delete', row)} className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-slate-100">Delete</button>
                          <button type="button" onClick={() => openConfirm('archive', row)} className="w-full px-4 py-3 text-left text-sm text-amber-600 hover:bg-slate-100">Archive</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-slate-400">
            Showing {(safePage - 1) * rowsPerPage + 1} - {Math.min(safePage * rowsPerPage, filteredData.length)} of {filteredData.length} results
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <label className="inline-flex items-center gap-2">
              Rows per page:
              <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }} className="rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none">
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </label>
            <label className="inline-flex items-center gap-2">
              Page:
              <input type="number" min="1" max={pageCount} value={safePage} onChange={(e) => setPage(Number(e.target.value) || 1)} className="w-20 rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none" />
            </label>
          </div>
        </div>
      </div>

      <Modal
        open={modal.open}
        title={modal.action === 'delete' ? 'Are you sure?' : modal.action === 'archive' ? 'Archive item' : 'Confirm action'}
        onClose={closeModal}
        onConfirm={handleConfirm}
        confirmLabel={modal.action === 'delete' ? 'Delete' : 'Confirm'}
      >
        <p className="text-slate-700">Are you sure you want to {modal.action} this item?</p>
      </Modal>
    </div>
  );
}

export default DataTable;

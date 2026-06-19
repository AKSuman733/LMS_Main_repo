import { useMemo, useState } from "react";
import {
  Archive,
  ChevronDown,
  ChevronUp,
  Download,
  Edit3,
  Eye,
  MoreHorizontal,
  Search,
  Trash2,
  X,
} from "lucide-react";

const getCellValue = (row, col) => row[col.accessor || col.key];

function Highlight({ value, search }) {
  const text = value === undefined || value === null ? "" : String(value);
  const query = search.trim();

  if (!query) return text;

  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded bg-orange-200 px-0.5 text-slate-950">
        {text.slice(index, index + query.length)}
      </mark>
      {text.slice(index + query.length)}
    </>
  );
}

export default function DataTable({
  columns = [],
  data = [],
  rowKey = "id",
  pageSizeOptions = [10, 25, 50],
  initialPageSize = 10,
  onView,
  onEdit,
  onDelete,
  onBulkDelete,
  onArchive,
  onExport,
  onSelectionChange,
  actions = {},
}) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [filters, setFilters] = useState({});
  const [openMenuId, setOpenMenuId] = useState(null);
  const [detailRow, setDetailRow] = useState(null);

  const filterOptions = useMemo(() => {
    return columns.reduce((acc, col) => {
      if (col.filterable === false) return acc;
      const values = [
        ...new Set(
          data
            .map((row) => getCellValue(row, col))
            .filter((value) => value !== undefined && value !== null && value !== "")
            .map((value) => String(value))
        ),
      ].slice(0, 20);

      if (values.length > 1 && values.length <= 20) acc[col.key] = values;
      return acc;
    }, {});
  }, [columns, data]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return data.filter((row) => {
      const matchesSearch =
        !query ||
        columns.some((col) => {
          const value = getCellValue(row, col);
          return String(value ?? "").toLowerCase().includes(query);
        });

      const matchesFilters = Object.entries(filters).every(([key, selectedValues]) => {
        if (!selectedValues?.length) return true;
        const col = columns.find((item) => item.key === key);
        if (!col) return true;
        return selectedValues.includes(String(getCellValue(row, col) ?? ""));
      });

      return matchesSearch && matchesFilters;
    });
  }, [columns, data, filters, search]);

  const sorted = useMemo(() => {
    if (!sortBy) return filtered;

    const col = columns.find((item) => item.key === sortBy);
    if (!col) return filtered;

    const sortedCopy = [...filtered].sort((a, b) => {
      const av = getCellValue(a, col);
      const bv = getCellValue(b, col);

      if (av === bv) return 0;
      if (av === undefined || av === null) return 1;
      if (bv === undefined || bv === null) return -1;

      if (typeof av === "number" && typeof bv === "number") return av - bv;

      return String(av).localeCompare(String(bv));
    });

    return sortDir === "asc" ? sortedCopy : sortedCopy.reverse();
  }, [columns, filtered, sortBy, sortDir]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = sorted.slice((page - 1) * pageSize, page * pageSize);
  const allPageSelected =
    pageData.length > 0 && pageData.every((row) => selected.has(row[rowKey]));
  const selectedIds = Array.from(selected);

  const notifySelection = (next) => onSelectionChange?.(Array.from(next));

  const toggleSort = (key) => {
    setPage(1);
    if (sortBy === key) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
      return;
    }
    setSortBy(key);
    setSortDir("asc");
  };

  const toggleFilter = (key, value) => {
    setPage(1);
    setFilters((prev) => {
      const current = prev[key] || [];
      const nextValues = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [key]: nextValues };
    });
  };

  const clearFilters = () => {
    setFilters({});
    setSearch("");
    setPage(1);
  };

  const toggleSelectAll = (checked) => {
    setSelected((prev) => {
      const next = new Set(prev);
      pageData.forEach((row) => {
        if (checked) next.add(row[rowKey]);
        else next.delete(row[rowKey]);
      });
      notifySelection(next);
      return next;
    });
  };

  const toggleSelectRow = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      notifySelection(next);
      return next;
    });
  };

  const clearSelection = () => {
    setSelected(new Set());
    onSelectionChange?.([]);
  };

  const selectedRows = data.filter((row) => selected.has(row[rowKey]));

  const exportRows = (rows = selectedRows.length ? selectedRows : sorted) => {
    if (onExport) {
      onExport(rows.map((row) => row[rowKey]), rows);
      return;
    }

    const exportColumns = columns.filter((col) => col.exportable !== false);
    const header = exportColumns.map((col) => col.label);
    const csvRows = rows.map((row) =>
      exportColumns.map((col) => {
        const value = getCellValue(row, col);
        return `"${String(value ?? "").replaceAll('"', '""')}"`;
      })
    );
    const csv = [header, ...csvRows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `uptoskills-export-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const viewRow = (row) => {
    if (onView) onView(row);
    else setDetailRow(row);
    setOpenMenuId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-[240px] flex-1 items-center gap-2 rounded-lg border border-white/10 bg-slate-950 px-3 py-2">
          <Search size={16} className="text-slate-400" />
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search rows..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(search || Object.values(filters).some(Boolean)) && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white"
            >
              <X size={14} />
              Clear filters
            </button>
          )}

          <span className="text-sm text-slate-400">Rows per page</span>
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setPage(1);
            }}
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option} className="bg-slate-950">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-950 p-3">
          <span className="text-sm font-semibold text-slate-300">
            {selectedIds.length} selected
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onBulkDelete?.(selectedIds)}
              disabled={!onBulkDelete}
              className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-bold text-white"
            >
              <Trash2 size={15} />
              Delete Selected
            </button>
            <button
              onClick={() => exportRows()}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-bold text-slate-200"
            >
              <Download size={15} />
              Export
            </button>
            {onArchive && (
              <button
                onClick={() => onArchive(selectedIds)}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-bold text-slate-200"
              >
                <Archive size={15} />
                Archive
              </button>
            )}
            <button
              onClick={clearSelection}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm font-bold text-slate-400"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-white/15">
        <table className="min-w-full text-left">
          <thead style={{ backgroundColor: "#F3F1ED" }}>
            <tr className="text-slate-950">
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allPageSelected}
                  onChange={(event) => toggleSelectAll(event.target.checked)}
                />
              </th>
              {columns.map((col) => (
                <th key={col.key} className="min-w-[140px] px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <button
                      disabled={!col.sortable}
                      onClick={() => col.sortable && toggleSort(col.key)}
                      className="flex items-center gap-1 text-sm font-black disabled:cursor-default"
                    >
                      {col.label}
                      {col.sortable &&
                        (sortBy === col.key && sortDir === "desc" ? (
                          <ChevronDown size={15} />
                        ) : (
                          <ChevronUp size={15} />
                        ))}
                    </button>

                    {filterOptions[col.key] && (
                      <details className="relative">
                        <summary className="cursor-pointer list-none rounded px-1 hover:bg-black/5">
                          <ChevronDown size={15} />
                        </summary>
                        <div className="absolute right-0 z-20 mt-2 w-52 rounded-lg border border-slate-200 bg-white p-2 text-slate-950 shadow-xl">
                          {filterOptions[col.key].map((option) => (
                            <label
                              key={option}
                              className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-slate-100"
                            >
                              <input
                                type="checkbox"
                                checked={(filters[col.key] || []).includes(option)}
                                onChange={() => toggleFilter(col.key, option)}
                              />
                              <span className="truncate">{option}</span>
                            </label>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                </th>
              ))}
              <th className="w-24 px-4 py-3 text-sm font-black">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pageData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="px-4 py-10 text-center text-slate-400"
                >
                  No results match the current filters.
                </td>
              </tr>
            )}

            {pageData.map((row, rowIndex) => {
              const id = row[rowKey];

              return (
                <tr
                  key={id}
                  className="border-t border-slate-200 text-slate-950 transition hover:bg-[#FFF5F0]"
                  style={{ backgroundColor: rowIndex % 2 ? "#F9F8F6" : "#FFFFFF" }}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(id)}
                      onChange={() => toggleSelectRow(id)}
                    />
                  </td>

                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 align-top text-sm">
                      {col.render ? (
                        col.render(row)
                      ) : (
                        <Highlight value={getCellValue(row, col)} search={search} />
                      )}
                    </td>
                  ))}

                  <td className="relative px-4 py-3">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === id ? null : id)}
                      className="rounded-lg p-2 text-slate-700 hover:bg-slate-200"
                      aria-label="Row actions"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openMenuId === id && (
                      <div className="absolute right-3 z-20 mt-2 w-40 rounded-lg border border-slate-200 bg-white p-1 text-slate-950 shadow-xl">
                        <button onClick={() => viewRow(row)} className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm hover:bg-slate-100">
                          <Eye size={15} /> View
                        </button>
                        <button onClick={() => onEdit?.(row)} className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm hover:bg-slate-100">
                          <Edit3 size={15} /> Edit
                        </button>
                        {onArchive && (
                          <button onClick={() => onArchive([id])} className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm hover:bg-slate-100">
                            <Archive size={15} /> Archive
                          </button>
                        )}
                        {actions.markPresent && (
                          <button onClick={() => actions.markPresent(row)} className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm hover:bg-slate-100">
                            Mark Present
                          </button>
                        )}
                        {actions.markAbsent && (
                          <button onClick={() => actions.markAbsent(row)} className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm hover:bg-slate-100">
                            Mark Absent
                          </button>
                        )}
                        <button onClick={() => onDelete?.(row)} className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                          <Trash2 size={15} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
        <div>
          Showing {total === 0 ? 0 : (page - 1) * pageSize + 1}-
          {Math.min(page * pageSize, total)} of {total} results
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setPage(1)} disabled={page === 1} className="rounded border border-white/20 px-3 py-2 disabled:opacity-40">First</button>
          <button onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="rounded border border-white/20 px-3 py-2 disabled:opacity-40">Prev</button>
          <input
            value={page}
            onChange={(event) => {
              const value = Number(event.target.value) || 1;
              setPage(Math.min(Math.max(1, value), totalPages));
            }}
            className="w-14 rounded border border-white/20 bg-slate-950 px-2 py-2 text-center text-white"
          />
          <span>/ {totalPages}</span>
          <button onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages} className="rounded border border-white/20 px-3 py-2 disabled:opacity-40">Next</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="rounded border border-white/20 px-3 py-2 disabled:opacity-40">Last</button>
        </div>
      </div>

      {detailRow && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <p className="text-xs font-bold uppercase text-cyan-300">Details</p>
                <h3 className="mt-1 text-2xl font-black">
                  {detailRow.name || detailRow.title || detailRow.studentName || "Record Details"}
                </h3>
              </div>
              <button
                onClick={() => setDetailRow(null)}
                className="rounded-xl bg-white/10 p-2 text-slate-300 hover:bg-red-500 hover:text-white"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid max-h-[70vh] gap-3 overflow-y-auto p-5 md:grid-cols-2">
              {columns.map((col) => (
                <div key={col.key} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-bold uppercase text-slate-500">{col.label}</p>
                  <div className="mt-2 text-sm font-semibold text-slate-100">
                    {String(getCellValue(detailRow, col) ?? "N/A")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

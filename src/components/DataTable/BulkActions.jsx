export default function BulkActions({
  selectedRows
}) {
  if (selectedRows.length === 0)
    return null;

  return (
    <div className="bulk-actions">
      <button>
        Delete Selected
      </button>

      <button>Export</button>

      <button>Archive</button>
    </div>
  );
}
import { colors } from "../../styles/designtokens";

export default function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          color: "#000",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        Prev
      </button>

      <span
        style={{
          color: "#fff",
          fontWeight: "500",
        }}
      >
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          color: "#000",
          cursor:
            currentPage === totalPages
              ? "not-allowed"
              : "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
}
import { FaEllipsisV } from "react-icons/fa";

export default function RowActions() {
  return (
    <div className="row-actions">
      <FaEllipsisV />

      <div className="dropdown-menu">
        <button>View</button>

        <button>Edit</button>

        <button>Delete</button>

        <button>Archive</button>
      </div>
    </div>
  );
}
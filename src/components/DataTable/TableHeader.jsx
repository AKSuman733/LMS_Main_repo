import {
  FaSortUp,
  FaSortDown
} from "react-icons/fa";

export default function TableHeader({
  columns,
  sortConfig,
  handleSort
}) {
  return (
    <thead>
      <tr>
        <th></th>

        {columns.map((column) => (
          <th
            key={column.key}
            onClick={() =>
              handleSort(column.key)
            }
          >
            {column.label}

            {sortConfig.key ===
            column.key ? (
              sortConfig.direction ===
              "asc" ? (
                <FaSortUp />
              ) : (
                <FaSortDown />
              )
            ) : null}
          </th>
        ))}

        <th>Actions</th>
      </tr>
    </thead>
  );
}
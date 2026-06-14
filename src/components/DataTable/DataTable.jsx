import { useState, useMemo } from "react";

import SearchBar from "./SearchBar";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import RowActions from "./RowActions";
import BulkActions from "./BulkActions";

import "./DataTable.css";

export default function DataTable({
  columns,
  data
}) {
  const [search, setSearch] =
    useState("");

  const [selectedRows, setSelectedRows] =
    useState([]);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [sortConfig, setSortConfig] =
    useState({
      key: null,
      direction: "asc"
    });

  const rowsPerPage = 5;

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, data]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key)
      return filteredData;

    return [...filteredData].sort(
      (a, b) => {
        if (
          a[sortConfig.key] <
          b[sortConfig.key]
        ) {
          return sortConfig.direction ===
            "asc"
            ? -1
            : 1;
        }

        if (
          a[sortConfig.key] >
          b[sortConfig.key]
        ) {
          return sortConfig.direction ===
            "asc"
            ? 1
            : -1;
        }

        return 0;
      }
    );
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(
    sortedData.length / rowsPerPage
  );

  const start =
    (currentPage - 1) * rowsPerPage;

  const end = start + rowsPerPage;

  const paginatedData =
    sortedData.slice(start, end);

  const handleSort = (key) => {
    let direction = "asc";

    if (
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({
      key,
      direction
    });
  };

  const handleSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter(
            (item) => item !== id
          )
        : [...prev, id]
    );
  };

  return (
    <div className="table-wrapper">
      <div className="table-top">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <BulkActions
          selectedRows={selectedRows}
        />
      </div>

      <table className="custom-table">
        <TableHeader
          columns={columns}
          sortConfig={sortConfig}
          handleSort={handleSort}
        />

        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(
                    item.id
                  )}
                  onChange={() =>
                    handleSelect(item.id)
                  }
                />
              </td>

              {columns.map((column) => (
                <td key={column.key}>
                  {item[column.key]}
                </td>
              ))}

              <td>
                <RowActions />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={
          setCurrentPage
        }
      />
    </div>
  );
}
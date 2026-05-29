import {
  useMemo,
  useState,
} from "react";

import {
  ChevronUp,
  ChevronDown,
  Search,
  MoreVertical,
  Trash2,
  Archive,
  Download,
  Eye,
  Pencil,
} from "lucide-react";

/* ====================================================== */
/* STYLES */
/* ====================================================== */

const glass =
  `
    rounded-3xl

    border border-white/10

    bg-[#081120]/80

    backdrop-blur-2xl
  `;

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

function DataTable({
  columns = [],
  data = [],
  rawData = [],
  onDeleteSelected,
  onArchiveSelected,
}) {

  /* ====================================================== */
  /* STATES */
  /* ====================================================== */

  const [search, setSearch] =
    useState("");

  const [sortField, setSortField] =
    useState("");

  const [sortDirection, setSortDirection] =
    useState("asc");

  const [selectedRows, setSelectedRows] =
    useState([]);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  /* ====================================================== */
  /* SEARCH */
  /* ====================================================== */

  const filteredData =
    useMemo(() => {

      return data.filter((row) =>

        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    }, [data, search]);

  /* ====================================================== */
  /* SORT */
  /* ====================================================== */

  const sortedData =
    useMemo(() => {

      if (!sortField)
        return filteredData;

      return [...filteredData].sort(
        (a, b) => {

          const aValue =
            a[sortField];

          const bValue =
            b[sortField];

          if (
            aValue < bValue
          ) {

            return sortDirection ===
              "asc"

              ? -1

              : 1;
          }

          if (
            aValue > bValue
          ) {

            return sortDirection ===
              "asc"

              ? 1

              : -1;
          }

          return 0;
        }
      );

    }, [
      filteredData,
      sortField,
      sortDirection,
    ]);

  /* ====================================================== */
  /* PAGINATION */
  /* ====================================================== */

  const totalPages =
    Math.ceil(
      sortedData.length /
        rowsPerPage
    );

  const paginatedData =
    sortedData.slice(

      (currentPage - 1) *
        rowsPerPage,

      currentPage *
        rowsPerPage
    );

  /* ====================================================== */
  /* SORT HANDLER */
  /* ====================================================== */

  const handleSort = (
    field
  ) => {

    if (
      sortField === field
    ) {

      setSortDirection(

        sortDirection ===
          "asc"

          ? "desc"

          : "asc"
      );

    } else {

      setSortField(field);

      setSortDirection(
        "asc"
      );
    }
  };

  /* ====================================================== */
  /* SELECT ALL */
  /* ====================================================== */

  const handleSelectAll =
    () => {

      if (
        selectedRows.length ===
        paginatedData.length
      ) {

        setSelectedRows([]);

      } else {

        setSelectedRows(

          paginatedData.map(
            (row) => row.id
          )
        );
      }
    };

  /* ====================================================== */
  /* SELECT ROW */
  /* ====================================================== */

  const handleSelectRow = (
    id
  ) => {

    if (
      selectedRows.includes(
        id
      )
    ) {

      setSelectedRows(

        selectedRows.filter(
          (rowId) =>
            rowId !== id
        )
      );

    } else {

      setSelectedRows([
        ...selectedRows,
        id,
      ]);
    }
  };

  /* ====================================================== */
  /* COMPONENT */
  /* ====================================================== */

  return (

    <div
      className={`
        ${glass}

        overflow-hidden

        p-5
      `}
    >

      {/* ====================================================== */}
      {/* TOP BAR */}
      {/* ====================================================== */}

      <div
        className="
          mb-6

          flex flex-col
          gap-4

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* SEARCH */}

        <div
          className="
            relative

            w-full

            lg:max-w-sm
          "
        >

          <Search
            size={16}

            className="
              absolute
              left-4 top-1/2

              -translate-y-1/2

              text-cyan-400
            "
          />

          <input
            type="text"

            placeholder="Search users..."

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            className="
              w-full

              rounded-2xl

              border border-white/10

              bg-[#0f172a]

              py-3 pl-11 pr-4

              text-sm
              text-white

              outline-none

              transition-all
              duration-300

              placeholder:text-slate-500

              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-500/20
            "
          />

        </div>        {/* BULK ACTIONS */}

        {selectedRows.length >
          0 && (

          <div
            className="
              flex flex-wrap
              gap-3
            "
          >

            <button

  onClick={() =>

    onDeleteSelected?.(
      selectedRows
    )
  }

  className="
    flex items-center
    gap-2

    rounded-xl

    border border-red-500/20

    bg-red-500/10

    px-4 py-2.5

    text-xs
    font-semibold

    text-red-400

    transition-all
    duration-300

    hover:scale-[1.03]
  "
>

              <Trash2 size={14} />

              Delete

            </button>

           <button

  onClick={() =>

    onArchiveSelected?.(
      selectedRows
    )
  }

  className="
    flex items-center
    gap-2

    rounded-xl

    border border-amber-500/20

    bg-amber-500/10

    px-4 py-2.5

    text-xs
    font-semibold

    text-amber-400

    transition-all
    duration-300

    hover:scale-[1.03]
  "
>

              <Archive size={14} />

              Archive

            </button>

           <button

 onClick={() => {

  const selectedData =
    rawData.filter((row) =>

      selectedRows.includes(
        row.id
      )
    );

  const blob =
    new Blob(

      [
        JSON.stringify(
          selectedData,
          null,
          2
        ),
      ],

      {
        type:
          "application/json",
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href = url;

  link.download =
    "users-export.json";

  link.click();

  URL.revokeObjectURL(
    url
  );
}}
  className="
    flex items-center
    gap-2

    rounded-xl

    border border-cyan-500/20

    bg-cyan-500/10

    px-4 py-2.5

    text-xs
    font-semibold

    text-cyan-400

    transition-all
    duration-300

    hover:scale-[1.03]
  "
>
              <Download size={14} />

              Export

            </button>

          </div>
        )}

      </div>

      {/* ====================================================== */}
      {/* TABLE */}
      {/* ====================================================== */}

      <div
        className="
          overflow-x-auto
        "
      >

        <table
          className="
            w-full

            border-separate
            border-spacing-y-2
          "
        >

          {/* ====================================================== */}
          {/* HEADER */}
          {/* ====================================================== */}

          <thead>

            <tr>

              <th
                className="
                  px-4 py-4
                "
              >

                <input
                  type="checkbox"

                  checked={
                    selectedRows.length ===
                    paginatedData.length &&
                    paginatedData.length >
                      0
                  }

                  onChange={
                    handleSelectAll
                  }

                  className="
                    accent-cyan-500
                  "
                />

              </th>

              {columns.map(
                (column) => (

                  <th
                    key={column.key}

                    onClick={() =>
                      handleSort(
                        column.key
                      )
                    }

                    className="
                      cursor-pointer

                      px-4 py-4

                      text-left

                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider

                      text-slate-400
                    "
                  >

                    <div
                      className="
                        flex items-center
                        gap-2
                      "
                    >

                      {
                        column.label
                      }

                      {sortField ===
                        column.key && (

                        sortDirection ===
                        "asc"

                          ? (
                            <ChevronUp
                              size={
                                14
                              }
                            />
                          )

                          : (
                            <ChevronDown
                              size={
                                14
                              }
                            />
                          )
                      )}

                    </div>

                  </th>
                )
              )}

            </tr>

          </thead>

          {/* ====================================================== */}
          {/* BODY */}
          {/* ====================================================== */}

          <tbody>

            {paginatedData.map(
              (
                row,
                index
              ) => (

                <tr
                  key={row.id}

                  className="
                    rounded-2xl

                    border border-white/5

                    bg-[#0f172a]

                    transition-all
                    duration-300

                    hover:bg-[#131d31]
                    hover:shadow-[0_0_25px_rgba(0,181,165,0.08)]
                  "
                >

                  {/* CHECKBOX */}

                  <td
                    className="
                      rounded-l-2xl

                      px-4 py-5
                    "
                  >

                    <input
                      type="checkbox"

                      checked={selectedRows.includes(
                        row.id
                      )}

                      onChange={() =>
                        handleSelectRow(
                          row.id
                        )
                      }

                      className="
                        accent-cyan-500
                      "
                    />

                  </td>

                  {/* DATA */}

                  {columns.map(
                    (
                      column
                    ) => (

                      <td
                        key={
                          column.key
                        }

                        className="
                          px-4 py-5

                          text-sm

                          text-slate-200
                        "
                      >

                        {
                          row[
                            column.key
                          ]
                        }

                      </td>
                    )
                  )}

            
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* ====================================================== */}
      {/* FOOTER */}
      {/* ====================================================== */}

      <div
        className="
          mt-6

          flex flex-col
          gap-4

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        <p
          className="
            text-sm

            text-slate-400
          "
        >

          Showing{" "}

          {(currentPage - 1) *
            rowsPerPage +
            1}

          -

          {Math.min(
            currentPage *
              rowsPerPage,

            sortedData.length
          )}

          {" "}of{" "}

          {sortedData.length}

          {" "}results

        </p>

        {/* PAGINATION */}

        <div
          className="
            flex items-center
            gap-3
          "
        >

          <select
            value={rowsPerPage}

            onChange={(e) =>
              setRowsPerPage(
                Number(
                  e.target.value
                )
              )
            }

            className="
              rounded-xl

              border border-white/10

              bg-[#0f172a]

              px-3 py-2

              text-sm
              text-white
            "
          >

            <option value={5}>
              5
            </option>

            <option value={10}>
              10
            </option>

            <option value={20}>
              20
            </option>

          </select>

          <div
            className="
              flex items-center
              gap-2
            "
          >

            <button
              disabled={
                currentPage === 1
              }

              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }

              className="
                rounded-xl

                border border-white/10

                bg-[#0f172a]

                px-4 py-2

                text-sm
                text-white
              "
            >

              Prev

            </button>

            <span
              className="
                text-sm
                text-slate-300
              "
            >

              {currentPage}
              /
              {totalPages}

            </span>

            <button
              disabled={
                currentPage ===
                totalPages
              }

              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }

              className="
                rounded-xl

                border border-white/10

                bg-[#0f172a]

                px-4 py-2

                text-sm
                text-white
              "
            >

              Next

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DataTable;
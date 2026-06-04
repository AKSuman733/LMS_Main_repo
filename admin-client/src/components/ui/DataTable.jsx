import {
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  ChevronUp,
  ChevronDown,
  Search,
  Trash2,
  Archive,
  Download,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

/* ====================================================== */
/* STYLES */
/* ====================================================== */

const glass =
  `
    rounded-[24px]

    border border-white/10

    bg-[#081120]/80

    backdrop-blur-2xl

    shadow-[0_0_30px_rgba(0,0,0,0.2)]
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
  /* RESET PAGE */
  /* ====================================================== */

  useEffect(() => {

    setCurrentPage(1);

  }, [search]);

  /* ====================================================== */
  /* SEARCH */
  /* ====================================================== */
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
    Math.max(
      1,

      Math.ceil(
        sortedData.length /
          rowsPerPage
      )
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
  /* EXPORT */
  /* ====================================================== */

  const handleExport =
    () => {

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
        "export.json";

      link.click();

      URL.revokeObjectURL(
        url
      );
    };

  /* ====================================================== */
  /* COMPONENT */
  /* ====================================================== */
    /* ====================================================== */
  /* COMPONENT */
  /* ====================================================== */

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 10,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.2,
      }}

      className={`
        ${glass}

        overflow-hidden

        p-3

        sm:p-4
        lg:p-5
      `}
    >

      {/* ====================================================== */}
      {/* TOPBAR */}
      {/* ====================================================== */}

      <div
        className="
          mb-4

          flex flex-col
          gap-3

          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >

        {/* ====================================================== */}
        {/* SEARCH */}
        {/* ====================================================== */}

        <div
          className="
            relative

            w-full

            sm:max-w-sm
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

            placeholder="Search..."

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            className="
              h-11
              w-full

              rounded-2xl

              border border-white/10

              bg-[#0f172a]

              py-2 pl-11 pr-4

              text-sm
              text-white

              outline-none

              transition-all
              duration-200

              placeholder:text-slate-500

              hover:border-white/20

              focus:border-orange-500
              focus:ring-2
              focus:ring-orange-500/20
              focus:ring-offset-2
              focus:ring-offset-[#081120]
            "
          />

        </div>

        {/* ====================================================== */}
        {/* BULK ACTIONS */}
        {/* ====================================================== */}

        <AnimatePresence>

          {selectedRows.length >
            0 && (

            <motion.div

              initial={{
                opacity: 0,
                y: -6,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                y: -6,
              }}

              transition={{
                duration: 0.15,
              }}

              className="
                flex flex-wrap
                gap-2
              "
            >

              {/* DELETE */}

              <button

                onClick={() =>

                  onDeleteSelected?.(
                    selectedRows
                  )
                }

                className="
                  flex h-11
                  items-center
                  gap-2

                  rounded-2xl

                  border border-red-500/20

                  bg-red-500/10

                  px-4

                  text-xs
                  font-semibold

                  text-red-400

                  transition-all
                  duration-200

                  hover:bg-red-500/20
                  hover:shadow-[0_0_20px_rgba(239,68,68,0.12)]

                  active:scale-[0.98]

                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-500
                  focus:ring-offset-2
                  focus:ring-offset-[#081120]
                "
              >

                <Trash2 size={14} />

                Delete

              </button>

              {/* ARCHIVE */}

              <button

                onClick={() =>

                  onArchiveSelected?.(
                    selectedRows
                  )
                }

                className="
                  flex h-11
                  items-center
                  gap-2

                  rounded-2xl

                  border border-amber-500/20

                  bg-amber-500/10

                  px-4

                  text-xs
                  font-semibold

                  text-amber-400

                  transition-all
                  duration-200

                  hover:bg-amber-500/20
                  hover:shadow-[0_0_20px_rgba(245,158,11,0.12)]

                  active:scale-[0.98]

                  focus:outline-none
                  focus:ring-2
                  focus:ring-amber-500
                  focus:ring-offset-2
                  focus:ring-offset-[#081120]
                "
              >

                <Archive size={14} />

                Archive

              </button>

              {/* EXPORT */}

              <button

                onClick={
                  handleExport
                }

                className="
                  flex h-11
                  items-center
                  gap-2

                  rounded-2xl

                  border border-cyan-500/20

                  bg-cyan-500/10

                  px-4

                  text-xs
                  font-semibold

                  text-cyan-400

                  transition-all
                  duration-200

                  hover:bg-cyan-500/20
                  hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]

                  active:scale-[0.98]

                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                  focus:ring-offset-2
                  focus:ring-offset-[#081120]
                "
              >

                <Download size={14} />

                Export

              </button>

            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* ====================================================== */}
      {/* TABLE */}
      {/* ====================================================== */}
            {/* ====================================================== */}
      {/* TABLE */}
      {/* ====================================================== */}

      <div
        className="
          overflow-x-auto

          rounded-2xl

          scrollbar-thin
          scrollbar-thumb-white/10
          scrollbar-track-transparent
        "
      >

        <table
          className="
            min-w-[720px]
            w-full

            border-separate
            border-spacing-y-2
          "
        >

          {/* ====================================================== */}
          {/* TABLE HEAD */}
          {/* ====================================================== */}

          <thead>

            <tr>

              {/* ====================================================== */}
              {/* CHECKBOX */}
              {/* ====================================================== */}

              <th
                className="
                  px-3 py-3

                  text-left
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
                    h-4
                    w-4

                    rounded

                    accent-cyan-500

                    focus:ring-2
                    focus:ring-orange-500
                    focus:ring-offset-2
                    focus:ring-offset-[#081120]
                  "
                />

              </th>

              {/* ====================================================== */}
              {/* COLUMNS */}
              {/* ====================================================== */}

              {columns.map(
                (column) => (

                  <th
                    key={column.key}

                    onClick={() =>
                      handleSort(
                        column.key
                      )
                    }

                    className={`
                      cursor-pointer

                      px-3 py-3
                      sm:px-4

                      text-left

                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-wider

                      text-slate-400

                      transition-all
                      duration-200

                      hover:text-white

                      focus:outline-none
                      focus:ring-2
                      focus:ring-orange-500
                      focus:ring-offset-2
                      focus:ring-offset-[#081120]

                      ${
                        column.mobileHidden

                          ? "hidden md:table-cell"

                          : ""
                      }
                    `}
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
                              size={14}
                            />
                          )

                          : (
                            <ChevronDown
                              size={14}
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
          {/* TABLE BODY */}
          {/* ====================================================== */}

          <tbody>

            {paginatedData.map(
              (row) => (

                <motion.tr

                  layout

                  initial={{
                    opacity: 0,
                    y: 6,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    duration: 0.18,
                  }}

                  key={row.id}

                  className={`
                    group

                    overflow-hidden

                    rounded-2xl

                    border

                    transition-all
                    duration-200

                    ${
                      selectedRows.includes(
                        row.id
                      )

                        ? `
                          border-cyan-500/30

                          bg-cyan-500/10

                          shadow-[0_0_20px_rgba(34,211,238,0.08)]
                        `

                        : `
                          border-white/5

                          bg-[#0f172a]

                          hover:bg-[#131d31]
                          hover:border-orange-500/20
                        `
                    }
                  `}
                >

                  {/* ====================================================== */}
                  {/* CHECKBOX */}
                  {/* ====================================================== */}

                  <td
                    className="
                      rounded-l-2xl

                      px-3 py-4
                      sm:px-4
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
                        h-4
                        w-4

                        rounded

                        accent-cyan-500

                        focus:ring-2
                        focus:ring-orange-500
                        focus:ring-offset-2
                        focus:ring-offset-[#081120]
                      "
                    />

                  </td>

                  {/* ====================================================== */}
                  {/* ROW DATA */}
                  {/* ====================================================== */}

                  {columns.map(
                    (
                      column
                    ) => (

                      <td
                        key={
                          column.key
                        }

                        className={`
                          px-3 py-4
                          sm:px-4

                          text-xs
                          sm:text-sm

                          text-slate-200

                          ${
                            column.mobileHidden

                              ? "hidden md:table-cell"

                              : ""
                          }
                        `}
                      >

                        {
                          row[
                            column.key
                          ]
                        }

                      </td>
                    )
                  )}

                </motion.tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* ====================================================== */}
      {/* FOOTER */}
      {/* ====================================================== */}
            {/* ====================================================== */}
      {/* FOOTER */}
      {/* ====================================================== */}

      <div
        className="
          mt-5

          flex flex-col
          gap-4

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* ====================================================== */}
        {/* RESULTS */}
        {/* ====================================================== */}

        <p
          className="
            text-sm

            text-slate-400
          "
        >

          Showing{" "}

          <span
            className="
              font-semibold
              text-white
            "
          >

            {(currentPage - 1) *
              rowsPerPage +
              1}

          </span>

          {" "}to{" "}

          <span
            className="
              font-semibold
              text-white
            "
          >

            {Math.min(
              currentPage *
                rowsPerPage,

              sortedData.length
            )}

          </span>

          {" "}of{" "}

          <span
            className="
              font-semibold
              text-white
            "
          >

            {sortedData.length}

          </span>

          {" "}results

        </p>

        {/* ====================================================== */}
        {/* PAGINATION */}
        {/* ====================================================== */}

        <div
          className="
            flex flex-wrap
            items-center
            gap-2
          "
        >

          {/* ====================================================== */}
          {/* ROWS */}
          {/* ====================================================== */}

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
              h-11

              rounded-2xl

              border border-white/10

              bg-[#0f172a]

              px-4

              text-sm
              text-white

              outline-none

              transition-all
              duration-200

              hover:border-white/20

              focus:ring-2
              focus:ring-orange-500
              focus:ring-offset-2
              focus:ring-offset-[#081120]
            "
          >

            <option value={5}>
              5 Rows
            </option>

            <option value={10}>
              10 Rows
            </option>

            <option value={20}>
              20 Rows
            </option>

          </select>

          {/* ====================================================== */}
          {/* PREV */}
          {/* ====================================================== */}

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
              flex h-11
              items-center
              justify-center

              rounded-2xl

              border border-white/10

              bg-[#0f172a]

              px-4

              text-sm
              font-medium

              text-white

              transition-all
              duration-200

              hover:bg-white/[0.06]
              hover:border-white/20

              disabled:cursor-not-allowed
              disabled:opacity-40

              active:scale-[0.98]

              focus:outline-none
              focus:ring-2
              focus:ring-orange-500
              focus:ring-offset-2
              focus:ring-offset-[#081120]
            "
          >

            Prev

          </button>

          {/* ====================================================== */}
          {/* PAGE */}
          {/* ====================================================== */}

          <div
            className="
              flex h-11
              items-center
              justify-center

              rounded-2xl

              border border-white/10

              bg-white/[0.03]

              px-4

              text-sm
              font-semibold

              text-slate-300
            "
          >

            {currentPage}

            <span
              className="
                mx-2

                text-slate-500
              "
            >
              /
            </span>

            {totalPages}

          </div>

          {/* ====================================================== */}
          {/* NEXT */}
          {/* ====================================================== */}

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
              flex h-11
              items-center
              justify-center

              rounded-2xl

              border border-white/10

              bg-[#0f172a]

              px-4

              text-sm
              font-medium

              text-white

              transition-all
              duration-200

              hover:bg-white/[0.06]
              hover:border-white/20

              disabled:cursor-not-allowed
              disabled:opacity-40

              active:scale-[0.98]

              focus:outline-none
              focus:ring-2
              focus:ring-orange-500
              focus:ring-offset-2
              focus:ring-offset-[#081120]
            "
          >

            Next

          </button>

        </div>

      </div>

    </motion.div>
  );
}

export default DataTable;
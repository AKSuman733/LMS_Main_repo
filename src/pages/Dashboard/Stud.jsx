import { useEffect, useMemo, useState } from "react";

import "./Stud.css";

import PageLoader from "../../components/Loader/PageLoader";
import Modal from "../../components/Modal/Modal";
import TablePagination from "../../components/DataTable/TablePagination";

function Stud() {
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    { id: 1, name: "Rishi", course: "MERN Stack", email: "rishi@gmail.com" },
    { id: 2, name: "Guna", course: "Python Full Stack", email: "guna@gmail.com" },
    { id: 3, name: "Kashvika", course: "Java Full Stack", email: "kashvika@gmail.com" },
    { id: 4, name: "Rama", course: "AI", email: "rama@gmail.com" },
    { id: 5, name: "Sri", course: "ML", email: "sri@gmail.com" },
    { id: 6, name: "Hanu", course: "Web Dev", email: "hanu@gmail.com" },
    { id: 7, name: "Dithwej", course: "MERN Stack", email: "dithwej@gmail.com" },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // ---------------- STATES ----------------
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [sortType, setSortType] = useState("id-asc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // ---------------- FILTER + SEARCH + SORT ----------------
  const processedStudents = useMemo(() => {
    let data = [...students];

    // SEARCH
    if (search) {
      data = data.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // FILTER
    if (filterCourse !== "All") {
      data = data.filter((s) => s.course === filterCourse);
    }

    // SORT (DEFAULT = ID ASC)
    data.sort((a, b) => {
      switch (sortType) {
        case "id-asc":
          return a.id - b.id;

        case "id-desc":
          return b.id - a.id;

        case "name-asc":
          return a.name.localeCompare(b.name);

        case "name-desc":
          return b.name.localeCompare(a.name);

        default:
          return a.id - b.id;
      }
    });

    return data;
  }, [search, filterCourse, sortType]);

  // ---------------- PAGINATION ----------------
  const totalPages = Math.ceil(processedStudents.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentStudents = processedStudents.slice(
    indexOfFirst,
    indexOfLast
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const courses = ["All", "MERN Stack", "Python Full Stack", "Java Full Stack", "AI", "ML", "Web Dev"];

  if (loading) return <PageLoader />;

  return (
    <div className="udemy-student-page">

      {/* HEADER */}
      <div className="student-header">
        <h2>Enrollments</h2>
        <p>Professional student management dashboard</p>
      </div>

      {/* TOOLBAR */}
      <div className="toolbar">

        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          value={filterCourse}
          onChange={(e) => {
            setFilterCourse(e.target.value);
            setCurrentPage(1);
          }}
        >
          {courses.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* SORT BUTTONS */}
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="id-asc">ID ↑</option>
          <option value="id-desc">ID ↓</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="table-container">

        <table className="student-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Email</th>
             {/* <th>Action</th> */}
            </tr>
          </thead>

          <tbody>
            {currentStudents.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No Students Found
                </td>
              </tr>
            ) : (
              currentStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td>{student.email}</td>

                  {/* <td>
                    <button
                      className="view-btn"
                      onClick={() => {
                        setSelectedStudent(student);
                        setOpenModal(true);
                      }}
                    >
                      View
                    </button>
                  </td> */}
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* MODAL */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Student Profile"
      >
        {selectedStudent && (
          <div className="modal-box">

            <div className="modal-avatar">
              {selectedStudent.name.charAt(0)}
            </div>

            <h3>{selectedStudent.name}</h3>
            <p>{selectedStudent.course}</p>
            <p>{selectedStudent.email}</p>

          </div>
        )}
      </Modal>

    </div>
  );
}

export default Stud;
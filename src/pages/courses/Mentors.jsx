import { useState } from "react";

import "./Mentors.css";

import TablePagination from "../../components/DataTable/TablePagination";

import mentor1 from "../../assets/mentor1.jpg";
import mentor2 from "../../assets/mentor2.jpg";
import mentor3 from "../../assets/mentor3.jpg";
import mentor4 from "../../assets/mentor4.jpg";
import mentor5 from "../../assets/mentor5.jpg";
import mentor6 from "../../assets/mentor6.jpg";
import mentor7 from "../../assets/mentor7.jpg";
import mentor8 from "../../assets/mentor8.jpg";

function Mentors() {
  const [mentors, setMentors] = useState([
    { id: 1, name: "Ram Charan", image: mentor1 },
    { id: 2, name: "Virat Kohli", image: mentor2 },
    { id: 3, name: "Elon Musk", image: mentor3 },
    { id: 4, name: "Oggy", image: mentor4 },
    { id: 5, name: "Upendra Dwivedi", image: mentor5 },
    { id: 6, name: "Narendra Modi", image: mentor6 },
    { id: 7, name: "PV Sindhu", image: mentor7 },
    { id: 8, name: "Bruce Lee", image: mentor8 },
  ]);

  const [mentorName, setMentorName] = useState("");
  const [mentorImage, setMentorImage] = useState("");

  // ---------------- PAGINATION ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(mentors.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentMentors = mentors.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const addMentor = () => {
    if (!mentorName || !mentorImage) {
      alert("Please fill all fields");
      return;
    }

    const newMentor = {
      id: Date.now(),
      name: mentorName,
      image: mentorImage,
    };

    setMentors((prev) => [...prev, newMentor]);

    setMentorName("");
    setMentorImage("");

    // 🔥 reset to last page so new mentor is visible
    setCurrentPage(Math.ceil((mentors.length + 1) / itemsPerPage));
  };

  return (
    <div className="mentors-page">

      {/* HEADER */}
      <div className="mentors-header">
        <h2>Mentors</h2>
        <p>Learn from industry experts</p>
      </div>

      {/* ADD BOX */}
      <div className="add-mentor-box">

        <input
          type="text"
          placeholder="Mentor name"
          value={mentorName}
          onChange={(e) => setMentorName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={mentorImage}
          onChange={(e) => setMentorImage(e.target.value)}
        />

        <button onClick={addMentor}>
          Add Mentor
        </button>

      </div>

      {/* EMPTY STATE */}
      {mentors.length === 0 ? (
        <div className="empty-state">
          <h2>No Mentors Found</h2>
          <p>Add your first mentor</p>
        </div>
      ) : (
        <>
          {/* GRID */}
          <div className="mentor-grid">

            {currentMentors.map((mentor) => (
              <div className="mentor-card" key={mentor.id}>
                <img src={mentor.image} alt={mentor.name} />
                <h3>{mentor.name}</h3>
              </div>
            ))}

          </div>
        </>
      )}

      {/* PAGINATION */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

    </div>
  );
}

export default Mentors
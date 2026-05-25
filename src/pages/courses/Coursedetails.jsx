import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Coursedetails.css";

import mentor1 from "../../assets/mentor1.jpg";
import mentor2 from "../../assets/mentor2.jpg";
import mentor3 from "../../assets/mentor3.jpg";
import mentor4 from "../../assets/mentor4.jpg";
import mentor5 from "../../assets/mentor5.jpg";
import mentor6 from "../../assets/mentor6.jpg";
import mentor7 from "../../assets/mentor7.jpg";
import mentor8 from "../../assets/mentor8.jpg";

function Coursedetails() {

  const location = useLocation();

  const courseName = location.state?.courseName;
  const coursePrice = location.state?.coursePrice;

  const [enrolled, setEnrolled] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const mentors = [
    { id: 1, name: "Ram Charan", image: mentor1 },
    { id: 2, name: "Virat Kohli", image: mentor2 },
    { id: 3, name: "Elon Musk", image: mentor3 },
    { id: 4, name: "Oggy", image: mentor4 },
    { id: 5, name: "Upendra Dwivedi", image: mentor5 },
    { id: 6, name: "Narendra Modi", image: mentor6 },
    { id: 7, name: "PV Sindhu", image: mentor7 },
    { id: 8, name: "Bruce Lee", image: mentor8 },
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myCourses")) || [];
    const exists = saved.find((c) => c.name === courseName);

    if (exists) {
      setEnrolled(true);
      setSelectedMentor(exists.mentor || null);
    }
  }, [courseName]);

  const handleEnroll = () => {
    if (!courseName) return;

    const saved = JSON.parse(localStorage.getItem("myCourses")) || [];

    const alreadyExists = saved.find((c) => c.name === courseName);
    if (alreadyExists) {
      setEnrolled(true);
      return;
    }

    const newCourse = {
      name: courseName,
      price: coursePrice,
      mentor: selectedMentor,
    };

    localStorage.setItem(
      "myCourses",
      JSON.stringify([...saved, newCourse])
    );

    setEnrolled(true);
  };

  const handleSelectMentor = (mentor) => {
    setSelectedMentor(mentor.name);
  };

  return (
    <div className="course-page">

      <button
        className={enrolled ? "enrolled-btn" : "enroll-btn"}
        onClick={handleEnroll}
      >
        {enrolled ? "Enrolled" : "Enroll Now"}
      </button>

      {enrolled && (
        <div className="enrolled-course">
          <h2>Enrolled Course</h2>
          <p>{courseName}</p>
          <p>Mentor: {selectedMentor || "Not Selected"}</p>
        </div>
      )}

      {enrolled && (
        <>
          <h2>Select Your Mentor</h2>

          <div className="mentor-container">

            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className={`mentor-card ${
                  selectedMentor === mentor.name ? "active" : ""
                }`}
              >

                <img src={mentor.image} alt={mentor.name} />
                <h3>{mentor.name}</h3>

                <button onClick={() => handleSelectMentor(mentor)}>
                  {selectedMentor === mentor.name ? "Selected" : "Select"}
                </button>

              </div>
            ))}

          </div>
        </>
      )}

      {selectedMentor && (
        <div className="selected-box">
          <h2>Selected Mentor</h2>
          <p>{selectedMentor}</p>
        </div>
      )}

    </div>
  );
}

export default Coursedetails;


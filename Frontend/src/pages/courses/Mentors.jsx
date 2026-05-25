import { useState } from "react";
import "./Mentors.css";

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
    {
      id: 1,
      name: "Ram Charan",
      image: mentor1,
    },

    {
      id: 2,
      name: "Virat Kohli",
      image: mentor2,
    },

    {
      id: 3,
      name: "Elon Musk",
      image: mentor3,
    },

    {
      id: 4,
      name: "Oggy",
      image: mentor4,
    },

    {
      id: 5,
      name: "Upendra Dwivedi",
      image: mentor5,
    },

    {
      id: 6,
      name: "Narendra Modi",
      image: mentor6,
    },

    {
      id: 7,
      name: "PV Sindhu",
      image: mentor7,
    },

    {
      id: 8,
      name: "Bruce Lee",
      image: mentor8,
    },
  ]);

  const [mentorName, setMentorName] = useState("");
  const [mentorImage, setMentorImage] = useState("");

  const addMentor = () => {

    if (mentorName === "" || mentorImage === "") {
      alert("Please fill all fields");
      return;
    }

    const newMentor = {
      id: mentors.length + 1,
      name: mentorName,
      image: mentorImage,
    };

    setMentors([...mentors, newMentor]);

    setMentorName("");
    setMentorImage("");
  };

  return (

    <div className="mentor-page">

      <h1>All Mentors</h1>

      {/* Add Mentor Section */}
      <div className="add-mentor-box">

        <input
          type="text"
          placeholder="Enter mentor name"
          value={mentorName}
          onChange={(e) => setMentorName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Paste image URL"
          value={mentorImage}
          onChange={(e) => setMentorImage(e.target.value)}
        />

        <button onClick={addMentor}>
          Add Mentor
        </button>

      </div>

      <div className="mentor-container">

        {mentors.map((mentor) => (

          <div
            className="mentor-card"
            key={mentor.id}
          >

            <img
              src={mentor.image}
              alt={mentor.name}
            />

            <h3>{mentor.name}</h3>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Mentors;
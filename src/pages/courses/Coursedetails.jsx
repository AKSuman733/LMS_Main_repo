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

  const courseName =
    location.state?.courseName ||
    "Python Programming";

  // COURSE DATA
  const courseContent = {

    "Python Programming": {
      price: "Free",
      description:
        "Learn Python programming from basics.",
      topics: [
        "Introduction",
        "Variables",
        "Loops",
        "Functions",
        "Projects",
      ],
      video:
        "https://www.w3schools.com/html/mov_bbb.mp4",
    },

    "Data Science using Python": {
      price: "₹499",
      description:
        "Learn Data Science with Python.",
      topics: [
        "NumPy",
        "Pandas",
        "Visualization",
        "ML Basics",
        "Projects",
      ],
      video:
        "https://www.w3schools.com/html/movie.mp4",
    },

    "Java": {
      price: "₹299",
      description:
        "Learn Java and OOP concepts.",
      topics: [
        "Java Basics",
        "Methods",
        "Collections",
        "OOP",
        "Projects",
      ],
      video:
        "https://www.w3schools.com/html/mov_bbb.mp4",
    },

    "MERN Stack": {
      price: "₹999",
      description:
        "Become a MERN Full Stack Developer.",
      topics: [
        "HTML",
        "CSS",
        "React",
        "Node",
        "MongoDB",
      ],
      video:
        "https://www.w3schools.com/html/movie.mp4",
    },

    "Web Development": {
      price: "Free",
      description:
        "Learn frontend and backend.",
      topics: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Deployment",
      ],
      video:
        "https://www.w3schools.com/html/mov_bbb.mp4",
    },

    "Artificial Intelligence": {
      price: "₹799",
      description:
        "Learn Artificial Intelligence.",
      topics: [
        "AI Basics",
        "NLP",
        "Neural Networks",
        "Vision",
        "Projects",
      ],
      video:
        "https://www.w3schools.com/html/movie.mp4",
    },

    "Machine Learning": {
      price: "₹899",
      description:
        "Learn Machine Learning models.",
      topics: [
        "Regression",
        "Classification",
        "Training",
        "Evaluation",
        "Projects",
      ],
      video:
        "https://www.w3schools.com/html/mov_bbb.mp4",
    },

    "Deep Learning": {
      price: "₹999",
      description:
        "Learn Deep Learning concepts.",
      topics: [
        "ANN",
        "CNN",
        "RNN",
        "TensorFlow",
        "Projects",
      ],
      video:
        "https://www.w3schools.com/html/movie.mp4",
    },

    "Data Visualization": {
      price: "Free",
      description:
        "Learn dashboards and charts.",
      topics: [
        "Matplotlib",
        "Seaborn",
        "Power BI",
        "Tableau",
        "Dashboards",
      ],
      video:
        "https://www.w3schools.com/html/mov_bbb.mp4",
    },

    "Devops": {
      price: "₹599",
      description:
        "Learn DevOps tools.",
      topics: [
        "Linux",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "AWS",
      ],
      video:
        "https://www.w3schools.com/html/movie.mp4",
    },

  };

  const currentCourse =
    courseContent[courseName];

  // STATES
  const [enrolled, setEnrolled] =
    useState(false);

  const [selectedMentor, setSelectedMentor] =
    useState("");

  const [completedTopics, setCompletedTopics] =
    useState([]);

  const [progress, setProgress] =
    useState(0);

  // MENTORS
  const mentors = [
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
  ];

  // LOAD SAVED DATA
  useEffect(() => {

    const savedCourses =
      JSON.parse(
        localStorage.getItem("myCourses")
      ) || [];

    const existingCourse =
      savedCourses.find(
        (course) =>
          course.name === courseName
      );

    if (existingCourse) {

      setEnrolled(true);

    }

    const savedData =
      JSON.parse(
        localStorage.getItem(courseName)
      );

    if (savedData) {

      setSelectedMentor(
        savedData.mentor || ""
      );

      setCompletedTopics(
        savedData.completedTopics || []
      );

    }

  }, [courseName]);

  // UPDATE PROGRESS
  useEffect(() => {

    const totalTopics =
      currentCourse.topics.length;

    const completed =
      completedTopics.length;

    const progressValue =
      Math.floor(
        (completed / totalTopics) * 100
      );

    setProgress(progressValue);

    localStorage.setItem(
      courseName,
      JSON.stringify({
        mentor: selectedMentor,
        completedTopics,
      })
    );

  }, [
    completedTopics,
    selectedMentor,
    courseName,
    currentCourse.topics.length,
  ]);

  // ENROLL
  const handleEnroll = () => {

    setEnrolled(true);

    const savedCourses =
      JSON.parse(
        localStorage.getItem("myCourses")
      ) || [];

    const alreadyExists =
      savedCourses.find(
        (course) =>
          course.name === courseName
      );

    if (!alreadyExists) {

      const newCourse = {
        name: courseName,
        price: currentCourse.price,
        topics: currentCourse.topics,
        video: currentCourse.video,
      };

      localStorage.setItem(
        "myCourses",
        JSON.stringify([
          ...savedCourses,
          newCourse,
        ])
      );

    }

  };

  // SELECT MENTOR
  const handleSelectMentor = (
    mentorName
  ) => {

    setSelectedMentor(mentorName);

  };

  // CHECKBOX
  const handleCheckbox = (topic) => {

    if (
      completedTopics.includes(topic)
    ) {

      setCompletedTopics(
        completedTopics.filter(
          (item) => item !== topic
        )
      );

    } else {

      setCompletedTopics([
        ...completedTopics,
        topic,
      ]);

    }

  };

  return (

    <div className="course-page">

      {/* COURSE BOX */}
      <div className="course-box">

        <h1>{courseName}</h1>

        <h3>{currentCourse.price}</h3>

        <p>
          {currentCourse.description}
        </p>

        <button
          className={
            enrolled
              ? "enrolled-btn"
              : "enroll-btn"
          }
          onClick={handleEnroll}
        >
          {enrolled
            ? "Enrolled"
            : "Enroll Now"}
        </button>

      </div>

      {/* AFTER ENROLL */}
      {enrolled && (

        <>
            {/* VIDEO */}
          <div className="video-section">

            <h2>
              Course Video
            </h2>

            <video
              controls
              className="course-video"
            >

              <source
                src={currentCourse.video}
                type="video/mp4"
              />

            </video>

          </div>

           {/* PROGRESS */}
          <div className="progress-section">

            <h2>
              Course Progress
            </h2>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              ></div>

            </div>

            <h3>
              {progress}% Completed
            </h3>

          </div>

          {/* COURSE CONTENT */}
          <div className="enrolled-course">

            <h2>
              Course Content
            </h2>

            {currentCourse.topics.map(
              (topic, index) => (

                <div
                  key={index}
                  className="concept-item"
                >

                  <input
                    type="checkbox"
                    checked={completedTopics.includes(
                      topic
                    )}
                    onChange={() =>
                      handleCheckbox(topic)
                    }
                  />

                  <label>
                    {topic}
                  </label>

                </div>
              )
            )}

          </div>

          {/* MENTORS */}
          <h2 className="mentor-title">
            Select Your Mentor
          </h2>

          <div className="mentor-container">

            {mentors.map((mentor) => (

              <div
                key={mentor.id}
                className={
                  selectedMentor === mentor.name
                    ? "mentor-card active"
                    : "mentor-card"
                }
              >

                <img
                  src={mentor.image}
                  alt={mentor.name}
                />

                <h3>{mentor.name}</h3>

                <button
                  onClick={() =>
                    handleSelectMentor(
                      mentor.name
                    )
                  }
                >
                  {selectedMentor === mentor.name
                    ? "Selected"
                    : "Select"}
                </button>

              </div>
            ))}

          </div>

          {/* SELECTED MENTOR */}
          {selectedMentor && (

            <div className="selected-mentor-box">

              <h2>
                Selected Mentor
              </h2>

              <p>
                {selectedMentor}
              </p>

            </div>

          )}


        </>
      )}

    </div>
  );
}

export default Coursedetails;
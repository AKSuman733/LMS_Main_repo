import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Mycourses.css";
import { colors } from "../../styles/designtokens";

function Mycourses() {

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const savedCourses =
      JSON.parse(localStorage.getItem("myCourses")) || [];

    setCourses(savedCourses);
  }, []);

  const removeCourse = (courseName) => {

    const updatedCourses = courses.filter(
      (c) => c.name !== courseName
    );

    localStorage.setItem(
      "myCourses",
      JSON.stringify(updatedCourses)
    );

    localStorage.removeItem(courseName);

    setCourses(updatedCourses);
  };

  return (
    <div className="mycourses-page">

      {/* HEADER */}
      <div className="mycourses-header">

        <h1 style={{color:colors.white,textAlign:"center"}}>My Courses</h1>

        <p>Continue your enrolled courses</p>

      </div>

      {/* EMPTY STATE */}
      {courses.length === 0 ? (
        <div className="empty-state">

          <h2>No Courses Enrolled</h2>

          <p>Start learning by enrolling in a course</p>

          <button onClick={() => navigate("/course")}>
            Browse Courses
          </button>

        </div>
      ) : (

        <div className="mycourses-grid">

          {courses.map((course, index) => {

            const savedProgress =
              JSON.parse(localStorage.getItem(course.name)) || {};

            const completedTopics =
              savedProgress.completedTopics || [];

            const totalTopics =
              course.topics ? course.topics.length : 10;

            const progress =
              Math.floor(
                (completedTopics.length / totalTopics) * 100
              );

            return (

              <div className="mycourse-card" key={index}>

                {/* TITLE */}
                <h2>{course.name}</h2>

                {/* PRICE */}
                <span className="price">
                  {course.price}
                </span>

                {/* STATUS */}
                <span className="status">
                  Enrolled
                </span>

                {/* PROGRESS */}
                <div className="progress-section">

                  <div className="progress-header">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                </div>

                {/* BUTTONS */}
                <div className="actions">

                  <button
                    className="view-btn"
                    onClick={() =>
                      navigate("/coursedetails", {
                        state: { courseName: course.name },
                      })
                    }
                  >
                    Continue Learning
                  </button>
                    <button
                    className="challenges" onClick={()=>
                      navigate("/Challenges")
                    }>
                      Challenges

                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => removeCourse(course.name)}
                  >
                    Remove
                  </button>
                 

                </div>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
}

export default Mycourses;
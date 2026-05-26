import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import "./Mycourses.css";

function Mycourses() {

  const navigate = useNavigate();

  const [courses, setCourses] =
    useState([]);

  useEffect(() => {

   const savedCourses =
      JSON.parse(
        localStorage.getItem("myCourses")
      ) || [];

    setCourses(savedCourses);

  }, []);

  return (

    <div className="mycourses-container">

      <h1>
        My Courses
      </h1>

      {courses.length === 0 ? (

        <p className="empty-text">
          No enrolled courses found.
        </p>

      ) : (

        <div className="course-list">

          {courses.map(
            (course, index) => {

              const savedProgress =
                JSON.parse(
                  localStorage.getItem(
                    course.name
                  )
                ) || {};

              const completedTopics =
                savedProgress.completedTopics || [];

              const selectedMentor =
                savedProgress.mentor || "Not Selected";

              const totalTopics =
                course.topics
                  ? course.topics.length
                  : 0;

              const progress =
                totalTopics > 0
                  ? Math.floor(
                      (completedTopics.length /
                        totalTopics) *
                        100
                    )
                  : 0;

              return (

                <div
                  key={index}
                  className="enrolled-card"
                >

                  {/* COURSE NAME */}
                  <h2>
                    {course.name}
                  </h2>

                  {/* PRICE */}
                  <p className="course-price">
                    {course.price}
                  </p>

                  {/* ENROLLED */}
                  <p className="enrolled-text">
                    Enrolled
                  </p>


                  
                  {/* BUTTON */}
                  <button
                    className="details-btn"
                    onClick={() =>
                      navigate(
                        "/coursedetails",
                        {
                          state: {
                            courseName:
                              course.name,
                          },
                        }
                      )
                    }
                  >
                    View Full Details
                  </button>
                  <button
                   className="disenroll-btn"
                   onClick={() => {

                  const updatedCourses =
                   courses.filter(
                   (item) =>
                    item.name !== course.name
                   );

                 localStorage.setItem(
                "myCourses",
                 JSON.stringify(updatedCourses)
                );

                localStorage.removeItem(
                 course.name
                );

                 setCourses(updatedCourses);

                }}
                >
                 Dis enroll
                </button>
                  {/* PROGRESS */}
                  <div className="progress-section">

                    <h3>
                      Course Progress
                    </h3>

                    <div className="progress-bar">

                      <div
                        className="progress-fill"
                        style={{
                          width: `${progress}%`,
                        }}
                      ></div>

                    </div>

                    <p className="progress-text">
                      {progress}% Completed
                    </p>

                  </div>

                </div>
              );
            }
          )}

        </div>

      )}

    </div>
  );
}

export default Mycourses;
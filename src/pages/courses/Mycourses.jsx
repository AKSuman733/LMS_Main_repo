import { useEffect, useState } from "react";
import "./Mycourses.css";

function Mycourses() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {

    const savedCourses =
      JSON.parse(localStorage.getItem("myCourses")) || [];

    const validCourses = savedCourses.filter(
      (course) => course && course.name && course.name.trim() !== ""
    );

    setCourses(validCourses);

  }, []);

  return (
    <div className="mycourses-container">

      <h1>My Courses</h1>

      {courses.length === 0 ? (
        <p>No enrolled courses yet.</p>
      ) : (
        <div className="course-list">

          {courses.map((course, index) => (
            <div className="enrolled-card" key={index}>

              <h3>{course.name}</h3>

              {course.price && (
                <p>
                  Price:{" "}
                  <b style={{
                    color: course.price === "Free" ? "green" : "black"
                  }}>
                    {course.price}
                  </b>
                </p>
              )}

              <p className="success-text">
                You have successfully enrolled in this course.
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Mycourses;
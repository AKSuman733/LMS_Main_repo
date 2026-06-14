// import { useMemo, useState } from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Course.css";

import pythonImg from "../../assets/python.jpg";
import dataScienceImg from "../../assets/datascience.jpg";
import javaImg from "../../assets/java.jpg";
import MernstackImg from "../../assets/mernstack.jpg";
import webdevelopmentImg from "../../assets/webdevelopment.jpg";
import AIImg from "../../assets/ai.jpg";
import machinelearningImg from "../../assets/machinelearning.jpg";
import deeplearningImg from "../../assets/deeplearning.jpg";
import datavisualizationImg from "../../assets/datavisualization.jpg";
import devopsImg from "../../assets/devops.jpg";

function Course() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
 

  const itemsPerPage = 8;

  const courses = [
    { name: "Python Programming", img: pythonImg, price: "Free", level: "Beginner", duration: "6 Weeks" },
    { name: "Data Science using Python", img: dataScienceImg, price: "₹499", level: "Intermediate", duration: "8 Weeks" },
    { name: "Java", img: javaImg, price: "₹299", level: "Beginner", duration: "5 Weeks" },
    { name: "MERN Stack", img: MernstackImg, price: "₹999", level: "Advanced", duration: "12 Weeks" },
    { name: "Web Development", img: webdevelopmentImg, price: "Free", level: "Beginner", duration: "7 Weeks" },
    { name: "Artificial Intelligence", img: AIImg, price: "₹799", level: "Advanced", duration: "10 Weeks" },
    { name: "Machine Learning", img: machinelearningImg, price: "₹899", level: "Advanced", duration: "9 Weeks" },
    { name: "Deep Learning", img: deeplearningImg, price: "₹999", level: "Advanced", duration: "10 Weeks" },
    { name: "Data Visualization", img: datavisualizationImg, price: "Free", level: "Intermediate", duration: "4 Weeks" },
    { name: "DevOps", img: devopsImg, price: "₹599", level: "Intermediate", duration: "8 Weeks" },
  ];

  const filteredCourses = useMemo(() => {
    let data = [...courses];

    if (search) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (levelFilter !== "All") {
      data = data.filter((c) => c.level === levelFilter);
    }

    if (priceFilter !== "All") {
      if (priceFilter === "Free") {
        data = data.filter((c) => c.price === "Free");
      } else {
        data = data.filter((c) => c.price !== "Free");
      }
    }

    return data;
  }, [search, levelFilter, priceFilter]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



 // const [refreshKey, setRefreshKey] = useState(0);

useEffect(() => {
  const navEntries = performance.getEntriesByType("navigation");

  if (navEntries[0]?.type === "reload") {
    sessionStorage.clear();
  }
}, []);



  return (
    <div className="course-page">

      {/* HEADER */}
      <div className="course-header">
        <h1>Explore Courses</h1>
        <p>Learn in-demand skills and upgrade your career</p>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="filters">

        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          value={levelFilter}
          onChange={(e) => {
            setLevelFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <select
          value={priceFilter}
          onChange={(e) => {
            setPriceFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Prices</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>

      </div>

      {/* GRID */}
      <div className="course-grid">

        {currentCourses.length > 0 ? (
          currentCourses.map((course, index) => (
            <div className="course-card" key={index}>

              <img src={course.img} alt={course.name} />

              <div className="course-info">

                <h3>{course.name}</h3>
                <p>{course.level}</p>
                <p>{course.duration}</p>

                {/* <button
                  className="enroll-btn"
                  onClick={() =>
                    navigate("/Coursedetails", {
                      state: {
                        courseName: course.name,
                        coursePrice: course.price,
                      },
                    })
                  }
                >
                  Enroll Now
                </button> */}
                {/* <button
  className="enroll-btn"
  disabled={enrolledCourses.includes(course.name)}
  onClick={() => {
    setEnrolledCourses([...enrolledCourses, course.name]);

    navigate("/Coursedetails", {
      state: {
        courseName: course.name,
        coursePrice: course.price,
      },
    });
  }}
>
  {enrolledCourses.includes(course.name)
    ? "Enrolled"
    : "Enroll Now"}
</button> */}

<button
  className="enroll-btn"
  onClick={() => {
    sessionStorage.setItem(
      course.name,
      "enrolled"
    );

    navigate("/Coursedetails", {
      state: {
        courseName: course.name,
        coursePrice: course.price,
      },
    });
  }}
>
  {sessionStorage.getItem(course.name) === "enrolled"
    ? "Enrolled"
    : "Enroll Now"}
</button>



              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No courses found</div>
        )}

      </div>

      {/* PAGINATION */}
      <div className="pagination">

        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default Course;
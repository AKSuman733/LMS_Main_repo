import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Course.css";
import {
  colors,
  spacing,
  typography
} from "../../styles/designtokens"; 

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

  const [search, setSearch] = useState("");

  const courses = [
    { name: "Python Programming", img: pythonImg, price: "Free" },
    { name: "Data Science using Python", img: dataScienceImg, price: "₹499" },
    { name: "Java", img: javaImg, price: "₹299" },
    { name: "MERN Stack", img: MernstackImg, price: "₹999" },
    { name: "Web Development", img: webdevelopmentImg, price: "Free" },
    { name: "Artificial Intelligence", img: AIImg, price: "₹799" },
    { name: "Machine Learning", img: machinelearningImg, price: "₹899" },
    { name: "Deep Learning", img: deeplearningImg, price: "₹999" },
    { name: "Data Visualization", img: datavisualizationImg, price: "Free" },
    { name: "Devops", img: devopsImg, price: "₹599" },
  ];

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page"
      style={{
          backgroundColor: colors.gray200,
          minHeight: "100vh",
          padding: spacing.lg,
        }}
        >

      <button className="top-btn">
        Courses
      </button>

      {/* SEARCH */}
      <div className="search-box">

        <label   style={{
          paddingLeft:300,
        
        }}
        >
          Search </label>

        <input
          type="text"
          placeholder="Search Courses"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* COURSE LIST */}
      <div className="course-wrapper">

        {filteredCourses.length > 0 ? (

          filteredCourses.map((course, index) => (

            <div className="container" key={index}>

              <img src={course.img} alt={course.name} />

              <h4>{course.name}</h4>

              <p className={course.price === "Free" ? "free" : "price"}>
                {course.price}
              </p>

              <button
                className="enroll"
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
              </button>

            </div>

          ))

        ) : (

          <h3 className="no-course">
            No Courses Found
          </h3>

        )}

      </div>

    </div>
  );
}

export default Course;
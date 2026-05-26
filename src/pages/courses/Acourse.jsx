import { useState } from "react";
import "./Acourse.css";
import {
  colors,
  spacing,
  typography,
  shadows,
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


function Acourse() {

  const [courses, setCourses] = useState([
    { id: 1, title: "Python Programming", image: pythonImg },
    { id: 2, title: "Data Science using Python", image: dataScienceImg },
    { id: 3, title: "Java", image: javaImg },
    { id: 4, title: "MERN Stack", image: MernstackImg },
    { id: 5, title: "Web Development", image: webdevelopmentImg },
    { id: 6, title: "Artificial Intelligence", image: AIImg },
    { id: 7, title: "Machine Learning", image: machinelearningImg },
    { id: 8, title: "Deep Learning", image: deeplearningImg },
    { id: 9, title: "Data Visualization", image: datavisualizationImg },
    { id: 10, title: "DevOps", image: devopsImg },
  ]);

  const [myCourses, setMyCourses] = useState([]);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState(null);

  // ADD / UPDATE COURSE
  const handleAddOrUpdate = () => {

    if (!title || !image) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      // EDIT
      setCourses(
        courses.map((c) =>
          c.id === editId ? { ...c, title, image } : c
        )
      );
      setEditId(null);
    } else {
      // ADD
      const newCourse = {
        id: Date.now(),
        title,
        image,
      };
      setCourses([...courses, newCourse]);
    }

    setTitle("");
    setImage("");
  };

  // DELETE COURSE
  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  // EDIT COURSE (fill inputs)
  const editCourse = (course) => {
    setTitle(course.title);
    setImage(course.image);
    setEditId(course.id);
  };

  // ENROLL → MOVE TO MY COURSES
  const enrollCourse = (course) => {
    setMyCourses([...myCourses, course]);
    setCourses(courses.filter((c) => c.id !== course.id));
  };

  return (
    <div className="page" style={{
      backgroundColor:colors.gray200,
    }}>

      <h2>Courses</h2>

      {/* ADD / EDIT SECTION */}
      <div className="add-course-box">

        <input
          type="text"
          placeholder="Course name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button onClick={handleAddOrUpdate}>
          {editId ? "Update Course" : "Add Course"}
        </button>

      </div>

      {/* COURSE LIST */}
      <div className="course-container">

        {courses.map((course) => (
          <div className="containercourse" key={course.id}  
          style={{backgroundColor:colors.white}}
          >

            <img src={course.image} alt={course.title} />
            <h4>{course.title}</h4>

          {/*  <button onClick={() => enrollCourse(course)}>
              Enroll
            </button>
            */}
            

            <button onClick={() => editCourse(course)}>
              Edit
            </button>

            <button onClick={() => deleteCourse(course.id)}>
              Delete
            </button>

          </div>
        ))}

      </div>
     
    </div>
  );
}

export default Acourse;   



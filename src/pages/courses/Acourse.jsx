import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Acourse.css";

import CourseForm from "../../components/CourseForm/CourseForm";
import EmptyState from "../../components/EmptyState/EmptyState";
import PageLoader from "../../components/Loader/PageLoader";
import Modal from "../../components/Modal/Modal";
import TablePagination from "../../components/DataTable/TablePagination";

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

import { colors } from "../../styles/designtokens";

function Acourse() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [courses, setCourses] = useState([
    { id: 1, title: "Python Programming", image: pythonImg, price: "Free", level: "Beginner", duration: "6 Weeks" },
    { id: 2, title: "Data Science using Python", image: dataScienceImg, price: "₹499", level: "Intermediate", duration: "8 Weeks" },
    { id: 3, title: "Java", image: javaImg, price: "₹299", level: "Beginner", duration: "5 Weeks" },
    { id: 4, title: "MERN Stack", image: MernstackImg, price: "₹999", level: "Advanced", duration: "12 Weeks" },
    { id: 5, title: "Web Development", image: webdevelopmentImg, price: "Free", level: "Beginner", duration: "7 Weeks" },
    { id: 6, title: "Artificial Intelligence", image: AIImg, price: "₹799", level: "Advanced", duration: "10 Weeks" },
    { id: 7, title: "Machine Learning", image: machinelearningImg, price: "₹899", level: "Advanced", duration: "9 Weeks" },
    { id: 8, title: "Deep Learning", image: deeplearningImg, price: "₹999", level: "Advanced", duration: "10 Weeks" },
    { id: 9, title: "Data Visualization", image: datavisualizationImg, price: "Free", level: "Intermediate", duration: "4 Weeks" },
    { id: 10, title: "DevOps", image: devopsImg, price: "₹599", level: "Intermediate", duration: "8 Weeks" },
  ]);

  // FORM STATES
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const clearForm = () => {
    setTitle("");
    setImage("");
    setVideoUrl("");
    setPrice("");
    setCategory("");
    setDuration("");
    setLevel("");
    setDescription("");
    setEditId(null);
  };

  const handleAddOrUpdate = () => {
    if (!title || !image || !price) {
      alert("Please fill required fields");
      return;
    }

    const newCourse = {
      id: editId || Date.now(),
      title,
      image,
      videoUrl,
      price,
      category,
      duration,
      level,
      description,
    };

    if (editId) {
      setCourses((prev) =>
        prev.map((c) => (c.id === editId ? newCourse : c))
      );
    } else {
      setCourses((prev) => [...prev, newCourse]);
    }

    clearForm();
    setOpenModal(false);
  };

  const editCourse = (course) => {
    setTitle(course.title || "");
    setImage(course.image || "");
    setVideoUrl(course.videoUrl || "");
    setPrice(course.price || "");
    setCategory(course.category || "");
    setDuration(course.duration || "");
    setLevel(course.level || "");
    setDescription(course.description || "");

    setEditId(course.id);
    setOpenModal(true);
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirst, indexOfLast);

  if (loading) return <PageLoader />;

  return (
    <div className="udemy-course-page">

      <div className="course-header">
        <h2 style={{ color: colors.white }}>Courses</h2>
        <p>Learn, manage and grow your skills</p>

        <button
          className="add-btn"
          onClick={() => {
            clearForm();
            setOpenModal(true);
          }}
        >
          + Add Course
        </button>
      </div>

      {courses.length === 0 ? (
        <EmptyState title="No Courses" message="Add your first course" />
      ) : (
        <div className="course-grid">
          {currentCourses.map((course) => (
            <div className="course-card" key={course.id}>
              <img src={course.image} alt={course.title} />

              <div className="course-info">
                <h4>{course.title}</h4>
                <p>{course.price}</p>

                <div className="actions">
                  <button onClick={() => editCourse(course)}>Edit</button>
                  <button  onClick={() =>
                      navigate(`/Coursedetails`)}>
                    View
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteCourse(course.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="manage-btn"
                    onClick={() =>
                      navigate(`/manage-challenges/${course.id}`)
                    }
                  >
                    Manage Challenges
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* ADD / EDIT MODAL */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={editId ? "Edit Course" : "Add Course"}
      >
        <CourseForm
          title={title}
          setTitle={setTitle}
          image={image}
          setImage={setImage}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          price={price}
          setPrice={setPrice}
          category={category}
          setCategory={setCategory}
          duration={duration}
          setDuration={setDuration}
          level={level}
          setLevel={setLevel}
          description={description}
          setDescription={setDescription}
          handleSubmit={handleAddOrUpdate}
          editId={editId}
          onClose={() => setOpenModal(false)}
        />
      </Modal>

      {/* VIEW MODAL */}
      <Modal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        title="Course Details"
      >
        {selectedCourse && (
          <div>
            <img src={selectedCourse.image} width="100%" />
            <h2>{selectedCourse.title}</h2>
            <p>{selectedCourse.price}</p>
            <p>{selectedCourse.description}</p>

            {selectedCourse.videoUrl && (
              <video width="100%" controls src={selectedCourse.videoUrl} />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Acourse;
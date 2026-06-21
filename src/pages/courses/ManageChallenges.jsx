import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ManageChallenges.css";

function ManageChallenges() {
  const { courseId } = useParams();

  const [courses, setCourses] = useState([]);
  const [challenges, setChallenges] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Easy");

  // Load data
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const storedChallenges =
      JSON.parse(localStorage.getItem("challenges")) || [];

    setCourses(storedCourses);
    setChallenges(storedChallenges);
  }, []);

  const selectedCourse = courses.find(
    (c) => c.id === Number(courseId)
  );

  // Add challenge
  const addChallenge = () => {
    if (!title.trim()) return alert("Enter task title");

    const newTask = {
      id: Date.now(),
      courseId: Number(courseId),
      title,
      description,
      level,
      createdAt: new Date().toISOString(),
    };

    const updated = [...challenges, newTask];

    setChallenges(updated);
    localStorage.setItem("challenges", JSON.stringify(updated));

    setTitle("");
    setDescription("");
    setLevel("Easy");
  };

  // Delete
  const deleteChallenge = (id) => {
    const updated = challenges.filter((c) => c.id !== id);
    setChallenges(updated);
    localStorage.setItem("challenges", JSON.stringify(updated));
  };

  const courseChallenges = challenges.filter(
    (c) => c.courseId === Number(courseId)
  );

  return (
    <div className="mc-page">

      {/* HEADER */}
      <div className="mc-header">
        <div>
          <h1>Challenge Management</h1>
          <p>
            {selectedCourse
              ? selectedCourse.title
              : "Loading course..."}
          </p>
        </div>

        <div className="mc-badge">Course #{courseId}</div>
      </div>

      {/* STATS */}
      <div className="mc-stats">
        <div className="mc-card">
          <h3>{courseChallenges.length}</h3>
          <p>Total Tasks</p>
        </div>

        <div className="mc-card">
          <h3>
            {
              courseChallenges.filter((t) => t.level === "easy")
                .length
            }
          </h3>
          <p>Easy</p>
        </div>

        <div className="mc-card">
          <h3>
            {
              courseChallenges.filter((t) => t.level === "medium")
                .length
            }
          </h3>
          <p>Medium</p>
        </div>

        <div className="mc-card">
          <h3>
            {
              courseChallenges.filter((t) => t.level === "hard")
                .length
            }
          </h3>
          <p>Hard</p>
        </div>
      </div>

      {/* FORM */}
      <div className="mc-form">

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          rows="4"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <button onClick={addChallenge}>
          + Assign Task
        </button>
      </div>

      {/* LIST */}
      <div className="mc-list">

        {courseChallenges.length === 0 ? (
          <div className="mc-empty">
            No tasks assigned yet 🚀
          </div>
        ) : (
          courseChallenges.map((task) => (
            <div key={task.id} className="mc-item">

              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <div className={`badge ${task.level}`}>
                  {task.level}
                </div>

                <small>
                  {new Date(task.createdAt).toLocaleDateString()}
                </small>
              </div>

              <button
                className="delete"
                onClick={() => deleteChallenge(task.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default ManageChallenges;
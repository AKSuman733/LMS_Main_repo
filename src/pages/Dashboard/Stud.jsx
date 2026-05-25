import "./Stud.css";

function Stud() {

  const students = [
    {
      id: 1,
      name: "Rishi",
      course: "MERN Stack",
      email: "rishi@gmail.com",
    },
    {
      id: 2,
      name: "Guna",
      course: "Python Full Stack",
      email: "guna@gmail.com",
    },
    {
      id: 3,
      name: "Kashvika",
      course: "Java Full Stack",
      email: "kashvika@gmail.com",
    },
     {
      id: 4,
      name: "Rama",
      course: "Artificial Intelligence",
      email: "rama@gmail.com",
    },
     {
      id: 5,
      name: "Sri",
      course: "Machine Learning",
      email: "sri@gmail.com",
    },
     {
      id: 6,
      name: "Hanu",
      course: "Web development",
      email: "hanu@gmail.com",
    },
     {
      id: 7,
      name: "Dithwej",
      course: "Mern stack",
      email: "dithwej@gmail.com",
    },
  ];

  return (
    <div className="student-section">

      <h2>Student Details</h2>

      <div className="student-list">

        {students.map((student) => (
          <div
            className="student-card"
            key={student.id}
          >

            <h3>{student.name}</h3>
            <p>
              <strong>Course:</strong> {student.course}<br></br>
              <strong>Email:</strong> {student.email}
            </p>
            <label className="enrolled">Enrolled</label>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Stud; 
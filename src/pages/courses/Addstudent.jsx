import { useState } from "react";

function Addstudent() {
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [phone, setPhone] = useState("");

  const [students, setStudents] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !studentName.trim() ||
      !email.trim() ||
      !course.trim() ||
      !phone.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    const newStudent = {
      id: Date.now(),
      studentName,
      email,
      course,
      phone,
    };

    setStudents((prev) => [...prev, newStudent]);

    setStudentName("");
    setEmail("");
    setCourse("");
    setPhone("");
  };

  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      <h1>Add New Student</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "12px",
          maxWidth: "500px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit">
          Add Student
        </button>
      </form>

      <div style={{ marginTop: "40px" }}>
        <h2>Added Students ({students.length})</h2>

        {students.length === 0 ? (
          <p>No students added yet.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                  }}
                >
                  S.No
                </th>

                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                  }}
                >
                  Student Name
                </th>

                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                  }}
                >
                  Email
                </th>

                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                  }}
                >
                  Course
                </th>

                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                  }}
                >
                  Phone
                </th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => (
                <tr key={student.id}>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "12px",
                    }}
                  >
                    {index + 1}
                  </td>

                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "12px",
                    }}
                  >
                    {student.studentName}
                  </td>

                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "12px",
                    }}
                  >
                    {student.email}
                  </td>

                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "12px",
                    }}
                  >
                    {student.course}
                  </td>

                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "12px",
                    }}
                  >
                    {student.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Addstudent;
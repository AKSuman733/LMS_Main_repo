import { useNavigate } from "react-router-dom";

export default function MyCourses() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#070b14] text-white p-10 relative">

      {/* TOP BAR */}
      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          My Courses
        </h1>

        {/* RETURN BUTTON */}
        <button
          onClick={() => navigate("/new-dashboard")}
          className="bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-3 rounded-2xl font-semibold transition"
        >
          ← Return Dashboard
        </button>

      </div>

      {/* CENTER MESSAGE */}
      <div className="flex items-center justify-center h-[75vh]">

        <p className="text-gray-400 text-xl">
          No course enrolled now.
        </p>

      </div>

    </div>
  );
}
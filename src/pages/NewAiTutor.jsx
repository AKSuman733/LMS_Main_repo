import { useNavigate } from "react-router-dom";

function NewAiTutor() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("newUser")) || {};

  const tutors = [
    {
      name: "Vijay",
      
      image:
        "https://a10.gaanacdn.com/gn_img/artists/NOXWVgbkqL/NOXWVmz3kq/size_m_1737701179.jpg",
      status: "Most Used",
      match: "98%",
    },

    {
      name: "Sai Pallavi",
      skill: "Full Stack Development",
      image:
        "https://media.themoviedb.org/t/p/w235_and_h235_face/qAPdGKUIUEzLibdgVCey7oKvvME.jpg",
      status: "Favourite",
      match: "94%",
    },

    {
      name: "Deepika",
      skill: "Cybersecurity",
      image:
        "https://www.hindustantimes.com/ht-img/img/2024/02/15/original/Deepika_Padukone_Hilton_1707982914236.jpg",
      status: "Recently Used",
      match: "91%",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">

      {/* TOP */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-black">
            AI Tutors
          </h1>

          <p className="text-gray-400 mt-2">
            Personalized tutors for {user?.name}
          </p>

        </div>

        <button
          onClick={() => navigate("/new-dashboard")}
          className="bg-cyan-400 hover:bg-cyan-300 text-black px-5 py-3 rounded-xl font-bold"
        >
          return to dashboard
        </button>

      </div>

      {/* LIST */}
      <div className="space-y-5">

        {tutors.map((tutor, index) => (

          <div
            key={index}
            className="bg-[#0d1323] border border-white/10 rounded-3xl p-5 flex items-center justify-between"
          >

            <div className="flex items-center gap-5">

              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-24 h-24 rounded-2xl object-cover"
              />

              <div>

                <div className="flex items-center gap-3 mb-2">

                  <h2 className="text-2xl font-bold">
                    {tutor.name}
                  </h2>

                  <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs">
                    {tutor.status}
                  </span>

                </div>

                <p className="text-cyan-400 mb-2">
                  {tutor.skill}
                </p>

                <p className="text-gray-400">
                  ⭐ {tutor.match} Match Score
                </p>

              </div>

            </div>

            <button className="bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-3 rounded-xl font-bold">
              Chat
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default NewAiTutor;
const allMentors = [
  {
    id: 1,

    mentor: "Elon Musk",

    role: "Senior React Engineer",

    title: "Complete React Mastery",

    category: "Web Development",

    description:
      "Build modern React applications using hooks, routing, APIs, reusable components, and advanced state management.",

    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",

    mentorImage:
      "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",

    trailer:
      "https://www.youtube.com/embed/rcpHnLeC7yM",

    students: "1.2M",

    gradient: "from-zinc-700 to-black",
  },

  {
    id: 2,

    mentor: "Taylor Swift",

    role: "Python Developer",

    title: "Python for Beginners",

    category: "Programming",

    description:
      "Learn Python programming from scratch with hands-on coding exercises and real-world projects.",

    image:
      "https://i.pinimg.com/564x/6b/5d/56/6b5d56d2b9db91c3d29aa86e4d97bb96.jpg",

    mentorImage:
      "https://i.pinimg.com/564x/6b/5d/56/6b5d56d2b9db91c3d29aa86e4d97bb96.jpg",

    trailer:
      "https://www.youtube.com/embed/tollGa3S0o8",

    students: "980K",

    gradient: "from-pink-500 to-rose-700",
  },

  {
    id: 3,

    mentor: "Vijay",

    role: "Machine Learning Engineer",

    title: "Machine Learning Bootcamp",

    category: "Artificial Intelligence",

    description:
      "Train machine learning models using Python, TensorFlow, and real-world datasets.",
    image:
        "data:image/jpeg;base64,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",

    mentorImage:
              "data:image/jpeg;base64,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",

    trailer:
      "https://www.youtube.com/embed/yJg-Y5byMMw",

    students: "860K",

    gradient: "from-orange-500 to-red-700",
  },

  {
    id: 4,

    mentor: "Cristiano Ronaldo",

    role: "Cybersecurity Specialist",

    title: "Cybersecurity Fundamentals",

    category: "Cybersecurity",

    description:
             "Learn ethical hacking, penetration testing, network security, and cyber defense fundamentals.",

    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",

    mentorImage:
      "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",

    trailer:
      "https://www.youtube.com/embed/wc5h2AM7mU4",

    students: "2.4M",

    gradient: "from-emerald-500 to-green-800",
  },

  {
    id: 5,

    mentor: "Virat Kohli",

    role: "JavaScript Engineer",

    title: "JavaScript Advanced Concepts",

    category: "Programming",

    description:
            "Deep dive into closures, async JavaScript, ES6+, event loops, and performance optimization.",

    image:
        "https://i.pinimg.com/originals/0e/99/4b/0e994bbf0848f5582a27d1ce14b66e7f.jpg",

    mentorImage:
                "https://i.pinimg.com/originals/0e/99/4b/0e994bbf0848f5582a27d1ce14b66e7f.jpg",

    trailer:
      "https://www.youtube.com/embed/1K7J-Q6zJK8",

    students: "1.5M",

    gradient: "from-blue-500 to-indigo-800",
  },

  {
    id: 6,

    mentor: "MS Dhoni",

    role: "UI/UX Design Expert",

    title: "UI/UX Design Essentials",

    category: "Design",

    description:
            "Master wireframing, prototyping, user experience principles, and modern design systems.",

    image:
             "https://media.gettyimages.com/id/108995677/photo/bangalore-india-mahendra-singh-dhoni-captain-of-india-poses-during-a-portrait-session-ahead-of.jpg?s=612x612&w=0&k=20&c=AW8Jy52T0q76uXBdCj9GjGjVO4hk7rRgbueyLmzKKBI=",

    mentorImage:
               "https://media.gettyimages.com/id/108995677/photo/bangalore-india-mahendra-singh-dhoni-captain-of-india-poses-during-a-portrait-session-ahead-of.jpg?s=612x612&w=0&k=20&c=AW8Jy52T0q76uXBdCj9GjGjVO4hk7rRgbueyLmzKKBI=",

    trailer:
      "https://www.youtube.com/embed/b4OH3vBANa4",

    students: "1.1M",

    gradient: "from-slate-600 to-slate-900",
  },

  {
    id: 7,

    mentor: "Shah Rukh Khan",

    role: "Full Stack Developer",

    title: "Full Stack MERN Development",

    category: "Web Development",

    description:
      "Build scalable full stack applications using MongoDB, Express, React, and Node.js.",

    image:
      "https://i.pinimg.com/736x/0e/73/a5/0e73a5f84e26b1c01aaa68219f168187.jpg",

    mentorImage:
      "https://i.pinimg.com/736x/0e/73/a5/0e73a5f84e26b1c01aaa68219f168187.jpg",

    trailer:
      "https://www.youtube.com/embed/3M5h3t6gT7Y",

    students: "1.8M",

    gradient: "from-rose-500 to-red-800",
  },

  {
    id: 8,

    mentor: "Samantha",

    role: "Cloud Solutions Architect",

    title: "Cloud Computing with AWS",

    category: "Cloud Computing",

    description:
      "Learn AWS services, cloud deployment, DevOps pipelines, and scalable infrastructure design.",

    image:
       "https://4kwallpapers.com/images/wallpapers/samantha-indian-actress-south-actress-portrait-2022-4480x2520-7023.jpg",
    mentorImage:
      "https://4kwallpapers.com/images/wallpapers/samantha-indian-actress-south-actress-portrait-2022-4480x2520-7023.jpg",

    trailer:
      "https://www.youtube.com/embed/8ugaeA-nMTc",

    students: "2.1M",

    gradient: "from-yellow-500 to-orange-700",
  },

  {
    id: 9,

    mentor: "Sundar Pichai",

    role: "DSA Problem Solverr",

    title: "Data Structures & Algorithms",

    category: "Programming",

    description:
      "Master coding interviews with data structures, algorithms, and optimization techniques.",

    image:
      "https://images.squarespace-cdn.com/content/v1/62ec2bc76a27db7b37a2b32f/0906f580-1224-46c0-a61e-0f85b2bac401/people-in-ai-sundar-pichai-2500.jpg",

    mentorImage:
      "https://images.squarespace-cdn.com/content/v1/62ec2bc76a27db7b37a2b32f/0906f580-1224-46c0-a61e-0f85b2bac401/people-in-ai-sundar-pichai-2500.jpg",

    trailer:
      "https://www.youtube.com/embed/Vhh_GeBPOhs",

    students: "970K",

    gradient: "from-cyan-500 to-blue-700",
  },

  {
    id: 10,

    mentor: "Deepika Padukone",

    role: "Mobile App Developer",

    title: "Flutter App Development",

    category: "Mobile Development",

    description:
      "Create beautiful cross-platform mobile applications using Flutter and Dart.",

    image:
        "https://wallpaperaccess.com/thumb/1136887.jpg",
    mentorImage:
      "https://wallpaperaccess.com/thumb/1136887.jpg",
    trailer:
      "https://www.youtube.com/embed/UF8uR6Z6KLc",

    students: "1.4M",

    gradient: "from-gray-600 to-black",
  },

  {
    id: 11,

    mentor: "Anne Hathaway",

    role: "Game Developer",

    title: "Game Development with Unity",

    category: "Game Development",

    description:
           "Design and develop immersive 2D and 3D games using Unity and C#.",

    image:
      "https://4kwallpapers.com/images/wallpapers/anne-hathaway-american-actress-beautiful-actress-2880x1800-5207.jpg",

    mentorImage:
      "https://4kwallpapers.com/images/wallpapers/anne-hathaway-american-actress-beautiful-actress-2880x1800-5207.jpg",

    trailer:
      "https://www.youtube.com/embed/WTOm65IZneg",

    students: "2.8M",

    gradient: "from-sky-500 to-cyan-700",
  },

  {
    id: 12,

    mentor: "Zendaya",

    role: "Creative Confidence Mentor",

    title: "Creativity & Personal Branding",

    category: "Personal Branding",

    description:
      "Learn confidence, creativity, branding, and self-expression.",

    image:
      "https://i.pinimg.com/564x/43/13/b9/4313b98b47ba8d1e6373f850c4893cdd.jpg",

    mentorImage:
      "https://i.pinimg.com/564x/43/13/b9/4313b98b47ba8d1e6373f850c4893cdd.jpg",

    trailer:
      "https://www.youtube.com/embed/9D05ej8u-gU",

    students: "760K",

    gradient: "from-fuchsia-500 to-pink-700",
  },
];

export default allMentors;
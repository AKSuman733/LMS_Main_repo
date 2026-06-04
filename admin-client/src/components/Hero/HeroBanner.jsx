import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ArrowRight,
  Play,
  Search,
  Sparkles,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";

import useLessonStore from "../../store/useLessonStore";

import allMentors from "../../data/allMentors";

/* ====================================================== */
/* HERO CELEBRITIES */
/* ====================================================== */

const heroCelebrities = [

  {
    name: "Elon Musk",

    image:
      "/images/elon-ai.png",

    course:
      "Artificial Intelligence",
  },

  {
    name:
      "Deepika Padukone",

    image:
      "/images/deep-ai.png",

    course:
      "UI/UX Design",
  },

  {
    name: "Zendaya",

    image:
      "/images/zen-ai.png",

    course:
      "Programming",
  },

  {
    name:
      "Virat Kohli",

    image:
      "/images/virat-ai.png",

    course:
      "Data Science",
  },

  {
    name: "RDJ",

    image:
      "/images/rdj-ai.png",

    course:
      "Web Development",
  },
];

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

function HeroBanner() {

  /* ====================================================== */
  /* STATE */
  /* ====================================================== */

  const [inputTopic, setInputTopic] =
    useState("");

  const [
    selectedCelebrity,
    setSelectedCelebrity,
  ] = useState("");

  const [
    searchResults,
    setSearchResults,
  ] = useState([]);

  const [showResults, setShowResults] =
    useState(false);

  const [
    activeCelebrity,
    setActiveCelebrity,
  ] = useState(0);

  /* ====================================================== */
  /* AUTO ROTATE */
  /* ====================================================== */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setActiveCelebrity(
          (prev) =>

            (prev + 1) %
            heroCelebrities.length
        );

      }, 3500);

    return () =>
      clearInterval(interval);

  }, []);

  /* ====================================================== */
  /* STORE */
  /* ====================================================== */

  const {
    setTopic,
    setCelebrity,
  } = useLessonStore();

  /* ====================================================== */
  /* NAVIGATION */
  /* ====================================================== */

  const navigate =
    useNavigate();

  /* ====================================================== */

  const celebrities = [

    "Elon Musk",

    "Taylor Swift",

    "Cristiano Ronaldo",

    "Tony Stark",

    "Virat Kohli",

    "Deepika Padukone",
  ];

  /* ====================================================== */
  /* SEARCH */
  /* ====================================================== */

  const handleSearch = (
    value
  ) => {

    setInputTopic(value);

    if (!value.trim()) {

      setSearchResults([]);

      setShowResults(false);

      return;
    }

    const filtered =
      allMentors.filter(
        (course) =>

          course.title
            .toLowerCase()
            .includes(
              value.toLowerCase()
            )

          ||

          course.category
            .toLowerCase()
            .includes(
              value.toLowerCase()
            )
      );

    setSearchResults(filtered);

    setShowResults(true);
  };

  /* ====================================================== */
  /* GENERATE */
  /* ====================================================== */

  const generateLesson = () => {

    if (!inputTopic.trim()) {

      alert(
        "Please enter a topic"
      );

      return;
    }

    if (!selectedCelebrity) {

      alert(
        "Please choose a celebrity"
      );

      return;
    }

    setTopic(inputTopic);

    setCelebrity(
      selectedCelebrity
    );

    const celebrityRoutes = {

      "Elon Musk": 1,

      "Taylor Swift": 1,

      "Tony Stark": 1,

      "Cristiano Ronaldo": 2,

      "Virat Kohli": 2,

      "Zendaya": 2,
    };

    const routeId =
      celebrityRoutes[
        selectedCelebrity
      ] || 1;

    navigate(
      `/watch-course/${routeId}`
    );
  };

  /* ====================================================== */
  /* COMPONENT */
  /* ====================================================== */

  return (

    <section
      className="
        relative

        flex

        min-h-[88vh]

        items-center

        overflow-hidden

        bg-[#020617]

        pt-20
      "
    >

      {/* ====================================================== */}
      {/* BACKGROUND */}
      {/* ====================================================== */}

      <motion.div

        animate={{
          backgroundPosition: [
            "0% 50%",
            "100% 50%",
            "0% 50%",
          ],
        }}

        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}

        className="
          absolute inset-0

          opacity-20

          bg-[linear-gradient(120deg,#020617,#111827,#312e81,#7c3aed,#020617)]

          bg-[length:300%_300%]
        "
      />

      {/* GLOWS */}

      <div
        className="
          absolute

          -left-40
          -top-40

          h-[400px]
          w-[400px]

          rounded-full

          bg-blue-500/20

          blur-[100px]
        "
      />

      <div
        className="
          absolute

          -bottom-40
          -right-40

          h-[400px]
          w-[400px]

          rounded-full

          bg-pink-500/20

          blur-[100px]
        "
      />

      {/* ====================================================== */}
      {/* MAIN */}
      {/* ====================================================== */}

      <div
        className="
          relative z-10

          mx-auto

          grid

          max-w-7xl

          items-center

          gap-10

          px-5

          lg:grid-cols-2
          lg:px-8
        "
      >

        {/* ====================================================== */}
        {/* LEFT */}
        {/* ====================================================== */}

        <motion.div

          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.8,
          }}
        >

          {/* BADGE */}

          <div
            className="
              mb-5

              inline-flex
              items-center
              gap-2

              rounded-full

              border border-cyan-400/20

              bg-white/5

              px-4 py-1.5

              backdrop-blur-xl
            "
          >

            <Sparkles
              className="
                h-3.5 w-3.5

                text-cyan-400
              "
            />

            <p
              className="
                text-xs
                font-medium

                text-cyan-300
              "
            >

              AI Celebrity Learning

            </p>

          </div>

          {/* TITLE */}

          <h1
            className="
              mb-5

              text-4xl
              font-black

              leading-tight

              tracking-tight

              md:text-5xl
              lg:text-6xl
            "
          >

            <motion.span

              animate={{
                backgroundPosition: [
                  "0% 50%",
                  "100% 50%",
                  "0% 50%",
                ],
              }}

              transition={{
                duration: 8,
                repeat: Infinity,
              }}

              className="
                bg-[linear-gradient(90deg,#fb923c,#ec4899,#3b82f6,#8b5cf6)]

                bg-[length:300%_300%]

                bg-clip-text

                text-transparent
              "
            >

              Learn From Your

            </motion.span>

            <br />

            <span className="text-white">
              Favorite Celebrities
            </span>

          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mb-7

              max-w-xl

              text-sm
              leading-7

              text-slate-400

              md:text-base
            "
          >

            Generate personalized AI lessons
            taught by celebrities you admire.

          </p>

          {/* SEARCH */}

          <div
            className="
              relative

              mb-7

              max-w-xl
            "
          >

            <div
              className="
                flex
                items-center
                gap-3

                rounded-2xl

                border border-white/10

                bg-white/5

                p-1.5

                backdrop-blur-xl

                shadow-[0_0_20px_rgba(59,130,246,0.10)]
              "
            >

              <Search
                className="
                  ml-3

                  h-4 w-4

                  text-cyan-400
                "
              />

              <input
                value={inputTopic}

                onChange={(e) =>
                  handleSearch(
                    e.target.value
                  )
                }

                placeholder="What do you want to learn?"

                className="
                  flex-1

                  bg-transparent

                  px-2 py-2.5

                  text-xs
                  text-white

                  outline-none

                  placeholder:text-slate-500
                "
              />

              <button
                onClick={
                  generateLesson
                }

                className="
                  rounded-xl

                  bg-gradient-to-r

                  from-[#ff7a45]
                  to-[#ff4fa3]

                  px-5 py-2.5

                  text-xs
                  font-semibold

                  text-white

                  transition-all
                  duration-300

                  hover:scale-105
                "
              >

                Generate

              </button>

            </div>

          </div>

          {/* CELEBRITIES */}

          <div
            className="
              mb-8

              flex flex-wrap
              gap-2.5
            "
          >

            {

              celebrities.map(
                (name) => (

                  <button

                    key={name}

                    onClick={() =>
                      setSelectedCelebrity(
                        name
                      )
                    }

                    className={`
                      rounded-full

                      border

                      px-4 py-1.5

                      text-[11px]

                      transition-all
                      duration-300

                      ${
                        selectedCelebrity ===
                        name

                          ? `
                            border-cyan-400

                            bg-cyan-500/20

                            text-cyan-300
                          `

                          : `
                            border-white/10

                            bg-white/5

                            text-white

                            hover:bg-blue-500/20
                          `
                      }
                    `}
                  >

                    {name}

                  </button>
                )
              )
            }

          </div>

          {/* BUTTONS */}

          <div
            className="
              flex flex-wrap
              items-center
              gap-3
            "
          >

            <button
              onClick={
                generateLesson
              }

              className="
                flex items-center
                gap-2

                rounded-xl

                bg-gradient-to-r

                from-[#ff7a45]
                to-[#ff4fa3]

                px-5 py-3

                text-sm
                font-semibold

                text-white

                transition-all
                duration-300

                hover:scale-105
              "
            >

              Explore AI Lessons

              <ArrowRight
                size={16}
              />

            </button>

          

          </div>

        </motion.div>

        {/* ====================================================== */}
        {/* RIGHT */}
        {/* ====================================================== */}

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.95,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          transition={{
            duration: 0.8,
          }}

          style={{
            perspective: "2200px",
          }}

          className="
            relative

            flex

            min-h-[520px]

            items-center
            justify-center
          "
        >

          {/* GLOW */}

          <div
            className="
              absolute

              h-[520px]
              w-[520px]

              rounded-full

              bg-cyan-500/10

              blur-[120px]
            "
          />

          {/* ORBITS */}

          <motion.div

            animate={{
              rotate: 360,
            }}

            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}

            className="
              absolute

              h-[520px]
              w-[520px]

              rounded-full

              border border-cyan-500/10
            "
          />

          <motion.div

            animate={{
              rotate: -360,
            }}

            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}

            className="
              absolute

              h-[420px]
              w-[420px]

              rounded-full

              border border-pink-500/10
            "
          />

          {/* ENERGY */}

          <motion.div

            animate={{
              scale: [1, 1.1, 1],
            }}

            transition={{
              duration: 5,
              repeat: Infinity,
            }}

            className="
              absolute

              h-[180px]
              w-[180px]

              rounded-full

              bg-gradient-to-br

              from-cyan-400
              via-blue-500
              to-purple-600

              opacity-30

              blur-3xl
            "
          />

          {/* 3D SYSTEM */}

          <div
            className="
              absolute inset-0

              flex
              items-center
              justify-center
            "

            style={{
              transformStyle:
                "preserve-3d",
            }}
          >

            {

              heroCelebrities.map(
                (
                  celebrity,
                  index
                ) => {

                  const angle =
                    (360 /
                      heroCelebrities.length) *
                    index;

                  const isActive =
                    index ===
                    activeCelebrity;

                  return (

                    <motion.div

                      key={
                        celebrity.name
                      }

                      animate={{
                        transform: `
                          rotateY(${angle + (activeCelebrity * -72)}deg)
                        `,
                      }}

                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                      }}

                      style={{
                        transformStyle:
                          "preserve-3d",
                      }}

                      className="
                        absolute

                        flex
                        items-center
                        justify-center
                      "
                    >

                      <motion.div

                        animate={{

                          translateZ:
                            isActive
                              ? 120
                              : -90,

                          scale:
                            isActive
                              ? 1
                              : 0.72,

                          opacity:
                            isActive
                              ? 1
                              : 0.15,

                          rotateY:
                            isActive
                              ? 0
                              : 35,
                        }}

                        transition={{
                          duration: 1.2,
                        }}

                        style={{

                          transform: `
                            rotateY(${angle}deg)
                            translateZ(240px)
                          `,

                          transformStyle:
                            "preserve-3d",
                        }}

                        className="
                          relative
                        "
                      >

                        {/* IMAGE GLOW */}

                        <div
                          className="
                            absolute

                            inset-0

                            rounded-full

                            bg-cyan-500/20

                            blur-[80px]
                          "
                        />

                        {/* IMAGE */}

                        <img

                          src={
                            celebrity.image
                          }

                          alt={
                            celebrity.name
                          }

                          className="
                            relative z-20

                            h-[420px]

                            object-contain

                            drop-shadow-[0_0_70px_rgba(59,130,246,0.6)]
                          "
                        />

                      </motion.div>

                    </motion.div>
                  );
                }
              )
            }

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default HeroBanner;
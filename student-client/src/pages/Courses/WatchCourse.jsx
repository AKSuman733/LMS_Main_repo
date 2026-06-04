import {
  PlayCircle,
  PauseCircle,
  BrainCircuit,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Volume2,
  Send,
  X,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useRef,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import useLessonStore from "../../store/useLessonStore";

import allMentors from "../../data/allMentors";

/* ====================================================== */
/* ================= CELEBRITY IMAGES =================== */
/* ====================================================== */



/* ====================================================== */

const initialLessons = [
  {
    id: 1,
    title: "Introduction",
    completed: false,
  },

  {
    id: 2,
    title: "Core Fundamentals",
    completed: false,
  },

  {
    id: 3,
    title: "Real World Applications",
    completed: false,
  },

  {
    id: 4,
    title: "Advanced Concepts",
    completed: false,
  },

  {
    id: 5,
    title: "Industry Insights",
    completed: false,
  },

  {
    id: 6,
    title: "Final AI Mentor Session",
    completed: false,
  },
];

/* ====================================================== */
/* ================= STYLES ============================= */
/* ====================================================== */

const glass =
  `
    border border-[var(--color-border)]

    bg-[var(--color-card)]

    backdrop-blur-xl
  `;

const gradientText =
  `
    bg-gradient-to-r

    from-[var(--color-primary)]
    via-pink-500
    to-[var(--color-secondary)]

    bg-clip-text

    text-transparent
  `;

/* ====================================================== */
/* ================= COMPONENT ========================== */
/* ====================================================== */

function WatchCourse() {

  const { id } = useParams();

  const {
    topic,
    celebrity,
  } = useLessonStore();

  /* ====================================================== */
  /* ================= MENTOR DATA ======================== */
  /* ====================================================== */

  const mentorsArray = Array.isArray(allMentors)

    ? allMentors

    : Object.keys(allMentors).map((key) => ({

        id: Number(key),

        ...allMentors[key],
      }));

  const selectedCourse =
    mentorsArray.find(
      (mentor) =>
        mentor.id === Number(id)
    ) || mentorsArray[0];

  /* ====================================================== */
  /* ================= ACTIVE CELEBRITY =================== */
  /* ====================================================== */

  const [activeCelebrity, setActiveCelebrity] =
    useState(
      celebrity ||
      localStorage.getItem(
        "selectedCelebrity"
      ) ||
      selectedCourse?.mentor ||
      "Elon Musk"
    );

  const [showCelebrityModal, setShowCelebrityModal] =
    useState(false);

  /* ====================================================== */
  /* ================= ACTIVE TOPIC ======================= */
  /* ====================================================== */

  const lessonTopic =
    topic ||
    localStorage.getItem(
      "selectedTopic"
    ) ||
    selectedCourse?.title ||
    selectedCourse?.course ||
    "Artificial Intelligence";

  /* ====================================================== */
  /* ================= ACTIVE IMAGE ======================= */
  /* ====================================================== */

  const mentorImage =

  mentorsArray.find(
    (mentor) =>
      mentor.mentor ===
      activeCelebrity
  )?.mentorImage ||

  mentorsArray.find(
    (mentor) =>
      mentor.mentor ===
      activeCelebrity
  )?.image ||

  selectedCourse?.mentorImage ||

  selectedCourse?.image;
  /* ====================================================== */
  /* ================= VIDEO STATE ======================== */
  /* ====================================================== */

  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [volume, setVolume] =
    useState(1);

  /* ====================================================== */
  /* ================= LESSON STATE ======================= */
  /* ====================================================== */

  const [lessons, setLessons] =
    useState(initialLessons);

  /* ====================================================== */
  /* ================= AI CHAT ============================ */
  /* ====================================================== */

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([
      {
        from: "ai",

        text:
          `Welcome! I am AI ${activeCelebrity}. Today we will learn ${lessonTopic}.`,
      },
    ]);

  /* ====================================================== */
  /* ================= SWITCH CELEBRITY ================== */
  /* ====================================================== */

  const switchCelebrity = (celeb) => {

    setActiveCelebrity(celeb);

    setMessages([
      {
        from: "ai",

        text:
          `Welcome! I am AI ${celeb}. Today we will learn ${lessonTopic}.`,
      },
    ]);
  };

  /* ====================================================== */
  /* ================= VIDEO FUNCTIONS ==================== */
  /* ====================================================== */

  const togglePlay = () => {

    if (!videoRef.current)
      return;

    if (isPlaying) {

      videoRef.current.pause();

    } else {

      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {

    const video =
      videoRef.current;

    if (!video)
      return;

    const percentage =
      video.duration

        ? (
            video.currentTime /
            video.duration
          ) * 100

        : 0;

    setProgress(
      percentage
    );
  };

  const handleVolume = (e) => {

    const value =
      e.target.value;

    setVolume(value);

    if (videoRef.current) {

      videoRef.current.volume =
        value;
    }
  };

  /* ====================================================== */
  /* ================= LESSON COMPLETE ==================== */
  /* ====================================================== */

  const toggleLesson = (
    lessonId
  ) => {

    setLessons((prev) =>

      prev.map((lesson) =>

        lesson.id === lessonId

          ? {
              ...lesson,

              completed:
                !lesson.completed,
            }

          : lesson
      )
    );
  };

  /* ====================================================== */
  /* ================= AI CHAT SEND ======================= */
  /* ====================================================== */

  const sendMessage = () => {

    if (!message.trim())
      return;

    const userMessage =
      message;

    setMessages((prev) => [

      ...prev,

      {
        from: "user",

        text: userMessage,
      },
    ]);

    setMessage("");

    setTimeout(() => {

      setMessages((prev) => [

        ...prev,

        {
          from: "ai",

          text:
            `${activeCelebrity} AI: Great question about ${lessonTopic}. Here's how I would explain it...`,
        },
      ]);

    }, 700);
  };

  /* ====================================================== */

  const completedLessons =
    lessons.filter(
      (l) => l.completed
    ).length;

  const completionPercentage =
    (
      completedLessons /
      lessons.length
    ) * 100;

  /* ====================================================== */
  /* ================= COMPONENT ========================== */
  /* ====================================================== */

  return (

    <div
      className="
        relative

        min-h-screen

        overflow-hidden

        bg-[var(--color-background)]

        px-4 pb-16 pt-16

        lg:px-8
      "
    >

      {/* ====================================================== */}
      {/* GLOWS */}
      {/* ====================================================== */}

      <div
        className="
          absolute
          -left-24
          top-0

          h-[260px]
          w-[260px]

          rounded-full

          bg-[var(--color-secondary)]/10

          blur-[120px]
        "
      />

      <div
        className="
          absolute
          -right-24
          bottom-0

          h-[260px]
          w-[260px]

          rounded-full

          bg-[var(--color-primary)]/10

          blur-[120px]
        "
      />

      {/* ====================================================== */}

      <div
        className="
          relative z-10

          mx-auto

          max-w-6xl
        "
      >

        {/* ====================================================== */}
        {/* HERO */}
        {/* ====================================================== */}

        <div
          className="
            grid gap-5

            lg:grid-cols-[1.1fr_0.9fr]
          "
        >

          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            {/* BADGE */}

            <div
              className={`
                ${glass}

                mb-4

                inline-flex
                items-center
                gap-2

                rounded-full

                px-3 py-1.5

                text-xs
              `}
            >

              <Sparkles
                size={13}

                className="
                  text-[var(--color-secondary)]
                "
              />

              <span
                className="
                  text-[var(--color-secondary)]
                "
              >
                AI Celebrity Lesson
              </span>

            </div>

            {/* TITLE */}

            <h1
              className="
                text-3xl
                font-black
                leading-tight

                md:text-5xl
              "
            >

              <span className="text-white">
                {lessonTopic}
              </span>

              <br />

              <span
                className={
                  gradientText
                }
              >
                with {activeCelebrity}
              </span>

            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-4

                max-w-2xl

                text-sm
                leading-7

                text-slate-400
              "
            >

              Learn complex concepts
              through immersive AI
              mentor experiences
              with celebrity personalities.

            </p>

            {/* MENTOR CARD */}

            <div
              className={`
                ${glass}

                mt-4

                flex items-center
                gap-3

                rounded-2xl

                p-4

                max-w-lg
              `}
            >

              <img
                src={mentorImage}

                alt={activeCelebrity}

                className="
                  h-12 w-12

                  rounded-full

                  border border-[var(--color-secondary)]/20

                  object-cover
                "
              />

              <div>

                <h3
                  className="
                    text-sm
                    font-bold

                    text-white
                  "
                >
                  AI {activeCelebrity}
                </h3>

                <p
                  className="
                    text-xs

                    text-slate-400
                  "
                >
                  Celebrity AI Mentor
                </p>

              </div>

              {/* SWITCH */}

              <button
                onClick={() =>
                  setShowCelebrityModal(
                    true
                  )
                }

                className="
                  ml-auto

                  rounded-xl

                  border border-[var(--color-secondary)]/20

                  bg-[var(--color-secondary)]/10

                  px-3 py-2

                  text-xs
                  font-medium

                  text-[var(--color-secondary)]

                  transition-all
                  duration-300

                  hover:bg-[var(--color-secondary)]/20
                "
              >

                Switch

              </button>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}

            animate={{
              opacity: 1,
              scale: 1,
            }}
          >

            <div
              className={`
                ${glass}

                rounded-2xl

                p-5
              `}
            >

              <div
                className="
                  flex items-center
                  gap-3
                "
              >

                <div
                  className="
                    flex h-12 w-12
                    items-center
                    justify-center

                    rounded-xl

                    bg-gradient-to-r

                    from-[var(--color-primary)]
                    to-pink-500
                  "
                >

                  <BrainCircuit
                    size={22}

                    className="
                      text-white
                    "
                  />

                </div>

                <div>

                  <h3
                    className="
                      text-lg
                      font-bold

                      text-white
                    "
                  >
                    AI Learning Mode
                  </h3>

                  <p
                    className="
                      text-xs

                      text-slate-400
                    "
                  >
                    Personalized adaptive learning
                  </p>

                </div>

              </div>

              {/* PROGRESS */}

              <div className="mt-5">

                <div
                  className="
                    mb-2

                    flex items-center
                    justify-between
                  "
                >

                  <span
                    className="
                      text-xs

                      text-slate-400
                    "
                  >
                    Progress
                  </span>

                  <span
                    className="
                      text-xs

                      text-[var(--color-secondary)]
                    "
                  >

                    {Math.round(
                      completionPercentage
                    )}
                    %

                  </span>

                </div>

                <div
                  className="
                    h-2

                    overflow-hidden

                    rounded-full

                    bg-white/10
                  "
                >

                  <div
                    className="
                      h-full

                      rounded-full

                      bg-gradient-to-r

                      from-[var(--color-primary)]
                      to-[var(--color-secondary)]
                    "

                    style={{
                      width:
                        `${completionPercentage}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </motion.div>

        </div>

        {/* ====================================================== */}
        {/* VIDEO + LESSONS */}
        {/* ====================================================== */}

        <div
          className="
            mt-5

            grid gap-5

            lg:grid-cols-[1fr_320px]
          "
        >

          {/* LEFT SIDE */}

          <div>

            {/* VIDEO */}

            <div
              className={`
                ${glass}

                overflow-hidden

                rounded-2xl

                shadow-[var(--shadow-lg)]
              `}
            >

              <video
                ref={videoRef}

                controls

                src={
                  selectedCourse?.video ||

                  "https://www.w3schools.com/html/mov_bbb.mp4"
                }

                className="
                  aspect-video

                  max-h-[500px]

                  w-full

                  bg-black

                  object-cover
                "

                onTimeUpdate={
                  handleTimeUpdate
                }
              />

              {/* CONTROLS */}

              <div className="space-y-3 p-4">

                {/* PROGRESS */}

                <div
                  className="
                    h-2

                    overflow-hidden

                    rounded-full

                    bg-white/10
                  "
                >

                  <div
                    className="
                      h-full

                      rounded-full

                      bg-gradient-to-r

                      from-[var(--color-primary)]
                      to-[var(--color-secondary)]
                    "

                    style={{
                      width:
                        `${progress}%`,
                    }}
                  />

                </div>

                {/* BUTTONS */}

                <div
                  className="
                    flex items-center
                    justify-between
                  "
                >

                  {/* PLAY */}

                  <button
                    onClick={
                      togglePlay
                    }

                    className="
                      flex items-center
                      gap-2

                      rounded-xl

                      bg-gradient-to-r

                      from-[var(--color-primary)]
                      to-pink-500

                      px-4 py-2.5

                      text-sm
                      font-medium

                      text-white
                    "
                  >

                    {isPlaying ? (

                      <>
                        <PauseCircle
                          size={18}
                        />

                        Pause
                      </>

                    ) : (

                      <>
                        <PlayCircle
                          size={18}
                        />

                        Play
                      </>
                    )}

                  </button>

                  {/* VOLUME */}

                  <div
                    className="
                      flex items-center
                      gap-2
                    "
                  >

                    <Volume2
                      size={16}

                      className="
                        text-white
                      "
                    />

                    <input
                      type="range"

                      min="0"

                      max="1"

                      step="0.1"

                      value={volume}

                      onChange={
                        handleVolume
                      }

                      className="
                        w-24
                      "
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* ====================================================== */}
            {/* CHAT */}
            {/* ====================================================== */}

            <div
              className={`
                ${glass}

                mt-5

                rounded-2xl

                p-5
              `}
            >

              <h2
                className="
                  mb-4

                  text-lg
                  font-bold

                  text-white
                "
              >

                Talk With AI {activeCelebrity}

              </h2>

              {/* MESSAGES */}

              <div
                className="
                  custom-scrollbar

                  max-h-[280px]

                  space-y-3

                  overflow-y-auto
                "
              >

                {messages.map(
                  (msg, index) => (

                    <div
                      key={index}

                      className={`flex ${
                        msg.from === "user"

                          ? "justify-end"

                          : "justify-start"
                      }`}
                    >

                      <div
                        className={`
                          max-w-[80%]

                          rounded-2xl

                          px-4 py-3

                          text-sm

                          ${
                            msg.from ===
                            "user"

                              ? `
                                  bg-gradient-to-r

                                  from-[var(--color-primary)]
                                  to-pink-500

                                  text-white
                                `

                              : `
                                  bg-black/10

                                  text-slate-300
                                `
                          }
                        `}
                      >

                        {msg.text}

                      </div>

                    </div>
                  )
                )}

              </div>

              {/* INPUT */}

              <div
                className="
                  mt-4

                  flex gap-3
                "
              >

                <input
                  value={message}

                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }

                  placeholder={`Ask ${activeCelebrity} anything...`}

                  className="
                    flex-1

                    rounded-xl

                    border border-[var(--color-border)]

                    bg-black/10

                    px-4 py-3

                    text-sm
                    text-white

                    outline-none

                    placeholder:text-slate-500
                  "
                />

                <button
                  onClick={
                    sendMessage
                  }

                  className="
                    rounded-xl

                    bg-gradient-to-r

                    from-[var(--color-primary)]
                    to-pink-500

                    px-4

                    text-white
                  "
                >

                  <Send size={18} />

                </button>

              </div>

            </div>

          </div>

          {/* ====================================================== */}
          {/* LESSONS */}
          {/* ====================================================== */}

          <div
            className={`
              ${glass}

              rounded-2xl

              p-5
            `}
          >

            <h2
              className="
                mb-5

                text-lg
                font-bold

                text-white
              "
            >

              Learning Path

            </h2>

            <div className="space-y-3">

              {lessons.map(
                (
                  lesson,
                  index
                ) => (

                  <motion.div
                    whileHover={{
                      y: -3,
                    }}

                    key={lesson.id}

                    className="
                      rounded-xl

                      border border-[var(--color-border)]

                      bg-black/10

                      p-3

                      transition-all
                      duration-300
                    "
                  >

                    <div
                      className="
                        flex items-start
                        gap-3
                      "
                    >

                      <div
                        className="
                          flex h-7 w-7
                          items-center
                          justify-center

                          rounded-full

                          bg-[var(--color-secondary)]/10

                          text-xs
                          font-semibold

                          text-[var(--color-secondary)]
                        "
                      >

                        {index + 1}

                      </div>

                      <div className="flex-1">

                        <h3
                          className="
                            text-sm
                            font-medium

                            text-white
                          "
                        >

                          {lesson.title}

                        </h3>

                        <button
                          onClick={() =>
                            toggleLesson(
                              lesson.id
                            )
                          }

                          className={`
                            mt-3

                            flex items-center
                            gap-2

                            rounded-lg

                            px-3 py-2

                            text-xs
                            font-medium

                            transition-all

                            ${
                              lesson.completed

                                ? `
                                    bg-green-500/20

                                    text-green-400
                                  `

                                : `
                                    bg-black/10

                                    text-slate-400
                                  `
                            }
                          `}
                        >

                          <CheckCircle2
                            size={14}
                          />

                          {lesson.completed

                            ? "Completed"

                            : "Complete"}

                        </button>

                      </div>

                    </div>

                  </motion.div>
                )
              )}

            </div>

            {/* CTA */}

            <button
              className="
                mt-5

                flex w-full
                items-center
                justify-center
                gap-2

                rounded-xl

                bg-gradient-to-r

                from-[var(--color-primary)]
                to-pink-500

                px-4 py-3

                text-sm
                font-semibold

                text-white
              "
            >

              Continue Session

              <ArrowRight
                size={16}
              />

            </button>

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* MODAL */}
      {/* ====================================================== */}

      {showCelebrityModal && (

        <div
          className="
            fixed inset-0 z-50

            flex items-center
            justify-center

            bg-black/70

            backdrop-blur-sm

            px-4
          "
        >

          <div
            className={`
              ${glass}

              w-full
              max-w-xl

              rounded-3xl

              p-4
            `}
          >

            {/* HEADER */}

            <div
              className="
                mb-5

                flex items-center
                justify-between
              "
            >

              <h2
                className="
                  text-lg
                  font-bold

                  text-white
                "
              >

                Choose AI Celebrity

              </h2>

              <button
                onClick={() =>
                  setShowCelebrityModal(
                    false
                  )
                }

                className="
                  flex h-9 w-9
                  items-center
                  justify-center

                  rounded-full

                  bg-white/10

                  text-white

                  transition

                  hover:bg-white/20
                "
              >

                <X size={16} />

              </button>

            </div>

            {/* GRID */}

            <div
              className="
                grid grid-cols-2
                gap-3

                md:grid-cols-3
              "
            >

              {
  mentorsArray.map(
    (mentor) => (

      <button
        key={mentor.id}

        onClick={() => {

          switchCelebrity(
            mentor.mentor
          );

          setShowCelebrityModal(
            false
          );
        }}

        className={`
          rounded-2xl

          border

          p-4

          transition-all
          duration-300

          hover:scale-[1.03]

          ${
            activeCelebrity ===
            mentor.mentor

              ? `
                  border-[var(--color-secondary)]

                  bg-[var(--color-secondary)]/10
                `

              : `
                  border-[var(--color-border)]

                  bg-black/10
                `
          }
        `}
      >

        <img
          src={
            mentor.mentorImage ||
            mentor.image
          }

          alt={mentor.mentor}

          className="
            mx-auto mb-3

            h-16 w-16

            rounded-full

            object-cover
          "
        />

        <h3
          className="
            text-xs
            font-semibold

            text-white
          "
        >

          {mentor.mentor}

        </h3>

      </button>
    )
  )
}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default WatchCourse;
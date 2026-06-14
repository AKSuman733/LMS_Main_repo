import { useState } from "react";
import "./Challenges.css";


function Challenges() {
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "Task 1",
      completed: false,
    },
    {
      id: 2,
      title: "Task 2",
      completed: false,
    },
    {
      id: 3,
      title: "Task 3",
      completed: false,
    },
    {
      id: 4,
      title: "Task 4",
      completed: false,
    },
    {
      id: 5,
      title: "Task 5",
      completed: false,
    },
  ]);

  const completeChallenge = (id) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id
          ? { ...challenge, completed: true }
          : challenge
      )
    );
  };

  return (
    <div className="challenges-page">
      <h1>Challenges</h1>

      <div className="challenge-list">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="challenge-card"
          >
            <h3>{challenge.title}</h3>

            {challenge.completed ? (
              <button disabled>
                ✅ Completed
              </button>
            ) : (
              <button
                onClick={() =>
                  completeChallenge(challenge.id)
                }
              >
                Complete Challenge
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenges;
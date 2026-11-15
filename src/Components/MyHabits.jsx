
import { useState } from "react";
import "./MyHabits.css";

function MyHabits() {
  const [morningHabits, setMorningHabits] = useState([
    { id: 1, title: "Wash your face gently", done: false },
    { id: 2, title: "Apply moisturizer", done: false },
    { id: 3, title: "Apply SPF 30+ sunscreen", done: false },
  ]);

  const [eveningHabits, setEveningHabits] = useState([
    { id: 4, title: "Cleanse your face", done: false },
    { id: 5, title: "Apply your night moisturizer", done: false },
    { id: 6, title: "Avoid touching or picking your skin", done: false },
  ]);

  const toggleHabit = (id, setHabits) => {
    setHabits((habits) =>
      habits.map((habit) =>
        habit.id === id
          ? { ...habit, done: !habit.done }
          : habit
      )
    );
  };

  const allHabits = [...morningHabits, ...eveningHabits];
  const completed = allHabits.filter((habit) => habit.done).length;
  const progress = Math.round((completed / allHabits.length) * 100);

  const tips = [
    {
      icon: "☀",
      title: "Never skip sunscreen",
      text: "Use broad-spectrum SPF 30 or higher during the day. Reapply when needed, especially outdoors.",
    },
    {
      icon: "💧",
      title: "Keep your skin moisturized",
      text: "Choose a moisturizer that suits your skin type. Hydrated skin can feel more comfortable.",
    },
    {
      icon: "🌿",
      title: "Be gentle with your skin",
      text: "Avoid harsh scrubbing and very hot water. A gentle routine is often better than too many products.",
    },
    {
      icon: "♡",
      title: "Introduce products slowly",
      text: "Try new products one at a time. Patch test first and stop using a product if it causes irritation.",
    },
  ];

  return (
    <div className="habits-page">

      {/* Page Header */}
      <div className="habits-header">
        <div>
          <span className="habits-eyebrow">YOUR SKINCARE JOURNEY</span>
          <h1>My Habits</h1>
          <p>Build healthy habits and give your skin the care it deserves.</p>
        </div>
        <div className="habits-header-icon">✿</div>
      </div>

      {/* Daily Progress */}
      <section className="habits-progress-card">
        <div className="progress-top">
          <div>
            <span className="section-eyebrow">YOUR DAILY ROUTINE</span>
            <h2>Today's Progress</h2>
            <p>{completed} out of {allHabits.length} habits completed</p>
          </div>
          <div className="progress-number">{progress}%</div>
        </div>

        <div className="habits-progress-track">
          <div
            className="habits-progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="progress-message">
          {progress === 100
            ? "Amazing! You completed all your habits today. ♡"
            : "Small steps every day make a difference. Keep going! ♡"}
        </p>
      </section>

      {/* Daily Habits */}
      <section className="habits-routines">
        <div className="habits-section-heading">
          <div>
            <span className="section-eyebrow">STAY CONSISTENT</span>
            <h2>Your Daily Habits</h2>
          </div>
          <span className="habits-count">{completed}/{allHabits.length} done</span>
        </div>

        <div className="habits-routine-grid">

          <div className="routine-box">
            <div className="routine-box-title">
              <span className="routine-icon morning-icon">☀</span>
              <div>
                <h3>Morning Habits</h3>
                <p>Start your day with care</p>
              </div>
            </div>

            {morningHabits.map((habit) => (
              <label className="habit-check-item" key={habit.id}>
                <input
                  type="checkbox"
                  checked={habit.done}
                  onChange={() =>
                    toggleHabit(habit.id, setMorningHabits)
                  }
                />
                <span className="habit-custom-check"></span>
                <span className={habit.done ? "habit-done" : ""}>
                  {habit.title}
                </span>
              </label>
            ))}
          </div>

          <div className="routine-box">
            <div className="routine-box-title">
              <span className="routine-icon evening-icon">☾</span>
              <div>
                <h3>Evening Habits</h3>
                <p>End your day gently</p>
              </div>
            </div>

            {eveningHabits.map((habit) => (
              <label className="habit-check-item" key={habit.id}>
                <input
                  type="checkbox"
                  checked={habit.done}
                  onChange={() =>
                    toggleHabit(habit.id, setEveningHabits)
                  }
                />
                <span className="habit-custom-check"></span>
                <span className={habit.done ? "habit-done" : ""}>
                  {habit.title}
                </span>
              </label>
            ))}
          </div>

        </div>
      </section>

      {/* Skincare Tips */}
      <section className="skincare-tips-section">
        <div className="habits-section-heading">
          <div>
            <span className="section-eyebrow">A LITTLE CARE GOES A LONG WAY</span>
            <h2>Skincare Tips & Advice</h2>
            <p>Simple tips to help you take better care of your skin.</p>
          </div>
        </div>

        <div className="skincare-tips-grid">
          {tips.map((tip, index) => (
            <article className="skincare-tip-card" key={index}>
              <div className="tip-icon">{tip.icon}</div>
              <h3>{tip.title}</h3>
              <p>{tip.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Healthy Skin Habits */}
      <section className="healthy-skin-card">
        <div className="healthy-skin-icon">♡</div>
        <div>
          <span className="section-eyebrow">BEYOND SKINCARE</span>
          <h2>Healthy Habits, Healthy Skin</h2>
          <ul>
            <li>Drink water regularly throughout the day.</li>
            <li>Get enough sleep and maintain a regular sleep schedule.</li>
            <li>Eat balanced meals with a variety of foods.</li>
            <li>Clean makeup brushes and change pillowcases regularly.</li>
            <li>Give your skincare routine time and avoid constantly changing products.</li>
          </ul>
        </div>
      </section>

      {/* Daily Reminder */}
      <div className="habits-reminder">
        <span>✿</span>
        <div>
          <h3>A gentle reminder</h3>
          <p>Your skin doesn't need a complicated routine. Consistency, patience, and gentle care matter.</p>
        </div>
      </div>

    </div>
  );
}

export default MyHabits;

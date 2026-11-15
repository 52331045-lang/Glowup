
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

// Default tasks are used only when no saved routine exists.
const defaultMorningTasks = [
  { id: 1, name: "Cleanser", done: false },
  { id: 2, name: "Toner", done: false },
  { id: 3, name: "Serum", done: false },
  { id: 4, name: "Moisturizer", done: false },
  { id: 5, name: "Sunscreen", done: false },
];

const defaultEveningTasks = [
  { id: 1, name: "Cleanser", done: false },
  { id: 2, name: "Toner", done: false },
  { id: 3, name: "Serum", done: false },
  { id: 4, name: "Moisturizer", done: false },
];

const defaultDailyTasks = [
  { id: 1, name: "Drink enough water", done: false },
  { id: 2, name: "Avoid touching your face", done: false },
  { id: 3, name: "Change your pillowcase regularly", done: false },
];

function getSavedTasks(key, defaultTasks) {
  try {
    const savedTasks = localStorage.getItem(key);

    if (!savedTasks) {
      return defaultTasks;
    }

    const parsedTasks = JSON.parse(savedTasks);

    return Array.isArray(parsedTasks) ? parsedTasks : defaultTasks;
  } catch {
    return defaultTasks;
  }
}

function Dashboard() {
  const navigate = useNavigate();

  const [morningTasks, setMorningTasks] = useState(() =>
    getSavedTasks("glowupMorningTasks", defaultMorningTasks)
  );

  const [eveningTasks, setEveningTasks] = useState(() =>
    getSavedTasks("glowupEveningTasks", defaultEveningTasks)
  );

  const [dailyTasks, setDailyTasks] = useState(() =>
    getSavedTasks("glowupDashboardDailyTasks", defaultDailyTasks)
  );

  // Save the same morning and evening tasks used by My Routine.
  useEffect(() => {
    localStorage.setItem(
      "glowupMorningTasks",
      JSON.stringify(morningTasks)
    );
  }, [morningTasks]);

  useEffect(() => {
    localStorage.setItem(
      "glowupEveningTasks",
      JSON.stringify(eveningTasks)
    );
  }, [eveningTasks]);

  useEffect(() => {
    localStorage.setItem(
      "glowupDashboardDailyTasks",
      JSON.stringify(dailyTasks)
    );
  }, [dailyTasks]);

  const toggleTask = (group, taskId) => {
    if (group === "morning") {
      setMorningTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === taskId
            ? { ...task, done: !task.done }
            : task
        )
      );
    }

    if (group === "evening") {
      setEveningTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === taskId
            ? { ...task, done: !task.done }
            : task
        )
      );
    }

    if (group === "daily") {
      setDailyTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === taskId
            ? { ...task, done: !task.done }
            : task
        )
      );
    }
  };

  const allTasks = [
    ...morningTasks,
    ...eveningTasks,
    ...dailyTasks,
  ];

  const completedTasks = allTasks.filter((task) => task.done).length;
  const totalTasks = allTasks.length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const morningCompleted = morningTasks.filter(
    (task) => task.done
  ).length;

  const eveningCompleted = eveningTasks.filter(
    (task) => task.done
  ).length;

  const renderTaskList = (tasks, group) => (
    <div className="dashboard-task-list">
      {tasks.length === 0 ? (
        <p className="empty-tasks">No tasks added yet.</p>
      ) : (
        tasks.map((task) => (
          <label
            className={`dashboard-task ${
              task.done ? "task-is-done" : ""
            }`}
            key={`${group}-${task.id}`}
          >
            <input
              type="checkbox"
              checked={Boolean(task.done)}
              onChange={() => toggleTask(group, task.id)}
            />

            <span className="dashboard-custom-check"></span>

            <span className="dashboard-task-name">
              {task.name}
            </span>
          </label>
        ))
      )}
    </div>
  );

  return (
    <div className="dashboard">

      {/* Top Bar */}
      <header className="dashboard-topbar">
        <div className="dashboard-topbar-text">
          <span className="topbar-small-text">YOUR SKINCARE SPACE</span>
          <h2>GlowUp</h2>
        </div>

        <div className="dashboard-profile">
          <div className="profile-avatar">G</div>

          <div className="profile-details">
            <span className="profile-name">Welcome back!</span>
            <span className="profile-subtitle">Your daily glow journey</span>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="dashboard-welcome">
        <div className="welcome-content">
          <span className="welcome-label">A LITTLE CARE EVERY DAY</span>

          <h1>Your skin deserves some love.</h1>

          <p>
            Take a moment for yourself, follow your routine,
            and celebrate every little step towards healthier skin.
          </p>

          <button
            className="dashboard-primary-button"
            onClick={() => navigate("/routine")}
          >
            View My Routine
            <span>→</span>
          </button>
        </div>

        <div className="welcome-decoration" aria-hidden="true">
          <span className="decoration-flower">✿</span>
          <span className="decoration-sparkle">✧</span>
          <span className="decoration-circle"></span>
        </div>
      </section>

      {/* Statistics */}
      <section className="dashboard-stats">

        <div className="dashboard-stat-card">
          <div className="stat-icon">♡</div>
          <div>
            <p className="stat-label">Completed Tasks</p>
            <h3>{completedTasks}/{totalTasks}</h3>
            <span className="stat-description">Your daily achievements</span>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon">☀</div>
          <div>
            <p className="stat-label">Morning Routine</p>
            <h3>{morningCompleted}/{morningTasks.length}</h3>
            <span className="stat-description">Morning steps completed</span>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon">☾</div>
          <div>
            <p className="stat-label">Evening Routine</p>
            <h3>{eveningCompleted}/{eveningTasks.length}</h3>
            <span className="stat-description">Evening steps completed</span>
          </div>
        </div>

      </section>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">

        <section className="dashboard-routines">

          <div className="dashboard-section-heading">
            <div>
              <span className="section-eyebrow">YOUR DAILY CARE</span>
              <h2>Today's Tasks</h2>
              <p>Small steps make a big difference.</p>
            </div>

            <button
              className="dashboard-text-button"
              onClick={() => navigate("/routine")}
            >
              Full Routine →
            </button>
          </div>

          <div className="dashboard-routine-card">
            <div className="routine-card-heading">
              <div className="routine-heading-icon morning-heading-icon">
                ☀
              </div>

              <div>
                <h3>Morning Routine</h3>
                <span>Start your day with care</span>
              </div>
            </div>

            {renderTaskList(morningTasks, "morning")}
          </div>

          <div className="dashboard-routine-card">
            <div className="routine-card-heading">
              <div className="routine-heading-icon evening-heading-icon">
                ☾
              </div>

              <div>
                <h3>Evening Routine</h3>
                <span>Give your skin some rest</span>
              </div>
            </div>

            {renderTaskList(eveningTasks, "evening")}
          </div>

          <div className="dashboard-routine-card">
            <div className="routine-card-heading">
              <div className="routine-heading-icon daily-heading-icon">
                ♡
              </div>

              <div>
                <h3>Daily Healthy Habits</h3>
                <span>Healthy habits, healthy skin</span>
              </div>
            </div>

            {renderTaskList(dailyTasks, "daily")}
          </div>

        </section>

        {/* Progress Card */}
        <aside className="dashboard-progress-card">
          <span className="section-eyebrow">KEEP IT UP</span>
          <h2>Your Daily Progress</h2>

          <div
            className="dashboard-progress-circle"
            style={{ "--progress": `${progress}%` }}
          >
            <div className="progress-circle-content">
              <strong>{progress}%</strong>
              <span>Completed</span>
            </div>
          </div>

          <p className="progress-message">
            {progress === 100
              ? "Amazing! You completed all your tasks today."
              : progress === 0
              ? "Your glow journey starts with one small step."
              : "You're doing great! Keep taking care of yourself."}
          </p>

          <div className="progress-details">
            <div>
              <span>Completed</span>
              <strong>{completedTasks}</strong>
            </div>

            <div>
              <span>Remaining</span>
              <strong>{totalTasks - completedTasks}</strong>
            </div>
          </div>

          <button
            className="dashboard-secondary-button"
            onClick={() => navigate("/habits")}
          >
            Explore Skincare Tips
            <span>→</span>
          </button>
        </aside>

      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>Made with ♡ for your skin and your self-care journey.</p>
        <span>GlowUp © 2026</span>
      </footer>

    </div>
  );
}

export default Dashboard;

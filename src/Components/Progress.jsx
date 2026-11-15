
import { useEffect, useState } from "react";
import "./Progress.css";

function Progress() {
  const [morningTasks, setMorningTasks] = useState([]);
  const [eveningTasks, setEveningTasks] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);

  useEffect(() => {
    const morning = JSON.parse(
      localStorage.getItem("glowupMorningTasks") || "[]"
    );
    const evening = JSON.parse(
      localStorage.getItem("glowupEveningTasks") || "[]"
    );
    const daily = JSON.parse(
      localStorage.getItem("glowupDashboardDailyTasks") || "[]"
    );

    setMorningTasks(morning);
    setEveningTasks(evening);
    setDailyTasks(daily);
  }, []);

  const getProgress = (tasks) => {
    if (tasks.length === 0) return 0;

    const completed = tasks.filter((task) => task.done).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const morningProgress = getProgress(morningTasks);
  const eveningProgress = getProgress(eveningTasks);
  const dailyProgress = getProgress(dailyTasks);

  const allTasks = [...morningTasks, ...eveningTasks, ...dailyTasks];
  const totalProgress = getProgress(allTasks);

  const completedTasks = allTasks.filter((task) => task.done).length;

  const getMessage = () => {
    if (totalProgress === 100) return "Amazing! You completed everything today!";
    if (totalProgress >= 70) return "Great job! You're doing amazing!";
    if (totalProgress >= 40) return "Keep going! You're making progress!";
    return "Every small step counts. Start your routine today!";
  };

  const ProgressBar = ({ title, progress, completed, total }) => (
    <div className="progress-item">
      <div className="progress-item-header">
        <span>{title}</span>
        <strong>{progress}%</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p>{completed} of {total} completed</p>
    </div>
  );

  return (
    <div className="progress-page">
      <div className="progress-header">
        <div>
          <h1>My Progress</h1>
          <p>Track your skincare journey and celebrate your achievements.</p>
        </div>
      </div>

      <div className="progress-summary">
        <div className="progress-circle">
          <div>
            <strong>{totalProgress}%</strong>
            <span>Completed</span>
          </div>
        </div>

        <div className="summary-text">
          <h2>Your Daily Progress</h2>
          <p>{getMessage()}</p>
          <span>{completedTasks} tasks completed out of {allTasks.length}</span>
        </div>
      </div>

      <div className="progress-section">
        <h2>Routine Breakdown</h2>

        <div className="progress-cards">
          <div className="progress-card">
            <span className="progress-icon">☀️</span>
            <ProgressBar
              title="Morning Routine"
              progress={morningProgress}
              completed={morningTasks.filter((task) => task.done).length}
              total={morningTasks.length}
            />
          </div>

          <div className="progress-card">
            <span className="progress-icon">🌙</span>
            <ProgressBar
              title="Evening Routine"
              progress={eveningProgress}
              completed={eveningTasks.filter((task) => task.done).length}
              total={eveningTasks.length}
            />
          </div>

          <div className="progress-card">
            <span className="progress-icon">🌸</span>
            <ProgressBar
              title="Daily Habits"
              progress={dailyProgress}
              completed={dailyTasks.filter((task) => task.done).length}
              total={dailyTasks.length}
            />
          </div>
        </div>
      </div>

      <div className="progress-motivation">
        <span>🌷</span>
        <div>
          <h3>Remember!</h3>
          <p>Consistency is more important than perfection. Take care of yourself, one day at a time.</p>
        </div>
      </div>
    </div>
  );
}

export default Progress;

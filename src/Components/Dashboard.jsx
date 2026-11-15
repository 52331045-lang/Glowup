
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    { id: 1, name: "Cleanse your face", time: "Morning", completed: true },
    { id: 2, name: "Apply moisturizer", time: "Morning", completed: true },
    { id: 3, name: "Apply sunscreen SPF 30", time: "Morning", completed: false },
    { id: 4, name: "Drink enough water", time: "Daily", completed: false },
    { id: 5, name: "Remove makeup before bed", time: "Evening", completed: false },
  ]);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const progress = Math.round(
    (completedTasks / tasks.length) * 100
  );

  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return (
    <div className="dashboard">

      {/* Top Bar */}
      <header className="dashboard-topbar">
        <div className="search-container">
          <span>⌕</span>
          <input type="text" placeholder="Search..." />
        </div>

        <div className="profile-container">
          <button className="notification-button">♡</button>

          <div className="profile-avatar">S</div>

          <div className="profile-info">
            <h4>Sara</h4>
            <p>My Account</p>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <span className="welcome-label">
            YOUR SKINCARE JOURNEY
          </span>

          <h1>Good morning, Sara! <span>♡</span></h1>

          <p>
            A little care goes a long way.
            Let's make today beautiful.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("/routine")}
          >
            Explore My Routine →
          </button>
        </div>

        <div className="welcome-flower">✿</div>
      </section>

      {/* Statistics */}
      <section className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-symbol">✓</span>
            <span className="stat-tag">Today</span>
          </div>
          <h2>{completedTasks}/{tasks.length}</h2>
          <p>Tasks Completed</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-symbol">♡</span>
            <span className="stat-tag">Daily Goal</span>
          </div>
          <h2>6/8</h2>
          <p>Glasses of Water</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-symbol">☾</span>
            <span className="stat-tag">Last Night</span>
          </div>
          <h2>7.5h</h2>
          <p>Sleep Duration</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-symbol">✿</span>
            <span className="stat-tag">Consistency</span>
          </div>
          <h2>12 days</h2>
          <p>Self Care Streak</p>
        </div>

      </section>

      {/* Main Content */}
      <section className="dashboard-main">

        {/* Daily Routine */}
        <div className="routine-card">

          <div className="card-heading">
            <div>
              <span className="section-label">STAY CONSISTENT</span>
              <h2>Today's Routine</h2>
              <p>Small steps make a big difference.</p>
            </div>

            <button
              className="text-button"
              onClick={() => navigate("/routine")}
            >
              View All →
            </button>
          </div>

          <div className="routine-list">
            {tasks.map((task) => (
              <label className="routine-item" key={task.id}>

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />

                <span className="custom-checkbox"></span>

                <div className="routine-task-info">
                  <span className={task.completed ? "task-completed" : ""}>
                    {task.name}
                  </span>
                  <small>{task.time}</small>
                </div>

                <span className="task-status">
                  {task.completed ? "Done" : "Pending"}
                </span>

              </label>
            ))}
          </div>

        </div>

        {/* Progress */}
        <div className="progress-card">

          <span className="section-label">YOUR PROGRESS</span>
          <h2>Daily Progress</h2>

          <div
            className="progress-circle"
            style={{
              background: `conic-gradient(#bd8990 ${progress}%, #eee5e1 ${progress}% 100%)`
            }}
          >
            <div className="progress-circle-inner">
              <h2>{progress}%</h2>
              <span>Completed</span>
            </div>
          </div>

          <p className="progress-description">
            You've completed {completedTasks} out of {tasks.length} tasks today.
          </p>

          <button
            className="secondary-button"
            onClick={() => navigate("/habits")}
          >
            View My Habits →
          </button>

        </div>

      </section>

      {/* Bottom Message */}
      <footer className="dashboard-footer">
        <span>GlowUp ♡</span>
        <p>Take care of your skin, one day at a time.</p>
      </footer>

    </div>
  );
}

export default Dashboard;

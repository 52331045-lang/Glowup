
import { useState } from "react";
import "./myroutine.css";

function MyRoutine() {
  // MORNING ROUTINE TASKS
  const [morningTasks, setMorningTasks] = useState([
    { id: 1, name: "Cleanser", done: false },
    { id: 2, name: "Toner", done: false },
    { id: 3, name: "Serum", done: false },
    { id: 4, name: "Moisturizer", done: false },
    { id: 5, name: "Sunscreen", done: false },
  ]);

  // EVENING ROUTINE TASKS
  const [eveningTasks, setEveningTasks] = useState([
    { id: 1, name: "Cleanser", done: false },
    { id: 2, name: "Toner", done: false },
    { id: 3, name: "Serum", done: false },
    { id: 4, name: "Moisturizer", done: false },
  ]);

  // TOGGLE MORNING TASK
  function toggleMorningTask(id) {
    setMorningTasks((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  // TOGGLE EVENING TASK
  function toggleEveningTask(id) {
    setEveningTasks((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  return (
    <div className="routine-page">

      {/* HEADER */}
      <div className="routine-header">
        <p>YOUR DAILY SKINCARE</p>

        <h1>My Routine</h1>

        <p>
          Take care of your skin, one step at a time.
        </p>
      </div>

      <div className="routine-sections">

        {/* MORNING ROUTINE */}
        <section className="routine-card">
          <h2> Morning Routine</h2>

          <p>
            Start your day with a fresh skincare routine.
          </p>

          <div className="routine-tasks">
            {morningTasks.map((task) => (
              <label
                className="routine-task"
                key={task.id}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() =>
                    toggleMorningTask(task.id)
                  }
                />

                <span className={task.done ? "completed" : ""}>
                  {task.name}
                </span>
              </label>
            ))}
          </div>

          <p className="routine-progress">
            Completed:{" "}
            {morningTasks.filter((task) => task.done).length}
            {" / "}
            {morningTasks.length}
          </p>
        </section>

        {/* EVENING ROUTINE */}
        <section className="routine-card">
          <h2> Evening Routine</h2>

          <p>
            Give your skin some care before bedtime.
          </p>

          <div className="routine-tasks">
            {eveningTasks.map((task) => (
              <label
                className="routine-task"
                key={task.id}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() =>
                    toggleEveningTask(task.id)
                  }
                />

                <span className={task.done ? "completed" : ""}>
                  {task.name}
                </span>
              </label>
            ))}
          </div>

          <p className="routine-progress">
            Completed:{" "}
            {eveningTasks.filter((task) => task.done).length}
            {" / "}
            {eveningTasks.length}
          </p>
        </section>

      </div>
    </div>
  );
}

export default MyRoutine;

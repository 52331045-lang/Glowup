
import { useState, useEffect } from "react";
import "./myroutine.css";

function MyRoutine() {
  function getSavedTasks(key, defaultTasks) {
  try {
    const savedTasks = localStorage.getItem(key);

    return savedTasks
      ? JSON.parse(savedTasks)
      : defaultTasks;
  } catch {
    return defaultTasks;
  }
}
  // Morning tasks
  const [morningTasks, setMorningTasks] = useState(() =>
  getSavedTasks("glowupMorningTasks", [
    { id: 1, name: "Cleanser", done: false },
    { id: 2, name: "Toner", done: false },
    { id: 3, name: "Serum", done: false },
    { id: 4, name: "Moisturizer", done: false },
    { id: 5, name: "Sunscreen", done: false },
  ])
);
  const [eveningTasks, setEveningTasks] = useState(() =>
  getSavedTasks("glowupEveningTasks", [
    { id: 1, name: "Cleanser", done: false },
    { id: 2, name: "Toner", done: false },
    { id: 3, name: "Serum", done: false },
    { id: 4, name: "Moisturizer", done: false },
  ])
);

  // New task inputs
  const [newMorningTask, setNewMorningTask] = useState("");
  const [newEveningTask, setNewEveningTask] = useState("");

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
  // Mark morning task as completed
  function toggleMorningTask(id) {
    setMorningTasks((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  // Mark evening task as completed
  function toggleEveningTask(id) {
    setEveningTasks((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  // Add morning task
  function addMorningTask() {
    if (newMorningTask.trim() === "") return;

    setMorningTasks((tasks) => [
      ...tasks,
      {
        id: Date.now(),
        name: newMorningTask.trim(),
        done: false,
      },
    ]);

    setNewMorningTask("");
  }

  // Add evening task
  function addEveningTask() {
    if (newEveningTask.trim() === "") return;

    setEveningTasks((tasks) => [
      ...tasks,
      {
        id: Date.now(),
        name: newEveningTask.trim(),
        done: false,
      },
    ]);

    setNewEveningTask("");
  }

  // Remove morning task
  function removeMorningTask(id) {
    setMorningTasks((tasks) =>
      tasks.filter((task) => task.id !== id)
    );
  }

  // Remove evening task
  function removeEveningTask(id) {
    setEveningTasks((tasks) =>
      tasks.filter((task) => task.id !== id)
    );
  }

  return (
    <div className="routine-page">

      {/* Page Header */}
      <div className="routine-header">
        <p>YOUR DAILY SKINCARE</p>
        <h1>My Routine</h1>
        <p>Take care of your skin, one step at a time.</p>
      </div>

      <div className="routine-sections">

        {/* Morning Routine */}
        <section className="routine-card">
          <h2> Morning Routine</h2>

          <p>Start your day with a fresh skincare routine.</p>

          <div className="routine-tasks">
            {morningTasks.map((task) => (
              <div className="routine-task" key={task.id}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleMorningTask(task.id)}
                  aria-label={`Complete ${task.name}`}
                />

                <span className={task.done ? "completed" : ""}>
                  {task.name}
                </span>

                <button
                  type="button"
                  className="remove-task"
                  onClick={() => removeMorningTask(task.id)}
                  aria-label={`Remove ${task.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Add Morning Task */}
          <div className="add-task">
            <input
              type="text"
              placeholder="Add a morning task..."
              value={newMorningTask}
              onChange={(e) => setNewMorningTask(e.target.value)}
            />

            <button type="button" onClick={addMorningTask}>
              + Add
            </button>
          </div>

          {/* Morning Progress */}
          <p className="routine-progress">
            Completed: {morningTasks.filter((task) => task.done).length}
            {" / "}
            {morningTasks.length}
          </p>
        </section>

        {/* Evening Routine */}
        <section className="routine-card">
          <h2> Evening Routine</h2>

          <p>Give your skin some care before bedtime.</p>

          <div className="routine-tasks">
            {eveningTasks.map((task) => (
              <div className="routine-task" key={task.id}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleEveningTask(task.id)}
                  aria-label={`Complete ${task.name}`}
                />

                <span className={task.done ? "completed" : ""}>
                  {task.name}
                </span>

                <button
                  type="button"
                  className="remove-task"
                  onClick={() => removeEveningTask(task.id)}
                  aria-label={`Remove ${task.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Add Evening Task */}
          <div className="add-task">
            <input
              type="text"
              placeholder="Add an evening task..."
              value={newEveningTask}
              onChange={(e) => setNewEveningTask(e.target.value)}
            />

            <button type="button" onClick={addEveningTask}>
              + Add
            </button>
          </div>

          {/* Evening Progress */}
          <p className="routine-progress">
            Completed: {eveningTasks.filter((task) => task.done).length}
            {" / "}
            {eveningTasks.length}
          </p>
        </section>

      </div>
    </div>
  );
}

export default MyRoutine;

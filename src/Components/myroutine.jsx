
import "./myroutine.css";

function MyRoutine() {
  return (
    <div className="routine-page">
      <div className="routine-header">
        <p>YOUR DAILY SKINCARE</p>
        <h1>My Routine</h1>
        <p>
          Take care of your skin, one step at a time.
        </p>
      </div>

      <div className="routine-sections">
        <section className="routine-card">
          <h2>Morning Routine</h2>
          <p>Start your day with a fresh skincare routine.</p>
        </section>

        <section className="routine-card">
          <h2> Evening Routine</h2>
          <p>Give your skin some care before bedtime.</p>
        </section>
      </div>
    </div>
  );
}

export default MyRoutine;

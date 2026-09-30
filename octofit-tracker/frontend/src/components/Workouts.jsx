import { DataView } from './DataView.jsx'

export function Workouts() {
  return (
    <DataView
      component="workouts"
      emptyMessage="No workout suggestions are available yet."
      title="Workouts"
      renderItem={(workout) => (
        <>
          <div className="card-topline">
            <span className="badge text-bg-warning">{workout.difficulty}</span>
            <span>{workout.durationMinutes} min</span>
          </div>
          <h2>{workout.title}</h2>
          <p>{workout.description}</p>
          <ul className="activity-list">
            {(workout.activities ?? []).map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </>
      )}
    />
  )
}
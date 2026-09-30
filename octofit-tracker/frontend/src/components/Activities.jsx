import { DataView } from './DataView.jsx'

const activitiesApiEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`

function formatDate(value) {
  return value ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value)) : 'Not dated'
}

export function Activities() {
  return (
    <DataView
      component="activities"
      endpoint={activitiesApiEndpoint}
      emptyMessage="No activities have been logged yet."
      title="Activities"
      renderItem={(activity) => (
        <>
          <h2>{activity.type}</h2>
          <p>{activity.user?.displayName ?? 'Unassigned athlete'}</p>
          <dl className="metric-list">
            <div>
              <dt>Duration</dt>
              <dd>{activity.durationMinutes} min</dd>
            </div>
            <div>
              <dt>Calories</dt>
              <dd>{activity.caloriesBurned}</dd>
            </div>
            <div>
              <dt>Completed</dt>
              <dd>{formatDate(activity.completedAt)}</dd>
            </div>
          </dl>
        </>
      )}
    />
  )
}
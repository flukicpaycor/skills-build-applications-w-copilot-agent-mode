import { DataView } from './DataView.jsx'

export function Leaderboard() {
  return (
    <DataView
      component="leaderboard"
      emptyMessage="No leaderboard entries are available yet."
      title="Leaderboard"
      renderItem={(entry) => (
        <>
          <div className="rank">#{entry.rank}</div>
          <h2>{entry.user?.displayName ?? 'OctoFit athlete'}</h2>
          <p>{entry.score} points</p>
        </>
      )}
    />
  )
}
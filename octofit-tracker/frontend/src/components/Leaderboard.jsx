import { DataView } from './DataView.jsx'

const leaderboardApiEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`

export function Leaderboard() {
  return (
    <DataView
      component="leaderboard"
      endpoint={leaderboardApiEndpoint}
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
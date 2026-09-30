import { DataView } from './DataView.jsx'

const teamsApiEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`

export function Teams() {
  return (
    <DataView
      component="teams"
      endpoint={teamsApiEndpoint}
      emptyMessage="No teams have been created yet."
      title="Teams"
      renderItem={(team) => (
        <>
          <h2>{team.name}</h2>
          <p>{team.description}</p>
          <span className="badge text-bg-success">{team.members?.length ?? 0} members</span>
        </>
      )}
    />
  )
}
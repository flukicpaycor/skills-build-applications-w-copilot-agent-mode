import { DataView } from './DataView.jsx'

export function Teams() {
  return (
    <DataView
      component="teams"
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
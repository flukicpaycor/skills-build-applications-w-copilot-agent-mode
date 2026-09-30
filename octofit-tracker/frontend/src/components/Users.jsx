import { DataView } from './DataView.jsx'

export function Users() {
  return (
    <DataView
      component="users"
      emptyMessage="No users have joined OctoFit yet."
      title="Users"
      renderItem={(user) => (
        <>
          <h2>{user.displayName ?? user.username}</h2>
          <p>{user.email}</p>
          <span className="badge text-bg-primary">@{user.username}</span>
        </>
      )}
    />
  )
}
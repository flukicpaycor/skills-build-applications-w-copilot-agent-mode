import { DataView } from './DataView.jsx'

const usersApiEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`

export function Users() {
  return (
    <DataView
      component="users"
      endpoint={usersApiEndpoint}
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
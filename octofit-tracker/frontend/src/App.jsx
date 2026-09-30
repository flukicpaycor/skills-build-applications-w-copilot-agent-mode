import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logoUrl from '../../../docs/octofitapp-small.png'
import './App.css'
import { Activities } from './components/Activities.jsx'
import { Leaderboard } from './components/Leaderboard.jsx'
import { Teams } from './components/Teams.jsx'
import { Users } from './components/Users.jsx'
import { Workouts } from './components/Workouts.jsx'
import { apiBaseUrl } from './services/api.js'

const navItems = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/users" aria-label="OctoFit Tracker home">
          <img src={logoUrl} width="48" height="48" alt="OctoFit Tracker" />
          <span>OctoFit Tracker</span>
        </NavLink>

        <nav className="app-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <span>API</span>
        <code>{apiBaseUrl}</code>
      </footer>
    </div>
  )
}

export default App
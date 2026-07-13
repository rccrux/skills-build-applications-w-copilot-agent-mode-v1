import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <header className="bg-dark text-white py-4 border-bottom border-4 border-warning-subtle">
        <div className="container">
          <h1 className="h2 mb-2">OctoFit Tracker</h1>
          <p className="mb-0 text-light-emphasis">
            React 19 presentation tier connected to the Express API.
          </p>
        </div>
      </header>

      <nav className="bg-white border-bottom">
        <div className="container py-2 d-flex flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {!codespaceName && (
        <section className="container pt-3">
          <div className="alert alert-warning mb-0">
            VITE_CODESPACE_NAME is not set. Falling back to http://localhost:8000/api.
          </div>
        </section>
      )}

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

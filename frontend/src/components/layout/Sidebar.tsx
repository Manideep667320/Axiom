import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
  { to: '/', icon: '⬡', label: 'Dashboard' },
  { to: '/topics', icon: '⚡', label: 'Topics' },
  { to: '/feed', icon: '◈', label: 'Feed' },
  { to: '/decisions', icon: '⊘', label: 'Decisions' },
  { to: '/memory', icon: '◎', label: 'Memory' },
  { to: '/system', icon: '⚙', label: 'System' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar" id="app-sidebar">
      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
            id={`nav-${item.label.toLowerCase()}`}
          >
            <span className="sidebar__icon">{item.icon}</span>
            <span className="sidebar__label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <span className="sidebar__version">v1.0.0</span>
      </div>
    </aside>
  );
}

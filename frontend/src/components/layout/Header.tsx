import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  agentStatus?: 'running' | 'stopped' | 'error';
}

export default function Header({ agentStatus = 'running' }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('axiom-theme', theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem('axiom-theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <header className="header" id="app-header">
      <div className="header__left">
        <NavLink to="/" className="header__brand">
          <span className="header__logo-mark">Ax</span>
          <span className="header__logo-text">Axiom</span>
        </NavLink>
        <div className="header__status">
          <span className={`status-dot status-dot--${agentStatus}`} />
          <span className="header__status-label">{agentStatus}</span>
        </div>
      </div>

      <div className="header__right">
        <span className="header__tagline">Autonomous AI Systems Analyst</span>
        <button
          className="header__theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          id="theme-toggle"
        >
          {theme === 'light' ? '◐' : '◑'}
        </button>
      </div>
    </header>
  );
}

import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import TopicsPage from './pages/TopicsPage';
import FeedPage from './pages/FeedPage';
import DecisionsPage from './pages/DecisionsPage';
import MemoryPage from './pages/MemoryPage';
import SystemPage from './pages/SystemPage';
import { useAgent } from './hooks/useAgent';

export default function App() {
  const { status } = useAgent();

  return (
    <div className="app" id="app-root">
      <Header agentStatus={status?.agent?.status || 'stopped'} />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/decisions" element={<DecisionsPage />} />
        <Route path="/memory" element={<MemoryPage />} />
        <Route path="/system" element={<SystemPage />} />
      </Routes>
    </div>
  );
}

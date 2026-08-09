import './AgentStatus.css';
import { formatUptime } from '../../utils/formatDate';

interface AgentStatusProps {
  status: 'running' | 'stopped' | 'error';
  uptimeSeconds: number;
  failureCount: number;
  autonomous: boolean;
}

export default function AgentStatus({ status, uptimeSeconds, failureCount, autonomous }: AgentStatusProps) {
  return (
    <div className="agent-status card animate-fade-in" id="agent-status-card">
      <div className="agent-status__header">
        <h3 className="agent-status__title">Agent Status</h3>
        <span className={`badge badge--${status === 'running' ? 'sage' : status === 'error' ? 'terracotta' : 'slate'}`}>
          <span className={`status-dot status-dot--${status}`} />
          {status}
        </span>
      </div>

      <div className="agent-status__grid">
        <div className="stat-tile">
          <span className="stat-tile__value">{formatUptime(uptimeSeconds)}</span>
          <span className="stat-tile__label">Uptime</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__value">{failureCount}</span>
          <span className="stat-tile__label">Failures</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__value">{autonomous ? 'Yes' : 'No'}</span>
          <span className="stat-tile__label">Autonomous</span>
        </div>
      </div>
    </div>
  );
}

import type { ServiceHealth } from '../../types/source';
import './SourceHealth.css';

interface SourceHealthProps {
  services: ServiceHealth;
  timestamp: string;
}

export default function SourceHealth({ services, timestamp }: SourceHealthProps) {
  const items = [
    { name: 'API Server', status: services.api, icon: '⚡' },
    { name: 'PostgreSQL', status: services.database, icon: '⛁' },
    { name: 'Redis', status: services.redis, icon: '◆' },
  ];

  return (
    <div className="source-health" id="source-health">
      {items.map((item, i) => (
        <div key={item.name} className={`source-health__item card-flat animate-fade-in stagger-${i + 1}`}>
          <div className="source-health__header">
            <span className="source-health__icon">{item.icon}</span>
            <span className="source-health__name">{item.name}</span>
          </div>
          <div className="source-health__status">
            <span className={`status-dot ${item.status === 'ok' ? 'status-dot--healthy' : 'status-dot--unhealthy'}`} />
            <span className={`source-health__label ${item.status === 'ok' ? 'text-sage' : 'text-terracotta'}`}>
              {item.status === 'ok' ? 'Healthy' : 'Unhealthy'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

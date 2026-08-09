import { useEffect, useState } from 'react';
import { formatUptime } from '../../utils/formatDate';
import './AutonomousIndicator.css';

interface AutonomousIndicatorProps {
  isAutonomous: boolean;
  uptimeSeconds: number;
}

export default function AutonomousIndicator({ isAutonomous, uptimeSeconds }: AutonomousIndicatorProps) {
  const [liveUptime, setLiveUptime] = useState(uptimeSeconds);

  useEffect(() => {
    setLiveUptime(uptimeSeconds);
    const interval = setInterval(() => setLiveUptime(v => v + 1), 1000);
    return () => clearInterval(interval);
  }, [uptimeSeconds]);

  return (
    <div className={`autonomous-indicator ${isAutonomous ? 'autonomous-indicator--active' : ''}`} id="autonomous-indicator">
      <div className="autonomous-indicator__dot-wrapper">
        <span className={`autonomous-indicator__dot ${isAutonomous ? 'autonomous-indicator__dot--pulse' : ''}`} />
      </div>
      <div className="autonomous-indicator__info">
        <span className="autonomous-indicator__label">
          {isAutonomous ? 'Autonomous Mode' : 'Inactive'}
        </span>
        <span className="autonomous-indicator__uptime">
          {formatUptime(liveUptime)}
        </span>
      </div>
    </div>
  );
}

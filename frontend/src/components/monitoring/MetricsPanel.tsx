import './MetricsPanel.css';

interface MetricsPanelProps {
  metrics: { label: string; value: number | string; color?: string }[];
}

export default function MetricsPanel({ metrics }: MetricsPanelProps) {
  return (
    <div className="metrics-panel" id="metrics-panel">
      {metrics.map((metric, i) => (
        <div key={metric.label} className={`metrics-panel__tile card-flat animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
          <span className={`stat-tile__value ${metric.color ? `text-${metric.color}` : ''}`}>
            {metric.value}
          </span>
          <span className="stat-tile__label">{metric.label}</span>
        </div>
      ))}
    </div>
  );
}

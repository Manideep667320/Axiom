import './RuntimeStats.css';

interface RuntimeStatsProps {
  topicsDiscovered: number;
  topicsRejected: number;
  topicsAccepted: number;
  postsPublished: number;
  totalRuns: number;
}

export default function RuntimeStats({
  topicsDiscovered,
  topicsRejected,
  topicsAccepted,
  postsPublished,
  totalRuns,
}: RuntimeStatsProps) {
  const stats = [
    { value: topicsDiscovered, label: 'Discovered', color: 'amber' },
    { value: topicsAccepted, label: 'Accepted', color: 'sage' },
    { value: topicsRejected, label: 'Rejected', color: 'terracotta' },
    { value: postsPublished, label: 'Published', color: 'amber' },
    { value: totalRuns, label: 'Cycles', color: 'slate' },
  ];

  return (
    <div className="runtime-stats" id="runtime-stats">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`runtime-stats__tile card-flat animate-slide-up stagger-${i + 1}`}
        >
          <span className={`runtime-stats__value text-${stat.color}`}>
            {stat.value}
          </span>
          <span className="runtime-stats__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

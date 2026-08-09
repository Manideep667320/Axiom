import './MemoryStats.css';

interface MemoryStatsProps {
  topicCount: number;
  postCount: number;
  narrativeCount: number;
}

export default function MemoryStats({ topicCount, postCount, narrativeCount }: MemoryStatsProps) {
  const layers = [
    {
      name: 'Episodic Memory',
      description: 'Topics, decisions, and published posts',
      value: topicCount + postCount,
      icon: '◈',
    },
    {
      name: 'Semantic Memory',
      description: 'pgvector embeddings for similarity & retrieval',
      value: topicCount,
      icon: '◎',
    },
    {
      name: 'Narrative Memory',
      description: 'Ongoing themes, editorial stances, and continuity',
      value: narrativeCount,
      icon: '⬡',
    },
  ];

  return (
    <div className="memory-stats" id="memory-stats">
      {layers.map((layer, i) => (
        <div key={layer.name} className={`memory-stats__layer card-flat animate-slide-up stagger-${i + 1}`}>
          <div className="memory-stats__icon">{layer.icon}</div>
          <div className="memory-stats__info">
            <h4 className="memory-stats__name">{layer.name}</h4>
            <p className="memory-stats__desc">{layer.description}</p>
          </div>
          <div className="memory-stats__count">
            <span className="stat-tile__value">{layer.value}</span>
            <span className="stat-tile__label">Entries</span>
          </div>
        </div>
      ))}
    </div>
  );
}

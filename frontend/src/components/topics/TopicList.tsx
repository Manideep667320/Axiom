import type { DiscoveredTopic } from '../../types/topic';
import { formatRelativeTime } from '../../utils/formatDate';
import './TopicList.css';

interface TopicListProps {
  topics: DiscoveredTopic[];
}

export default function TopicList({ topics }: TopicListProps) {
  if (topics.length === 0) {
    return (
      <div className="empty-state" id="topics-empty">
        <span className="empty-state__icon">⚡</span>
        <h3 className="empty-state__title">No topics discovered yet</h3>
        <p className="empty-state__text">
          Axiom will discover topics automatically from RSS, arXiv, GitHub, and Hacker News.
        </p>
      </div>
    );
  }

  const getBadgeVariant = (state: string) => {
    switch (state) {
      case 'PUBLISHED':
      case 'ACCEPTED':
        return 'sage';
      case 'REJECTED':
      case 'FAILED':
        return 'terracotta';
      case 'EVALUATING':
      case 'PLANNING':
      case 'GENERATING':
        return 'amber';
      default:
        return 'slate';
    }
  };

  return (
    <div className="topic-list" id="topic-list">
      {topics.map((topic, i) => (
        <div key={topic.id} className={`topic-card card-flat animate-slide-up stagger-${Math.min(i + 1, 6)}`}>
          <div className="topic-card__header">
            <div className="topic-card__badges">
              <span className={`badge badge--${getBadgeVariant(topic.jobState)}`}>
                {topic.jobState}
              </span>
              <span className="badge badge--slate">{topic.sourceType}</span>
            </div>
            <time className="text-mono text-xs text-slate">{formatRelativeTime(topic.discoveredAt)}</time>
          </div>
          <h4 className="topic-card__title">
            <a href={topic.url} target="_blank" rel="noopener noreferrer">
              {topic.title}
            </a>
          </h4>
          <p className="topic-card__summary">{topic.summary}</p>
        </div>
      ))}
    </div>
  );
}

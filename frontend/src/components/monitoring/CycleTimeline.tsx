import type { AgentRun } from '../../types/agent';
import { formatRelativeTime, formatDuration } from '../../utils/formatDate';
import './CycleTimeline.css';

interface CycleTimelineProps {
  runs: AgentRun[];
}

export default function CycleTimeline({ runs }: CycleTimelineProps) {
  if (runs.length === 0) {
    return (
      <div className="empty-state" id="timeline-empty">
        <span className="empty-state__icon">◎</span>
        <h3 className="empty-state__title">No cycles yet</h3>
        <p className="empty-state__text">Autonomous cycle history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="cycle-timeline" id="cycle-timeline">
      {runs.map((run, i) => (
        <div key={run.id} className={`cycle-timeline__item animate-slide-up stagger-${Math.min(i + 1, 6)}`}>
          <div className="cycle-timeline__dot-col">
            <span className={`cycle-timeline__dot status-dot status-dot--${run.status === 'completed' ? 'healthy' : run.status === 'failed' ? 'error' : 'running'}`} />
            {i < runs.length - 1 && <span className="cycle-timeline__line" />}
          </div>
          <div className="cycle-timeline__content">
            <div className="cycle-timeline__header">
              <span className={`badge badge--${run.status === 'completed' ? 'sage' : run.status === 'failed' ? 'terracotta' : 'amber'} badge--sm`}>
                {run.status}
              </span>
              <time className="text-mono text-xs text-slate">{formatRelativeTime(run.startedAt)}</time>
            </div>
            <div className="cycle-timeline__stats">
              <span className="cycle-timeline__stat">
                <strong>{run.topicsDiscovered}</strong> discovered
              </span>
              <span className="cycle-timeline__stat">
                <strong>{run.topicsAccepted}</strong> accepted
              </span>
              <span className="cycle-timeline__stat">
                <strong>{run.topicsRejected}</strong> rejected
              </span>
              <span className="cycle-timeline__stat">
                <strong>{run.postsPublished}</strong> published
              </span>
              <span className="cycle-timeline__stat text-slate">
                {formatDuration(run.startedAt, run.completedAt)}
              </span>
            </div>
            {run.errorMessage && (
              <p className="cycle-timeline__error">{run.errorMessage}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

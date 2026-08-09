import type { Decision } from '../../types/decision';
import DecisionScore from './DecisionScore';
import { formatRelativeTime } from '../../utils/formatDate';
import { getDecisionBadge } from '../../utils/formatScore';
import './DecisionCard.css';

interface DecisionCardProps {
  decision: Decision;
  index: number;
}

export default function DecisionCard({ decision, index }: DecisionCardProps) {
  const badge = getDecisionBadge(decision.decision);

  return (
    <div className={`decision-card card-flat animate-slide-up stagger-${Math.min(index + 1, 6)}`} id={`decision-${decision.id}`}>
      <div className="decision-card__top">
        <div className="decision-card__meta">
          <span className={`badge badge--${badge.variant}`}>{badge.label}</span>
          <time className="text-mono text-xs text-slate">{formatRelativeTime(decision.createdAt)}</time>
        </div>
        <DecisionScore score={decision.score} />
      </div>

      {decision.topicTitle && (
        <h4 className="decision-card__title">{decision.topicTitle}</h4>
      )}

      <p className="decision-card__reason">{decision.reason}</p>
    </div>
  );
}

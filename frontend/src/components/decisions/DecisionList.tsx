import { useState } from 'react';
import type { Decision } from '../../types/decision';
import DecisionCard from './DecisionCard';
import './DecisionList.css';

interface DecisionListProps {
  decisions: Decision[];
}

type Filter = 'all' | 'accepted' | 'rejected';

export default function DecisionList({ decisions }: DecisionListProps) {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = filter === 'all'
    ? decisions
    : decisions.filter(d => d.decision === filter);

  const counts = {
    all: decisions.length,
    accepted: decisions.filter(d => d.decision === 'accepted').length,
    rejected: decisions.filter(d => d.decision === 'rejected').length,
  };

  if (decisions.length === 0) {
    return (
      <div className="empty-state" id="decisions-empty">
        <span className="empty-state__icon">⊘</span>
        <h3 className="empty-state__title">No decisions yet</h3>
        <p className="empty-state__text">
          Editorial decisions will appear here as Axiom evaluates discovered topics.
        </p>
      </div>
    );
  }

  return (
    <div className="decision-list" id="decision-list">
      <div className="decision-list__filters">
        {(['all', 'accepted', 'rejected'] as Filter[]).map(f => (
          <button
            key={f}
            className={`decision-list__filter ${filter === f ? 'decision-list__filter--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="decision-list__count">{counts[f]}</span>
          </button>
        ))}
      </div>
      <div className="decision-list__items">
        {filtered.map((d, i) => (
          <DecisionCard key={d.id} decision={d} index={i} />
        ))}
      </div>
    </div>
  );
}

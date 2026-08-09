import type { Rationale } from '../../types/post';
import './RationalePanel.css';

interface RationalePanelProps {
  rationale: Rationale;
}

export default function RationalePanel({ rationale }: RationalePanelProps) {
  return (
    <div className="rationale-panel animate-fade-in" id="rationale-panel">
      <div className="rationale-panel__section">
        <h4 className="rationale-panel__heading">Why Selected</h4>
        <p className="rationale-panel__text">{rationale.whySelected}</p>
      </div>
      <div className="rationale-panel__section">
        <h4 className="rationale-panel__heading">Why Relevant Now</h4>
        <p className="rationale-panel__text">{rationale.whyRelevantNow}</p>
      </div>
      {rationale.whyThisOverAlternatives && (
        <div className="rationale-panel__section">
          <h4 className="rationale-panel__heading">Why This Over Alternatives</h4>
          <p className="rationale-panel__text">{rationale.whyThisOverAlternatives}</p>
        </div>
      )}
    </div>
  );
}

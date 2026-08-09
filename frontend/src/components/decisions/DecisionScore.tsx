import { formatScore, getScoreLevel, getScoreBarWidth, getScoreTier } from '../../utils/formatScore';
import './DecisionScore.css';

interface DecisionScoreProps {
  score: number;
}

export default function DecisionScore({ score }: DecisionScoreProps) {
  const level = getScoreLevel(score);

  return (
    <div className="decision-score">
      <span className={`decision-score__value decision-score__value--${level}`}>
        {formatScore(score)}
      </span>
      <div className="decision-score__bar">
        <div
          className={`score-bar__fill score-bar__fill--${level}`}
          style={{ width: `${getScoreBarWidth(score)}%` }}
        />
      </div>
      <span className="decision-score__tier">{getScoreTier(score)}</span>
    </div>
  );
}

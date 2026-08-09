import './PersonaCard.css';

interface PersonaCardProps {
  name: string;
  role: string;
  status: 'running' | 'stopped' | 'error';
}

export default function PersonaCard({ name, role, status }: PersonaCardProps) {
  return (
    <div className="persona-card card animate-fade-in" id="persona-card">
      <div className="persona-card__monogram">
        {name.charAt(0)}
      </div>
      <div className="persona-card__info">
        <h2 className="persona-card__name">{name}</h2>
        <p className="persona-card__role">{role}</p>
        <p className="persona-card__mission">
          Track meaningful developments across AI engineering and technology —
          explain why they matter to engineers, builders, and researchers.
        </p>
      </div>
      <div className="persona-card__pulse">
        <span className={`status-dot status-dot--${status}`} />
        <span className="persona-card__pulse-label">
          {status === 'running' ? 'Autonomously operating' : status}
        </span>
      </div>
    </div>
  );
}

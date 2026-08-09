import type { ReactNode } from 'react';
import './PageContainer.css';

interface PageContainerProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function PageContainer({ title, subtitle, actions, children }: PageContainerProps) {
  return (
    <main className="page-container" id={`page-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="page-container__header">
        <div>
          <h1 className="page-container__title">{title}</h1>
          {subtitle && <p className="page-container__subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="page-container__actions">{actions}</div>}
      </div>
      <div className="page-container__content animate-fade-in">
        {children}
      </div>
    </main>
  );
}

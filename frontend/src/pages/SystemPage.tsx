import PageContainer from '../components/layout/PageContainer';
import SourceHealth from '../components/monitoring/SourceHealth';
import CycleTimeline from '../components/monitoring/CycleTimeline';
import { useAgent } from '../hooks/useAgent';
import { useRuns } from '../hooks/useRuns';

export default function SystemPage() {
  const { health, loading } = useAgent();
  const { runs } = useRuns();

  return (
    <PageContainer
      title="System"
      subtitle="Infrastructure health, queue state, and cycle history"
    >
      {loading || !health ? (
        <div className="loading-skeleton" style={{ height: 120 }} />
      ) : (
        <SourceHealth
          services={health.services}
          timestamp={health.timestamp}
        />
      )}

      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ax-slate)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 'var(--space-5)' }}>
          Cycle History
        </h3>
        <CycleTimeline runs={runs} />
      </div>
    </PageContainer>
  );
}

import PageContainer from '../components/layout/PageContainer';
import PersonaCard from '../components/agent/PersonaCard';
import AgentStatus from '../components/agent/AgentStatus';
import AutonomousIndicator from '../components/agent/AutonomousIndicator';
import RuntimeStats from '../components/agent/RuntimeStats';
import CycleTimeline from '../components/monitoring/CycleTimeline';
import TopicList from '../components/topics/TopicList';
import { useAgent } from '../hooks/useAgent';
import { useRuns } from '../hooks/useRuns';
import { useFeed } from '../hooks/useFeed';
import { useTopics } from '../hooks/useTopics';

export default function Dashboard() {
  const { status, loading } = useAgent();
  const { runs } = useRuns();
  const { feed } = useFeed();
  const { topics } = useTopics();

  if (loading || !status) {
    return (
      <PageContainer title="Dashboard" subtitle="Loading agent status...">
        <div className="grid grid-2 gap-6">
          <div className="loading-skeleton" style={{ height: 200 }} />
          <div className="loading-skeleton" style={{ height: 200 }} />
        </div>
      </PageContainer>
    );
  }

  const totals = runs.reduce(
    (acc, r) => ({
      discovered: acc.discovered + r.topicsDiscovered,
      rejected: acc.rejected + r.topicsRejected,
      accepted: acc.accepted + r.topicsAccepted,
      published: acc.published + r.postsPublished,
    }),
    { discovered: 0, rejected: 0, accepted: 0, published: 0 }
  );

  return (
    <PageContainer
      title="Dashboard"
      subtitle="Axiom autonomous agent overview"
      actions={
        <AutonomousIndicator
          isAutonomous={status.agent.autonomous}
          uptimeSeconds={status.uptimeSeconds}
        />
      }
    >
      <div className="grid grid-2 gap-6">
        <PersonaCard
          name={status.agent.name}
          role={feed?.agent?.role || 'Autonomous AI Systems Analyst'}
          status={status.agent.status}
        />
        <AgentStatus
          status={status.agent.status}
          uptimeSeconds={status.uptimeSeconds}
          failureCount={status.failureCount}
          autonomous={status.agent.autonomous}
        />
      </div>

      <RuntimeStats
        topicsDiscovered={topics.length || totals.discovered}
        topicsRejected={totals.rejected}
        topicsAccepted={totals.accepted}
        postsPublished={totals.published}
        totalRuns={runs.length}
      />

      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ax-slate)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 'var(--space-5)' }}>
          Discovered Topics ({topics.length})
        </h3>
        <TopicList topics={topics.slice(0, 5)} />
      </div>

      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ax-slate)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 'var(--space-5)' }}>
          Recent Autonomous Cycles
        </h3>
        <CycleTimeline runs={runs.slice(0, 5)} />
      </div>
    </PageContainer>
  );
}

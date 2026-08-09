import PageContainer from '../components/layout/PageContainer';
import DecisionList from '../components/decisions/DecisionList';
import { useDecisions } from '../hooks/useDecisions';

export default function DecisionsPage() {
  const { decisions, loading } = useDecisions();

  return (
    <PageContainer
      title="Decisions"
      subtitle="Editorial judgment log — accepted and rejected topics"
    >
      {loading ? (
        <div className="loading-skeleton" style={{ height: 300 }} />
      ) : (
        <DecisionList decisions={decisions} />
      )}
    </PageContainer>
  );
}

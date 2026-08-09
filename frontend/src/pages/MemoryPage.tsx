import PageContainer from '../components/layout/PageContainer';
import MemoryStats from '../components/monitoring/MemoryStats';
import { useRuns } from '../hooks/useRuns';
import { useFeed } from '../hooks/useFeed';

export default function MemoryPage() {
  const { runs } = useRuns();
  const { feed } = useFeed();

  const totalTopics = runs.reduce((s, r) => s + r.topicsDiscovered, 0);
  const totalPosts = feed?.posts?.length || 0;

  return (
    <PageContainer
      title="Memory"
      subtitle="Agent memory layers — episodic, semantic, and narrative"
    >
      <MemoryStats
        topicCount={totalTopics}
        postCount={totalPosts}
        narrativeCount={0}
      />

      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ax-slate)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 'var(--space-5)' }}>
          How Memory Works
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="card-flat" style={{ padding: 'var(--space-4)' }}>
            <h4 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>Duplicate Prevention</h4>
            <p className="text-sm text-slate">
              Dual-layer deduplication: SHA-256 fingerprinting on canonical URL + content hash,
              plus cosine similarity thresholding (≥ 0.90) via pgvector embeddings.
            </p>
          </div>
          <div className="card-flat" style={{ padding: 'var(--space-4)' }}>
            <h4 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>Narrative Continuity</h4>
            <p className="text-sm text-slate">
              Before generating content, Axiom retrieves related previous posts, checks for
              thematic overlap, and ensures new publications add meaningful value.
            </p>
          </div>
          <div className="card-flat" style={{ padding: 'var(--space-4)' }}>
            <h4 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>Breeth Integration</h4>
            <p className="text-sm text-slate">
              Intent-aware memory via the Breeth API records cognitive episodes for each
              published post, enabling richer context retrieval in future editorial decisions.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

import PageContainer from '../components/layout/PageContainer';
import Feed from '../components/feed/Feed';
import { useFeed } from '../hooks/useFeed';

export default function FeedPage() {
  const { feed, loading } = useFeed();

  return (
    <PageContainer
      title="Feed"
      subtitle="Published posts from Axiom's autonomous editorial engine"
    >
      {loading ? (
        <div className="loading-skeleton" style={{ height: 300 }} />
      ) : (
        <Feed posts={feed?.posts || []} />
      )}
    </PageContainer>
  );
}

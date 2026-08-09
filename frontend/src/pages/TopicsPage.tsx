import PageContainer from '../components/layout/PageContainer';
import TopicList from '../components/topics/TopicList';
import { useTopics } from '../hooks/useTopics';

export default function TopicsPage() {
  const { topics, loading } = useTopics();

  return (
    <PageContainer
      title="Discovered Topics"
      subtitle="Live topics fetched from RSS, arXiv, GitHub, and Hacker News for autonomous evaluation"
    >
      {loading ? (
        <div className="loading-skeleton" style={{ height: 300 }} />
      ) : (
        <TopicList topics={topics} />
      )}
    </PageContainer>
  );
}

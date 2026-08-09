import type { Post } from '../../types/post';
import PostCard from './PostCard';
import './Feed.css';

interface FeedProps {
  posts: Post[];
}

export default function Feed({ posts }: FeedProps) {
  if (posts.length === 0) {
    return (
      <div className="empty-state" id="feed-empty">
        <span className="empty-state__icon">◈</span>
        <h3 className="empty-state__title">No posts yet</h3>
        <p className="empty-state__text">
          Axiom is autonomously discovering and evaluating topics. Posts will appear
          here once the editorial engine approves content for publication.
        </p>
      </div>
    );
  }

  return (
    <div className="feed" id="feed-list">
      {posts.map((post, i) => (
        <PostCard key={post.id} post={post} index={i} />
      ))}
    </div>
  );
}

import { useState } from 'react';
import type { Post } from '../../types/post';
import RationalePanel from './RationalePanel';
import SourceList from './SourceList';
import { formatRelativeTime } from '../../utils/formatDate';
import { formatScore, getScoreLevel, getScoreBarWidth } from '../../utils/formatScore';
import './PostCard.css';

interface PostCardProps {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const level = getScoreLevel(post.rationale.editorialScore);

  return (
    <article
      className={`post-card card animate-slide-up stagger-${Math.min(index + 1, 6)}`}
      id={`post-${post.id}`}
    >
      <div className="post-card__header">
        <time className="post-card__time text-mono text-xs text-slate">
          {formatRelativeTime(post.publishedAt)}
        </time>
        <div className="post-card__score">
          <span className={`post-card__score-value text-${level === 'high' ? 'sage' : level === 'medium' ? 'amber' : 'terracotta'}`}>
            {formatScore(post.rationale.editorialScore)}
          </span>
          <div className="score-bar" style={{ width: 60 }}>
            <div
              className={`score-bar__fill score-bar__fill--${level}`}
              style={{ width: `${getScoreBarWidth(post.rationale.editorialScore)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="post-card__content">
        <p>{post.content}</p>
      </div>

      {post.rationale.sources.length > 0 && (
        <SourceList sources={post.rationale.sources} />
      )}

      <button
        className="post-card__toggle btn btn--ghost btn--sm"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {expanded ? 'Hide rationale' : 'Show rationale'}
      </button>

      {expanded && <RationalePanel rationale={post.rationale} />}
    </article>
  );
}

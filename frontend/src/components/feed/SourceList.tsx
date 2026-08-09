import type { PostSource } from '../../types/post';
import './SourceList.css';

interface SourceListProps {
  sources: PostSource[];
}

export default function SourceList({ sources }: SourceListProps) {
  if (sources.length === 0) return null;

  return (
    <div className="source-list">
      {sources.map((source, i) => (
        <a
          key={i}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="source-list__pill"
        >
          {source.title || new URL(source.url).hostname}
        </a>
      ))}
    </div>
  );
}

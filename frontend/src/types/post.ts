export interface PostSource {
  title: string;
  url: string;
}

export interface Rationale {
  whySelected: string;
  whyRelevantNow: string;
  whyThisOverAlternatives: string;
  editorialScore: number;
  sources: PostSource[];
  supportingContext?: string[];
}

export interface Post {
  id: string;
  publishedAt: string;
  content: string;
  title?: string;
  rationale: Rationale;
}

export interface FeedResponse {
  agent: {
    id: string;
    name: string;
    role: string;
  };
  posts: Post[];
}

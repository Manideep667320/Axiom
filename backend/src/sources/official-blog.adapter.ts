import { RSSAdapter } from './rss.adapter';

export class OfficialBlogAdapter extends RSSAdapter {
  override type = 'official_blog' as const;
}

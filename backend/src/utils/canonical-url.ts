export function normalizeCanonicalUrl(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl);
    // Strip common tracking params
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref', 'gclid'].forEach((param) => {
      parsed.searchParams.delete(param);
    });
    let href = parsed.toString();
    if (href.endsWith('/')) {
      href = href.slice(0, -1);
    }
    return href.toLowerCase();
  } catch {
    return rawUrl.trim().toLowerCase();
  }
}

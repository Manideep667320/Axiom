/**
 * Get the tier label for a score
 */
export function getScoreTier(score: number): string {
  if (score >= 9.0) return 'Priority';
  if (score >= 8.0) return 'Publishable';
  if (score >= 6.0) return 'Monitor';
  return 'Reject';
}

/**
 * Get the CSS class suffix for a score
 */
export function getScoreLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 8.0) return 'high';
  if (score >= 6.0) return 'medium';
  return 'low';
}

/**
 * Get the badge variant for a score
 */
export function getScoreBadgeVariant(score: number): 'sage' | 'amber' | 'terracotta' {
  if (score >= 8.0) return 'sage';
  if (score >= 6.0) return 'amber';
  return 'terracotta';
}

/**
 * Format a score to one decimal place
 */
export function formatScore(score: number): string {
  return score.toFixed(1);
}

/**
 * Get the bar width as a percentage (score out of 10)
 */
export function getScoreBarWidth(score: number): number {
  return Math.min(Math.max((score / 10) * 100, 0), 100);
}

/**
 * Get the decision badge variant
 */
export function getDecisionBadge(decision: string): { variant: string; label: string } {
  switch (decision) {
    case 'accepted':
      return { variant: 'sage', label: 'Accepted' };
    case 'rejected':
      return { variant: 'terracotta', label: 'Rejected' };
    case 'monitoring':
      return { variant: 'amber', label: 'Monitoring' };
    case 'queued':
      return { variant: 'slate', label: 'Queued' };
    default:
      return { variant: 'slate', label: decision };
  }
}

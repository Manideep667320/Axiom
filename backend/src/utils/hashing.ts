import crypto from 'crypto';

export function generateSHA256(content: string): string {
  return crypto.createHash('sha256').update(content.trim().toLowerCase()).digest('hex');
}

export function generateFingerprint(title: string, summary: string): string {
  const normalized = `${title.toLowerCase().trim()}|${summary.slice(0, 100).toLowerCase().trim()}`;
  return crypto.createHash('md5').update(normalized).digest('hex');
}

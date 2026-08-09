import { describe, it, expect } from 'vitest';
import { normalizeCanonicalUrl } from '../../src/utils/canonical-url';
import { generateSHA256, generateFingerprint } from '../../src/utils/hashing';

describe('Deduplication Utility Tests', () => {
  it('should clean and normalize tracking query params from canonical URLs', () => {
    const raw = 'HTTPS://OpenAI.com/blog/new-model?utm_source=twitter&utm_medium=social&ref=123/';
    const normalized = normalizeCanonicalUrl(raw);
    expect(normalized).toBe('https://openai.com/blog/new-model');
  });

  it('should produce identical SHA-256 hash for identical normalized content', () => {
    const contentA = '   Autonomous AI Agent System Released  ';
    const contentB = 'autonomous ai agent system released';
    expect(generateSHA256(contentA)).toBe(generateSHA256(contentB));
  });

  it('should generate consistent MD5 topic fingerprints', () => {
    const title = 'New Model Release';
    const summary = 'A groundbreaking release for autonomous agentic systems.';
    const fp1 = generateFingerprint(title, summary);
    const fp2 = generateFingerprint('NEW MODEL RELEASE', summary);
    expect(fp1).toBe(fp2);
  });
});

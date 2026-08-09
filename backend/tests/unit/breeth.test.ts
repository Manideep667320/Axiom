import { describe, it, expect } from 'vitest';
import { BreethMemoryProvider } from '../../src/memory/providers/breeth.provider';

describe('Breeth API Memory Provider Unit Tests', () => {
  it('should report non-configured state when API key is missing', () => {
    const provider = new BreethMemoryProvider('', 'https://api.thebreeth.com/v1');
    expect(provider.isConfigured()).toBe(false);
  });

  it('should report configured state when API key is provided', () => {
    const provider = new BreethMemoryProvider('test_breeth_key_123', 'https://api.thebreeth.com/v1');
    expect(provider.isConfigured()).toBe(true);
  });
});

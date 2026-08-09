import { LLMProvider } from './llm.interface';
import { OpenAIProvider } from './providers/openai.provider';
import { AnthropicProvider } from './providers/anthropic.provider';
import { OllamaProvider } from './providers/ollama.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { config } from '../config/env';

export class LLMProviderFactory {
  static getProvider(): LLMProvider {
    // Auto-detect Gemini key format (starting with AQ or AIza)
    const rawKey = config.OPENAI_API_KEY || config.ANTHROPIC_API_KEY || '';
    if (config.LLM_PROVIDER === 'gemini' || rawKey.startsWith('AQ') || rawKey.startsWith('AIza')) {
      return new GeminiProvider(rawKey);
    }

    switch (config.LLM_PROVIDER) {
      case 'anthropic':
        return new AnthropicProvider();
      case 'ollama':
        return new OllamaProvider();
      case 'openai':
      default:
        return new OpenAIProvider();
    }
  }
}

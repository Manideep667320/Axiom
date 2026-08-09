import axios from 'axios';
import { LLMProvider, LLMCompletionOptions } from '../llm.interface';
import { config } from '../../config/env';
import { logger } from '../../config/logger';

export class AnthropicProvider implements LLMProvider {
  name = 'anthropic';
  private apiKey: string;

  constructor(apiKey: string = config.ANTHROPIC_API_KEY) {
    this.apiKey = apiKey;
  }

  async generateCompletion(prompt: string, options?: LLMCompletionOptions): Promise<string> {
    if (!this.apiKey) {
      logger.warn('Anthropic API key missing. Returning mock completion response.');
      return 'Mock Anthropic completion response.';
    }

    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: options?.maxTokens ?? 1500,
          temperature: options?.temperature ?? 0.7,
          system: options?.systemPrompt,
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          timeout: 45000,
        }
      );

      return response.data.content[0]?.text || '';
    } catch (err) {
      logger.error({ err }, 'Anthropic API call failed');
      throw err;
    }
  }

  async generateStructuredOutput<T>(prompt: string, schemaDescription: string, options?: LLMCompletionOptions): Promise<T> {
    const fullPrompt = `${prompt}\n\nStrict JSON output required matching: ${schemaDescription}. Do not include markdown codeblocks.`;
    const raw = await this.generateCompletion(fullPrompt, { ...options, temperature: 0.2 });
    const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson) as T;
  }

  async generateEmbeddings(text: string): Promise<number[]> {
    return new Array(1536).fill(0.01);
  }
}

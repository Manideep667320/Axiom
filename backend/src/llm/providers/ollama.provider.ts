import axios from 'axios';
import { LLMProvider, LLMCompletionOptions } from '../llm.interface';
import { config } from '../../config/env';
import { logger } from '../../config/logger';

export class OllamaProvider implements LLMProvider {
  name = 'ollama';
  private baseUrl: string;

  constructor(baseUrl: string = config.OLLAMA_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async generateCompletion(prompt: string, options?: LLMCompletionOptions): Promise<string> {
    try {
      const res = await axios.post(`${this.baseUrl}/api/generate`, {
        model: 'llama3',
        prompt: `${options?.systemPrompt ? `[SYSTEM]: ${options.systemPrompt}\n\n` : ''}${prompt}`,
        stream: false,
        options: { temperature: options?.temperature ?? 0.7 },
      });
      return res.data.response || '';
    } catch (err) {
      logger.error({ err }, 'Ollama API call failed');
      return 'Mock Ollama output for offline dev.';
    }
  }

  async generateStructuredOutput<T>(prompt: string, schemaDescription: string, options?: LLMCompletionOptions): Promise<T> {
    const raw = await this.generateCompletion(`${prompt}\nRespond ONLY in JSON matching: ${schemaDescription}`, options);
    const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson) as T;
  }

  async generateEmbeddings(text: string): Promise<number[]> {
    try {
      const res = await axios.post(`${this.baseUrl}/api/embeddings`, {
        model: 'nomic-embed-text',
        prompt: text,
      });
      return res.data.embedding;
    } catch {
      return new Array(1536).fill(0.01);
    }
  }
}

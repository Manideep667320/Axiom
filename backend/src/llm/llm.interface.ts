export interface LLMCompletionOptions {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface LLMProvider {
  name: string;
  generateCompletion(prompt: string, options?: LLMCompletionOptions): Promise<string>;
  generateStructuredOutput<T>(prompt: string, schemaDescription: string, options?: LLMCompletionOptions): Promise<T>;
  generateEmbeddings(text: string): Promise<number[]>;
}

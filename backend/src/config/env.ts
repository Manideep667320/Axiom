import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  
  DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5432/axiom?schema=public'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  
  LLM_PROVIDER: z.enum(['openai', 'anthropic', 'ollama', 'gemini']).default('openai'),
  OPENAI_API_KEY: z.string().optional().default(''),
  ANTHROPIC_API_KEY: z.string().optional().default(''),
  OLLAMA_BASE_URL: z.string().optional().default('http://localhost:11434'),
  
  EMBEDDING_PROVIDER: z.enum(['openai', 'local']).default('openai'),
  EMBEDDING_MODEL: z.string().default('text-embedding-3-small'),
  
  BREETH_API_KEY: z.string().optional().default(''),
  BREETH_API_URL: z.string().default('https://api.thebreeth.com/v1'),
  
  AGENT_ID: z.string().default('agent_axiom'),
  
  DISCOVERY_INTERVAL_MINUTES: z.coerce.number().default(30),
  MIN_PUBLISH_INTERVAL_MINUTES: z.coerce.number().default(90),
  MAX_POSTS_PER_24H: z.coerce.number().default(8),
  
  MOCK_SOURCES_ENABLED: z.coerce.boolean().default(false),
  LOG_LEVEL: z.string().default('info'),
});

export const config = envSchema.parse(process.env);
export type Config = z.infer<typeof envSchema>;

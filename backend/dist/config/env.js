"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.coerce.number().default(4000),
    DATABASE_URL: zod_1.z.string().default('postgresql://postgres:postgres@localhost:5432/axiom?schema=public'),
    REDIS_URL: zod_1.z.string().default('redis://localhost:6379'),
    LLM_PROVIDER: zod_1.z.enum(['openai', 'anthropic', 'ollama', 'gemini']).default('openai'),
    OPENAI_API_KEY: zod_1.z.string().optional().default(''),
    ANTHROPIC_API_KEY: zod_1.z.string().optional().default(''),
    OLLAMA_BASE_URL: zod_1.z.string().optional().default('http://localhost:11434'),
    EMBEDDING_PROVIDER: zod_1.z.enum(['openai', 'local']).default('openai'),
    EMBEDDING_MODEL: zod_1.z.string().default('text-embedding-3-small'),
    BREETH_API_KEY: zod_1.z.string().optional().default(''),
    BREETH_API_URL: zod_1.z.string().default('https://api.thebreeth.com/v1'),
    AGENT_ID: zod_1.z.string().default('agent_axiom'),
    DISCOVERY_INTERVAL_MINUTES: zod_1.z.coerce.number().default(30),
    MIN_PUBLISH_INTERVAL_MINUTES: zod_1.z.coerce.number().default(90),
    MAX_POSTS_PER_24H: zod_1.z.coerce.number().default(8),
    MOCK_SOURCES_ENABLED: zod_1.z.coerce.boolean().default(false),
    LOG_LEVEL: zod_1.z.string().default('info'),
});
exports.config = envSchema.parse(process.env);

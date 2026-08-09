"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../config/env");
const logger_1 = require("../../config/logger");
class OllamaProvider {
    name = 'ollama';
    baseUrl;
    constructor(baseUrl = env_1.config.OLLAMA_BASE_URL) {
        this.baseUrl = baseUrl;
    }
    async generateCompletion(prompt, options) {
        try {
            const res = await axios_1.default.post(`${this.baseUrl}/api/generate`, {
                model: 'llama3',
                prompt: `${options?.systemPrompt ? `[SYSTEM]: ${options.systemPrompt}\n\n` : ''}${prompt}`,
                stream: false,
                options: { temperature: options?.temperature ?? 0.7 },
            });
            return res.data.response || '';
        }
        catch (err) {
            logger_1.logger.error({ err }, 'Ollama API call failed');
            return 'Mock Ollama output for offline dev.';
        }
    }
    async generateStructuredOutput(prompt, schemaDescription, options) {
        const raw = await this.generateCompletion(`${prompt}\nRespond ONLY in JSON matching: ${schemaDescription}`, options);
        const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);
    }
    async generateEmbeddings(text) {
        try {
            const res = await axios_1.default.post(`${this.baseUrl}/api/embeddings`, {
                model: 'nomic-embed-text',
                prompt: text,
            });
            return res.data.embedding;
        }
        catch {
            return new Array(1536).fill(0.01);
        }
    }
}
exports.OllamaProvider = OllamaProvider;

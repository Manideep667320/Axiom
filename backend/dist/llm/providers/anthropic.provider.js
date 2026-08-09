"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnthropicProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../config/env");
const logger_1 = require("../../config/logger");
class AnthropicProvider {
    name = 'anthropic';
    apiKey;
    constructor(apiKey = env_1.config.ANTHROPIC_API_KEY) {
        this.apiKey = apiKey;
    }
    async generateCompletion(prompt, options) {
        if (!this.apiKey) {
            logger_1.logger.warn('Anthropic API key missing. Returning mock completion response.');
            return 'Mock Anthropic completion response.';
        }
        try {
            const response = await axios_1.default.post('https://api.anthropic.com/v1/messages', {
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: options?.maxTokens ?? 1500,
                temperature: options?.temperature ?? 0.7,
                system: options?.systemPrompt,
                messages: [{ role: 'user', content: prompt }],
            }, {
                headers: {
                    'x-api-key': this.apiKey,
                    'anthropic-version': '2023-06-01',
                    'content-type': 'application/json',
                },
                timeout: 45000,
            });
            return response.data.content[0]?.text || '';
        }
        catch (err) {
            logger_1.logger.error({ err }, 'Anthropic API call failed');
            throw err;
        }
    }
    async generateStructuredOutput(prompt, schemaDescription, options) {
        const fullPrompt = `${prompt}\n\nStrict JSON output required matching: ${schemaDescription}. Do not include markdown codeblocks.`;
        const raw = await this.generateCompletion(fullPrompt, { ...options, temperature: 0.2 });
        const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);
    }
    async generateEmbeddings(text) {
        return new Array(1536).fill(0.01);
    }
}
exports.AnthropicProvider = AnthropicProvider;

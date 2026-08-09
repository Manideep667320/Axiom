"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMProviderFactory = void 0;
const openai_provider_1 = require("./providers/openai.provider");
const anthropic_provider_1 = require("./providers/anthropic.provider");
const ollama_provider_1 = require("./providers/ollama.provider");
const gemini_provider_1 = require("./providers/gemini.provider");
const env_1 = require("../config/env");
class LLMProviderFactory {
    static getProvider() {
        // Auto-detect Gemini key format (starting with AQ or AIza)
        const rawKey = env_1.config.OPENAI_API_KEY || env_1.config.ANTHROPIC_API_KEY || '';
        if (env_1.config.LLM_PROVIDER === 'gemini' || rawKey.startsWith('AQ') || rawKey.startsWith('AIza')) {
            return new gemini_provider_1.GeminiProvider(rawKey);
        }
        switch (env_1.config.LLM_PROVIDER) {
            case 'anthropic':
                return new anthropic_provider_1.AnthropicProvider();
            case 'ollama':
                return new ollama_provider_1.OllamaProvider();
            case 'openai':
            default:
                return new openai_provider_1.OpenAIProvider();
        }
    }
}
exports.LLMProviderFactory = LLMProviderFactory;

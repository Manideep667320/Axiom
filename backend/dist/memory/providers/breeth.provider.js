"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.breethMemoryProvider = exports.BreethMemoryProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../config/env");
const logger_1 = require("../../config/logger");
class BreethMemoryProvider {
    apiKey;
    baseUrl;
    constructor(apiKey = env_1.config.BREETH_API_KEY, baseUrl = env_1.config.BREETH_API_URL) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
    isConfigured() {
        return Boolean(this.apiKey);
    }
    async recordEpisode(episode) {
        if (!this.isConfigured()) {
            logger_1.logger.debug('Breeth API key not configured. Skipping Breeth cloud episode record.');
            return null;
        }
        try {
            const res = await axios_1.default.post(`${this.baseUrl}/episodes`, {
                content: episode.text,
                text: episode.text,
                extract_intent: episode.extractIntent ?? true,
                metadata: episode.metadata || {},
            }, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });
            logger_1.logger.info({ episodeId: res.data?.id }, 'Successfully recorded episode in Breeth Memory Layer');
            return res.data?.id || null;
        }
        catch (err) {
            logger_1.logger.error({ err }, 'Failed to record episode to Breeth API');
            return null;
        }
    }
    async searchMemory(query, limit = 5) {
        if (!this.isConfigured()) {
            return [];
        }
        try {
            const res = await axios_1.default.post(`${this.baseUrl}/search`, {
                query,
                limit,
            }, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                timeout: 8000,
            });
            return (res.data?.results || []).map((r) => r.text || r.content || '');
        }
        catch (err) {
            logger_1.logger.error({ err }, 'Failed to search Breeth Memory');
            return [];
        }
    }
}
exports.BreethMemoryProvider = BreethMemoryProvider;
exports.breethMemoryProvider = new BreethMemoryProvider();

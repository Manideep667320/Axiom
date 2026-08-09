"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSHA256 = generateSHA256;
exports.generateFingerprint = generateFingerprint;
const crypto_1 = __importDefault(require("crypto"));
function generateSHA256(content) {
    return crypto_1.default.createHash('sha256').update(content.trim().toLowerCase()).digest('hex');
}
function generateFingerprint(title, summary) {
    const normalized = `${title.toLowerCase().trim()}|${summary.slice(0, 100).toLowerCase().trim()}`;
    return crypto_1.default.createHash('md5').update(normalized).digest('hex');
}

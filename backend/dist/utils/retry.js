"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withExponentialBackoff = withExponentialBackoff;
async function withExponentialBackoff(fn, maxRetries = 3, baseDelayMs = 1000) {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            return await fn();
        }
        catch (error) {
            attempt++;
            if (attempt >= maxRetries) {
                throw error;
            }
            const delay = baseDelayMs * Math.pow(2, attempt - 1);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
    throw new Error('Retries exhausted');
}

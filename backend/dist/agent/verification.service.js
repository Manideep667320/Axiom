"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationService = exports.VerificationService = void 0;
class VerificationService {
    verifyEvidenceGrounding(keyClaims, sourceContent) {
        if (!sourceContent || keyClaims.length === 0) {
            return { grounded: true, missingClaims: [] };
        }
        const ungrounded = [];
        const lowerSource = sourceContent.toLowerCase();
        for (const claim of keyClaims) {
            const words = claim.toLowerCase().split(' ').filter((w) => w.length > 4);
            const matched = words.some((w) => lowerSource.includes(w));
            if (!matched && words.length > 0) {
                ungrounded.push(claim);
            }
        }
        return {
            grounded: ungrounded.length === 0,
            missingClaims: ungrounded,
        };
    }
}
exports.VerificationService = VerificationService;
exports.verificationService = new VerificationService();

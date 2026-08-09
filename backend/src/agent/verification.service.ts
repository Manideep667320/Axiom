export class VerificationService {
  verifyEvidenceGrounding(keyClaims: string[], sourceContent: string): { grounded: boolean; missingClaims: string[] } {
    if (!sourceContent || keyClaims.length === 0) {
      return { grounded: true, missingClaims: [] };
    }

    const ungrounded: string[] = [];
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

export const verificationService = new VerificationService();

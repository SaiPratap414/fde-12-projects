import { createHmac, timingSafeEqual } from 'node:crypto';

// Verify a webhook HMAC signature without leaking timing information.
export function verifySignature(rawBody: string, signature: string, secret: string): boolean {
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

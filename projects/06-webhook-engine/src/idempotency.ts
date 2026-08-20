// Idempotency: ensure each delivery id is processed at most once.
const seen = new Set<string>();

export function isDuplicate(deliveryId: string): boolean {
  if (seen.has(deliveryId)) return true;
  seen.add(deliveryId);
  return false;
}

// TODO: back this with Redis/Postgres and a TTL in production.

// Structured JSON logger that carries a correlation id through a request.
type Level = 'debug' | 'info' | 'warn' | 'error';

export function log(level: Level, message: string, meta: Record<string, unknown> = {}): void {
  const entry = {
    ts: new Date().toISOString(),
    level,
    message,
    correlationId: meta.correlationId ?? null,
    ...meta
  };
  console.log(JSON.stringify(entry));
}

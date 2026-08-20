// Shared contract every customer connector implements.
export interface ConnectorConfig {
  accessToken: string;
  [key: string]: unknown;
}

export interface Connector<TIn = unknown, TOut = unknown> {
  readonly name: string;
  test(): Promise<boolean>;
  send(payload: TIn): Promise<TOut>;
}

// Retry with exponential backoff — reused by every connector.
export async function withRetry<T>(fn: () => Promise<T>, attempts = 3, baseMs = 300): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, baseMs * 2 ** i));
    }
  }
  throw lastErr;
}

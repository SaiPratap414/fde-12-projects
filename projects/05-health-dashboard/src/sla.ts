// SLA breach detection.
export interface SlaTarget {
  name: string;
  uptimeTarget: number; // e.g. 0.999
  maxResponseMs: number;
}

export interface SlaSample {
  uptime: number;
  responseMs: number;
}

export function detectBreaches(target: SlaTarget, sample: SlaSample): string[] {
  const breaches: string[] = [];
  if (sample.uptime < target.uptimeTarget) breaches.push(`${target.name}: uptime below target`);
  if (sample.responseMs > target.maxResponseMs) breaches.push(`${target.name}: response time exceeded`);
  return breaches;
}

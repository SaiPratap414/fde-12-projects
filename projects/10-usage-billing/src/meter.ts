// Record and aggregate billable usage events per tenant.
export interface UsageEvent {
  tenantId: string;
  feature: string;
  quantity: number;
  at: Date;
}

const events: UsageEvent[] = [];

export function record(event: UsageEvent): void {
  events.push(event);
}

export function aggregate(tenantId: string): Record<string, number> {
  return events
    .filter((e) => e.tenantId === tenantId)
    .reduce<Record<string, number>>((acc, e) => {
      acc[e.feature] = (acc[e.feature] ?? 0) + e.quantity;
      return acc;
    }, {});
}

// Compute a 0-100 customer health score from weighted signals.
export interface HealthSignals {
  activeUsersRatio: number; // 0..1 active vs licensed seats
  featureAdoption: number; // 0..1 of key features used
  supportTickets: number; // open tickets (higher is worse)
  loginRecencyDays: number; // days since last login (higher is worse)
}

export function healthScore(s: HealthSignals): number {
  const adoption = (s.activeUsersRatio * 0.5 + s.featureAdoption * 0.5) * 60;
  const ticketPenalty = Math.min(s.supportTickets * 3, 20);
  const recencyPenalty = Math.min(s.loginRecencyDays, 20);
  const score = 40 + adoption - ticketPenalty - recencyPenalty;
  return Math.max(0, Math.min(100, Math.round(score)));
}

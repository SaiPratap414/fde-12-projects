// Guided onboarding checklist with per-customer completion tracking.
export interface Step {
  id: string;
  label: string;
  done: boolean;
}

export const DEFAULT_STEPS: Step[] = [
  { id: 'create_account', label: 'Create account', done: false },
  { id: 'invite_team', label: 'Invite a teammate', done: false },
  { id: 'connect_data', label: 'Connect a data source', done: false },
  { id: 'first_action', label: 'Complete first key action', done: false }
];

export function progress(steps: Step[]): number {
  const done = steps.filter((s) => s.done).length;
  return Math.round((done / steps.length) * 100);
}

// Time-to-first-value: minutes from signup to the first key action.
export function timeToFirstValue(signupAt: Date, firstValueAt: Date): number {
  return Math.round((firstValueAt.getTime() - signupAt.getTime()) / 60000);
}

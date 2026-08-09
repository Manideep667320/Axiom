export function isWithinHours(date: Date, hours: number): boolean {
  const diffMs = Date.now() - date.getTime();
  return diffMs <= hours * 3600 * 1000;
}

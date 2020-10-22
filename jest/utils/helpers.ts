/**
 *
 * @param ms milliseconds to wait
 * Waits for a specific number of time
 */
export function waitMs(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

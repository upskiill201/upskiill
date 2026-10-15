/**
 * When a push arrives while the app is open, the page — not the OS — delivers
 * it: Tey's notice card drops in with its chime (components/push/PushSoundListener).
 * The bell also rings when its unread count goes up, so the two would sound
 * twice for the same thing. This is the one flag that lets the bell stay quiet
 * for a push the page has already announced.
 */

let lastHandledAt = 0;

export function markPushHandled(): void {
  lastHandledAt = Date.now();
}

export function pushHandledRecently(withinMs = 25_000): boolean {
  return Date.now() - lastHandledAt < withinMs;
}

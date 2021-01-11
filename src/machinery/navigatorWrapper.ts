export function wakeLock(): any | undefined {
  if (typeof navigator.requestWakeLock === 'function') {
    return navigator.requestWakeLock('screen');
  } else {
    return undefined;
  }
}

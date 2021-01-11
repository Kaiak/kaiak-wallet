export {};

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Navigator {
    // eslint-disable-next-line no-unused-vars
    requestWakeLock: (key: string) => void;
  }
}

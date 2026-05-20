export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Polyfilled view transition helper. */
export function withViewTransition(callback: () => void): void {
  // @ts-ignore — startViewTransition is not yet in TS lib
  if (typeof document !== "undefined" && typeof document.startViewTransition === "function") {
    // @ts-ignore
    document.startViewTransition(callback);
  } else {
    callback();
  }
}

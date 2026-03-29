import * as React from "react";

const MOBILE_BREAKPOINT = 768;

let cachedIsMobile = false;
let isInitialized = false;
const listeners = new Set<() => void>();

const notifyListeners = () => {
  for (const listener of listeners) {
    listener();
  }
};

const ensureMobileStore = () => {
  if (isInitialized || typeof window === "undefined") {
    return;
  }

  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  cachedIsMobile = mql.matches;

  const onChange = () => {
    const nextValue = mql.matches;
    if (nextValue !== cachedIsMobile) {
      cachedIsMobile = nextValue;
      notifyListeners();
    }
  };

  mql.addEventListener("change", onChange);
  isInitialized = true;
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => cachedIsMobile;
const getServerSnapshot = () => false;

export function useIsMobile() {
  ensureMobileStore();
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

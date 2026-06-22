"use client";

import { useEffect } from "react";
import { getInitialTheme } from "@/lib/theme";
import { syncNativeStatusBar } from "@/lib/nativeStatusBar";

/**
 * Initializes native Capacitor plugins when running inside the iOS shell.
 */
export function CapacitorInit() {
  useEffect(() => {
    syncNativeStatusBar(getInitialTheme());
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";
import { initNativeShell } from "@/lib/native";

/** Initializes Capacitor native shell on mount. */
export function NativeInit() {
  useEffect(() => {
    void initNativeShell();
  }, []);
  return null;
}

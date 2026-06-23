import { Capacitor } from "@capacitor/core";

/** Returns true when running inside a Capacitor native shell. */
export function isNativeApp(): boolean {
  return typeof window !== "undefined" && Capacitor.isNativePlatform();
}

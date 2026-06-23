import { Capacitor } from "@capacitor/core";
import type { Theme } from "@/lib/theme";

/**
 * Syncs the iOS status bar style with the active theme.
 * @param theme - Current light or dark theme.
 */
export async function syncNativeStatusBar(theme: Theme): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const { StatusBar, Style } = await import("@capacitor/status-bar");
    await StatusBar.setStyle({ style: theme === "dark" ? Style.Dark : Style.Light });
  } catch {
    /* optional */
  }
}

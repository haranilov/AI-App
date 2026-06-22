import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import type { Theme } from "@/lib/theme";

/**
 * Syncs the native iOS status bar with the active application theme.
 * @param theme - Active light or dark theme
 */
export function syncNativeStatusBar(theme: Theme): void {
  if (!Capacitor.isNativePlatform()) return;

  const isDark = theme === "dark";
  void StatusBar.setStyle({ style: isDark ? Style.Dark : Style.Light });
  void StatusBar.setBackgroundColor({ color: isDark ? "#0a0a0a" : "#fafafa" });
}

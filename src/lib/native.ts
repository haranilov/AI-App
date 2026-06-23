import { Capacitor } from "@capacitor/core";

/** Copies text to the clipboard (native or web). */
export async function copyToClipboard(text: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    const { Clipboard } = await import("@capacitor/clipboard");
    await Clipboard.write({ string: text });
    return;
  }
  await navigator.clipboard.writeText(text);
}

/**
 * Shares text via the native share sheet or Web Share API.
 * @returns True when a share dialog was shown.
 */
export async function shareText(title: string, text: string): Promise<boolean> {
  if (Capacitor.isNativePlatform()) {
    const { Share } = await import("@capacitor/share");
    await Share.share({ title, text });
    return true;
  }
  if (typeof navigator.share === "function") {
    await navigator.share({ title, text });
    return true;
  }
  return false;
}

/** Triggers a light haptic tap on native platforms. */
export async function hapticLight(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    /* optional */
  }
}

/** Configures native shell UI (status bar, etc.). */
export async function initNativeShell(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  document.documentElement.classList.add("native-app");

  const { getStoredTheme } = await import("@/lib/theme");
  const { syncNativeStatusBar } = await import("@/lib/nativeStatusBar");
  await syncNativeStatusBar(getStoredTheme());
}

/** Dismisses the on-screen keyboard. */
export async function dismissKeyboard(): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    const { Keyboard } = await import("@capacitor/keyboard");
    await Keyboard.hide();
    return;
  }
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

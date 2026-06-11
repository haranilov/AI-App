import { Capacitor } from "@capacitor/core";

export async function copyToClipboard(text: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    const { Clipboard } = await import("@capacitor/clipboard");
    await Clipboard.write({ string: text });
    return;
  }
  await navigator.clipboard.writeText(text);
}

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

export async function hapticLight(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    /* optional */
  }
}

export async function initNativeShell(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  const { StatusBar, Style } = await import("@capacitor/status-bar");
  await StatusBar.setStyle({ style: Style.Light });
}

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

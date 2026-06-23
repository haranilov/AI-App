import type { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize } from "@capacitor/keyboard";

const config: CapacitorConfig = {
  appId: "com.hookgen.app",
  appName: "HookAI",
  webDir: "out",
  ios: {
    contentInset: "never",
    scrollEnabled: true,
    backgroundColor: "#fafafa",
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: "#111827",
      showSpinner: false,
    },
    Keyboard: {
      resize: KeyboardResize.Body,
    },
  },
};

export default config;

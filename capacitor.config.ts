import type { CapacitorConfig } from "@capacitor/cli";

/** Capacitor configuration for the HookAI iOS shell. */
const config: CapacitorConfig = {
  appId: "com.hookai.app",
  appName: "HookAI",
  webDir: "out",
  server: {
    iosScheme: "capacitor",
    androidScheme: "https",
  },
  ios: {
    contentInset: "automatic",
    backgroundColor: "#fafafa",
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 2000,
      backgroundColor: "#fafafa",
      showSpinner: false,
    },
    StatusBar: {
      style: "DEFAULT",
    },
  },
};

export default config;

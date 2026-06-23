# HookAI — App Store Submission Guide

HookAI is packaged as a native iOS app via **Capacitor**. Follow these steps to submit to the App Store.

## Prerequisites

1. **Apple Developer Program** — $99/year at [developer.apple.com](https://developer.apple.com)
2. **Xcode** — latest from Mac App Store
3. **Node.js** — already installed

## 1. Add AI API key (required for iOS)

Puter.js is disabled on iOS. Add a free Gemini key before building:

```bash
cp .env.example .env.local
# Add your key:
# NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

Get a free key: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

Without a key, the app still works using **offline templates**.

## 2. Install Xcode

Install **Xcode** from the Mac App Store (required for building and uploading).

## 3. Build and open in Xcode

```bash
npm install
node scripts/generate-icons.mjs
npx @capacitor/assets generate --ios
npm run ios
```

This builds the web app, syncs to iOS, and opens Xcode.

## 4. Configure signing in Xcode

1. Open `ios/App/App.xcworkspace`
2. Select **App** target → **Signing & Capabilities**
3. Choose your **Team**
4. Set unique **Bundle Identifier** if needed (default: `com.hookgen.app`)

## 5. Test on a real device

1. Connect iPhone
2. Select your device in Xcode
3. Press **Run** (▶)
4. Test: generate hooks, copy, share, privacy/terms links

## 6. App Store Connect metadata

Create a new app at [appstoreconnect.apple.com](https://appstoreconnect.apple.com):

| Field | Value |
|-------|-------|
| **Name** | HookAI |
| **Subtitle** | Viral hooks for short videos |
| **Category** | Productivity or Photo & Video |
| **Bundle ID** | com.hookgen.app |
| **Privacy Policy URL** | Host `/privacy/` page or use your domain |

### Description (example)

> HookAI generates viral hooks, video titles, and 15–30 second scripts for TikTok, Reels, and YouTube Shorts. Enter a topic, get ready-to-film content, copy or share instantly. Works offline with built-in templates.

### Keywords

hooks, tiktok, reels, shorts, script, creator, viral, content

### Screenshots required

- iPhone 6.7" (1290×2796) — at least 3
- iPhone 6.5" (1284×2778) — at least 3

Take screenshots from Simulator or real device.

## 7. App Privacy (Nutrition Labels)

In App Store Connect → App Privacy:

| Data type | Collected? | Linked to user? | Used for |
|-----------|------------|-----------------|----------|
| **Other User Content** (video topic text) | Yes, if AI used | No | App functionality |
| **Identifiers** | No | — | — |
| **Usage Data** | No | — | — |

Data is sent to third-party AI providers only when generating content. No HookAI backend stores user data.

## 8. Age rating

- Select **13+** (AI-generated content)
- No violence, gambling, or unrestricted web access

## 9. Export compliance

In Xcode when archiving: **No** for encryption (uses standard HTTPS only).

## 10. Archive and upload

1. Xcode → **Product → Archive**
2. **Distribute App → App Store Connect**
3. Upload build
4. In App Store Connect, select build and submit for review

## 11. Review notes (paste in App Review Information)

```
HookAI generates short-form video hooks, titles, and scripts using AI.

Test steps:
1. Open app
2. Enter topic: "fitness motivation"
3. Tap "Generate Hooks"
4. Tap any result to copy, or "Share" for native share sheet
5. Privacy Policy and Terms links are in the footer

AI: User-entered topic text is sent to Google Gemini API for generation.
Offline templates work without network.

Demo account: not required (no login).
```

## What we added for App Store compliance

- Native iOS shell (Capacitor)
- Privacy Policy and Terms of Service pages
- Native Share sheet and haptic feedback
- Safe area support for iPhone notch
- AI disclosure in the UI
- Puter.js disabled on iOS (unreliable in WebView)
- App icons and splash screen

## Troubleshooting

**Build fails in Xcode** — run `npm run build:ios` again.

**White screen** — ensure `npm run build` completed and `out/` folder exists.

**AI not working on device** — add `NEXT_PUBLIC_GEMINI_API_KEY` to `.env.local` and rebuild.

**Rejected as "minimum functionality"** — emphasize native Share, haptics, offline templates, and clipboard in review notes.

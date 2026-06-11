# HookAI

AI-генератор вирусных хуков для TikTok, Reels и Shorts.

**Frontend-only** — без backend, всё в браузере.  
**iOS** — нативная обёртка через Capacitor для App Store.

## Запуск (веб)

```bash
npm install
npm run dev
```

## App Store (iOS)

Полная инструкция: **[APP_STORE.md](./APP_STORE.md)**

```bash
cp .env.example .env.local   # добавьте NEXT_PUBLIC_GEMINI_API_KEY
node scripts/generate-icons.mjs
npx @capacitor/assets generate --ios
npm run ios                  # откроет Xcode
```

## Бесплатная генерация

| Способ | Ключ | Как получить |
|--------|------|--------------|
| **Puter.js** | не нужен | Автоматически (может попросить вход в Puter) |
| **Google Gemini** | `NEXT_PUBLIC_GEMINI_API_KEY` | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) — бесплатно |
| **Groq** | `NEXT_PUBLIC_GROQ_API_KEY` | [console.groq.com/keys](https://console.groq.com/keys) — бесплатно |
| **Pollinations** | `NEXT_PUBLIC_POLLINATIONS_API_KEY` | [enter.pollinations.ai](https://enter.pollinations.ai) — ключ `pk_` |
| **Шаблоны** | — | Всегда работают, если AI недоступен |

Скопируйте `.env.example` → `.env.local` и добавьте любой бесплатный ключ (рекомендуем **Gemini**).

## Сборка

```bash
npm run build
```

Статика в папке `out/`.

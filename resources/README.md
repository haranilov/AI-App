# App Store Assets

Place source images here, then run:

```bash
npm run assets:generate
```

## Required files

| File | Size | Purpose |
|------|------|---------|
| `icon.png` | 1024×1024 px | App Store icon |
| `splash.png` | 2732×2732 px | Launch screen (center logo on solid background) |

## Tips

- Use a square PNG without transparency for `icon.png`.
- Keep the logo centered in `splash.png` with ~40% safe margins.
- After replacing images, run `npm run assets:generate` and `npm run ios:sync`.

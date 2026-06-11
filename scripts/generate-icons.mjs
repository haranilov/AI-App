import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = join(root, "assets");

const svg = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" rx="220" fill="#111827"/>
  <path d="M560 180L300 560h180l-40 284 320-480H580l-20-184z" fill="#ffffff"/>
</svg>`;

await mkdir(assetsDir, { recursive: true });

const iconPath = join(assetsDir, "icon-only.png");
const splashPath = join(assetsDir, "splash.png");

await sharp(Buffer.from(svg)).png().toFile(iconPath);
await sharp({
  create: {
    width: 2732,
    height: 2732,
    channels: 4,
    background: { r: 17, g: 24, b: 39, alpha: 1 },
  },
})
  .composite([{ input: Buffer.from(svg), gravity: "centre" }])
  .png()
  .toFile(splashPath);

console.log("Generated:", iconPath, splashPath);

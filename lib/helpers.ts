import { UI_COLORS } from "@/lib/constants";

export function getStringColor(string: string): (typeof UI_COLORS)[number] {
  let hash = 0x811c9dc5;

  const word = string.toLowerCase().trim();

  for (let i = 0; i < word.length; i++) {
    hash ^= word.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x85ebca6b);
  hash ^= hash >>> 13;
  hash = Math.imul(hash, 0xc2b2ae35);
  hash ^= hash >>> 16;

  const result = (hash >>> 0) / 0xffffffff;

  return UI_COLORS[Math.floor(UI_COLORS.length * result)];
}

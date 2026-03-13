/**
 * Convert a Western numeral to Eastern Arabic numeral string.
 * Used for verse number display alongside Arabic text.
 */
export function toArabicNumeral(num: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .split("")
    .map((d) => arabicNumerals[parseInt(d)])
    .join("");
}

/**
 * Slugify a string for URL-friendly paths.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Format a surah:verse reference string, e.g. "2:255"
 */
export function verseRef(surahNumber: number, verseNumber: number): string {
  return `${surahNumber}:${verseNumber}`;
}

/**
 * Truncate text to a max length with ellipsis.
 */
export function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + "…";
}

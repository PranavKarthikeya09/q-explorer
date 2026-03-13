"use server";

import { searchVerses } from "@/lib/db/queries";

export async function searchVersesAction(query: string) {
  const raw = await searchVerses(query, 50);
  return raw.map(({ verse, surah }) => ({
    id: verse.id,
    verseNumber: verse.verseNumber,
    arabicText: verse.arabicText,
    englishTranslation: verse.englishTranslation,
    surahNumber: surah.number,
    surahNameEnglish: surah.nameEnglish,
  }));
}

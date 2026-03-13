import { db } from "./index";
import { eq, sql, ilike, or, asc, desc } from "drizzle-orm";
import {
  surahs,
  verses,
  tafsirs,
  prophets,
  prophetDetails,
  verseProphets,
  verseTopics,
  topics,
  historicalContexts,
} from "./schema";

// ─── Surah Queries ───────────────────────────────────────

export async function getAllSurahs() {
  return db.select().from(surahs).orderBy(asc(surahs.number));
}

export async function getSurahByNumber(surahNumber: number) {
  const result = await db
    .select()
    .from(surahs)
    .where(eq(surahs.number, surahNumber))
    .limit(1);
  return result[0] ?? null;
}

// ─── Verse Queries ───────────────────────────────────────

export async function getVersesBySurah(surahId: number) {
  return db
    .select()
    .from(verses)
    .where(eq(verses.surahId, surahId))
    .orderBy(asc(verses.verseNumber));
}

export async function getVerse(surahId: number, verseNumber: number) {
  const result = await db
    .select()
    .from(verses)
    .where(
      sql`${verses.surahId} = ${surahId} AND ${verses.verseNumber} = ${verseNumber}`
    )
    .limit(1);
  return result[0] ?? null;
}

// ─── Tafsir Queries ──────────────────────────────────────

export async function getTafsirsByVerseId(verseId: number) {
  return db
    .select()
    .from(tafsirs)
    .where(eq(tafsirs.verseId, verseId))
    .orderBy(asc(tafsirs.sourceName));
}

// ─── Prophet Queries ─────────────────────────────────────

export async function getAllProphets() {
  return db.select().from(prophets).orderBy(asc(prophets.nameEnglish));
}

export async function getProphetBySlug(slug: string) {
  const result = await db
    .select()
    .from(prophets)
    .where(eq(prophets.slug, slug))
    .limit(1);
  return result[0] ?? null;
}

export async function getProphetDetailsByProphetId(prophetId: number) {
  return db
    .select()
    .from(prophetDetails)
    .where(eq(prophetDetails.prophetId, prophetId))
    .orderBy(asc(prophetDetails.displayOrder));
}

export async function getVersesByProphetId(prophetId: number) {
  return db
    .select({
      verse: verses,
      surah: surahs,
    })
    .from(verseProphets)
    .innerJoin(verses, eq(verseProphets.verseId, verses.id))
    .innerJoin(surahs, eq(verses.surahId, surahs.id))
    .where(eq(verseProphets.prophetId, prophetId))
    .orderBy(asc(surahs.number), asc(verses.verseNumber));
}

// ─── Topic Queries ───────────────────────────────────────

export async function getAllTopics() {
  return db.select().from(topics).orderBy(asc(topics.name));
}

export async function getTopicBySlug(slug: string) {
  const result = await db
    .select()
    .from(topics)
    .where(eq(topics.slug, slug))
    .limit(1);
  return result[0] ?? null;
}

export async function getHistoricalContextsByTopicId(topicId: number) {
  return db
    .select()
    .from(historicalContexts)
    .where(eq(historicalContexts.topicId, topicId))
    .orderBy(asc(historicalContexts.displayOrder));
}

export async function getVersesByTopicId(topicId: number) {
  return db
    .select({
      verse: verses,
      surah: surahs,
    })
    .from(verseTopics)
    .innerJoin(verses, eq(verseTopics.verseId, verses.id))
    .innerJoin(surahs, eq(verses.surahId, surahs.id))
    .where(eq(verseTopics.topicId, topicId))
    .orderBy(asc(surahs.number), asc(verses.verseNumber));
}

// ─── Prophet links for a verse ───────────────────────────

export async function getProphetsByVerseId(verseId: number) {
  return db
    .select({ prophet: prophets })
    .from(verseProphets)
    .innerJoin(prophets, eq(verseProphets.prophetId, prophets.id))
    .where(eq(verseProphets.verseId, verseId));
}

// ─── Topic links for a verse ─────────────────────────────

export async function getTopicsByVerseId(verseId: number) {
  return db
    .select({ topic: topics })
    .from(verseTopics)
    .innerJoin(topics, eq(verseTopics.topicId, topics.id))
    .where(eq(verseTopics.verseId, verseId));
}

// ─── Search ──────────────────────────────────────────────

export async function searchVerses(query: string, limit = 20) {
  return db
    .select({
      verse: verses,
      surah: surahs,
    })
    .from(verses)
    .innerJoin(surahs, eq(verses.surahId, surahs.id))
    .where(
      or(
        ilike(verses.englishTranslation, `%${query}%`),
        ilike(verses.arabicText, `%${query}%`)
      )
    )
    .orderBy(asc(surahs.number), asc(verses.verseNumber))
    .limit(limit);
}

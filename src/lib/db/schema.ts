import {
  pgTable,
  serial,
  integer,
  text,
  uniqueIndex,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Surahs ──────────────────────────────────────────────

export const surahs = pgTable(
  "surahs",
  {
    id: serial("id").primaryKey(),
    number: integer("number").notNull().unique(),
    nameArabic: text("name_arabic").notNull(),
    nameEnglish: text("name_english").notNull(),
    nameTransliteration: text("name_transliteration").notNull(),
    revelationType: text("revelation_type").notNull(), // "Meccan" | "Medinan"
    verseCount: integer("verse_count").notNull(),
    revelationOrder: integer("revelation_order"),
  },
  (table) => [uniqueIndex("surahs_number_idx").on(table.number)]
);

export const surahsRelations = relations(surahs, ({ many }) => ({
  verses: many(verses),
}));

// ─── Verses ──────────────────────────────────────────────

export const verses = pgTable(
  "verses",
  {
    id: serial("id").primaryKey(),
    surahId: integer("surah_id")
      .notNull()
      .references(() => surahs.id),
    verseNumber: integer("verse_number").notNull(),
    arabicText: text("arabic_text").notNull(),
    englishTranslation: text("english_translation").notNull(),
    transliteration: text("transliteration"),
    juzNumber: integer("juz_number"),
    hizbNumber: integer("hizb_number"),
    pageNumber: integer("page_number"),
  },
  (table) => [
    uniqueIndex("verses_surah_verse_idx").on(table.surahId, table.verseNumber),
    index("verses_surah_id_idx").on(table.surahId),
    index("verses_juz_idx").on(table.juzNumber),
  ]
);

export const versesRelations = relations(verses, ({ one, many }) => ({
  surah: one(surahs, {
    fields: [verses.surahId],
    references: [surahs.id],
  }),
  tafsirs: many(tafsirs),
  verseProphets: many(verseProphets),
  verseTopics: many(verseTopics),
}));

// ─── Tafsirs ─────────────────────────────────────────────

export const tafsirs = pgTable(
  "tafsirs",
  {
    id: serial("id").primaryKey(),
    verseId: integer("verse_id")
      .notNull()
      .references(() => verses.id),
    sourceName: text("source_name").notNull(),
    content: text("content").notNull(),
    language: text("language").notNull().default("en"),
  },
  (table) => [index("tafsirs_verse_source_idx").on(table.verseId, table.sourceName)]
);

export const tafsirsRelations = relations(tafsirs, ({ one }) => ({
  verse: one(verses, {
    fields: [tafsirs.verseId],
    references: [verses.id],
  }),
}));

// ─── Prophets ────────────────────────────────────────────

export const prophets = pgTable("prophets", {
  id: serial("id").primaryKey(),
  nameArabic: text("name_arabic").notNull(),
  nameEnglish: text("name_english").notNull(),
  slug: text("slug").notNull().unique(),
  briefDescription: text("brief_description"),
  mentionCount: integer("mention_count").default(0),
});

export const prophetsRelations = relations(prophets, ({ many }) => ({
  prophetDetails: many(prophetDetails),
  verseProphets: many(verseProphets),
}));

// ─── Prophet Details ─────────────────────────────────────

export const prophetDetails = pgTable("prophet_details", {
  id: serial("id").primaryKey(),
  prophetId: integer("prophet_id")
    .notNull()
    .references(() => prophets.id),
  sectionTitle: text("section_title").notNull(),
  content: text("content").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
});

export const prophetDetailsRelations = relations(prophetDetails, ({ one }) => ({
  prophet: one(prophets, {
    fields: [prophetDetails.prophetId],
    references: [prophets.id],
  }),
}));

// ─── Verse ↔ Prophet (Junction) ─────────────────────────

export const verseProphets = pgTable(
  "verse_prophets",
  {
    verseId: integer("verse_id")
      .notNull()
      .references(() => verses.id),
    prophetId: integer("prophet_id")
      .notNull()
      .references(() => prophets.id),
  },
  (table) => [
    primaryKey({ columns: [table.verseId, table.prophetId] }),
  ]
);

export const verseProphetsRelations = relations(verseProphets, ({ one }) => ({
  verse: one(verses, {
    fields: [verseProphets.verseId],
    references: [verses.id],
  }),
  prophet: one(prophets, {
    fields: [verseProphets.prophetId],
    references: [prophets.id],
  }),
}));

// ─── Topics ──────────────────────────────────────────────

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
});

export const topicsRelations = relations(topics, ({ many }) => ({
  verseTopics: many(verseTopics),
  historicalContexts: many(historicalContexts),
}));

// ─── Verse ↔ Topic (Junction) ───────────────────────────

export const verseTopics = pgTable(
  "verse_topics",
  {
    verseId: integer("verse_id")
      .notNull()
      .references(() => verses.id),
    topicId: integer("topic_id")
      .notNull()
      .references(() => topics.id),
  },
  (table) => [
    primaryKey({ columns: [table.verseId, table.topicId] }),
  ]
);

export const verseTopicsRelations = relations(verseTopics, ({ one }) => ({
  verse: one(verses, {
    fields: [verseTopics.verseId],
    references: [verses.id],
  }),
  topic: one(topics, {
    fields: [verseTopics.topicId],
    references: [topics.id],
  }),
}));

// ─── Historical Contexts ────────────────────────────────

export const historicalContexts = pgTable("historical_contexts", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id")
    .notNull()
    .references(() => topics.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
});

export const historicalContextsRelations = relations(historicalContexts, ({ one }) => ({
  topic: one(topics, {
    fields: [historicalContexts.topicId],
    references: [topics.id],
  }),
}));

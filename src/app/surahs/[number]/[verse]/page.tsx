import {
  getSurahByNumber,
  getVerse,
  getTafsirsByVerseId,
  getProphetsByVerseId,
  getTopicsByVerseId,
} from "@/lib/db/queries";
import { toArabicNumeral, verseRef } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface VersePageProps {
  params: Promise<{ number: string; verse: string }>;
}

export async function generateMetadata({ params }: VersePageProps): Promise<Metadata> {
  const { number, verse } = await params;
  const surah = await getSurahByNumber(parseInt(number));
  if (!surah) return { title: "Verse Not Found" };
  return {
    title: `${surah.nameEnglish} ${number}:${verse} — Quran Explorer`,
    description: `Read verse ${number}:${verse} of Surah ${surah.nameEnglish} with tafsir, prophet references, and thematic links.`,
  };
}

export default async function VerseDetailPage({ params }: VersePageProps) {
  const { number, verse: verseNum } = await params;
  const surahNumber = parseInt(number);
  const verseNumber = parseInt(verseNum);

  const surah = await getSurahByNumber(surahNumber);
  if (!surah) notFound();

  const verseData = await getVerse(surah.id, verseNumber);
  if (!verseData) notFound();

  const [tafsirList, prophetLinks, topicLinks] = await Promise.all([
    getTafsirsByVerseId(verseData.id),
    getProphetsByVerseId(verseData.id),
    getTopicsByVerseId(verseData.id),
  ]);

  const prevVerse = verseNumber > 1 ? verseNumber - 1 : null;
  const nextVerse =
    verseNumber < surah.verseCount ? verseNumber + 1 : null;

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted mb-8">
        <Link href="/surahs" className="hover:text-accent transition-colors">
          Surahs
        </Link>
        <span>›</span>
        <Link
          href={`/surahs/${surahNumber}`}
          className="hover:text-accent transition-colors"
        >
          {surah.nameEnglish}
        </Link>
        <span>›</span>
        <span className="text-ink-800 font-medium">
          Verse {verseNumber}
        </span>
      </nav>

      {/* Verse Display */}
      <div className="verse-card">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-accent">
            {verseRef(surahNumber, verseNumber)}
          </span>
          <span className="text-xs text-muted">
            Page {verseData.pageNumber ?? "—"} · Juz {verseData.juzNumber ?? "—"}
          </span>
        </div>

        <p className="arabic-text-xl mb-6 pb-5 border-b border-verse-border">
          {verseData.arabicText}
          <span className="ornament ml-2">
            ﴿{toArabicNumeral(verseNumber)}﴾
          </span>
        </p>

        <p className="text-ink-700 text-lg leading-relaxed">
          {verseData.englishTranslation}
        </p>
      </div>

      {/* Tafsir Section */}
      {tafsirList.length > 0 && (
        <section className="mt-8 animate-slide-up">
          <h2 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
            <span className="text-gold-500">📖</span> Tafsir
          </h2>
          <div className="space-y-4">
            {tafsirList.map((tafsir) => (
              <div
                key={tafsir.id}
                className="bg-card-bg border border-card-border rounded-xl p-5"
              >
                <p className="text-sm font-semibold text-accent mb-2">
                  {tafsir.sourceName}
                </p>
                <p className="text-ink-700 leading-relaxed text-sm">
                  {tafsir.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Connected Prophets */}
      {prophetLinks.length > 0 && (
        <section className="mt-8 animate-slide-up">
          <h2 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
            <span className="text-gold-500">👤</span> Related Prophets
          </h2>
          <div className="flex flex-wrap gap-2">
            {prophetLinks.map(({ prophet }) => (
              <Link
                key={prophet.id}
                href={`/prophets/${prophet.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-light/60 text-accent text-sm font-medium rounded-full hover:bg-accent/15 transition-colors"
              >
                <span className="arabic-text text-sm">{prophet.nameArabic}</span>
                {prophet.nameEnglish}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Connected Topics */}
      {topicLinks.length > 0 && (
        <section className="mt-8 animate-slide-up">
          <h2 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
            <span className="text-gold-500">📚</span> Related Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {topicLinks.map(({ topic }) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.slug}`}
                className="inline-flex items-center px-3 py-1.5 bg-gold-light/40 text-gold text-sm font-medium rounded-full hover:bg-gold-light/60 transition-colors"
              >
                {topic.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next Verse Navigation */}
      <div className="flex items-center justify-between mt-12 pt-8 border-t border-parchment-200">
        {prevVerse ? (
          <Link
            href={`/surahs/${surahNumber}/${prevVerse}`}
            className="flex items-center gap-2 text-sm text-accent hover:text-emerald-700 font-medium transition-colors"
          >
            ← Verse {prevVerse}
          </Link>
        ) : (
          <div />
        )}
        <Link
          href={`/surahs/${surahNumber}`}
          className="text-sm text-muted hover:text-accent transition-colors"
        >
          Back to {surah.nameEnglish}
        </Link>
        {nextVerse ? (
          <Link
            href={`/surahs/${surahNumber}/${nextVerse}`}
            className="flex items-center gap-2 text-sm text-accent hover:text-emerald-700 font-medium transition-colors"
          >
            Verse {nextVerse} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

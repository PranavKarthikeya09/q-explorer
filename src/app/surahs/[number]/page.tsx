import { getSurahByNumber, getVersesBySurah } from "@/lib/db/queries";
import { toArabicNumeral, verseRef } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface SurahPageProps {
  params: Promise<{ number: string }>;
}

export async function generateMetadata({ params }: SurahPageProps): Promise<Metadata> {
  const { number } = await params;
  const surah = await getSurahByNumber(parseInt(number));
  if (!surah) return { title: "Surah Not Found" };
  return {
    title: `${surah.nameEnglish} (${surah.nameTransliteration}) — Quran Explorer`,
    description: `Read Surah ${surah.nameEnglish} with Arabic text and English translation. ${surah.verseCount} verses, ${surah.revelationType} revelation.`,
  };
}

export default async function SurahReaderPage({ params }: SurahPageProps) {
  const { number } = await params;
  const surahNumber = parseInt(number);
  const surah = await getSurahByNumber(surahNumber);

  if (!surah) notFound();

  const surahVerses = await getVersesBySurah(surah.id);

  // For prev/next navigation
  const prevSurah = surahNumber > 1 ? surahNumber - 1 : null;
  const nextSurah = surahNumber < 114 ? surahNumber + 1 : null;

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Surah Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <span
            className={`badge ${
              surah.revelationType === "Meccan"
                ? "badge-meccan"
                : "badge-medinan"
            }`}
          >
            {surah.revelationType}
          </span>
          <span className="text-xs text-muted">
            {surah.verseCount} verses · Juz {surahVerses[0]?.juzNumber ?? "—"}
          </span>
        </div>

        <h1 className="arabic-text-xl text-ink-800 mb-2">
          {surah.nameArabic}
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">
          {surah.nameEnglish}
        </h2>
        <p className="text-sm text-muted mt-1">{surah.nameTransliteration}</p>

        {/* Bismillah (except Surah 9) */}
        {surahNumber !== 9 && surahNumber !== 1 && (
          <p className="arabic-text text-gold-500 mt-6 text-2xl">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </p>
        )}
        <div className="divider-ornament mt-6">❖</div>
      </div>

      {/* Verses */}
      <div className="space-y-5">
        {surahVerses.map((verse) => (
          <div key={verse.id} className="verse-card animate-slide-up" id={`v${verse.verseNumber}`}>
            {/* Verse number bar */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted font-medium">
                <span className="w-7 h-7 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold">
                  {verse.verseNumber}
                </span>
                {verseRef(surahNumber, verse.verseNumber)}
              </span>
              <Link
                href={`/surahs/${surahNumber}/${verse.verseNumber}`}
                className="text-xs text-accent hover:underline font-medium"
              >
                View Details →
              </Link>
            </div>

            {/* Arabic Text */}
            <p className="arabic-text-lg mb-5 pb-4 border-b border-parchment-200">
              {verse.arabicText}
              <span className="ornament ml-2">
                ﴿{toArabicNumeral(verse.verseNumber)}﴾
              </span>
            </p>

            {/* Translation */}
            <p className="text-ink-700 leading-relaxed text-base">
              {verse.englishTranslation}
            </p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {surahVerses.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted text-lg">
            Verses for this surah have not been loaded yet.
          </p>
          <p className="text-sm text-muted mt-2">
            Run the seed script to populate Quran data.
          </p>
        </div>
      )}

      {/* Prev / Next Navigation */}
      <div className="flex items-center justify-between mt-12 pt-8 border-t border-parchment-200">
        {prevSurah ? (
          <Link
            href={`/surahs/${prevSurah}`}
            className="flex items-center gap-2 text-sm text-accent hover:text-emerald-700 font-medium transition-colors"
          >
            <span>←</span>
            <span>Surah {prevSurah}</span>
          </Link>
        ) : (
          <div />
        )}
        <Link
          href="/surahs"
          className="text-sm text-muted hover:text-accent transition-colors"
        >
          All Surahs
        </Link>
        {nextSurah ? (
          <Link
            href={`/surahs/${nextSurah}`}
            className="flex items-center gap-2 text-sm text-accent hover:text-emerald-700 font-medium transition-colors"
          >
            <span>Surah {nextSurah}</span>
            <span>→</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

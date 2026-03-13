import Link from "next/link";
import { getAllSurahs } from "@/lib/db/queries";
import { toArabicNumeral } from "@/lib/utils";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Surahs — Quran Explorer",
  description: "Browse all 114 surahs of the Holy Quran with names, verse counts, and revelation types.",
};

export default async function SurahsPage() {
  const allSurahs = await getAllSurahs();

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 mb-2">
          The Holy Quran
        </h1>
        <p className="text-muted text-sm sm:text-base max-w-xl mx-auto">
          Browse all 114 surahs. Each surah is a chapter of divine guidance revealed over 23 years.
        </p>
        <div className="divider-ornament mt-6">❖</div>
      </div>

      {/* Surah Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allSurahs.map((surah) => (
          <Link
            key={surah.id}
            href={`/surahs/${surah.number}`}
            className="group block"
            id={`surah-${surah.number}`}
          >
            <div className="bg-card-bg border border-card-border rounded-xl p-5 hover:shadow-lg hover:border-gold-300 transition-all duration-200 group-hover:-translate-y-0.5">
              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                {/* Number badge */}
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">
                  {surah.number}
                </div>
                {/* Arabic name */}
                <span className="arabic-text text-xl text-ink-700 group-hover:text-gold-500 transition-colors">
                  {surah.nameArabic}
                </span>
              </div>

              {/* Middle */}
              <h2 className="text-base font-semibold text-ink-900 group-hover:text-accent transition-colors">
                {surah.nameEnglish}
              </h2>
              <p className="text-xs text-muted mt-0.5">
                {surah.nameTransliteration}
              </p>

              {/* Bottom row */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-parchment-200">
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
                  {surah.verseCount} verses
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

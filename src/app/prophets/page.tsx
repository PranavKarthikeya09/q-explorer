import { getAllProphets } from "@/lib/db/queries";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prophets in the Quran — Quran Explorer",
  description:
    "Explore the 25 prophets mentioned in the Holy Quran, from Adam to Muhammad (peace be upon them all).",
};

export default async function ProphetsPage() {
  const prophets = await getAllProphets();

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 mb-2">
          Prophets of the Quran
        </h1>
        <p className="text-muted text-sm sm:text-base max-w-xl mx-auto">
          25 prophets are mentioned by name in the Holy Quran, each sent with
          divine guidance to their people.
        </p>
        <div className="divider-ornament mt-6">❖</div>
      </div>

      {/* Prophet Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {prophets.map((prophet) => (
          <Link
            key={prophet.id}
            href={`/prophets/${prophet.slug}`}
            className="group block"
            id={`prophet-${prophet.slug}`}
          >
            <div className="bg-card-bg border border-card-border rounded-xl p-5 hover:shadow-lg hover:border-gold-300 transition-all duration-200 group-hover:-translate-y-0.5 h-full">
              <div className="flex items-start justify-between mb-3">
                <span className="arabic-text text-xl text-ink-700 group-hover:text-gold-500 transition-colors">
                  {prophet.nameArabic}
                </span>
              </div>

              <h2 className="text-base font-semibold text-ink-900 group-hover:text-accent transition-colors">
                {prophet.nameEnglish}
              </h2>

              {prophet.briefDescription && (
                <p className="text-sm text-ink-600 mt-3 line-clamp-2">
                  {prophet.briefDescription}
                </p>
              )}

              {prophet.mentionCount != null && prophet.mentionCount > 0 && (
                <div className="mt-4 pt-3 border-t border-parchment-200">
                  <span className="text-xs text-muted">
                    Mentioned {prophet.mentionCount} times
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

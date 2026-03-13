import { getProphetBySlug, getVersesByProphetId } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import { toArabicNumeral, verseRef } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface ProphetPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProphetPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prophet = await getProphetBySlug(slug);
  if (!prophet) return { title: "Prophet Not Found" };
  return {
    title: `Prophet ${prophet.nameEnglish} — Quran Explorer`,
    description: `Learn about Prophet ${prophet.nameEnglish} (${prophet.nameArabic}). ${prophet.briefDescription ?? ""}`,
  };
}

export default async function ProphetProfilePage({ params }: ProphetPageProps) {
  const { slug } = await params;
  const prophet = await getProphetBySlug(slug);
  if (!prophet) notFound();

  const relatedVerses = await getVersesByProphetId(prophet.id);

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted mb-8">
        <Link href="/prophets" className="hover:text-accent transition-colors">
          Prophets
        </Link>
        <span>›</span>
        <span className="text-ink-800 font-medium">{prophet.nameEnglish}</span>
      </nav>

      {/* Profile Header */}
      <div className="text-center mb-10">
        <h1 className="arabic-text-xl text-ink-800 mb-2">
          {prophet.nameArabic}
        </h1>
        <h2 className="text-3xl font-bold text-ink-900">
          {prophet.nameEnglish}
        </h2>
        {prophet.mentionCount != null && prophet.mentionCount > 0 && (
          <p className="text-xs text-muted mt-2">
            Mentioned {prophet.mentionCount} times in the Quran
          </p>
        )}
        <div className="divider-ornament mt-6">❖</div>
      </div>

      {/* Description */}
      {prophet.briefDescription && (
        <div className="bg-card-bg border border-card-border rounded-xl p-6 mb-8">
          <p className="text-ink-700 leading-relaxed">
            {prophet.briefDescription}
          </p>
        </div>
      )}

      {/* Related Verses */}
      {relatedVerses.length > 0 && (
        <section>
          <h3 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
            <span className="text-gold-500">📖</span> Quranic References
          </h3>
          <div className="space-y-4">
            {relatedVerses.map(({ verse, surah }) => (
              <Link
                key={verse.id}
                href={`/surahs/${surah.number}/${verse.verseNumber}`}
                className="block verse-card hover:border-accent/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-accent">
                    {verseRef(surah.number, verse.verseNumber)}
                  </span>
                  <span className="text-xs text-muted">{surah.nameEnglish}</span>
                </div>
                <p className="arabic-text text-lg mb-3">
                  {verse.arabicText}
                  <span className="ornament ml-2">
                    ﴿{toArabicNumeral(verse.verseNumber)}﴾
                  </span>
                </p>
                <p className="text-sm text-ink-600 line-clamp-2">
                  {verse.englishTranslation}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedVerses.length === 0 && (
        <p className="text-center text-muted py-8">
          No verse references have been linked yet for this prophet.
        </p>
      )}

      {/* Back link */}
      <div className="mt-12 pt-6 border-t border-parchment-200 text-center">
        <Link
          href="/prophets"
          className="text-sm text-accent hover:text-emerald-700 font-medium transition-colors"
        >
          ← All Prophets
        </Link>
      </div>
    </div>
  );
}

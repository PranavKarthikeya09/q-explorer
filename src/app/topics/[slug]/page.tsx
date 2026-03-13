import { getTopicBySlug, getVersesByTopicId } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import { toArabicNumeral, verseRef } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);
  if (!topic) return { title: "Topic Not Found" };
  return {
    title: `${topic.name} — Quranic Topics — Quran Explorer`,
    description: `Explore Quranic verses about ${topic.name}. ${topic.description ?? ""}`,
  };
}

export default async function TopicDetailPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);
  if (!topic) notFound();

  const relatedVerses = await getVersesByTopicId(topic.id);

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted mb-8">
        <Link href="/topics" className="hover:text-accent transition-colors">
          Topics
        </Link>
        <span>›</span>
        <span className="text-ink-800 font-medium">{topic.name}</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-ink-900">{topic.name}</h1>
        {topic.description && (
          <p className="text-muted text-sm mt-2 max-w-lg mx-auto">
            {topic.description}
          </p>
        )}
        <div className="divider-ornament mt-6">❖</div>
      </div>

      {/* Verses */}
      {relatedVerses.length > 0 ? (
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
      ) : (
        <p className="text-center text-muted py-8">
          No verse references have been linked yet for this topic.
        </p>
      )}

      <div className="mt-12 pt-6 border-t border-parchment-200 text-center">
        <Link
          href="/topics"
          className="text-sm text-accent hover:text-emerald-700 font-medium transition-colors"
        >
          ← All Topics
        </Link>
      </div>
    </div>
  );
}

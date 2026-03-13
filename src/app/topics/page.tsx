import { getAllTopics } from "@/lib/db/queries";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Quranic Topics — Quran Explorer",
  description:
    "Explore the Quran by theme: prayer, charity, patience, justice, paradise, and more.",
};

export default async function TopicsPage() {
  const topics = await getAllTopics();

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 mb-2">
          Quranic Topics
        </h1>
        <p className="text-muted text-sm sm:text-base max-w-xl mx-auto">
          Explore the guidance of the Quran organized by theme. Discover verses
          on prayer, charity, patience, justice, and more.
        </p>
        <div className="divider-ornament mt-6">❖</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/topics/${topic.slug}`}
            className="group block"
            id={`topic-${topic.slug}`}
          >
            <div className="bg-card-bg border border-card-border rounded-xl p-5 hover:shadow-lg hover:border-gold-300 transition-all duration-200 group-hover:-translate-y-0.5 h-full">
              <div className="w-10 h-10 rounded-lg bg-emerald-400/10 text-emerald-700 flex items-center justify-center text-lg mb-3">
                📚
              </div>
              <h2 className="text-base font-semibold text-ink-900 group-hover:text-accent transition-colors">
                {topic.name}
              </h2>
              {topic.description && (
                <p className="text-sm text-ink-600 mt-2 line-clamp-3">
                  {topic.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

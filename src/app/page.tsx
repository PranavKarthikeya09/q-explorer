import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quran Explorer — Read, Study & Explore the Holy Quran",
  description:
    "An immersive Quran study tool with Arabic text, English translations, tafsir, prophet profiles, thematic topics, and powerful search.",
};

const features = [
  {
    href: "/surahs",
    icon: "📖",
    title: "114 Surahs",
    desc: "Browse every chapter with Arabic text and English translation.",
  },
  {
    href: "/prophets",
    icon: "👤",
    title: "Prophets",
    desc: "Explore 25 prophets mentioned in the Quran and their stories.",
  },
  {
    href: "/topics",
    icon: "📚",
    title: "Topics",
    desc: "Discover verses grouped by theme — mercy, patience, justice, and more.",
  },
  {
    href: "/search",
    icon: "🔍",
    title: "Search",
    desc: "Find any verse by keyword across the entire Quran.",
  },
];

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="text-center py-12 sm:py-20">
        <p className="arabic-text-xl text-gold-500 mb-4">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-3 tracking-tight">
          Quran Explorer
        </h1>
        <p className="text-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Read, study, and explore the Holy Quran with Arabic text, English
          translations, scholarly tafsir, and rich cross-references.
        </p>
        <div className="divider-ornament mt-8">❖</div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
        {features.map((f) => (
          <Link key={f.href} href={f.href} className="group" id={`home-${f.href.slice(1)}`}>
            <div className="bg-card-bg border border-card-border rounded-xl p-6 h-full hover:shadow-lg hover:border-accent/30 transition-all duration-200 group-hover:-translate-y-0.5">
              <span className="text-3xl mb-3 block">{f.icon}</span>
              <h2 className="text-lg font-bold text-ink-900 group-hover:text-accent transition-colors mb-1">
                {f.title}
              </h2>
              <p className="text-sm text-ink-600">{f.desc}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* Quick Start CTA */}
      <section className="text-center mt-14 sm:mt-20">
        <Link
          href="/surahs/1"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors text-sm shadow-sm"
          id="start-reading-btn"
        >
          Start Reading — Surah Al-Fatihah →
        </Link>
      </section>

      {/* Inspirational Verse */}
      <section className="text-center mt-16 py-10 border-t border-parchment-200">
        <blockquote className="max-w-lg mx-auto">
          <p className="arabic-text text-xl text-ink-700 mb-4">
            إِنَّ هَـٰذَا ٱلْقُرْءَانَ يَهْدِى لِلَّتِى هِىَ أَقْوَمُ
          </p>
          <p className="text-ink-600 text-sm italic leading-relaxed">
            &ldquo;Indeed, this Quran guides to that which is most suitable.&rdquo;
          </p>
          <footer className="text-xs text-muted mt-2">— Al-Isra 17:9</footer>
        </blockquote>
      </section>
    </div>
  );
}

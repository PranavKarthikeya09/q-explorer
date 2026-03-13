"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { searchVersesAction } from "./actions";

type SearchResult = {
  id: number;
  verseNumber: number;
  arabicText: string;
  englishTranslation: string;
  surahNumber: number;
  surahNameEnglish: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setHasSearched(true);
    startTransition(async () => {
      const data = await searchVersesAction(query.trim());
      setResults(data);
    });
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 mb-2">
          Search the Quran
        </h1>
        <p className="text-muted text-sm max-w-md mx-auto">
          Search through English translations to find relevant verses.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. mercy, patience, prayer…"
          className="flex-1 px-4 py-3 bg-card-bg border border-card-border rounded-xl text-ink-900 text-sm placeholder:text-parchment-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
          id="search-input"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-accent text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-60"
          id="search-btn"
        >
          {isPending ? "Searching…" : "Search"}
        </button>
      </form>

      {/* Results */}
      {isPending && (
        <div className="text-center py-8">
          <div className="inline-block w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!isPending && hasSearched && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted text-lg">No verses found for &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-muted mt-1">Try a different keyword.</p>
        </div>
      )}

      {!isPending && results.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-muted mb-2">
            {results.length} verse{results.length !== 1 ? "s" : ""} found
          </p>
          {results.map((v) => (
            <Link
              key={v.id}
              href={`/surahs/${v.surahNumber}/${v.verseNumber}`}
              className="block verse-card hover:border-accent/30"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-accent">
                  {v.surahNumber}:{v.verseNumber}
                </span>
                <span className="text-xs text-muted">
                  {v.surahNameEnglish}
                </span>
              </div>
              <p className="arabic-text text-lg mb-3">{v.arabicText}</p>
              <p className="text-sm text-ink-600 line-clamp-3">
                {v.englishTranslation}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

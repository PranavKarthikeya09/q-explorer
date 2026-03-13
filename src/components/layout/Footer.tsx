import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-parchment-200 bg-parchment-100/50 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="text-lg font-semibold text-ink-900 mb-2">
              Quran Explorer
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Read, reflect, and understand the Holy Quran with beautiful
              typography, scholarly tafsir, and topical exploration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-semibold text-ink-800 uppercase tracking-wider mb-3">
              Explore
            </p>
            <ul className="space-y-2">
              <FooterLink href="/surahs">Browse Surahs</FooterLink>
              <FooterLink href="/prophets">Prophets</FooterLink>
              <FooterLink href="/topics">Topics</FooterLink>
              <FooterLink href="/search">Search</FooterLink>
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="text-sm font-semibold text-ink-800 uppercase tracking-wider mb-3">
              About
            </p>
            <p className="text-sm text-muted leading-relaxed">
              This project is built with reverence and care to make the Quran
              accessible to readers worldwide. Translations are sourced from
              established scholars.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-parchment-200 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Quran Explorer. Built with sincerity.
          </p>
          <p className="text-xs text-gold-500 font-medium arabic-text text-base">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted hover:text-accent transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

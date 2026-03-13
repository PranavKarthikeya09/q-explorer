import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-parchment-50/90 backdrop-blur-md border-b border-parchment-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl" aria-hidden="true">
            ﷽
          </span>
          <span className="text-lg font-semibold text-ink-900 tracking-tight group-hover:text-accent transition-colors">
            Quran Explorer
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden sm:flex items-center gap-1">
          <NavLink href="/surahs">Surahs</NavLink>
          <NavLink href="/prophets">Prophets</NavLink>
          <NavLink href="/topics">Topics</NavLink>
          <NavLink href="/search">Search</NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 rounded-lg hover:bg-parchment-100 transition-colors"
          aria-label="Open menu"
          id="mobile-menu-btn"
        >
          <svg
            className="w-5 h-5 text-ink-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-lg text-sm font-medium text-ink-700 hover:text-accent hover:bg-accent-light/50 transition-all duration-200"
    >
      {children}
    </Link>
  );
}

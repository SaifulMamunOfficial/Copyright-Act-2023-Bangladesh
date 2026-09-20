import Link from 'next/link';
import './navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar glass">
      <div className="container navbar-container">
        <Link href="/" className="navbar-logo" aria-label="Go to homepage">
          <span className="logo-icon" aria-hidden="true">⚖️</span>
          <div>
            <div className="logo-title">কপিরাইট আইন</div>
            <div className="logo-subtitle">বাংলাদেশ ২০২৩</div>
          </div>
        </Link>
        <div className="navbar-links" role="navigation" aria-label="Main Navigation">
          <Link href="/law" className="nav-link">আইন পড়ুন</Link>
          <Link href="/topics" className="nav-link">বিষয়ভিত্তিক</Link>
          <Link href="/guide" className="nav-link">গাইড</Link>
          <Link href="/ai-copyright" className="nav-link">এআই ও কপিরাইট</Link>
          <Link href="/original-source" className="nav-link">মূল উৎস</Link>
          <Link href="/search" className="nav-link nav-search" aria-label="Search site">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            অনুসন্ধান
          </Link>
        </div>
      </div>
    </nav>
  );
}

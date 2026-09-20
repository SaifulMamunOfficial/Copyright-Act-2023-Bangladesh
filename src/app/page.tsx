import Link from 'next/link';
import './page.css';
import topics from '@/data/topics.json';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">কপিরাইট আইন, ২০২৩</h1>
          <p className="hero-subtitle">
            বাংলাদেশের কপিরাইট আইনের একটি সহজ, পূর্ণাঙ্গ এবং অনুসন্ধানযোগ্য জ্ঞানভান্ডার। 
            আইনজীবীর কাছে যাওয়ার আগেই জেনে নিন আপনার অধিকার।
          </p>
          
          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="আইনের ধারা, বিষয় বা প্রশ্ন খুঁজুন..." 
            />
            <button className="search-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="h2">বিষয়ভিত্তিক কপিরাইট</h2>
            <p className="text-muted">আপনার কাজের ধরন অনুযায়ী কপিরাইট আইন জানুন</p>
          </div>
          
          <div className="grid grid-cols-3">
            {topics.map(topic => (
              <Link href={`/topics/${topic.id}`} key={topic.id} className="topic-card">
                <div className="topic-icon">
                  {topic.id === 'music' ? '🎵' : 
                   topic.id === 'literature' ? '📚' : 
                   topic.id === 'film' ? '🎬' : '💻'}
                </div>
                <h3 className="topic-title">{topic.title}</h3>
                <p className="topic-desc">{topic.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="h2">আপনি কী করতে চান?</h2>
              <p className="text-muted" style={{ marginBottom: '2rem' }}>
                আপনার নির্দিষ্ট সমস্যার ওপর ভিত্তি করে সরাসরি আইনি সমাধান ও নির্দেশনা খুঁজে নিন।
              </p>
              <div className="action-cards">
                <Link href="/guide/publish-book" className="action-card">
                  <span className="action-title">আমি একটি বই প্রকাশ করতে চাই</span>
                  <span>→</span>
                </Link>
                <Link href="/guide/youtube-content" className="action-card">
                  <span className="action-title">আমি ইউটিউবের জন্য অন্যের কনটেন্ট ব্যবহার করতে চাই</span>
                  <span>→</span>
                </Link>
                <Link href="/guide/ai-images" className="action-card">
                  <span className="action-title">আমি AI দিয়ে ছবি তৈরি করেছি</span>
                  <span>→</span>
                </Link>
                <Link href="/guide/copyright-registration" className="action-card">
                  <span className="action-title">আমি কপিরাইট নিবন্ধন করতে চাই</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
            
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <div className="glass" style={{ padding: '3rem', borderRadius: '1rem' }}>
                <h3 className="h3">পুরো আইন পড়তে চান?</h3>
                <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
                  ১৯টি অধ্যায় এবং ১২৮টি ধারার সম্পূর্ণ সরকারি পাঠ এবং তার সহজ ব্যাখ্যা।
                </p>
                <Link href="/law" className="btn btn-primary">
                  আইন পড়ুন
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

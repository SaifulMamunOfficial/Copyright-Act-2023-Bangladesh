import Link from 'next/link';
import topicsData from '@/data/topics.json';
import Breadcrumb from '@/components/Breadcrumb';

export default function TopicsIndexPage() {
  return (
    <div className="container section-padding">
      <Breadcrumb items={[
        { label: 'হোম', href: '/' },
        { label: 'বিষয়ভিত্তিক' }
      ]} />

      <div className="section-header-top" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="h1">বিষয়ভিত্তিক আইন</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          আপনার কাজের ক্ষেত্র বা আগ্রহের বিষয় অনুযায়ী কপিরাইট আইনের প্রাসঙ্গিক ধারাগুলো সম্পর্কে জানুন।
        </p>
      </div>

      <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
        {topicsData.map((topic) => (
          <Link href={`/topics/${topic.id}`} key={topic.id} className="card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h2 className="h3" style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>{topic.title}</h2>
            <p className="text-muted" style={{ flexGrow: 1 }}>{topic.description}</p>
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="law-layer-badge badge-educational" style={{ marginBottom: 0 }}>
                {topic.related_sections.length} টি ধারা
              </span>
              <span style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 600 }}>বিস্তারিত পড়ুন →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

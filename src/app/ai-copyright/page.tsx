import Link from 'next/link';
import aiData from '@/data/ai-knowledge.json';

export default function AICopyrightPage() {
  return (
    <div className="container section-padding">
      <div className="section-header-top" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="h1">AI & Copyright: আইনি বিশ্লেষণ</h1>
        <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto' }}>
          আর্টিফিশিয়াল ইন্টেলিজেন্স (AI) এবং কপিরাইট আইন নিয়ে প্রচলিত ধারণা এবং বাংলাদেশ কপিরাইট আইন ২০২৩-এর আলোকে এর বাস্তব বিশ্লেষণ।
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="grid grid-cols-1" style={{ gap: '2rem' }}>
          {aiData.map((item, idx) => (
            <div key={idx} className="card" style={{ borderLeft: item.is_supported ? '4px solid var(--success-color)' : '4px solid var(--danger-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span className="law-layer-badge" style={{ backgroundColor: item.is_supported ? 'var(--soft-green)' : 'var(--soft-red)', color: item.is_supported ? 'var(--success-color)' : 'var(--danger-hover)', border: 'none' }}>
                  {item.is_supported ? '✅ আইনে সমর্থিত' : '❌ প্রচলিত ভুল ধারণা'}
                </span>
              </div>
              <h3 className="h3" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                দাবি: {item.claim}
              </h3>
              <div className="law-layer-educational" style={{ backgroundColor: 'var(--bg-secondary)', marginBottom: '1rem' }}>
                <strong>আইনি বিশ্লেষণ:</strong>
                <p style={{ marginTop: '0.5rem' }}>{item.analysis}</p>
              </div>
              
              <div>
                <strong style={{ fontSize: '0.9rem' }}>সম্পর্কিত ধারা:</strong>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  {item.related_sections.map(secId => (
                    <Link href={`/law/${secId}`} key={secId} className="law-layer-badge badge-truth">
                      {secId.replace('COPY-', 'ধারা ')}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

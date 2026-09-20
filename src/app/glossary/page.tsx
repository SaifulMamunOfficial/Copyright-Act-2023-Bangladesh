import Link from 'next/link';
import glossaryData from '@/data/glossary.json';

export default function GlossaryPage() {
  return (
    <div className="container section-padding">
      <div className="section-header-top" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="h1">আইনি শব্দকোষ</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          কপিরাইট আইনের বিভিন্ন জটিল শব্দের সহজ বাংলা অর্থ।
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="grid grid-cols-1" style={{ gap: '1.5rem' }}>
          {glossaryData.map((item, idx) => (
            <div key={idx} className="card">
              <h3 className="h3" style={{ color: 'var(--accent-color)' }}>{item.term}</h3>
              <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                {item.definition}
              </p>
              {item.related_sections && item.related_sections.length > 0 && (
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
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import guidesData from '@/data/guides.json';

export default function GuideIndex() {
  return (
    <div className="container section-padding">
      <div className="section-header-top" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="h1">আপনি কী করতে চান?</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          আপনার নির্দিষ্ট সমস্যার ওপর ভিত্তি করে সরাসরি আইনি সমাধান ও নির্দেশনা খুঁজে নিন।
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="grid grid-cols-1" style={{ gap: '1rem' }}>
          {guidesData.map(guide => (
            <Link href={`/guide/${guide.id}`} key={guide.id} className="card" style={{ display: 'block' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 className="h3" style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{guide.title}</h3>
                  <p className="text-muted">{guide.description}</p>
                </div>
                <div style={{ color: 'var(--accent-color)', fontSize: '1.5rem', paddingLeft: '1rem' }}>
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

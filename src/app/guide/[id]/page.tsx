import Link from 'next/link';
import guidesData from '@/data/guides.json';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return guidesData.map((g) => ({
    id: g.id,
  }));
}

export default async function GuidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const guide = guidesData.find(g => g.id === id);

  if (!guide) {
    notFound();
  }

  return (
    <div className="container section-padding">
      <div className="section-header-top" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="h1">{guide.title}</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>{guide.description}</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {guide.steps.map((step, index) => (
          <div key={index} className="card" style={{ marginBottom: '1.5rem', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-15px',
              left: '-15px',
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--accent-color)',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              {index + 1}
            </div>
            <h3 className="h3" style={{ marginTop: '0.5rem' }}>{step.title}</h3>
            <p className="text-muted" style={{ marginBottom: '1rem' }}>{step.content}</p>
            {step.related_section && (
              <Link href={`/law/${step.related_section}`} className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
                সংশ্লিষ্ট ধারা পড়ুন →
              </Link>
            )}
          </div>
        ))}

        {guide.faqs && guide.faqs.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <h2 className="h2" style={{ marginBottom: '1.5rem' }}>সাধারণ জিজ্ঞাসা (FAQ)</h2>
            <div className="grid grid-cols-1">
              {guide.faqs.map((faq, idx) => (
                <div key={idx} className="law-layer-educational">
                  <strong>প্রশ্ন: {faq.question}</strong>
                  <p style={{ marginTop: '0.5rem' }}>উত্তর: {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

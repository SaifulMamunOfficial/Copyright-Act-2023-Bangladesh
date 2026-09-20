'use client';

import { useState } from 'react';
import './section-view.css';
import { Section } from '@/types/copyright';
import topicsData from '@/data/topics.json';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export default function SectionView({ section, chapterTitle }: { section: Section, chapterTitle: string }) {
  const [mode, setMode] = useState<'original' | 'explained'>('explained');
  const [copied, setCopied] = useState(false);

  const relatedTopics = topicsData.filter(t => t.related_sections.includes(section.id));

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container section-padding" style={{ maxWidth: '1200px' }}>
      <Breadcrumb items={[
        { label: 'হোম', href: '/' },
        { label: 'আইন পড়ুন', href: '/law' },
        { label: chapterTitle },
        { label: `ধারা ${section.section_number}` }
      ]} />
      
      <div className="section-header-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span className="text-muted">{chapterTitle}</span>
          <h1 className="h1">ধারা {section.section_number}: {section.title}</h1>
        </div>
        <button className="btn btn-outline" onClick={handleCopy} style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}>
          {copied ? '✅ কপি হয়েছে' : '🔗 লিংক কপি'}
        </button>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Legislation",
            "name": `Copyright Act 2023 - Section ${section.section_number}: ${section.title}`,
            "text": section.original_law_text,
            "url": `https://copyright-act-bd.example.com/law/${section.id}`
          })
        }}
      />

      <div className="mode-toggle">
        <button 
          className={`btn ${mode === 'explained' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setMode('explained')}
        >
          সহজে বুঝুন
        </button>
        <button 
          className={`btn ${mode === 'original' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setMode('original')}
        >
          মূল আইন
        </button>
      </div>

      {mode === 'original' && (
        <div className="animate-fade-in law-layer-truth">
          <span className="law-layer-badge badge-truth">Source of Truth</span>
          <div className="original-text" dangerouslySetInnerHTML={{ __html: section.original_law_text.replace(/\n/g, '<br/>') }} />
        </div>
      )}

      {mode === 'explained' && (
        <div className="animate-fade-in">
          {section.explanation ? (
            <div className="law-layer-editorial">
              <span className="law-layer-badge badge-editorial">সহজ ব্যাখ্যা</span>
              <p>{section.explanation}</p>
            </div>
          ) : (
            <div className="law-layer-editorial" style={{ opacity: 0.6 }}>
              <p>এই ধারার সহজ ব্যাখ্যা এখনো যুক্ত করা হয়নি।</p>
              <div style={{marginTop: '1rem'}}>
                  <span className="law-layer-badge badge-truth">Source of Truth</span>
                  <div className="original-text" dangerouslySetInnerHTML={{ __html: section.original_law_text.replace(/\n/g, '<br/>') }} />
              </div>
            </div>
          )}
          
          {section.examples && section.examples.length > 0 && (
            <div className="law-layer-educational">
              <span className="law-layer-badge badge-educational">বাস্তব উদাহরণ</span>
              {section.examples.map((ex: string | { title?: string, content: string }, i: number) => (
                <div key={i} style={{ marginBottom: '1rem' }}>
                  {typeof ex === 'string' ? (
                    <span>{ex}</span>
                  ) : (
                    <>
                      {ex.title && <strong>{ex.title}: </strong>}
                      <span>{ex.content}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Related Topics (Knowledge Graph) */}
      {relatedTopics.length > 0 && (
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <h3 className="h3" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>সম্পর্কিত বিষয়সমূহ:</h3>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {relatedTopics.map(t => (
              <Link href={`/topics/${t.id}`} key={t.id} className="law-layer-badge badge-truth" style={{ textDecoration: 'none' }}>
                {t.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Verification Source Box */}
      <div className="verification-box glass" style={{ marginTop: '4rem', padding: '1rem', fontSize: '0.85rem' }}>
        <p><strong>যাচাইকরণ স্ট্যাটাস:</strong> {section.verification?.law_text === 'verified' ? '✅ ভেরিফাইড (Official BD Laws)' : '⚠️ যাচাই প্রয়োজন'}</p>
        <p><strong>সর্বশেষ আপডেট:</strong> {new Date(section.source.verified_at).toLocaleDateString('bn-BD')}</p>
      </div>
    </div>
  );
}

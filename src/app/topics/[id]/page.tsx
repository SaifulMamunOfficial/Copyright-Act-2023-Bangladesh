import Link from 'next/link';
import topicsData from '@/data/topics.json';
import rawLawData from '@/data/copyright-act.json';
import { notFound } from 'next/navigation';
import { Section, LawData } from '@/types/copyright';

const lawData = rawLawData as unknown as LawData;

export function generateStaticParams() {
  return topicsData.map((topic) => ({
    id: topic.id,
  }));
}

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topic = topicsData.find(t => t.id === id);

  if (!topic) {
    notFound();
  }

  // Find all related sections for this topic
  const relatedSections: (Section & { chapter_number: string })[] = [];
  
  lawData.chapters.forEach(chapter => {
    chapter.sections.forEach(section => {
      // For now, if the section ID is in the related_sections list of the topic, add it
      if (topic.related_sections.includes(section.id)) {
        relatedSections.push({
          ...section,
          chapter_number: chapter.chapter_number
        });
      }
    });
  });

  return (
    <div className="container section-padding">
      <div className="section-header-top" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="h1">{topic.title}</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>{topic.description}</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="h2" style={{ marginBottom: '1.5rem' }}>সম্পর্কিত আইনসমূহ</h2>
        <div className="grid grid-cols-1" style={{ gap: '1rem' }}>
          {relatedSections.length > 0 ? relatedSections.map(section => (
            <Link href={`/law/${section.id}`} key={section.id} className="card" style={{ display: 'block' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="law-layer-badge badge-editorial">ধারা {section.section_number}</span>
                <span className="text-muted" style={{ fontSize: '0.85rem' }}>অধ্যায় {section.chapter_number}</span>
              </div>
              <h3 className="h3" style={{ fontSize: '1.25rem' }}>{section.title}</h3>
              <p className="text-muted" style={{ 
                display: '-webkit-box', 
                WebkitLineClamp: 2, 
                WebkitBoxOrient: 'vertical', 
                overflow: 'hidden' 
              }}>
                {section.original_law_text}
              </p>
            </Link>
          )) : (
            <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
              <p className="text-muted">এই বিষয়ের ওপর কোনো নির্দিষ্ট ধারা এখনো ম্যাপ করা হয়নি।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

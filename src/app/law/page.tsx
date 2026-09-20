import Link from 'next/link';
import lawData from '@/data/copyright-act.json';
import './law.css';

export default function LawIndex() {
  return (
    <div className="container section-padding">
      <div className="law-header">
        <h1 className="h1">{lawData.title}</h1>
        <p className="text-muted">{lawData.act_number}</p>
      </div>

      <div className="chapters-list">
        {lawData.chapters.map(chapter => (
          <div key={chapter.id} className="chapter-card glass">
            <h2 className="chapter-title">অধ্যায় {chapter.chapter_number}</h2>
            <h3 className="chapter-name">{chapter.title}</h3>
            
            <div className="sections-grid">
              {chapter.sections.map(section => (
                <Link href={`/law/${section.id}`} key={section.id} className="section-link">
                  <span className="section-no">ধারা {section.section_number}</span>
                  <span className="section-title">{section.title}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

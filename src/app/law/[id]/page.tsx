import rawLawData from '@/data/copyright-act.json';
import { LawData } from '@/types/copyright';

const lawData = rawLawData as unknown as LawData;
import SectionView from './SectionView';
import { notFound } from 'next/navigation';

// For static generation
export function generateStaticParams() {
  const paths = [];
  for (const chapter of lawData.chapters) {
    for (const section of chapter.sections) {
      paths.push({ id: section.id });
    }
  }
  return paths;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let currentSection = null;
  let currentChapterTitle = '';

  for (const chapter of lawData.chapters) {
    const found = chapter.sections.find(s => s.id === id);
    if (found) {
      currentSection = found;
      currentChapterTitle = `অধ্যায় ${chapter.chapter_number}: ${chapter.title}`;
      break;
    }
  }

  if (!currentSection) {
    notFound();
  }

  return <SectionView section={currentSection} chapterTitle={currentChapterTitle} />;
}

import fs from 'fs';
import path from 'path';

// Define paths
const dataDir = path.join(process.cwd(), 'src/data');
const lawDataPath = path.join(dataDir, 'copyright-act.json');
const topicsDataPath = path.join(dataDir, 'topics.json');
const guidesDataPath = path.join(dataDir, 'guides.json');
const faqDataPath = path.join(dataDir, 'faq.json');
const glossaryDataPath = path.join(dataDir, 'glossary.json');
const aiDataPath = path.join(dataDir, 'ai-knowledge.json');

const searchIndex = [];

// Helper to check if file exists
function readJSON(file) {
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  return [];
}

// 1. Process Law Sections
const lawData = readJSON(lawDataPath);
if (lawData.chapters) {
  lawData.chapters.forEach(chapter => {
    chapter.sections.forEach(section => {
      searchIndex.push({
        id: section.id,
        type: 'section',
        title: `ধারা ${section.section_number}: ${section.title}`,
        keywords: [section.section_number, section.title, `অধ্যায় ${chapter.chapter_number}`],
        content: section.original_law_text + ' ' + (section.explanation || ''),
        related_sections: [],
        url: `/law/${section.id}`
      });
    });
  });
}

// 2. Process Topics
const topics = readJSON(topicsDataPath);
topics.forEach(topic => {
  searchIndex.push({
    id: topic.id,
    type: 'topic',
    title: topic.title,
    keywords: [topic.title, ...topic.related_sections],
    content: topic.description,
    related_sections: topic.related_sections,
    url: `/topics/${topic.id}`
  });
});

// 3. Process Guides
const guides = readJSON(guidesDataPath);
guides.forEach(guide => {
  let related = [];
  let stepsContent = '';
  guide.steps.forEach(step => {
    if (step.related_section) related.push(step.related_section);
    stepsContent += `${step.title} ${step.content} `;
  });
  
  searchIndex.push({
    id: guide.id,
    type: 'guide',
    title: guide.title,
    keywords: [guide.title],
    content: guide.description + ' ' + stepsContent,
    related_sections: related,
    url: `/guide/${guide.id}`
  });
});

// 4. Process Glossary
const glossary = readJSON(glossaryDataPath);
glossary.forEach((item, index) => {
  searchIndex.push({
    id: `glossary-${index}`,
    type: 'glossary',
    title: item.term,
    keywords: [item.term],
    content: item.definition,
    related_sections: item.related_sections || [],
    url: `/glossary` // In real app, might jump to an anchor tag
  });
});

// Write search index
fs.writeFileSync(path.join(dataDir, 'search-index.json'), JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`Search index generated successfully with ${searchIndex.length} records.`);

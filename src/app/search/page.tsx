'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import searchIndex from '@/data/search-index.json';
import './search.css';

interface SearchRecord {
  id: string;
  type: 'section' | 'topic' | 'guide' | 'faq' | 'glossary';
  title: string;
  keywords: string[];
  content: string;
  url: string;
  score?: number;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerms = query.toLowerCase().split(' ').filter(t => t);
    const matches: SearchRecord[] = [];

    searchIndex.forEach((item: any) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const contentLower = (item.content || '').toLowerCase();
      
      searchTerms.forEach(term => {
        if (titleLower.includes(term)) score += 20;
        if (contentLower.includes(term)) score += 5;
        if (item.keywords.some((k: string) => k.toLowerCase().includes(term))) score += 15;
      });

      // Basic keyword/NLP fallback matching
      if (query.includes('শাস্তি') && contentLower.includes('কারাদণ্ড')) score += 15;
      if (query.includes('জরিমানা') && contentLower.includes('অর্থদণ্ড')) score += 15;
      if (query.includes('কপি') && contentLower.includes('লঙ্ঘন')) score += 15;

      if (score > 0) {
        matches.push({
          ...item,
          score
        });
      }
    });

    return matches.sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [query]);

  // Helper to map types to Bengali badges
  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'section': return <span className="law-layer-badge badge-truth">আইনের ধারা</span>;
      case 'topic': return <span className="law-layer-badge" style={{ backgroundColor: 'var(--bg-secondary)' }}>বিষয়</span>;
      case 'guide': return <span className="law-layer-badge badge-educational">গাইড</span>;
      case 'glossary': return <span className="law-layer-badge badge-editorial">শব্দকোষ</span>;
      default: return null;
    }
  };

  return (
    <div className="container section-padding">
      <div className="search-header">
        <h1 className="h1">আইন অনুসন্ধান</h1>
        <div className="search-bar-wrapper">
          <input 
            type="text" 
            className="search-input-large" 
            placeholder="আইনের ধারা, বিষয়, বা প্রশ্ন লিখুন..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      <div className="search-results">
        {query && results.length === 0 && (
          <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
            <p className="text-muted">&quot;{query}&quot; এর জন্য কোনো ফলাফল পাওয়া যায়নি। অন্য শব্দ ব্যবহার করে চেষ্টা করুন।</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-1" style={{ gap: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
            <p className="text-muted" style={{ marginBottom: '1rem' }}>{results.length} টি ফলাফল পাওয়া গেছে</p>
            {results.map(item => (
              <Link href={item.url} key={item.id} className="card search-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  {getTypeBadge(item.type)}
                </div>
                <h3 className="h3" style={{ fontSize: '1.25rem' }}>
                  {query ? item.title.split(new RegExp(`(${query.trim()})`, 'gi')).map((part: string, i: number) => 
                    part.toLowerCase() === query.trim().toLowerCase() ? <mark key={i}>{part}</mark> : part
                  ) : item.title}
                </h3>
                <p className="text-muted search-snippet">
                  {item.content}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

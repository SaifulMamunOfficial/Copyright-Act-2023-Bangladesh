import Link from 'next/link';
import lawData from '@/data/copyright-act.json';

export default function OriginalSourcePage() {
  return (
    <div className="container section-padding">
      <div className="section-header-top" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="h1">মূল সরকারি উৎস</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          এই প্ল্যাটফর্মে ব্যবহৃত আইনের ডেটা এবং এর লিগ্যাল ট্রাস্ট ইনফরমেশন।
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="card" style={{ marginBottom: '2rem', borderTop: '4px solid var(--accent-color)' }}>
          <h2 className="h2" style={{ marginBottom: '1rem' }}>{lawData.title}</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <tbody>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: 'bold' }}>আইন নম্বর</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{lawData.act_number}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: 'bold' }}>উৎস (Source of Truth)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                  <a href="http://bdlaws.minlaw.gov.bd/act-1412.html" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)' }}>
                    bdlaws.minlaw.gov.bd/act-1412
                  </a>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: 'bold' }}>আইন প্রণয়নের সাল</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>২০২৩</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: 'bold' }}>সর্বশেষ ভেরিফিকেশন ডেট</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{new Date().toLocaleDateString('bn-BD')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="law-layer-educational">
          <strong>⚠️ ডিসক্লেইমার:</strong>
          <p style={{ marginTop: '0.5rem' }}>
            এই প্ল্যাটফর্মটি সাধারণ মানুষের আইনি জ্ঞান বৃদ্ধির উদ্দেশ্যে তৈরি করা হয়েছে। প্ল্যাটফর্মে দুটি অংশ রয়েছে:
          </p>
          <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>মূল আইন (Source of Truth):</strong> এটি সরাসরি সরকারি বডি (bdlaws) থেকে সংগৃহীত।</li>
            <li><strong>সহজ ব্যাখ্যা (Explanation) ও গাইড:</strong> এগুলো AI-অ্যাসিস্টেড এবং লিগ্যাল কনসালটেন্ট দ্বারা পর্যালোচিত হলেও, আইনি আদালতে এগুলো প্রামাণ্য দলিল হিসেবে কাজ করবে না। যেকোনো গুরুতর আইনি পদক্ষেপে একজন অভিজ্ঞ আইনজীবীর পরামর্শ নেওয়া বাঞ্ছনীয়।</li>
          </ul>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/law" className="btn btn-primary">
            আইন পড়া শুরু করুন
          </Link>
        </div>
      </div>
    </div>
  );
}

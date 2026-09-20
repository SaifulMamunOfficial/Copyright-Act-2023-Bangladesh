import Link from 'next/link';

// Dummy FAQ data for now, ideally should come from faq.json
const faqs = [
  {
    question: "কপিরাইট কী এবং কেন প্রয়োজন?",
    answer: "কপিরাইট হলো কোনো মৌলিক সৃষ্টিকর্মের (যেমন: বই, গান, সফটওয়্যার) প্রণেতার আইনগত অধিকার। এটি প্রয়োজন কারণ এটি অন্যকে আপনার বিনা অনুমতিতে কাজ ব্যবহার করা থেকে বিরত রাখে এবং আপনার আর্থিক অধিকার নিশ্চিত করে।"
  },
  {
    question: "কপিরাইট কি নিজে থেকেই তৈরি হয় নাকি নিবন্ধন করতে হয়?",
    answer: "কোনো কাজ সৃষ্টি হওয়ার সাথে সাথেই কপিরাইট স্বয়ংক্রিয়ভাবে তৈরি হয়। তবে আইনি ঝামেলায় এটি প্রমাণ করার জন্য কপিরাইট অফিসে নিবন্ধন করা শ্রেয়। (আইনের ৬০ ধারা অনুযায়ী এটি প্রাথমিক প্রমাণ হিসেবে কাজ করে)"
  },
  {
    question: "কপিরাইটের মেয়াদ কতদিন?",
    answer: "সাধারণত প্রণেতার জীবনকাল এবং তার মৃত্যুর পর ৬০ বছর পর্যন্ত কপিরাইট বলবৎ থাকে। (অধ্যায় ৬ দ্রষ্টব্য)"
  },
  {
    question: "ফেয়ার ইউজ বা ন্যায্য ব্যবহার কী?",
    answer: "গবেষণা, পড়াশোনা, সমালোচনা বা সংবাদ প্রচারের উদ্দেশ্যে অন্যের কাজের কিছু অংশ ব্যবহার করা কপিরাইট লঙ্ঘন নয়। এটি আইনের ৭১ ধারায় বিস্তারিত বলা আছে।"
  }
];

export default function FAQPage() {
  return (
    <div className="container section-padding">
      <div className="section-header-top" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="h1">সাধারণ জিজ্ঞাসা (FAQ)</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          কপিরাইট নিয়ে মানুষের মনে সবচেয়ে বেশি যে প্রশ্নগুলো আসে, তার উত্তর।
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="grid grid-cols-1" style={{ gap: '1.5rem' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} className="card">
              <h3 className="h3" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                {idx + 1}. {faq.question}
              </h3>
              <p className="text-muted">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p className="text-muted" style={{ marginBottom: '1rem' }}>আপনার নির্দিষ্ট কোনো প্রশ্ন থাকলে অনুসন্ধান করুন</p>
          <Link href="/search" className="btn btn-primary">
            সার্চ করুন
          </Link>
        </div>
      </div>
    </div>
  );
}

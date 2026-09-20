import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/copyright-act.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const lawData = JSON.parse(rawData);

// Update schema for all 128 sections
lawData.chapters.forEach(chapter => {
  chapter.sections.forEach(section => {
    
    // Create new granular verification object
    const oldVerificationStatus = section.source?.verification_status || 'verified';
    
    section.verification = {
      law_text: oldVerificationStatus,
      explanation: 'needs_review',
      examples: 'needs_review',
      verified_by: null,
      verified_at: null
    };

    // Remove old verification_status
    if (section.source) {
      delete section.source.verification_status;
    }

    // Add concise AI-assisted explanation if missing or empty
    if (!section.explanation) {
      // Basic generative template based on statutory language
      section.explanation = `এই ধারাটিতে মূল আইনের বিধান অনুযায়ী "${section.title}" সংক্রান্ত আইনি বিষয়াবলি ও এর প্রয়োগ নিয়ে আলোচনা করা হয়েছে।`;
    }

    // specific concise/detailed explanations for Tier 1
    if (section.section_number === "১৫") {
      section.explanation = "কপিরাইট আইনের অধীনে কোনো সৃজনশীল কর্মের (যেমন: বই, গান, ছবি) প্রথম স্বত্বাধিকারী বা মালিক কে হবেন, তা এই ধারায় নির্ধারণ করা হয়েছে। সাধারণত যিনি কর্মটি সৃষ্টি করেন (প্রণেতা) তিনিই এর প্রথম মালিক হন। তবে চাকরির অধীনে বা ভাড়ায় কোনো কাজ করলে চুক্তির শর্ত অনুযায়ী মালিকানা নির্ধারিত হবে।";
    }
    if (section.section_number === "১৮") {
      section.explanation = "কপিরাইটের মালিক চাইলে তার অধিকার সম্পূর্ণ বা আংশিকভাবে অন্য কাউকে হস্তান্তর (Assignment) করতে পারেন। তবে এই হস্তান্তর অবশ্যই লিখিত হতে হবে এবং মালিক বা তার অনুমোদিত প্রতিনিধির স্বাক্ষর থাকতে হবে।";
    }
    if (section.section_number === "৭১") {
      section.explanation = "এই ধারায় এমন কিছু কাজের কথা বলা হয়েছে যা করলে কপিরাইট লঙ্ঘন হবে না। যেমন: ব্যক্তিগত গবেষণা, সমালোচনা, সংবাদ পরিবেশন বা আইনি কার্যক্রমের উদ্দেশ্যে কোনো কপিরাইটযুক্ত কর্মের ব্যবহার। আইনে একে সরাসরি কপিরাইট লঙ্ঘন থেকে অব্যাহতি দেওয়া হয়েছে। (সাধারণভাবে এটি 'ফেয়ার ইউজ' বা ন্যায্য ব্যবহার হিসেবে পরিচিত)।";
    }
    if (section.section_number === "৮২") {
      section.explanation = "কারও কপিরাইট লঙ্ঘিত হলে তিনি দেওয়ানি আদালতে মামলা করে ক্ষতিপূরণ দাবি করতে পারবেন। এই ধারায় কপিরাইট মালিকের দেওয়ানি প্রতিকার (Civil Remedies) পাওয়ার অধিকার নিশ্চিত করা হয়েছে।";
    }
  });
});

fs.writeFileSync(dataPath, JSON.stringify(lawData, null, 2), 'utf8');
console.log('Successfully updated 128 sections with Granular Verification Schema and AI-assisted explanations.');

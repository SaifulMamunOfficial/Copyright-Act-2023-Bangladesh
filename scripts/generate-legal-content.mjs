import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../src/data/copyright-act.json');

// Initialize Gemini Client
const ai = new GoogleGenAI({}); // Reads GEMINI_API_KEY from environment

const SYSTEM_PROMPT = `
You are an expert Bangladeshi legal assistant specialized in the Copyright Act 2023.
Your task is to generate easy-to-understand Bengali explanations and practical examples for specific legal sections.

CRITICAL CONSTRAINTS (MANDATORY):
1. নতুন কোনো আইন/শর্ত বানানো যাবে না। (Do not invent new laws or conditions).
2. মূল আইনের অর্থ পরিবর্তন করা যাবে না। (Do not alter the original meaning).
3. আইন যা সরাসরি বলে না, সেটিকে আইনের নিশ্চিত বক্তব্য হিসেবে লেখা যাবে না। (Do not state implied meanings as definitive facts).
4. উদাহরণকে বাস্তব আইনি সিদ্ধান্ত হিসেবে উপস্থাপন করা যাবে না। (Do not present examples as real legal precedents).
5. "আইন অনুযায়ী নিশ্চিত" বা "অবশ্যই" ধরনের ভাষা শুধু source text দ্বারা সরাসরি সমর্থিত হলেই ব্যবহার করা যাবে।

OUTPUT FORMAT:
Generate your output strictly in JSON according to the schema provided.
`;

async function generateContent(sectionId, title, originalLawText, retryCount = 0) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `
Generate the legal explanation and practical examples for this section.
Section ID: ${sectionId}
Title: ${title}
Original Law Text:
"""
${originalLawText}
"""
      `,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.2, // Low temperature for factual consistency
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: {
              type: Type.STRING,
              description: 'A simple, clear Bengali explanation of the original law text. Must be easy to understand but legally accurate.'
            },
            examples: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '1 to 3 practical, educational examples illustrating the law in daily life. Must not be presented as real legal cases.'
            }
          },
          required: ['explanation', 'examples']
        }
      }
    });

    return JSON.parse(response.text);
  } catch (err) {
    if (err.status === 429 || (err.message && err.message.includes('429'))) {
      if (retryCount >= 3) {
        console.error(`[ERROR] Max retries reached for ${sectionId} due to Rate Limit (429). Aborting this section.`);
        return null;
      }
      console.warn(`[WARN] Rate limit hit for ${sectionId}. Waiting 60 seconds before retrying... (Retry ${retryCount + 1}/3)`);
      await new Promise(r => setTimeout(r, 60000));
      return generateContent(sectionId, title, originalLawText, retryCount + 1);
    }
    console.error(`[ERROR] AI Generation failed for ${sectionId}:`, err);
    return null;
  }
}

// Automated QA Module
function performAutomatedQA(originalSection, generatedData) {
  const errors = [];

  // 1. Missing fields
  if (!generatedData.explanation || generatedData.explanation.trim().length === 0) {
    errors.push('Explanation is empty.');
  }
  if (!generatedData.examples || !Array.isArray(generatedData.examples) || generatedData.examples.length === 0) {
    errors.push('Examples array is empty or invalid.');
  }

  // 2. Length anomalies
  if (generatedData.explanation && generatedData.explanation.length < 50) {
    errors.push('Explanation is suspiciously short.');
  }
  
  // 3. Risky language detection
  const riskyTerms = ['অবশ্যই', 'নিশ্চিতভাবে', 'প্রমাণিত', 'বাধ্যতামূলক'];
  if (generatedData.explanation) {
    riskyTerms.forEach(term => {
      // Basic check: if it says "অবশ্যই" but the original law doesn't have "হইবে" or similar strict mandates
      // This is a naive check; human review is still needed, but raises a flag.
      if (generatedData.explanation.includes(term) && !originalSection.original_law_text.includes(term) && !originalSection.original_law_text.includes('হইবে')) {
         errors.push(`Risky definitive term found: "${term}" without clear mandate in original text.`);
      }
    });
  }

  // 4. Mismatched section meaning (heuristics)
  // Check if original law text was altered (we don't modify it anyway, but ensuring generated data doesn't return a corrupted text)
  if (generatedData.original_law_text && generatedData.original_law_text !== originalSection.original_law_text) {
     errors.push(`Original law text alteration detected in AI response!`);
  }

  return errors;
}

async function runPipeline() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY environment variable is missing.');
    console.log('Usage: GEMINI_API_KEY="your_key" node scripts/generate-legal-content.mjs');
    process.exit(1);
  }

  console.log('Loading database...');
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  // Find target section if provided via args (e.g. --section COPY-001)
  const args = process.argv.slice(2);
  const targetSectionId = args.includes('--section') ? args[args.indexOf('--section') + 1] : null;

  for (const chapter of data.chapters) {
    for (const section of chapter.sections) {
      if (targetSectionId && section.id !== targetSectionId) continue;
      
      // Skip if already generated (unless forcing via targetSectionId)
      if (!targetSectionId && section.verification && section.verification.explanation === 'needs_review' && section.examples && section.examples.length > 0) {
        skippedCount++;
        continue;
      }

      console.log(`\n⏳ Processing [${section.id}] ${section.title}...`);
      
      const generated = await generateContent(section.id, section.title, section.original_law_text);
      if (!generated) {
        errorCount++;
        continue;
      }

      console.log(`✓ AI generation complete. Running Automated QA...`);
      const qaErrors = performAutomatedQA(section, generated);

      if (qaErrors.length > 0) {
        console.error(`❌ Automated QA Failed for ${section.id}:`);
        qaErrors.forEach(e => console.error(`  - ${e}`));
        errorCount++;
        // We reject the generation if QA fails
        continue;
      }

      // Update section data (Phase 1 & Phase 3)
      section.explanation = generated.explanation;
      section.examples = generated.examples;
      
      if (!section.verification) {
        section.verification = {
           law_text: 'verified',
           explanation: 'needs_review',
           examples: 'needs_review',
           verified_by: null,
           verified_at: null
        };
      } else {
        section.verification.explanation = 'needs_review';
        section.verification.examples = 'needs_review';
      }

      processedCount++;
      console.log(`✅ [${section.id}] Successfully passed QA and queued for Human Review.`);
      
      // Save incrementally
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
      
      // Avoid rate limits (Free tier is 15 RPM max)
      await new Promise(r => setTimeout(r, 4100));
    }
  }

  console.log(`\n🎉 Pipeline Complete!`);
  console.log(`Processed: ${processedCount}`);
  console.log(`Skipped: ${skippedCount}`);
  console.log(`QA Errors: ${errorCount}`);
  console.log(`\nOfficial Source of Truth (LAW TEXT) remains untouched.`);
  console.log(`Run 'npm run build' to update the static pages.`);
}

runPipeline().catch(console.error);

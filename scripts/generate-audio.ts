/**
 * ElevenLabs Arabic Audio Generation Script
 *
 * Generates MP3 audio files for Arabic learning content using the ElevenLabs API.
 *
 * Prerequisites:
 *   - Set the ELEVENLABS_API_KEY environment variable
 *   - Optionally set ELEVENLABS_VOICE_ID (defaults to a standard Arabic male voice)
 *
 * Usage:
 *   npx tsx scripts/generate-audio.ts
 *
 * Output directories:
 *   public/audio/letters/     - 28 Arabic letter sounds
 *   public/audio/syllables/   - Letter + vowel combinations
 *   public/audio/words/       - Quranic vocabulary words
 *   public/audio/tajweed/     - Tajweed rule examples
 *
 * Rate limiting:
 *   The script respects ElevenLabs API limits by waiting between requests.
 *   Default delay is 500ms between calls (adjustable via DELAY_MS constant).
 */

import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// ─── Configuration ────────────────────────────────────

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "pNInz6obpgDQGcFmaJgB"; // Default: "Adam" or configure your own Arabic voice
const BASE_URL = "https://api.elevenlabs.io/v1/text-to-speech";
const DELAY_MS = 500; // Delay between API calls in milliseconds
const OUTPUT_BASE = join(process.cwd(), "public", "audio");

// ─── Arabic Data ──────────────────────────────────────

const ARABIC_LETTERS = [
  { id: "alif", letter: "أ", name: "Alif" },
  { id: "baa", letter: "ب", name: "Ba" },
  { id: "taa", letter: "ت", name: "Ta" },
  { id: "thaa", letter: "ث", name: "Tha" },
  { id: "jeem", letter: "ج", name: "Jeem" },
  { id: "haa", letter: "ح", name: "Haa" },
  { id: "khaa", letter: "خ", name: "Khaa" },
  { id: "daal", letter: "د", name: "Dal" },
  { id: "dhaal", letter: "ذ", name: "Dhal" },
  { id: "raa", letter: "ر", name: "Ra" },
  { id: "zaay", letter: "ز", name: "Zay" },
  { id: "seen", letter: "س", name: "Seen" },
  { id: "sheen", letter: "ش", name: "Sheen" },
  { id: "saad", letter: "ص", name: "Sad" },
  { id: "daad", letter: "ض", name: "Dad" },
  { id: "taa_heavy", letter: "ط", name: "Taa" },
  { id: "dhaa_heavy", letter: "ظ", name: "Dhaa" },
  { id: "ayn", letter: "ع", name: "Ayn" },
  { id: "ghayn", letter: "غ", name: "Ghayn" },
  { id: "faa", letter: "ف", name: "Fa" },
  { id: "qaaf", letter: "ق", name: "Qaf" },
  { id: "kaaf", letter: "ك", name: "Kaf" },
  { id: "laam", letter: "ل", name: "Lam" },
  { id: "meem", letter: "م", name: "Meem" },
  { id: "noon", letter: "ن", name: "Nun" },
  { id: "haa_end", letter: "ه", name: "Ha" },
  { id: "waaw", letter: "و", name: "Waw" },
  { id: "yaa", letter: "ي", name: "Ya" },
];

// Vowel marks and their names
const VOWELS = [
  { mark: "َ", name: "fatha", sound: "a" },
  { mark: "ِ", name: "kasra", sound: "i" },
  { mark: "ُ", name: "damma", sound: "u" },
];

// Long vowels
const LONG_VOWELS = [
  { suffix: "َا", name: "fatha_long", sound: "aa" },
  { suffix: "ِي", name: "kasra_long", sound: "ee" },
  { suffix: "ُو", name: "damma_long", sound: "oo" },
];

// Subset of letters for syllable generation (most common)
const SYLLABLE_LETTERS = ["ب", "ت", "ث", "ج", "د", "ر", "س", "ش", "ص", "ع", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"];

// Tajweed examples
const TAJWEED_EXAMPLES = [
  {
    id: "ikhfaa_1",
    text: "مِن قَبْلُ",
    rule: "Ikhfa - Hiding of noon sakinah before qaf",
  },
  {
    id: "idghaam_1",
    text: "مِن يَّعْمَلْ",
    rule: "Idgham - Merging noon sakinah into ya",
  },
  {
    id: "iqlab_1",
    text: "مِن بَعْدِ",
    rule: "Iqlab - Changing noon sakinah to meem before ba",
  },
  {
    id: "izhaar_1",
    text: "مِنْ عِلْمٍ",
    rule: "Izhar - Clear pronunciation of noon sakinah before ayn",
  },
  {
    id: "madd_tabii",
    text: "قَالُوا",
    rule: "Madd Tabii - Natural lengthening (2 counts)",
  },
  {
    id: "madd_munfasil",
    text: "فِي أَنفُسِهِمْ",
    rule: "Madd Munfasil - Separated lengthening",
  },
  {
    id: "madd_muttasil",
    text: "جَاءَ",
    rule: "Madd Muttasil - Connected lengthening",
  },
  {
    id: "qalqalah_1",
    text: "أَحَدٌ",
    rule: "Qalqalah - Bouncing sound on dal",
  },
  {
    id: "qalqalah_2",
    text: "لَمْ يَلِدْ",
    rule: "Qalqalah - Bouncing sound on dal (stopping)",
  },
  {
    id: "ghunnah_1",
    text: "إِنَّ",
    rule: "Ghunnah - Nasalization of doubled noon",
  },
  {
    id: "ghunnah_2",
    text: "ثُمَّ",
    rule: "Ghunnah - Nasalization of doubled meem",
  },
  {
    id: "laam_shamsiyya",
    text: "الشَّمْسُ",
    rule: "Lam Shamsiyyah - Assimilated lam in al-shams",
  },
  {
    id: "laam_qamariyya",
    text: "الْقَمَرُ",
    rule: "Lam Qamariyyah - Clear lam in al-qamar",
  },
  {
    id: "hamzat_wasl",
    text: "بِسْمِ اللَّهِ",
    rule: "Hamzat al-Wasl - Connecting hamza",
  },
  {
    id: "tafkheem",
    text: "صَلَاةٌ",
    rule: "Tafkheem - Heavy/thick pronunciation of Sad",
  },
];

// Common vocabulary words (from our vocabulary data)
const VOCAB_WORDS = [
  { id: "allah", text: "اللَّهُ" },
  { id: "rabb", text: "رَبٌّ" },
  { id: "rahman", text: "رَحْمَٰنٌ" },
  { id: "rahim", text: "رَحِيمٌ" },
  { id: "malik", text: "مَلِكٌ" },
  { id: "salah", text: "صَلَاةٌ" },
  { id: "ibadah", text: "عِبَادَةٌ" },
  { id: "zakah", text: "زَكَاةٌ" },
  { id: "quran", text: "قُرْآنٌ" },
  { id: "iman", text: "إِيمَانٌ" },
  { id: "islam", text: "إِسْلَامٌ" },
  { id: "taqwa", text: "تَقْوَى" },
  { id: "haqq", text: "حَقٌّ" },
  { id: "kitab", text: "كِتَابٌ" },
  { id: "jannah", text: "جَنَّةٌ" },
  { id: "nar", text: "نَارٌ" },
  { id: "nafs", text: "نَفْسٌ" },
  { id: "qalb", text: "قَلْبٌ" },
  { id: "sama", text: "سَمَاءٌ" },
  { id: "ard", text: "أَرْضٌ" },
  { id: "maa", text: "مَاءٌ" },
  { id: "nur", text: "نُورٌ" },
  { id: "yawm", text: "يَوْمٌ" },
  { id: "layl", text: "لَيْلٌ" },
  { id: "dunya", text: "دُنْيَا" },
  { id: "akhirah", text: "آخِرَةٌ" },
  { id: "sabr", text: "صَبْرٌ" },
  { id: "shukr", text: "شُكْرٌ" },
  { id: "dhikr", text: "ذِكْرٌ" },
  { id: "dua", text: "دُعَاءٌ" },
  { id: "tawbah", text: "تَوْبَةٌ" },
  { id: "hidayah", text: "هِدَايَةٌ" },
  { id: "sirat", text: "صِرَاطٌ" },
  { id: "bayt", text: "بَيْتٌ" },
  { id: "insan", text: "إِنسَانٌ" },
  { id: "nas", text: "نَاسٌ" },
  { id: "hayy", text: "حَيٌّ" },
  { id: "kabir", text: "كَبِيرٌ" },
  { id: "adhim", text: "عَظِيمٌ" },
  { id: "salih", text: "صَالِحٌ" },
];

// ─── API Helper ───────────────────────────────────────

async function generateAudio(text: string, outputPath: string): Promise<boolean> {
  if (!API_KEY) {
    console.error("ERROR: ELEVENLABS_API_KEY environment variable is not set.");
    process.exit(1);
  }

  // Skip if file already exists
  if (existsSync(outputPath)) {
    console.log(`  [SKIP] ${outputPath} (already exists)`);
    return true;
  }

  try {
    const response = await fetch(`${BASE_URL}/${VOICE_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`  [FAIL] ${outputPath} - HTTP ${response.status}: ${errText}`);
      return false;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync(outputPath, buffer);
    console.log(`  [OK]   ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
    return true;
  } catch (err) {
    console.error(`  [FAIL] ${outputPath} - ${(err as Error).message}`);
    return false;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

// ─── Generation Tasks ─────────────────────────────────

async function generateLetters() {
  console.log("\n=== Generating Arabic Letter Audio ===\n");
  const dir = join(OUTPUT_BASE, "letters");
  ensureDir(dir);

  let success = 0;
  let fail = 0;

  for (const letter of ARABIC_LETTERS) {
    const outputPath = join(dir, `${letter.id}.mp3`);
    const ok = await generateAudio(letter.letter, outputPath);
    if (ok) success++;
    else fail++;
    await delay(DELAY_MS);
  }

  console.log(`\nLetters: ${success} succeeded, ${fail} failed out of ${ARABIC_LETTERS.length}\n`);
}

async function generateSyllables() {
  console.log("\n=== Generating Syllable Audio ===\n");
  const dir = join(OUTPUT_BASE, "syllables");
  ensureDir(dir);

  let success = 0;
  let fail = 0;
  let total = 0;

  for (const letter of SYLLABLE_LETTERS) {
    const letterId = ARABIC_LETTERS.find((l) => l.letter === letter)?.id || letter;

    // Short vowels: بَ بِ بُ
    for (const vowel of VOWELS) {
      total++;
      const text = letter + vowel.mark;
      const filename = `${letterId}_${vowel.name}.mp3`;
      const ok = await generateAudio(text, join(dir, filename));
      if (ok) success++;
      else fail++;
      await delay(DELAY_MS);
    }

    // Long vowels: بَا بِي بُو
    for (const lv of LONG_VOWELS) {
      total++;
      const text = letter + lv.suffix;
      const filename = `${letterId}_${lv.name}.mp3`;
      const ok = await generateAudio(text, join(dir, filename));
      if (ok) success++;
      else fail++;
      await delay(DELAY_MS);
    }
  }

  console.log(`\nSyllables: ${success} succeeded, ${fail} failed out of ${total}\n`);
}

async function generateWords() {
  console.log("\n=== Generating Vocabulary Word Audio ===\n");
  const dir = join(OUTPUT_BASE, "words");
  ensureDir(dir);

  let success = 0;
  let fail = 0;

  for (const word of VOCAB_WORDS) {
    const outputPath = join(dir, `${word.id}.mp3`);
    const ok = await generateAudio(word.text, outputPath);
    if (ok) success++;
    else fail++;
    await delay(DELAY_MS);
  }

  console.log(`\nWords: ${success} succeeded, ${fail} failed out of ${VOCAB_WORDS.length}\n`);
}

async function generateTajweed() {
  console.log("\n=== Generating Tajweed Example Audio ===\n");
  const dir = join(OUTPUT_BASE, "tajweed");
  ensureDir(dir);

  let success = 0;
  let fail = 0;

  for (const example of TAJWEED_EXAMPLES) {
    const outputPath = join(dir, `${example.id}.mp3`);
    const ok = await generateAudio(example.text, outputPath);
    if (ok) success++;
    else fail++;
    await delay(DELAY_MS);
  }

  console.log(`\nTajweed: ${success} succeeded, ${fail} failed out of ${TAJWEED_EXAMPLES.length}\n`);
}

// ─── Main ─────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  Itqan - Arabic Audio Generator          ║");
  console.log("║  Using ElevenLabs Text-to-Speech API     ║");
  console.log("╚══════════════════════════════════════════╝");

  if (!API_KEY) {
    console.error("\nERROR: Please set the ELEVENLABS_API_KEY environment variable.");
    console.error("  export ELEVENLABS_API_KEY=your_api_key_here");
    console.error("  npx tsx scripts/generate-audio.ts\n");
    process.exit(1);
  }

  console.log(`\nVoice ID: ${VOICE_ID}`);
  console.log(`Output:   ${OUTPUT_BASE}`);
  console.log(`Delay:    ${DELAY_MS}ms between requests`);

  ensureDir(OUTPUT_BASE);

  const totalItems =
    ARABIC_LETTERS.length +
    SYLLABLE_LETTERS.length * (VOWELS.length + LONG_VOWELS.length) +
    VOCAB_WORDS.length +
    TAJWEED_EXAMPLES.length;

  console.log(`\nTotal items to generate: ${totalItems}`);
  console.log(`Estimated time: ~${Math.ceil((totalItems * (DELAY_MS + 1000)) / 60000)} minutes\n`);

  await generateLetters();
  await generateSyllables();
  await generateWords();
  await generateTajweed();

  console.log("\n=== Generation Complete! ===\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

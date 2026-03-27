import { LocalizedText } from "@/types";

// ─── Types ───────────────────────────────────────────────

export type SyllableType = "CV" | "CVC" | "CVV";

export type TashkeelType =
  | "fathah"
  | "dammah"
  | "kasrah"
  | "sukoon"
  | "shaddah"
  | "tanween_fath"
  | "tanween_damm"
  | "tanween_kasr";

export type ExerciseType =
  | "build_syllable"
  | "select_tashkeel"
  | "match_sound"
  | "drag_order"
  | "identify_type"
  | "complete_word";

export type SyllableExample = {
  arabic: string;
  transliteration: string;
  meaning?: LocalizedText;
  syllableType: SyllableType;
};

export type Exercise = {
  id: string;
  type: ExerciseType;
  instruction: LocalizedText;
  items: ExerciseItem[];
};

export type ExerciseItem = {
  id: string;
  prompt: string;
  options: string[];
  correct: number;
  audio?: string;
};

export type PracticeGridItem = {
  letter: string;
  withFathah: string;
  withDammah: string;
  withKasrah: string;
};

export type SyllableLesson = {
  id: string;
  order: number;
  titleAr: string;
  title: LocalizedText;
  description: LocalizedText;
  concept: LocalizedText;
  tashkeelSymbol: string;
  examples: SyllableExample[];
  practiceGrid: PracticeGridItem[];
  exercises: Exercise[];
};

// ─── Practice grids (letter + harakat combos) ────────────

const COMMON_LETTERS = [
  "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز",
  "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق",
  "ك", "ل", "م", "ن", "ه", "و", "ي",
];

function buildPracticeGrid(letters: string[]): PracticeGridItem[] {
  return letters.map((l) => ({
    letter: l,
    withFathah: l + "\u064E",
    withDammah: l + "\u064F",
    withKasrah: l + "\u0650",
  }));
}

const FULL_GRID = buildPracticeGrid(COMMON_LETTERS);
const INTRO_GRID = buildPracticeGrid(["ب", "ت", "ن", "ر", "س", "م", "ل", "ك", "ف", "د"]);

// ─── Lesson 1: Harakat ───────────────────────────────────

const LESSON_HARAKAT: SyllableLesson = {
  id: "harakat",
  order: 1,
  titleAr: "الحركات: فتحة ضمة كسرة",
  tashkeelSymbol: "َ ُ ِ",
  title: {
    en: "Short Vowels: Fathah, Dammah, Kasrah",
    tr: "Kısa Sesli Harfler: Fetha, Zamme, Kesre",
    fr: "Voyelles courtes : Fathah, Dammah, Kasrah",
    ur: "مختصر حرکات: فتحہ، ضمہ، کسرہ",
    id: "Harakat Pendek: Fathah, Dhammah, Kasrah",
  },
  description: {
    en: "Learn the three short vowel marks that give Arabic letters their sound",
    tr: "Arapça harflere seslerini veren üç kısa sesli işareti öğrenin",
    fr: "Apprenez les trois signes de voyelles courtes qui donnent leur son aux lettres arabes",
    ur: "عربی حروف کو آواز دینے والی تین مختصر حرکات سیکھیں",
    id: "Pelajari tiga tanda vokal pendek yang memberi suara pada huruf Arab",
  },
  concept: {
    en: "Fathah (َ) makes an 'a' sound, Dammah (ُ) makes an 'u' sound, Kasrah (ِ) makes an 'i' sound. Every Arabic letter needs a vowel mark to be pronounced.",
    tr: "Fetha (َ) 'a' sesi, Zamme (ُ) 'u' sesi, Kesre (ِ) 'i' sesi çıkarır. Her Arapça harf telaffuz edilmek için bir harekeye ihtiyaç duyar.",
    fr: "Fathah (َ) produit le son 'a', Dammah (ُ) le son 'ou', Kasrah (ِ) le son 'i'. Chaque lettre arabe a besoin d'un signe vocalique pour être prononcée.",
    ur: "فتحہ (َ) سے 'ا' کی آواز، ضمہ (ُ) سے 'اُ' کی آواز، کسرہ (ِ) سے 'اِ' کی آواز آتی ہے۔ ہر عربی حرف کو بولنے کے لیے حرکت ضروری ہے۔",
    id: "Fathah (َ) menghasilkan bunyi 'a', Dhammah (ُ) menghasilkan bunyi 'u', Kasrah (ِ) menghasilkan bunyi 'i'. Setiap huruf Arab membutuhkan tanda vokal untuk diucapkan.",
  },
  examples: [
    { arabic: "بَ", transliteration: "ba", syllableType: "CV" },
    { arabic: "بُ", transliteration: "bu", syllableType: "CV" },
    { arabic: "بِ", transliteration: "bi", syllableType: "CV" },
    { arabic: "نَ", transliteration: "na", syllableType: "CV" },
    { arabic: "نُ", transliteration: "nu", syllableType: "CV" },
    { arabic: "نِ", transliteration: "ni", syllableType: "CV" },
    { arabic: "سَ", transliteration: "sa", syllableType: "CV" },
    { arabic: "سُ", transliteration: "su", syllableType: "CV" },
    { arabic: "سِ", transliteration: "si", syllableType: "CV" },
    { arabic: "كَ", transliteration: "ka", syllableType: "CV" },
    { arabic: "كُ", transliteration: "ku", syllableType: "CV" },
    { arabic: "كِ", transliteration: "ki", syllableType: "CV" },
    { arabic: "مَ", transliteration: "ma", syllableType: "CV" },
    { arabic: "لَ", transliteration: "la", syllableType: "CV" },
    { arabic: "رَ", transliteration: "ra", syllableType: "CV" },
  ],
  practiceGrid: INTRO_GRID,
  exercises: [
    {
      id: "harakat-ex1",
      type: "select_tashkeel",
      instruction: {
        en: "Select the correct vowel mark for the given sound",
        tr: "Verilen ses için doğru harekeyi seçin",
        fr: "Sélectionnez le signe vocalique correct pour le son donné",
        ur: "دی گئی آواز کے لیے صحیح حرکت منتخب کریں",
        id: "Pilih tanda vokal yang benar untuk bunyi yang diberikan",
      },
      items: [
        { id: "h1-1", prompt: "بَ", options: ["بَ", "بُ", "بِ"], correct: 0 },
        { id: "h1-2", prompt: "نُ", options: ["نَ", "نُ", "نِ"], correct: 1 },
        { id: "h1-3", prompt: "سِ", options: ["سَ", "سُ", "سِ"], correct: 2 },
        { id: "h1-4", prompt: "كَ", options: ["كَ", "كُ", "كِ"], correct: 0 },
        { id: "h1-5", prompt: "مُ", options: ["مَ", "مُ", "مِ"], correct: 1 },
        { id: "h1-6", prompt: "لِ", options: ["لَ", "لُ", "لِ"], correct: 2 },
        { id: "h1-7", prompt: "رَ", options: ["رَ", "رُ", "رِ"], correct: 0 },
        { id: "h1-8", prompt: "فُ", options: ["فَ", "فُ", "فِ"], correct: 1 },
      ],
    },
    {
      id: "harakat-ex2",
      type: "match_sound",
      instruction: {
        en: "Listen and select the syllable you hear",
        tr: "Dinleyin ve duyduğunuz heceyi seçin",
        fr: "Écoutez et sélectionnez la syllabe que vous entendez",
        ur: "سنیں اور جو ہجا آپ سنتے ہیں اسے منتخب کریں",
        id: "Dengarkan dan pilih suku kata yang Anda dengar",
      },
      items: [
        { id: "h2-1", prompt: "تَ", options: ["تَ", "تُ", "تِ"], correct: 0 },
        { id: "h2-2", prompt: "جِ", options: ["جَ", "جُ", "جِ"], correct: 2 },
        { id: "h2-3", prompt: "حُ", options: ["حَ", "حُ", "حِ"], correct: 1 },
        { id: "h2-4", prompt: "دَ", options: ["دَ", "دُ", "دِ"], correct: 0 },
        { id: "h2-5", prompt: "عِ", options: ["عَ", "عُ", "عِ"], correct: 2 },
        { id: "h2-6", prompt: "قُ", options: ["قَ", "قُ", "قِ"], correct: 1 },
      ],
    },
  ],
};

// ─── Lesson 2: Madd Letters ──────────────────────────────

const LESSON_MADD: SyllableLesson = {
  id: "madd",
  order: 2,
  titleAr: "حروف المدّ",
  tashkeelSymbol: "ا و ي",
  title: {
    en: "Long Vowels (Madd Letters)",
    tr: "Uzun Sesli Harfler (Med Harfleri)",
    fr: "Voyelles longues (Lettres Madd)",
    ur: "حروفِ مد (لمبی آوازیں)",
    id: "Vokal Panjang (Huruf Mad)",
  },
  description: {
    en: "Learn how alif, waw, and ya extend vowel sounds to create long vowels",
    tr: "Elif, vav ve ya harflerinin sesli harfleri nasıl uzattığını öğrenin",
    fr: "Apprenez comment alif, waw et ya prolongent les sons vocaliques",
    ur: "سیکھیں کہ الف، واو اور یا کس طرح آوازوں کو لمبا کرتے ہیں",
    id: "Pelajari bagaimana alif, waw, dan ya memperpanjang bunyi vokal",
  },
  concept: {
    en: "After Fathah, Alif (ا) extends to 'aa'. After Dammah, Waw (و) extends to 'uu'. After Kasrah, Ya (ي) extends to 'ii'. These are held for 2 counts.",
    tr: "Fethadan sonra Elif (ا) 'aa' olur. Zammeden sonra Vav (و) 'uu' olur. Kesreden sonra Ya (ي) 'ii' olur. Bunlar 2 vuruş tutulur.",
    fr: "Après Fathah, Alif (ا) s'allonge en 'aa'. Après Dammah, Waw (و) en 'ou'. Après Kasrah, Ya (ي) en 'ii'. Ils sont tenus pendant 2 temps.",
    ur: "فتحہ کے بعد الف (ا) سے 'آ' بنتا ہے۔ ضمہ کے بعد واو (و) سے 'اُو' بنتا ہے۔ کسرہ کے بعد یا (ي) سے 'اِی' بنتا ہے۔ ان کو دو حرکات تک کھینچا جاتا ہے۔",
    id: "Setelah Fathah, Alif (ا) diperpanjang menjadi 'aa'. Setelah Dhammah, Waw (و) menjadi 'uu'. Setelah Kasrah, Ya (ي) menjadi 'ii'. Ditahan selama 2 ketukan.",
  },
  examples: [
    { arabic: "بَا", transliteration: "baa", syllableType: "CVV", meaning: { en: "—", tr: "—", fr: "—", ur: "—", id: "—" } },
    { arabic: "بُو", transliteration: "buu", syllableType: "CVV" },
    { arabic: "بِي", transliteration: "bii", syllableType: "CVV" },
    { arabic: "نَا", transliteration: "naa", syllableType: "CVV" },
    { arabic: "نُو", transliteration: "nuu", syllableType: "CVV" },
    { arabic: "نِي", transliteration: "nii", syllableType: "CVV" },
    { arabic: "كَا", transliteration: "kaa", syllableType: "CVV" },
    { arabic: "كُو", transliteration: "kuu", syllableType: "CVV" },
    { arabic: "كِي", transliteration: "kii", syllableType: "CVV" },
    { arabic: "مَا", transliteration: "maa", syllableType: "CVV" },
    { arabic: "سُو", transliteration: "suu", syllableType: "CVV" },
    { arabic: "لِي", transliteration: "lii", syllableType: "CVV" },
  ],
  practiceGrid: buildPracticeGrid(["ب", "ت", "ن", "ر", "س", "م", "ل", "ك"]),
  exercises: [
    {
      id: "madd-ex1",
      type: "build_syllable",
      instruction: {
        en: "Build the long vowel syllable by selecting the correct madd letter",
        tr: "Doğru med harfini seçerek uzun hece oluşturun",
        fr: "Construisez la syllabe longue en sélectionnant la bonne lettre madd",
        ur: "صحیح حرفِ مد منتخب کر کے لمبا ہجا بنائیں",
        id: "Bangun suku kata panjang dengan memilih huruf mad yang benar",
      },
      items: [
        { id: "m1-1", prompt: "بَ + ?= بَا", options: ["ا", "و", "ي"], correct: 0 },
        { id: "m1-2", prompt: "بُ + ?= بُو", options: ["ا", "و", "ي"], correct: 1 },
        { id: "m1-3", prompt: "بِ + ?= بِي", options: ["ا", "و", "ي"], correct: 2 },
        { id: "m1-4", prompt: "نَ + ?= نَا", options: ["ا", "و", "ي"], correct: 0 },
        { id: "m1-5", prompt: "سُ + ?= سُو", options: ["ا", "و", "ي"], correct: 1 },
        { id: "m1-6", prompt: "كِ + ?= كِي", options: ["ا", "و", "ي"], correct: 2 },
        { id: "m1-7", prompt: "مَ + ?= مَا", options: ["ا", "و", "ي"], correct: 0 },
        { id: "m1-8", prompt: "لُ + ?= لُو", options: ["ا", "و", "ي"], correct: 1 },
      ],
    },
    {
      id: "madd-ex2",
      type: "identify_type",
      instruction: {
        en: "Identify: is this a short vowel (CV) or long vowel (CVV)?",
        tr: "Belirleyin: bu kısa sesli (CV) mi yoksa uzun sesli (CVV) mi?",
        fr: "Identifiez : voyelle courte (CV) ou voyelle longue (CVV) ?",
        ur: "پہچانیں: یہ مختصر حرکت (CV) ہے یا لمبی حرکت (CVV)؟",
        id: "Identifikasi: vokal pendek (CV) atau vokal panjang (CVV)?",
      },
      items: [
        { id: "m2-1", prompt: "بَا", options: ["Short (CV)", "Long (CVV)"], correct: 1 },
        { id: "m2-2", prompt: "بَ", options: ["Short (CV)", "Long (CVV)"], correct: 0 },
        { id: "m2-3", prompt: "نُو", options: ["Short (CV)", "Long (CVV)"], correct: 1 },
        { id: "m2-4", prompt: "سِ", options: ["Short (CV)", "Long (CVV)"], correct: 0 },
        { id: "m2-5", prompt: "كِي", options: ["Short (CV)", "Long (CVV)"], correct: 1 },
        { id: "m2-6", prompt: "مُ", options: ["Short (CV)", "Long (CVV)"], correct: 0 },
      ],
    },
  ],
};

// ─── Lesson 3: Sukoon ────────────────────────────────────

const LESSON_SUKOON: SyllableLesson = {
  id: "sukoon",
  order: 3,
  titleAr: "السُّكُون",
  tashkeelSymbol: "ْ",
  title: {
    en: "Sukoon (No Vowel / Stop)",
    tr: "Sükun (Sessiz / Durma)",
    fr: "Soukoun (Absence de voyelle / Arrêt)",
    ur: "سکون (بے حرکت)",
    id: "Sukun (Tanpa Vokal / Berhenti)",
  },
  description: {
    en: "Learn the sukoon mark which indicates a consonant with no vowel sound",
    tr: "Sessiz harfi gösteren sükun işaretini öğrenin",
    fr: "Apprenez le signe soukoun qui indique une consonne sans voyelle",
    ur: "سکون کی علامت سیکھیں جو بتاتی ہے کہ حرف پر کوئی حرکت نہیں",
    id: "Pelajari tanda sukun yang menunjukkan konsonan tanpa suara vokal",
  },
  concept: {
    en: "Sukoon (ْ) means the letter is 'still' - pronounced without any vowel. It creates closed syllables (CVC) like بَبْ (bab). The letter with sukoon stops the syllable.",
    tr: "Sükun (ْ) harfin 'sakin' olduğunu gösterir - sesli harfsiz telaffuz edilir. Kapalı heceler (CVC) oluşturur: بَبْ (bab). Sükünlü harf heceyi kapatır.",
    fr: "Soukoun (ْ) signifie que la lettre est 'immobile' - prononcée sans voyelle. Il crée des syllabes fermées (CVC) comme بَبْ (bab).",
    ur: "سکون (ْ) کا مطلب ہے حرف 'ساکن' ہے - بغیر حرکت کے بولا جاتا ہے۔ یہ بند ہجے (CVC) بناتا ہے جیسے بَبْ (بب)۔",
    id: "Sukun (ْ) berarti huruf 'diam' - diucapkan tanpa vokal. Ini membuat suku kata tertutup (CVC) seperti بَبْ (bab).",
  },
  examples: [
    { arabic: "بَبْ", transliteration: "bab", syllableType: "CVC" },
    { arabic: "بِنْ", transliteration: "bin", syllableType: "CVC" },
    { arabic: "بُسْ", transliteration: "bus", syllableType: "CVC" },
    { arabic: "مِنْ", transliteration: "min", syllableType: "CVC", meaning: { en: "from", tr: "dan", fr: "de", ur: "سے", id: "dari" } },
    { arabic: "قَدْ", transliteration: "qad", syllableType: "CVC", meaning: { en: "indeed", tr: "muhakkak", fr: "certes", ur: "بے شک", id: "sungguh" } },
    { arabic: "لَمْ", transliteration: "lam", syllableType: "CVC", meaning: { en: "did not", tr: "yapmadı", fr: "n'a pas", ur: "نہیں", id: "tidak" } },
    { arabic: "كَمْ", transliteration: "kam", syllableType: "CVC", meaning: { en: "how many", tr: "kaç tane", fr: "combien", ur: "کتنے", id: "berapa" } },
    { arabic: "هَلْ", transliteration: "hal", syllableType: "CVC", meaning: { en: "is/does?", tr: "mi/mı?", fr: "est-ce que?", ur: "کیا؟", id: "apakah?" } },
  ],
  practiceGrid: INTRO_GRID,
  exercises: [
    {
      id: "sukoon-ex1",
      type: "select_tashkeel",
      instruction: {
        en: "Which letter has the sukoon in this syllable?",
        tr: "Bu hecede hangi harfte sükun var?",
        fr: "Quelle lettre porte le soukoun dans cette syllabe ?",
        ur: "اس ہجے میں کس حرف پر سکون ہے؟",
        id: "Huruf mana yang memiliki sukun dalam suku kata ini?",
      },
      items: [
        { id: "s1-1", prompt: "مِنْ", options: ["مِ", "نْ"], correct: 1 },
        { id: "s1-2", prompt: "قَدْ", options: ["قَ", "دْ"], correct: 1 },
        { id: "s1-3", prompt: "هَلْ", options: ["هَ", "لْ"], correct: 1 },
        { id: "s1-4", prompt: "كَمْ", options: ["كَ", "مْ"], correct: 1 },
        { id: "s1-5", prompt: "لَمْ", options: ["لَ", "مْ"], correct: 1 },
        { id: "s1-6", prompt: "بَبْ", options: ["بَ", "بْ"], correct: 1 },
      ],
    },
    {
      id: "sukoon-ex2",
      type: "build_syllable",
      instruction: {
        en: "Complete the CVC syllable by adding the correct ending",
        tr: "Doğru sonu ekleyerek CVC hecesini tamamlayın",
        fr: "Complétez la syllabe CVC en ajoutant la bonne terminaison",
        ur: "صحیح اختتام لگا کر CVC ہجا مکمل کریں",
        id: "Lengkapi suku kata CVC dengan menambahkan akhiran yang benar",
      },
      items: [
        { id: "s2-1", prompt: "مِ + ? = مِنْ", options: ["نْ", "مْ", "لْ"], correct: 0 },
        { id: "s2-2", prompt: "قَ + ? = قَدْ", options: ["بْ", "دْ", "لْ"], correct: 1 },
        { id: "s2-3", prompt: "هَ + ? = هَلْ", options: ["نْ", "مْ", "لْ"], correct: 2 },
        { id: "s2-4", prompt: "كَ + ? = كَمْ", options: ["نْ", "مْ", "بْ"], correct: 1 },
        { id: "s2-5", prompt: "لَ + ? = لَمْ", options: ["لْ", "نْ", "مْ"], correct: 2 },
        { id: "s2-6", prompt: "بَ + ? = بَبْ", options: ["بْ", "نْ", "تْ"], correct: 0 },
      ],
    },
  ],
};

// ─── Lesson 4: Shaddah ───────────────────────────────────

const LESSON_SHADDAH: SyllableLesson = {
  id: "shaddah",
  order: 4,
  titleAr: "الشَّدَّة",
  tashkeelSymbol: "ّ",
  title: {
    en: "Shaddah (Doubled Letter)",
    tr: "Şedde (Çift Harf)",
    fr: "Chaddah (Lettre doublée)",
    ur: "شدّہ (تشدید)",
    id: "Syaddah (Huruf Ganda)",
  },
  description: {
    en: "Learn how shaddah doubles a consonant, making it stronger and longer",
    tr: "Şeddenin bir ünsüzü nasıl iki katına çıkardığını öğrenin",
    fr: "Apprenez comment la chaddah double une consonne, la rendant plus forte",
    ur: "سیکھیں کہ شدّہ حرف کو کس طرح دوگنا کرتا ہے",
    id: "Pelajari bagaimana syaddah menggandakan konsonan, membuatnya lebih kuat",
  },
  concept: {
    en: "Shaddah (ّ) means the letter is pronounced twice: once with sukoon, then with its vowel. بَّ = بْ + بَ. It emphasizes the letter. Common in words like اللّٰه and محمّد.",
    tr: "Şedde (ّ) harfin iki kez telaffuz edilmesi demektir: önce sükünle, sonra harekeyle. بَّ = بْ + بَ. Harfi vurgular. اللّٰه ve محمّد gibi kelimelerde yaygındır.",
    fr: "Chaddah (ّ) signifie que la lettre est prononcée deux fois : d'abord avec soukoun, puis avec sa voyelle. بَّ = بْ + بَ. Courant dans اللّٰه et محمّد.",
    ur: "شدّہ (ّ) کا مطلب ہے حرف دو بار بولا جاتا ہے: پہلے سکون کے ساتھ، پھر حرکت کے ساتھ۔ بَّ = بْ + بَ۔ اللّٰه اور محمّد جیسے الفاظ میں عام ہے۔",
    id: "Syaddah (ّ) berarti huruf diucapkan dua kali: pertama dengan sukun, lalu dengan vokalnya. بَّ = بْ + بَ. Umum dalam kata اللّٰه dan محمّد.",
  },
  examples: [
    { arabic: "بَّ", transliteration: "bb-a", syllableType: "CVC" },
    { arabic: "تَّ", transliteration: "tt-a", syllableType: "CVC" },
    { arabic: "سِّ", transliteration: "ss-i", syllableType: "CVC" },
    { arabic: "مُّ", transliteration: "mm-u", syllableType: "CVC" },
    { arabic: "نَّ", transliteration: "nn-a", syllableType: "CVC" },
    { arabic: "لَّ", transliteration: "ll-a", syllableType: "CVC" },
    { arabic: "رَّ", transliteration: "rr-a", syllableType: "CVC" },
    { arabic: "شَّ", transliteration: "shsh-a", syllableType: "CVC" },
  ],
  practiceGrid: buildPracticeGrid(["ب", "ت", "س", "م", "ن", "ل", "ر", "ش"]),
  exercises: [
    {
      id: "shaddah-ex1",
      type: "select_tashkeel",
      instruction: {
        en: "Which word contains a shaddah?",
        tr: "Hangi kelimede şedde var?",
        fr: "Quel mot contient une chaddah ?",
        ur: "کس لفظ میں شدّہ ہے؟",
        id: "Kata mana yang mengandung syaddah?",
      },
      items: [
        { id: "sh1-1", prompt: "Find the shaddah", options: ["كَتَبَ", "كَتَّبَ"], correct: 1 },
        { id: "sh1-2", prompt: "Find the shaddah", options: ["عَلَّمَ", "عَلَمَ"], correct: 0 },
        { id: "sh1-3", prompt: "Find the shaddah", options: ["نَزَلَ", "نَزَّلَ"], correct: 1 },
        { id: "sh1-4", prompt: "Find the shaddah", options: ["صَلَّى", "صَلَى"], correct: 0 },
        { id: "sh1-5", prompt: "Find the shaddah", options: ["دَرَسَ", "دَرَّسَ"], correct: 1 },
        { id: "sh1-6", prompt: "Find the shaddah", options: ["فَرَّحَ", "فَرَحَ"], correct: 0 },
      ],
    },
    {
      id: "shaddah-ex2",
      type: "build_syllable",
      instruction: {
        en: "Break down the shaddah: what two sounds does it represent?",
        tr: "Şeddeyi açın: hangi iki sesi temsil eder?",
        fr: "Décomposez la chaddah : quels deux sons représente-t-elle ?",
        ur: "شدّہ کو توڑیں: یہ کون سی دو آوازوں کی نمائندگی کرتا ہے؟",
        id: "Uraikan syaddah: dua bunyi apa yang diwakilinya?",
      },
      items: [
        { id: "sh2-1", prompt: "بَّ = ?", options: ["بْ + بَ", "بَ + بَ", "بْ + بْ"], correct: 0 },
        { id: "sh2-2", prompt: "تِّ = ?", options: ["تَ + تِ", "تْ + تِ", "تِ + تِ"], correct: 1 },
        { id: "sh2-3", prompt: "مُّ = ?", options: ["مُ + مُ", "مْ + مَ", "مْ + مُ"], correct: 2 },
        { id: "sh2-4", prompt: "نَّ = ?", options: ["نْ + نَ", "نَ + نْ", "نَ + نَ"], correct: 0 },
        { id: "sh2-5", prompt: "سَّ = ?", options: ["سَ + سَ", "سْ + سَ", "سْ + سْ"], correct: 1 },
        { id: "sh2-6", prompt: "لِّ = ?", options: ["لَ + لِ", "لِ + لِ", "لْ + لِ"], correct: 2 },
      ],
    },
  ],
};

// ─── Lesson 5: Tanween ───────────────────────────────────

const LESSON_TANWEEN: SyllableLesson = {
  id: "tanween",
  order: 5,
  titleAr: "التَّنْوِين",
  tashkeelSymbol: "ً ٍ ٌ",
  title: {
    en: "Tanween (Nunation)",
    tr: "Tenvin (Nunlama)",
    fr: "Tanwine (Nounation)",
    ur: "تنوین",
    id: "Tanwin (Nunasi)",
  },
  description: {
    en: "Learn the three tanween marks that add an 'n' sound at the end of words",
    tr: "Kelimelerin sonuna 'n' sesi ekleyen üç tenvin işaretini öğrenin",
    fr: "Apprenez les trois signes de tanwine qui ajoutent un son 'n' en fin de mot",
    ur: "تنوین کی تین علامات سیکھیں جو الفاظ کے آخر میں 'ن' کی آواز لگاتی ہیں",
    id: "Pelajari tiga tanda tanwin yang menambahkan bunyi 'n' di akhir kata",
  },
  concept: {
    en: "Tanween doubles the vowel mark and adds an 'n' sound: Fathatan (ً) = 'an', Kasratan (ٍ) = 'in', Dammatan (ٌ) = 'un'. It usually appears at the end of nouns. Fathatan needs an extra alif: كِتَابًا.",
    tr: "Tenvin harekeyi çiftler ve 'n' sesi ekler: Fethatân (ً) = 'en', Kesretân (ٍ) = 'in', Zammetân (ٌ) = 'ün'. Genellikle isimlerin sonunda görülür. Fethatân için elif eklenir: كِتَابًا.",
    fr: "Le tanwine double la voyelle et ajoute un son 'n' : Fathatan (ً) = 'an', Kasratan (ٍ) = 'in', Dammatan (ٌ) = 'un'. Il apparaît en fin de noms. Fathatan nécessite un alif : كِتَابًا.",
    ur: "تنوین حرکت کو دوگنا کرتی ہے اور 'ن' کی آواز لگاتی ہے: فتحتین (ً) = 'اَن'، کسرتین (ٍ) = 'اِن'، ضمتین (ٌ) = 'اُن'۔ عام طور پر اسماء کے آخر میں آتی ہے۔",
    id: "Tanwin menggandakan tanda vokal dan menambah bunyi 'n': Fathatan (ً) = 'an', Kasratan (ٍ) = 'in', Dhammatan (ٌ) = 'un'. Biasanya di akhir kata benda.",
  },
  examples: [
    { arabic: "كِتَابًا", transliteration: "kitaaban", syllableType: "CVC", meaning: { en: "a book", tr: "bir kitap", fr: "un livre", ur: "ایک کتاب", id: "sebuah buku" } },
    { arabic: "كِتَابٍ", transliteration: "kitaabin", syllableType: "CVC", meaning: { en: "of a book", tr: "bir kitabın", fr: "d'un livre", ur: "ایک کتاب کا", id: "sebuah buku (genetif)" } },
    { arabic: "كِتَابٌ", transliteration: "kitaabun", syllableType: "CVC", meaning: { en: "a book (subj.)", tr: "bir kitap (özne)", fr: "un livre (sujet)", ur: "ایک کتاب (فاعل)", id: "sebuah buku (subyek)" } },
    { arabic: "بَيْتًا", transliteration: "baytan", syllableType: "CVC", meaning: { en: "a house", tr: "bir ev", fr: "une maison", ur: "ایک گھر", id: "sebuah rumah" } },
    { arabic: "بَيْتٍ", transliteration: "baytin", syllableType: "CVC", meaning: { en: "of a house", tr: "bir evin", fr: "d'une maison", ur: "ایک گھر کا", id: "sebuah rumah (genetif)" } },
    { arabic: "بَيْتٌ", transliteration: "baytun", syllableType: "CVC", meaning: { en: "a house (subj.)", tr: "bir ev (özne)", fr: "une maison (sujet)", ur: "ایک گھر (فاعل)", id: "sebuah rumah (subyek)" } },
    { arabic: "قَلَمًا", transliteration: "qalaman", syllableType: "CVC", meaning: { en: "a pen", tr: "bir kalem", fr: "un stylo", ur: "ایک قلم", id: "sebuah pena" } },
    { arabic: "وَلَدٌ", transliteration: "waladun", syllableType: "CVC", meaning: { en: "a boy", tr: "bir oğlan", fr: "un garçon", ur: "ایک لڑکا", id: "seorang anak" } },
  ],
  practiceGrid: INTRO_GRID,
  exercises: [
    {
      id: "tanween-ex1",
      type: "select_tashkeel",
      instruction: {
        en: "Select the correct tanween type for the given sound",
        tr: "Verilen ses için doğru tenvin türünü seçin",
        fr: "Sélectionnez le bon type de tanwine pour le son donné",
        ur: "دی گئی آواز کے لیے صحیح تنوین منتخب کریں",
        id: "Pilih jenis tanwin yang benar untuk bunyi yang diberikan",
      },
      items: [
        { id: "t1-1", prompt: "kitaab-an", options: ["كِتَابًا", "كِتَابٍ", "كِتَابٌ"], correct: 0 },
        { id: "t1-2", prompt: "kitaab-in", options: ["كِتَابًا", "كِتَابٍ", "كِتَابٌ"], correct: 1 },
        { id: "t1-3", prompt: "kitaab-un", options: ["كِتَابًا", "كِتَابٍ", "كِتَابٌ"], correct: 2 },
        { id: "t1-4", prompt: "walad-an", options: ["وَلَدًا", "وَلَدٍ", "وَلَدٌ"], correct: 0 },
        { id: "t1-5", prompt: "walad-in", options: ["وَلَدًا", "وَلَدٍ", "وَلَدٌ"], correct: 1 },
        { id: "t1-6", prompt: "walad-un", options: ["وَلَدًا", "وَلَدٍ", "وَلَدٌ"], correct: 2 },
      ],
    },
    {
      id: "tanween-ex2",
      type: "match_sound",
      instruction: {
        en: "Listen and identify which tanween ending you hear",
        tr: "Dinleyin ve hangi tenvin sonunu duyduğunuzu belirleyin",
        fr: "Écoutez et identifiez quelle terminaison tanwine vous entendez",
        ur: "سنیں اور پہچانیں کہ کون سی تنوین سنائی دی",
        id: "Dengarkan dan identifikasi tanwin mana yang Anda dengar",
      },
      items: [
        { id: "t2-1", prompt: "قَلَمًا", options: ["-an (ً)", "-in (ٍ)", "-un (ٌ)"], correct: 0 },
        { id: "t2-2", prompt: "قَلَمٍ", options: ["-an (ً)", "-in (ٍ)", "-un (ٌ)"], correct: 1 },
        { id: "t2-3", prompt: "قَلَمٌ", options: ["-an (ً)", "-in (ٍ)", "-un (ٌ)"], correct: 2 },
        { id: "t2-4", prompt: "بَيْتًا", options: ["-an (ً)", "-in (ٍ)", "-un (ٌ)"], correct: 0 },
        { id: "t2-5", prompt: "مَاءٍ", options: ["-an (ً)", "-in (ٍ)", "-un (ٌ)"], correct: 1 },
        { id: "t2-6", prompt: "نُورٌ", options: ["-an (ً)", "-in (ٍ)", "-un (ٌ)"], correct: 2 },
      ],
    },
  ],
};

// ─── Lesson 6: Combining into Words ─────────────────────

const LESSON_COMBINING: SyllableLesson = {
  id: "combining",
  order: 6,
  titleAr: "تركيب الكلمات",
  tashkeelSymbol: "كلمة",
  title: {
    en: "Combining Syllables into Words",
    tr: "Heceleri Kelime Haline Getirme",
    fr: "Combiner les syllabes en mots",
    ur: "ہجوں کو ملا کر الفاظ بنانا",
    id: "Menggabungkan Suku Kata Menjadi Kata",
  },
  description: {
    en: "Apply everything you learned to read complete Arabic words syllable by syllable",
    tr: "Öğrendiğiniz her şeyi uygulayarak Arapça kelimeleri hece hece okuyun",
    fr: "Appliquez tout ce que vous avez appris pour lire des mots arabes syllabe par syllabe",
    ur: "جو کچھ سیکھا اسے استعمال کر کے مکمل عربی الفاظ ہجے ہجے پڑھیں",
    id: "Terapkan semua yang Anda pelajari untuk membaca kata Arab suku kata demi suku kata",
  },
  concept: {
    en: "Every Arabic word is built from syllables. Break words into syllables, identify each tashkeel, then read them together smoothly. Example: كَتَبَ = كَ + تَ + بَ (ka-ta-ba = he wrote).",
    tr: "Her Arapça kelime hecelerden oluşur. Kelimeleri hecelere ayırın, her hareketi belirleyin, sonra birlikte akıcı şekilde okuyun. Örnek: كَتَبَ = كَ + تَ + بَ (ke-te-be = yazdı).",
    fr: "Chaque mot arabe est composé de syllabes. Découpez les mots en syllabes, identifiez chaque tashkeel, puis lisez-les ensemble. Exemple : كَتَبَ = كَ + تَ + بَ (ka-ta-ba = il a écrit).",
    ur: "ہر عربی لفظ ہجوں سے بنتا ہے۔ الفاظ کو ہجوں میں توڑیں، ہر حرکت پہچانیں، پھر ملا کر روانی سے پڑھیں۔ مثال: كَتَبَ = كَ + تَ + بَ (کَتَبَ = اس نے لکھا)۔",
    id: "Setiap kata Arab terdiri dari suku kata. Pecah kata menjadi suku kata, identifikasi setiap tashkeel, lalu baca bersama. Contoh: كَتَبَ = كَ + تَ + بَ (ka-ta-ba = dia menulis).",
  },
  examples: [
    { arabic: "كَتَبَ", transliteration: "ka-ta-ba", syllableType: "CV", meaning: { en: "he wrote", tr: "yazdı", fr: "il a écrit", ur: "اس نے لکھا", id: "dia menulis" } },
    { arabic: "جَلَسَ", transliteration: "ja-la-sa", syllableType: "CV", meaning: { en: "he sat", tr: "oturdu", fr: "il s'est assis", ur: "وہ بیٹھا", id: "dia duduk" } },
    { arabic: "ذَهَبَ", transliteration: "dha-ha-ba", syllableType: "CV", meaning: { en: "he went", tr: "gitti", fr: "il est allé", ur: "وہ گیا", id: "dia pergi" } },
    { arabic: "فَتَحَ", transliteration: "fa-ta-ha", syllableType: "CV", meaning: { en: "he opened", tr: "açtı", fr: "il a ouvert", ur: "اس نے کھولا", id: "dia membuka" } },
    { arabic: "نَصَرَ", transliteration: "na-sa-ra", syllableType: "CV", meaning: { en: "he helped", tr: "yardım etti", fr: "il a aidé", ur: "اس نے مدد کی", id: "dia membantu" } },
    { arabic: "سَمِعَ", transliteration: "sa-mi-'a", syllableType: "CV", meaning: { en: "he heard", tr: "duydu", fr: "il a entendu", ur: "اس نے سنا", id: "dia mendengar" } },
    { arabic: "عَلِمَ", transliteration: "'a-li-ma", syllableType: "CV", meaning: { en: "he knew", tr: "bildi", fr: "il a su", ur: "اس نے جانا", id: "dia mengetahui" } },
    { arabic: "مُسْلِمٌ", transliteration: "mus-li-mun", syllableType: "CVC", meaning: { en: "a Muslim", tr: "bir Müslüman", fr: "un Musulman", ur: "ایک مسلمان", id: "seorang Muslim" } },
  ],
  practiceGrid: INTRO_GRID,
  exercises: [
    {
      id: "combine-ex1",
      type: "drag_order",
      instruction: {
        en: "Arrange the syllables in the correct order to form the word",
        tr: "Heceleri doğru sırada dizin ve kelimeyi oluşturun",
        fr: "Arrangez les syllabes dans le bon ordre pour former le mot",
        ur: "ہجوں کو صحیح ترتیب میں لگائیں تاکہ لفظ بنے",
        id: "Susun suku kata dalam urutan yang benar untuk membentuk kata",
      },
      items: [
        { id: "c1-1", prompt: "كَتَبَ", options: ["تَ", "كَ", "بَ"], correct: 0 },
        { id: "c1-2", prompt: "جَلَسَ", options: ["سَ", "جَ", "لَ"], correct: 0 },
        { id: "c1-3", prompt: "ذَهَبَ", options: ["هَ", "بَ", "ذَ"], correct: 0 },
        { id: "c1-4", prompt: "فَتَحَ", options: ["تَ", "حَ", "فَ"], correct: 0 },
        { id: "c1-5", prompt: "نَصَرَ", options: ["رَ", "نَ", "صَ"], correct: 0 },
        { id: "c1-6", prompt: "عَلِمَ", options: ["عَ", "مَ", "لِ"], correct: 0 },
      ],
    },
    {
      id: "combine-ex2",
      type: "complete_word",
      instruction: {
        en: "Select the missing syllable to complete the word",
        tr: "Kelimeyi tamamlamak için eksik heceyi seçin",
        fr: "Sélectionnez la syllabe manquante pour compléter le mot",
        ur: "لفظ مکمل کرنے کے لیے گم شدہ ہجا منتخب کریں",
        id: "Pilih suku kata yang hilang untuk melengkapi kata",
      },
      items: [
        { id: "c2-1", prompt: "كَ_بَ (he wrote)", options: ["تَ", "لَ", "مَ"], correct: 0 },
        { id: "c2-2", prompt: "جَ_سَ (he sat)", options: ["مَ", "لَ", "نَ"], correct: 1 },
        { id: "c2-3", prompt: "ذَهَ_ (he went)", options: ["سَ", "بَ", "رَ"], correct: 1 },
        { id: "c2-4", prompt: "_تَحَ (he opened)", options: ["كَ", "فَ", "نَ"], correct: 1 },
        { id: "c2-5", prompt: "نَ_رَ (he helped)", options: ["صَ", "سَ", "فَ"], correct: 0 },
        { id: "c2-6", prompt: "سَمِ_ (he heard)", options: ["عَ", "لَ", "رَ"], correct: 0 },
      ],
    },
  ],
};

// ─── Export ──────────────────────────────────────────────

export const SYLLABLE_LESSONS: SyllableLesson[] = [
  LESSON_HARAKAT,
  LESSON_MADD,
  LESSON_SUKOON,
  LESSON_SHADDAH,
  LESSON_TANWEEN,
  LESSON_COMBINING,
];

export const TASHKEEL_COLORS: Record<string, string> = {
  fathah: "text-green-600",
  dammah: "text-blue-600",
  kasrah: "text-orange-500",
  sukoon: "text-red-500",
  shaddah: "text-purple-600",
  tanween: "text-amber-600",
};

export const TASHKEEL_BG_COLORS: Record<string, string> = {
  fathah: "bg-green-100",
  dammah: "bg-blue-100",
  kasrah: "bg-orange-100",
  sukoon: "bg-red-100",
  shaddah: "bg-purple-100",
  tanween: "bg-amber-100",
};

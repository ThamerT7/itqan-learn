import { LocalizedText } from "@/types";

export type DictationExerciseType = "hear-write" | "similar-sounds" | "tashkeel-listen";

export interface HearWriteExercise {
  id: string;
  type: "hear-write";
  arabic: string;
  meaning: LocalizedText;
  difficulty: 1 | 2 | 3;
  ttsText: string;
}

export interface SimilarSoundsExercise {
  id: string;
  type: "similar-sounds";
  ttsText: string;
  correctArabic: string;
  meaning: LocalizedText;
  difficulty: 1 | 2 | 3;
  options: [string, string];
  correctIndex: 0 | 1;
}

export interface TashkeelListenExercise {
  id: string;
  type: "tashkeel-listen";
  bare: string;
  ttsText: string;
  meaning: LocalizedText;
  difficulty: 1 | 2 | 3;
  options: string[];
  correctIndex: number;
}

export type DictationExercise = HearWriteExercise | SimilarSoundsExercise | TashkeelListenExercise;

// ─── Hear & Write exercises (20 words, graduated difficulty) ────────

export const HEAR_WRITE_EXERCISES: HearWriteExercise[] = [
  // Difficulty 1 — short, common words
  {
    id: "hw-1",
    type: "hear-write",
    arabic: "كَتَبَ",
    meaning: { en: "He wrote", tr: "Yazdı", fr: "Il a écrit", ur: "اس نے لکھا", id: "Dia menulis" },
    difficulty: 1,
    ttsText: "كَتَبَ",
  },
  {
    id: "hw-2",
    type: "hear-write",
    arabic: "بَابٌ",
    meaning: { en: "Door", tr: "Kapı", fr: "Porte", ur: "دروازہ", id: "Pintu" },
    difficulty: 1,
    ttsText: "بَابٌ",
  },
  {
    id: "hw-3",
    type: "hear-write",
    arabic: "قَلَمٌ",
    meaning: { en: "Pen", tr: "Kalem", fr: "Stylo", ur: "قلم", id: "Pena" },
    difficulty: 1,
    ttsText: "قَلَمٌ",
  },
  {
    id: "hw-4",
    type: "hear-write",
    arabic: "وَلَدٌ",
    meaning: { en: "Boy", tr: "Oğlan", fr: "Garçon", ur: "لڑکا", id: "Anak laki-laki" },
    difficulty: 1,
    ttsText: "وَلَدٌ",
  },
  {
    id: "hw-5",
    type: "hear-write",
    arabic: "نَهْرٌ",
    meaning: { en: "River", tr: "Nehir", fr: "Rivière", ur: "ندی", id: "Sungai" },
    difficulty: 1,
    ttsText: "نَهْرٌ",
  },
  {
    id: "hw-6",
    type: "hear-write",
    arabic: "سَمَكٌ",
    meaning: { en: "Fish", tr: "Balık", fr: "Poisson", ur: "مچھلی", id: "Ikan" },
    difficulty: 1,
    ttsText: "سَمَكٌ",
  },
  {
    id: "hw-7",
    type: "hear-write",
    arabic: "يَدٌ",
    meaning: { en: "Hand", tr: "El", fr: "Main", ur: "ہاتھ", id: "Tangan" },
    difficulty: 1,
    ttsText: "يَدٌ",
  },
  // Difficulty 2 — medium words
  {
    id: "hw-8",
    type: "hear-write",
    arabic: "مَدْرَسَةٌ",
    meaning: { en: "School", tr: "Okul", fr: "École", ur: "مدرسہ", id: "Sekolah" },
    difficulty: 2,
    ttsText: "مَدْرَسَةٌ",
  },
  {
    id: "hw-9",
    type: "hear-write",
    arabic: "مُعَلِّمٌ",
    meaning: { en: "Teacher", tr: "Öğretmen", fr: "Enseignant", ur: "استاد", id: "Guru" },
    difficulty: 2,
    ttsText: "مُعَلِّمٌ",
  },
  {
    id: "hw-10",
    type: "hear-write",
    arabic: "كِتَابٌ",
    meaning: { en: "Book", tr: "Kitap", fr: "Livre", ur: "کتاب", id: "Buku" },
    difficulty: 2,
    ttsText: "كِتَابٌ",
  },
  {
    id: "hw-11",
    type: "hear-write",
    arabic: "جَمِيلٌ",
    meaning: { en: "Beautiful", tr: "Güzel", fr: "Beau", ur: "خوبصورت", id: "Indah" },
    difficulty: 2,
    ttsText: "جَمِيلٌ",
  },
  {
    id: "hw-12",
    type: "hear-write",
    arabic: "صَدِيقٌ",
    meaning: { en: "Friend", tr: "Arkadaş", fr: "Ami", ur: "دوست", id: "Teman" },
    difficulty: 2,
    ttsText: "صَدِيقٌ",
  },
  {
    id: "hw-13",
    type: "hear-write",
    arabic: "شُكْرًا",
    meaning: { en: "Thank you", tr: "Teşekkürler", fr: "Merci", ur: "شکریہ", id: "Terima kasih" },
    difficulty: 2,
    ttsText: "شُكْرًا",
  },
  {
    id: "hw-14",
    type: "hear-write",
    arabic: "طَعَامٌ",
    meaning: { en: "Food", tr: "Yemek", fr: "Nourriture", ur: "کھانا", id: "Makanan" },
    difficulty: 2,
    ttsText: "طَعَامٌ",
  },
  // Difficulty 3 — longer / harder words
  {
    id: "hw-15",
    type: "hear-write",
    arabic: "مُسْتَشْفًى",
    meaning: { en: "Hospital", tr: "Hastane", fr: "Hôpital", ur: "ہسپتال", id: "Rumah sakit" },
    difficulty: 3,
    ttsText: "مُسْتَشْفًى",
  },
  {
    id: "hw-16",
    type: "hear-write",
    arabic: "اسْتِغْفَارٌ",
    meaning: { en: "Seeking forgiveness", tr: "İstiğfar", fr: "Demande de pardon", ur: "استغفار", id: "Istighfar" },
    difficulty: 3,
    ttsText: "اسْتِغْفَارٌ",
  },
  {
    id: "hw-17",
    type: "hear-write",
    arabic: "مَسْؤُولِيَّةٌ",
    meaning: { en: "Responsibility", tr: "Sorumluluk", fr: "Responsabilité", ur: "ذمہ داری", id: "Tanggung jawab" },
    difficulty: 3,
    ttsText: "مَسْؤُولِيَّةٌ",
  },
  {
    id: "hw-18",
    type: "hear-write",
    arabic: "الْحَمْدُ لِلَّهِ",
    meaning: { en: "Praise be to God", tr: "Allah'a hamd olsun", fr: "Louange à Dieu", ur: "اللہ کا شکر ہے", id: "Segala puji bagi Allah" },
    difficulty: 3,
    ttsText: "الْحَمْدُ لِلَّهِ",
  },
  {
    id: "hw-19",
    type: "hear-write",
    arabic: "بِسْمِ اللَّهِ",
    meaning: { en: "In the name of God", tr: "Allah'ın adıyla", fr: "Au nom de Dieu", ur: "اللہ کے نام سے", id: "Dengan nama Allah" },
    difficulty: 3,
    ttsText: "بِسْمِ اللَّهِ",
  },
  {
    id: "hw-20",
    type: "hear-write",
    arabic: "السَّلَامُ عَلَيْكُمْ",
    meaning: { en: "Peace be upon you", tr: "Selam üzerinize olsun", fr: "Que la paix soit sur vous", ur: "السلام علیکم", id: "Semoga keselamatan atasmu" },
    difficulty: 3,
    ttsText: "السَّلَامُ عَلَيْكُمْ",
  },
];

// ─── Similar Sounds exercises (15 pairs) ────────

export const SIMILAR_SOUNDS_EXERCISES: SimilarSoundsExercise[] = [
  {
    id: "ss-1",
    type: "similar-sounds",
    ttsText: "قَلْبٌ",
    correctArabic: "قَلْبٌ",
    meaning: { en: "Heart", tr: "Kalp", fr: "Coeur", ur: "دل", id: "Hati" },
    difficulty: 1,
    options: ["قَلْبٌ", "كَلْبٌ"],
    correctIndex: 0,
  },
  {
    id: "ss-2",
    type: "similar-sounds",
    ttsText: "كَلْبٌ",
    correctArabic: "كَلْبٌ",
    meaning: { en: "Dog", tr: "Köpek", fr: "Chien", ur: "کتا", id: "Anjing" },
    difficulty: 1,
    options: ["قَلْبٌ", "كَلْبٌ"],
    correctIndex: 1,
  },
  {
    id: "ss-3",
    type: "similar-sounds",
    ttsText: "حَبْلٌ",
    correctArabic: "حَبْلٌ",
    meaning: { en: "Rope", tr: "İp", fr: "Corde", ur: "رسی", id: "Tali" },
    difficulty: 1,
    options: ["حَبْلٌ", "جَبَلٌ"],
    correctIndex: 0,
  },
  {
    id: "ss-4",
    type: "similar-sounds",
    ttsText: "سَيْفٌ",
    correctArabic: "سَيْفٌ",
    meaning: { en: "Sword", tr: "Kılıç", fr: "Épée", ur: "تلوار", id: "Pedang" },
    difficulty: 1,
    options: ["صَيْفٌ", "سَيْفٌ"],
    correctIndex: 1,
  },
  {
    id: "ss-5",
    type: "similar-sounds",
    ttsText: "صَيْفٌ",
    correctArabic: "صَيْفٌ",
    meaning: { en: "Summer", tr: "Yaz", fr: "Été", ur: "گرمی", id: "Musim panas" },
    difficulty: 1,
    options: ["صَيْفٌ", "سَيْفٌ"],
    correctIndex: 0,
  },
  {
    id: "ss-6",
    type: "similar-sounds",
    ttsText: "ظَلَّ",
    correctArabic: "ظَلَّ",
    meaning: { en: "He remained", tr: "Kaldı", fr: "Il est resté", ur: "وہ رہا", id: "Dia tetap" },
    difficulty: 2,
    options: ["ظَلَّ", "ضَلَّ"],
    correctIndex: 0,
  },
  {
    id: "ss-7",
    type: "similar-sounds",
    ttsText: "ضَلَّ",
    correctArabic: "ضَلَّ",
    meaning: { en: "He went astray", tr: "Sapıttı", fr: "Il s'est égaré", ur: "وہ بھٹکا", id: "Dia tersesat" },
    difficulty: 2,
    options: ["ظَلَّ", "ضَلَّ"],
    correctIndex: 1,
  },
  {
    id: "ss-8",
    type: "similar-sounds",
    ttsText: "عَلِمَ",
    correctArabic: "عَلِمَ",
    meaning: { en: "He knew", tr: "Bildi", fr: "Il a su", ur: "اس نے جانا", id: "Dia tahu" },
    difficulty: 2,
    options: ["عَلِمَ", "حَلِمَ"],
    correctIndex: 0,
  },
  {
    id: "ss-9",
    type: "similar-sounds",
    ttsText: "ذَكَرَ",
    correctArabic: "ذَكَرَ",
    meaning: { en: "He remembered", tr: "Hatırladı", fr: "Il s'est souvenu", ur: "اس نے یاد کیا", id: "Dia mengingat" },
    difficulty: 2,
    options: ["زَكَرَ", "ذَكَرَ"],
    correctIndex: 1,
  },
  {
    id: "ss-10",
    type: "similar-sounds",
    ttsText: "تَابَ",
    correctArabic: "تَابَ",
    meaning: { en: "He repented", tr: "Tövbe etti", fr: "Il s'est repenti", ur: "اس نے توبہ کی", id: "Dia bertobat" },
    difficulty: 2,
    options: ["تَابَ", "ثَابَ"],
    correctIndex: 0,
  },
  {
    id: "ss-11",
    type: "similar-sounds",
    ttsText: "طِينٌ",
    correctArabic: "طِينٌ",
    meaning: { en: "Clay", tr: "Kil", fr: "Argile", ur: "مٹی", id: "Tanah liat" },
    difficulty: 3,
    options: ["تِينٌ", "طِينٌ"],
    correctIndex: 1,
  },
  {
    id: "ss-12",
    type: "similar-sounds",
    ttsText: "تِينٌ",
    correctArabic: "تِينٌ",
    meaning: { en: "Figs", tr: "İncir", fr: "Figues", ur: "انجیر", id: "Buah tin" },
    difficulty: 3,
    options: ["تِينٌ", "طِينٌ"],
    correctIndex: 0,
  },
  {
    id: "ss-13",
    type: "similar-sounds",
    ttsText: "هَدَى",
    correctArabic: "هَدَى",
    meaning: { en: "He guided", tr: "Yol gösterdi", fr: "Il a guidé", ur: "اس نے ہدایت دی", id: "Dia membimbing" },
    difficulty: 3,
    options: ["هَدَى", "حَدَا"],
    correctIndex: 0,
  },
  {
    id: "ss-14",
    type: "similar-sounds",
    ttsText: "غَفَرَ",
    correctArabic: "غَفَرَ",
    meaning: { en: "He forgave", tr: "Bağışladı", fr: "Il a pardonné", ur: "اس نے معاف کیا", id: "Dia mengampuni" },
    difficulty: 3,
    options: ["خَفَرَ", "غَفَرَ"],
    correctIndex: 1,
  },
  {
    id: "ss-15",
    type: "similar-sounds",
    ttsText: "دَعَا",
    correctArabic: "دَعَا",
    meaning: { en: "He called / prayed", tr: "Dua etti", fr: "Il a invoqué", ur: "اس نے دعا کی", id: "Dia berdoa" },
    difficulty: 3,
    options: ["دَعَا", "ذَعَا"],
    correctIndex: 0,
  },
];

// ─── Tashkeel Listening exercises (15 exercises) ────────

export const TASHKEEL_LISTEN_EXERCISES: TashkeelListenExercise[] = [
  {
    id: "tl-1",
    type: "tashkeel-listen",
    bare: "كتب",
    ttsText: "كَتَبَ",
    meaning: { en: "He wrote", tr: "Yazdı", fr: "Il a écrit", ur: "اس نے لکھا", id: "Dia menulis" },
    difficulty: 1,
    options: ["كَتَبَ", "كُتُبٌ", "كُتِبَ"],
    correctIndex: 0,
  },
  {
    id: "tl-2",
    type: "tashkeel-listen",
    bare: "كتب",
    ttsText: "كُتُبٌ",
    meaning: { en: "Books", tr: "Kitaplar", fr: "Livres", ur: "کتابیں", id: "Buku-buku" },
    difficulty: 1,
    options: ["كَتَبَ", "كُتُبٌ", "كُتِبَ"],
    correctIndex: 1,
  },
  {
    id: "tl-3",
    type: "tashkeel-listen",
    bare: "علم",
    ttsText: "عِلْمٌ",
    meaning: { en: "Knowledge", tr: "İlim", fr: "Science", ur: "علم", id: "Ilmu" },
    difficulty: 1,
    options: ["عَلَمٌ", "عِلْمٌ", "عُلِمَ"],
    correctIndex: 1,
  },
  {
    id: "tl-4",
    type: "tashkeel-listen",
    bare: "علم",
    ttsText: "عَلَمٌ",
    meaning: { en: "Flag", tr: "Bayrak", fr: "Drapeau", ur: "جھنڈا", id: "Bendera" },
    difficulty: 1,
    options: ["عَلَمٌ", "عِلْمٌ", "عُلِمَ"],
    correctIndex: 0,
  },
  {
    id: "tl-5",
    type: "tashkeel-listen",
    bare: "حسن",
    ttsText: "حُسْنٌ",
    meaning: { en: "Beauty", tr: "Güzellik", fr: "Beauté", ur: "حسن", id: "Keindahan" },
    difficulty: 1,
    options: ["حَسَنٌ", "حُسْنٌ", "حَسِنَ"],
    correctIndex: 1,
  },
  {
    id: "tl-6",
    type: "tashkeel-listen",
    bare: "فتح",
    ttsText: "فَتَحَ",
    meaning: { en: "He opened", tr: "Açtı", fr: "Il a ouvert", ur: "اس نے کھولا", id: "Dia membuka" },
    difficulty: 2,
    options: ["فَتَحَ", "فُتِحَ", "فَتْحٌ"],
    correctIndex: 0,
  },
  {
    id: "tl-7",
    type: "tashkeel-listen",
    bare: "فتح",
    ttsText: "فُتِحَ",
    meaning: { en: "It was opened", tr: "Açıldı", fr: "Il a été ouvert", ur: "کھولا گیا", id: "Dibuka" },
    difficulty: 2,
    options: ["فَتَحَ", "فُتِحَ", "فَتْحٌ"],
    correctIndex: 1,
  },
  {
    id: "tl-8",
    type: "tashkeel-listen",
    bare: "نصر",
    ttsText: "نَصْرٌ",
    meaning: { en: "Victory", tr: "Zafer", fr: "Victoire", ur: "نصرت", id: "Kemenangan" },
    difficulty: 2,
    options: ["نَصَرَ", "نُصِرَ", "نَصْرٌ"],
    correctIndex: 2,
  },
  {
    id: "tl-9",
    type: "tashkeel-listen",
    bare: "صبر",
    ttsText: "صَبْرٌ",
    meaning: { en: "Patience", tr: "Sabır", fr: "Patience", ur: "صبر", id: "Kesabaran" },
    difficulty: 2,
    options: ["صَبَرَ", "صَبْرٌ", "صُبِرَ"],
    correctIndex: 1,
  },
  {
    id: "tl-10",
    type: "tashkeel-listen",
    bare: "شكر",
    ttsText: "شُكْرٌ",
    meaning: { en: "Gratitude", tr: "Şükür", fr: "Gratitude", ur: "شکر", id: "Syukur" },
    difficulty: 2,
    options: ["شَكَرَ", "شُكْرٌ", "شَكُرَ"],
    correctIndex: 1,
  },
  {
    id: "tl-11",
    type: "tashkeel-listen",
    bare: "جعل",
    ttsText: "جَعَلَ",
    meaning: { en: "He made / placed", tr: "Yaptı / Kıldı", fr: "Il a fait / placé", ur: "اس نے بنایا", id: "Dia menjadikan" },
    difficulty: 3,
    options: ["جُعِلَ", "جَعَلَ", "جَعْلٌ"],
    correctIndex: 1,
  },
  {
    id: "tl-12",
    type: "tashkeel-listen",
    bare: "جعل",
    ttsText: "جُعِلَ",
    meaning: { en: "It was made", tr: "Yapıldı", fr: "Il a été fait", ur: "بنایا گیا", id: "Dijadikan" },
    difficulty: 3,
    options: ["جُعِلَ", "جَعَلَ", "جَعْلٌ"],
    correctIndex: 0,
  },
  {
    id: "tl-13",
    type: "tashkeel-listen",
    bare: "حكم",
    ttsText: "حُكْمٌ",
    meaning: { en: "Ruling / Judgment", tr: "Hüküm", fr: "Jugement", ur: "حکم", id: "Hukum" },
    difficulty: 3,
    options: ["حَكَمَ", "حُكْمٌ", "حَكِيمٌ"],
    correctIndex: 1,
  },
  {
    id: "tl-14",
    type: "tashkeel-listen",
    bare: "حكم",
    ttsText: "حَكَمَ",
    meaning: { en: "He judged", tr: "Hükmetti", fr: "Il a jugé", ur: "اس نے فیصلہ کیا", id: "Dia memutuskan" },
    difficulty: 3,
    options: ["حَكَمَ", "حُكْمٌ", "حَكِيمٌ"],
    correctIndex: 0,
  },
  {
    id: "tl-15",
    type: "tashkeel-listen",
    bare: "قدر",
    ttsText: "قَدَرٌ",
    meaning: { en: "Destiny / Decree", tr: "Kader", fr: "Destin", ur: "تقدیر", id: "Takdir" },
    difficulty: 3,
    options: ["قَدَرٌ", "قَدْرٌ", "قُدِرَ"],
    correctIndex: 0,
  },
];

export const ALL_DICTATION_EXERCISES: DictationExercise[] = [
  ...HEAR_WRITE_EXERCISES,
  ...SIMILAR_SOUNDS_EXERCISES,
  ...TASHKEEL_LISTEN_EXERCISES,
];

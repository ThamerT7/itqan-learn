import { LocalizedText } from "@/types";

// ─── Types ───────────────────────────────────────────────

export type ReadingLevel = 1 | 2 | 3;

export type ComprehensionQuestion = {
  id: string;
  question: LocalizedText;
  options: LocalizedText[];
  correct: number;
};

export type ReadingWord = {
  id: string;
  level: 1;
  arabic: string;
  transliteration: string;
  meaning: LocalizedText;
  audioRef: string;
  category: string;
};

export type ReadingSentence = {
  id: string;
  level: 2;
  arabic: string;
  transliteration: string;
  translation: LocalizedText;
  audioRef: string;
  words: { arabic: string; meaning: LocalizedText }[];
};

export type ReadingParagraph = {
  id: string;
  level: 3;
  arabic: string;
  transliteration: string;
  translation: LocalizedText;
  audioRef: string;
  source: string;
  words: { arabic: string; meaning: LocalizedText }[];
  questions: ComprehensionQuestion[];
};

export type ReadingItem = ReadingWord | ReadingSentence | ReadingParagraph;

// ─── Level 1: Words (20 words, 3-5 letters, fully vowelized) ─

export const READING_WORDS: ReadingWord[] = [
  {
    id: "w1", level: 1, arabic: "كِتَابٌ", transliteration: "kitaabun", category: "objects",
    audioRef: "/audio/reading/kitab.mp3",
    meaning: { en: "Book", tr: "Kitap", fr: "Livre", ur: "کتاب", id: "Buku" },
  },
  {
    id: "w2", level: 1, arabic: "قَلَمٌ", transliteration: "qalamun", category: "objects",
    audioRef: "/audio/reading/qalam.mp3",
    meaning: { en: "Pen", tr: "Kalem", fr: "Stylo", ur: "قلم", id: "Pena" },
  },
  {
    id: "w3", level: 1, arabic: "بَيْتٌ", transliteration: "baytun", category: "places",
    audioRef: "/audio/reading/bayt.mp3",
    meaning: { en: "House", tr: "Ev", fr: "Maison", ur: "گھر", id: "Rumah" },
  },
  {
    id: "w4", level: 1, arabic: "مَاءٌ", transliteration: "maa'un", category: "nature",
    audioRef: "/audio/reading/maa.mp3",
    meaning: { en: "Water", tr: "Su", fr: "Eau", ur: "پانی", id: "Air" },
  },
  {
    id: "w5", level: 1, arabic: "شَمْسٌ", transliteration: "shamsun", category: "nature",
    audioRef: "/audio/reading/shams.mp3",
    meaning: { en: "Sun", tr: "Güneş", fr: "Soleil", ur: "سورج", id: "Matahari" },
  },
  {
    id: "w6", level: 1, arabic: "قَمَرٌ", transliteration: "qamarun", category: "nature",
    audioRef: "/audio/reading/qamar.mp3",
    meaning: { en: "Moon", tr: "Ay", fr: "Lune", ur: "چاند", id: "Bulan" },
  },
  {
    id: "w7", level: 1, arabic: "نَجْمٌ", transliteration: "najmun", category: "nature",
    audioRef: "/audio/reading/najm.mp3",
    meaning: { en: "Star", tr: "Yıldız", fr: "Étoile", ur: "ستارہ", id: "Bintang" },
  },
  {
    id: "w8", level: 1, arabic: "وَلَدٌ", transliteration: "waladun", category: "people",
    audioRef: "/audio/reading/walad.mp3",
    meaning: { en: "Boy", tr: "Oğlan", fr: "Garçon", ur: "لڑکا", id: "Anak laki-laki" },
  },
  {
    id: "w9", level: 1, arabic: "بِنْتٌ", transliteration: "bintun", category: "people",
    audioRef: "/audio/reading/bint.mp3",
    meaning: { en: "Girl", tr: "Kız", fr: "Fille", ur: "لڑکی", id: "Anak perempuan" },
  },
  {
    id: "w10", level: 1, arabic: "رَجُلٌ", transliteration: "rajulun", category: "people",
    audioRef: "/audio/reading/rajul.mp3",
    meaning: { en: "Man", tr: "Adam", fr: "Homme", ur: "آدمی", id: "Pria" },
  },
  {
    id: "w11", level: 1, arabic: "بَابٌ", transliteration: "baabun", category: "objects",
    audioRef: "/audio/reading/baab.mp3",
    meaning: { en: "Door", tr: "Kapı", fr: "Porte", ur: "دروازہ", id: "Pintu" },
  },
  {
    id: "w12", level: 1, arabic: "أَرْضٌ", transliteration: "ardun", category: "nature",
    audioRef: "/audio/reading/ard.mp3",
    meaning: { en: "Earth", tr: "Toprak", fr: "Terre", ur: "زمین", id: "Bumi" },
  },
  {
    id: "w13", level: 1, arabic: "نُورٌ", transliteration: "nuurun", category: "nature",
    audioRef: "/audio/reading/nuur.mp3",
    meaning: { en: "Light", tr: "Nur", fr: "Lumière", ur: "نور", id: "Cahaya" },
  },
  {
    id: "w14", level: 1, arabic: "عِلْمٌ", transliteration: "'ilmun", category: "concepts",
    audioRef: "/audio/reading/ilm.mp3",
    meaning: { en: "Knowledge", tr: "İlim", fr: "Science", ur: "علم", id: "Ilmu" },
  },
  {
    id: "w15", level: 1, arabic: "حَقٌّ", transliteration: "haqqun", category: "concepts",
    audioRef: "/audio/reading/haqq.mp3",
    meaning: { en: "Truth", tr: "Hak", fr: "Vérité", ur: "حق", id: "Kebenaran" },
  },
  {
    id: "w16", level: 1, arabic: "سَلَامٌ", transliteration: "salaamun", category: "concepts",
    audioRef: "/audio/reading/salaam.mp3",
    meaning: { en: "Peace", tr: "Barış", fr: "Paix", ur: "سلام", id: "Kedamaian" },
  },
  {
    id: "w17", level: 1, arabic: "صَبْرٌ", transliteration: "sabrun", category: "concepts",
    audioRef: "/audio/reading/sabr.mp3",
    meaning: { en: "Patience", tr: "Sabır", fr: "Patience", ur: "صبر", id: "Kesabaran" },
  },
  {
    id: "w18", level: 1, arabic: "شُكْرٌ", transliteration: "shukrun", category: "concepts",
    audioRef: "/audio/reading/shukr.mp3",
    meaning: { en: "Gratitude", tr: "Şükür", fr: "Gratitude", ur: "شکر", id: "Syukur" },
  },
  {
    id: "w19", level: 1, arabic: "قَلْبٌ", transliteration: "qalbun", category: "body",
    audioRef: "/audio/reading/qalb.mp3",
    meaning: { en: "Heart", tr: "Kalp", fr: "Cœur", ur: "دل", id: "Hati" },
  },
  {
    id: "w20", level: 1, arabic: "يَدٌ", transliteration: "yadun", category: "body",
    audioRef: "/audio/reading/yad.mp3",
    meaning: { en: "Hand", tr: "El", fr: "Main", ur: "ہاتھ", id: "Tangan" },
  },
];

// ─── Level 2: Sentences (15 short sentences, fully vowelized) ─

export const READING_SENTENCES: ReadingSentence[] = [
  {
    id: "s1", level: 2,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
    transliteration: "bismillaahir-rahmaanir-raheem",
    audioRef: "/audio/reading/bismillah.mp3",
    translation: {
      en: "In the name of God, the Most Gracious, the Most Merciful",
      tr: "Rahman ve Rahim olan Allah'ın adıyla",
      fr: "Au nom de Dieu, le Tout Miséricordieux, le Très Miséricordieux",
      ur: "اللہ کے نام سے جو بے حد مہربان نہایت رحم والا ہے",
      id: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang",
    },
    words: [
      { arabic: "بِسْمِ", meaning: { en: "In the name of", tr: "Adıyla", fr: "Au nom de", ur: "کے نام سے", id: "Dengan nama" } },
      { arabic: "اللَّهِ", meaning: { en: "God", tr: "Allah", fr: "Dieu", ur: "اللہ", id: "Allah" } },
      { arabic: "الرَّحْمَنِ", meaning: { en: "the Most Gracious", tr: "Rahman", fr: "le Tout Miséricordieux", ur: "بے حد مہربان", id: "Yang Maha Pengasih" } },
      { arabic: "الرَّحِيمِ", meaning: { en: "the Most Merciful", tr: "Rahim", fr: "le Très Miséricordieux", ur: "نہایت رحم والا", id: "Maha Penyayang" } },
    ],
  },
  {
    id: "s2", level: 2,
    arabic: "اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    transliteration: "alhamdu lillaahi rabbil-'aalameen",
    audioRef: "/audio/reading/alhamdu.mp3",
    translation: {
      en: "All praise is due to God, Lord of all the worlds",
      tr: "Hamd, Alemlerin Rabbi olan Allah'a mahsustur",
      fr: "Louange à Dieu, Seigneur de l'univers",
      ur: "تمام تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا رب ہے",
      id: "Segala puji bagi Allah, Tuhan seluruh alam",
    },
    words: [
      { arabic: "اَلْحَمْدُ", meaning: { en: "All praise", tr: "Hamd", fr: "La louange", ur: "تمام تعریفیں", id: "Segala puji" } },
      { arabic: "لِلَّهِ", meaning: { en: "is due to God", tr: "Allah'a", fr: "à Dieu", ur: "اللہ کے لیے", id: "bagi Allah" } },
      { arabic: "رَبِّ", meaning: { en: "Lord of", tr: "Rabbi", fr: "Seigneur de", ur: "رب", id: "Tuhan" } },
      { arabic: "الْعَالَمِينَ", meaning: { en: "all the worlds", tr: "Alemler", fr: "l'univers", ur: "تمام جہانوں", id: "seluruh alam" } },
    ],
  },
  {
    id: "s3", level: 2,
    arabic: "هَذَا كِتَابٌ جَمِيلٌ",
    transliteration: "hadhaa kitaabun jameelun",
    audioRef: "/audio/reading/hadha-kitab.mp3",
    translation: {
      en: "This is a beautiful book",
      tr: "Bu güzel bir kitaptır",
      fr: "C'est un beau livre",
      ur: "یہ ایک خوبصورت کتاب ہے",
      id: "Ini adalah buku yang indah",
    },
    words: [
      { arabic: "هَذَا", meaning: { en: "This", tr: "Bu", fr: "C'est", ur: "یہ", id: "Ini" } },
      { arabic: "كِتَابٌ", meaning: { en: "book", tr: "kitap", fr: "livre", ur: "کتاب", id: "buku" } },
      { arabic: "جَمِيلٌ", meaning: { en: "beautiful", tr: "güzel", fr: "beau", ur: "خوبصورت", id: "indah" } },
    ],
  },
  {
    id: "s4", level: 2,
    arabic: "ذَهَبَ الْوَلَدُ إِلَى الْمَدْرَسَةِ",
    transliteration: "dhahabal-waladu ilal-madrasati",
    audioRef: "/audio/reading/dhahab.mp3",
    translation: {
      en: "The boy went to school",
      tr: "Oğlan okula gitti",
      fr: "Le garçon est allé à l'école",
      ur: "لڑکا مدرسے گیا",
      id: "Anak laki-laki itu pergi ke sekolah",
    },
    words: [
      { arabic: "ذَهَبَ", meaning: { en: "went", tr: "gitti", fr: "est allé", ur: "گیا", id: "pergi" } },
      { arabic: "الْوَلَدُ", meaning: { en: "the boy", tr: "oğlan", fr: "le garçon", ur: "لڑکا", id: "anak laki-laki" } },
      { arabic: "إِلَى", meaning: { en: "to", tr: "~e/~a", fr: "à", ur: "کی طرف", id: "ke" } },
      { arabic: "الْمَدْرَسَةِ", meaning: { en: "the school", tr: "okul", fr: "l'école", ur: "مدرسہ", id: "sekolah" } },
    ],
  },
  {
    id: "s5", level: 2,
    arabic: "اَلْعِلْمُ نُورٌ",
    transliteration: "al-'ilmu nuurun",
    audioRef: "/audio/reading/al-ilm.mp3",
    translation: {
      en: "Knowledge is light",
      tr: "İlim nurdur",
      fr: "Le savoir est lumière",
      ur: "علم نور ہے",
      id: "Ilmu adalah cahaya",
    },
    words: [
      { arabic: "اَلْعِلْمُ", meaning: { en: "Knowledge", tr: "İlim", fr: "Le savoir", ur: "علم", id: "Ilmu" } },
      { arabic: "نُورٌ", meaning: { en: "is light", tr: "nurdur", fr: "est lumière", ur: "نور ہے", id: "adalah cahaya" } },
    ],
  },
  {
    id: "s6", level: 2,
    arabic: "جَلَسَ الرَّجُلُ عَلَى الْكُرْسِيِّ",
    transliteration: "jalasar-rajulu 'alal-kursiyyi",
    audioRef: "/audio/reading/jalasa.mp3",
    translation: {
      en: "The man sat on the chair",
      tr: "Adam sandalyeye oturdu",
      fr: "L'homme s'est assis sur la chaise",
      ur: "آدمی کرسی پر بیٹھا",
      id: "Pria itu duduk di kursi",
    },
    words: [
      { arabic: "جَلَسَ", meaning: { en: "sat", tr: "oturdu", fr: "s'est assis", ur: "بیٹھا", id: "duduk" } },
      { arabic: "الرَّجُلُ", meaning: { en: "the man", tr: "adam", fr: "l'homme", ur: "آدمی", id: "pria itu" } },
      { arabic: "عَلَى", meaning: { en: "on", tr: "üzerinde", fr: "sur", ur: "پر", id: "di atas" } },
      { arabic: "الْكُرْسِيِّ", meaning: { en: "the chair", tr: "sandalye", fr: "la chaise", ur: "کرسی", id: "kursi" } },
    ],
  },
  {
    id: "s7", level: 2,
    arabic: "فَتَحَتِ الْبِنْتُ الْبَابَ",
    transliteration: "fatahatil-bintu al-baaba",
    audioRef: "/audio/reading/fatahat.mp3",
    translation: {
      en: "The girl opened the door",
      tr: "Kız kapıyı açtı",
      fr: "La fille a ouvert la porte",
      ur: "لڑکی نے دروازہ کھولا",
      id: "Gadis itu membuka pintu",
    },
    words: [
      { arabic: "فَتَحَتِ", meaning: { en: "opened (she)", tr: "açtı", fr: "a ouvert", ur: "کھولا", id: "membuka" } },
      { arabic: "الْبِنْتُ", meaning: { en: "the girl", tr: "kız", fr: "la fille", ur: "لڑکی", id: "gadis itu" } },
      { arabic: "الْبَابَ", meaning: { en: "the door", tr: "kapı", fr: "la porte", ur: "دروازہ", id: "pintu" } },
    ],
  },
  {
    id: "s8", level: 2,
    arabic: "شَرِبَ الطِّفْلُ الْمَاءَ",
    transliteration: "sharibat-tiflu al-maa'a",
    audioRef: "/audio/reading/shariba.mp3",
    translation: {
      en: "The child drank the water",
      tr: "Çocuk suyu içti",
      fr: "L'enfant a bu l'eau",
      ur: "بچے نے پانی پیا",
      id: "Anak itu meminum air",
    },
    words: [
      { arabic: "شَرِبَ", meaning: { en: "drank", tr: "içti", fr: "a bu", ur: "پیا", id: "minum" } },
      { arabic: "الطِّفْلُ", meaning: { en: "the child", tr: "çocuk", fr: "l'enfant", ur: "بچہ", id: "anak itu" } },
      { arabic: "الْمَاءَ", meaning: { en: "the water", tr: "su", fr: "l'eau", ur: "پانی", id: "air" } },
    ],
  },
  {
    id: "s9", level: 2,
    arabic: "كَتَبَ التِّلْمِيذُ الدَّرْسَ",
    transliteration: "katabat-tilmeedhu ad-darsa",
    audioRef: "/audio/reading/kataba.mp3",
    translation: {
      en: "The student wrote the lesson",
      tr: "Öğrenci dersi yazdı",
      fr: "L'élève a écrit la leçon",
      ur: "شاگرد نے سبق لکھا",
      id: "Murid itu menulis pelajaran",
    },
    words: [
      { arabic: "كَتَبَ", meaning: { en: "wrote", tr: "yazdı", fr: "a écrit", ur: "لکھا", id: "menulis" } },
      { arabic: "التِّلْمِيذُ", meaning: { en: "the student", tr: "öğrenci", fr: "l'élève", ur: "شاگرد", id: "murid" } },
      { arabic: "الدَّرْسَ", meaning: { en: "the lesson", tr: "ders", fr: "la leçon", ur: "سبق", id: "pelajaran" } },
    ],
  },
  {
    id: "s10", level: 2,
    arabic: "اَلصَّبْرُ مِفْتَاحُ الْفَرَجِ",
    transliteration: "as-sabru miftaahul-faraji",
    audioRef: "/audio/reading/assabr.mp3",
    translation: {
      en: "Patience is the key to relief",
      tr: "Sabır, kurtuluşun anahtarıdır",
      fr: "La patience est la clé du soulagement",
      ur: "صبر کشادگی کی کنجی ہے",
      id: "Kesabaran adalah kunci kelapangan",
    },
    words: [
      { arabic: "اَلصَّبْرُ", meaning: { en: "Patience", tr: "Sabır", fr: "La patience", ur: "صبر", id: "Kesabaran" } },
      { arabic: "مِفْتَاحُ", meaning: { en: "key to", tr: "anahtarı", fr: "la clé de", ur: "کنجی", id: "kunci" } },
      { arabic: "الْفَرَجِ", meaning: { en: "relief", tr: "kurtuluş", fr: "soulagement", ur: "کشادگی", id: "kelapangan" } },
    ],
  },
  {
    id: "s11", level: 2,
    arabic: "خَلَقَ اللَّهُ السَّمَاوَاتِ وَالْأَرْضَ",
    transliteration: "khalaqallaahu as-samaawaati wal-arda",
    audioRef: "/audio/reading/khalaqa.mp3",
    translation: {
      en: "God created the heavens and the earth",
      tr: "Allah gökleri ve yeri yarattı",
      fr: "Dieu a créé les cieux et la terre",
      ur: "اللہ نے آسمانوں اور زمین کو پیدا کیا",
      id: "Allah menciptakan langit dan bumi",
    },
    words: [
      { arabic: "خَلَقَ", meaning: { en: "created", tr: "yarattı", fr: "a créé", ur: "پیدا کیا", id: "menciptakan" } },
      { arabic: "اللَّهُ", meaning: { en: "God", tr: "Allah", fr: "Dieu", ur: "اللہ", id: "Allah" } },
      { arabic: "السَّمَاوَاتِ", meaning: { en: "the heavens", tr: "gökleri", fr: "les cieux", ur: "آسمانوں", id: "langit" } },
      { arabic: "وَالْأَرْضَ", meaning: { en: "and the earth", tr: "ve yeri", fr: "et la terre", ur: "اور زمین", id: "dan bumi" } },
    ],
  },
  {
    id: "s12", level: 2,
    arabic: "أَنَا أُحِبُّ اللُّغَةَ الْعَرَبِيَّةَ",
    transliteration: "ana uhibbul-lughatal-'arabiyyata",
    audioRef: "/audio/reading/ana-uhibbu.mp3",
    translation: {
      en: "I love the Arabic language",
      tr: "Arapça'yı seviyorum",
      fr: "J'aime la langue arabe",
      ur: "مجھے عربی زبان سے محبت ہے",
      id: "Saya mencintai bahasa Arab",
    },
    words: [
      { arabic: "أَنَا", meaning: { en: "I", tr: "Ben", fr: "Je", ur: "میں", id: "Saya" } },
      { arabic: "أُحِبُّ", meaning: { en: "love", tr: "seviyorum", fr: "aime", ur: "محبت کرتا ہوں", id: "mencintai" } },
      { arabic: "اللُّغَةَ", meaning: { en: "the language", tr: "dil", fr: "la langue", ur: "زبان", id: "bahasa" } },
      { arabic: "الْعَرَبِيَّةَ", meaning: { en: "Arabic", tr: "Arapça", fr: "arabe", ur: "عربی", id: "Arab" } },
    ],
  },
  {
    id: "s13", level: 2,
    arabic: "قَالَ رَسُولُ اللَّهِ: اِقْرَأْ",
    transliteration: "qaala rasuulullaahi: iqra'",
    audioRef: "/audio/reading/qaala.mp3",
    translation: {
      en: "The Messenger of God said: Read!",
      tr: "Allah'ın Resûlü dedi: Oku!",
      fr: "Le Messager de Dieu a dit : Lis !",
      ur: "اللہ کے رسول نے فرمایا: پڑھو!",
      id: "Rasulullah bersabda: Bacalah!",
    },
    words: [
      { arabic: "قَالَ", meaning: { en: "said", tr: "dedi", fr: "a dit", ur: "فرمایا", id: "bersabda" } },
      { arabic: "رَسُولُ", meaning: { en: "Messenger of", tr: "Resûlü", fr: "Le Messager de", ur: "رسول", id: "Rasul" } },
      { arabic: "اللَّهِ", meaning: { en: "God", tr: "Allah", fr: "Dieu", ur: "اللہ", id: "Allah" } },
      { arabic: "اِقْرَأْ", meaning: { en: "Read!", tr: "Oku!", fr: "Lis !", ur: "پڑھو!", id: "Bacalah!" } },
    ],
  },
  {
    id: "s14", level: 2,
    arabic: "اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
    transliteration: "as-salaamu 'alaykum wa rahmatullaah",
    audioRef: "/audio/reading/assalaam.mp3",
    translation: {
      en: "Peace be upon you and the mercy of God",
      tr: "Selam ve Allah'ın rahmeti üzerinize olsun",
      fr: "Que la paix et la miséricorde de Dieu soient sur vous",
      ur: "تم پر سلامتی اور اللہ کی رحمت ہو",
      id: "Semoga keselamatan dan rahmat Allah atas kalian",
    },
    words: [
      { arabic: "اَلسَّلَامُ", meaning: { en: "Peace", tr: "Selam", fr: "La paix", ur: "سلامتی", id: "Keselamatan" } },
      { arabic: "عَلَيْكُمْ", meaning: { en: "be upon you", tr: "üzerinize", fr: "sur vous", ur: "تم پر", id: "atas kalian" } },
      { arabic: "وَرَحْمَةُ", meaning: { en: "and mercy of", tr: "ve rahmeti", fr: "et la miséricorde de", ur: "اور رحمت", id: "dan rahmat" } },
      { arabic: "اللَّهِ", meaning: { en: "God", tr: "Allah", fr: "Dieu", ur: "اللہ", id: "Allah" } },
    ],
  },
  {
    id: "s15", level: 2,
    arabic: "طَلَبَ الْعِلْمَ فَرِيضَةٌ",
    transliteration: "talabal-'ilma fareedatun",
    audioRef: "/audio/reading/talabal.mp3",
    translation: {
      en: "Seeking knowledge is an obligation",
      tr: "İlim talep etmek farzdır",
      fr: "La quête du savoir est une obligation",
      ur: "علم حاصل کرنا فرض ہے",
      id: "Menuntut ilmu adalah kewajiban",
    },
    words: [
      { arabic: "طَلَبَ", meaning: { en: "Seeking", tr: "Talep etmek", fr: "La quête de", ur: "حاصل کرنا", id: "Menuntut" } },
      { arabic: "الْعِلْمَ", meaning: { en: "knowledge", tr: "ilim", fr: "le savoir", ur: "علم", id: "ilmu" } },
      { arabic: "فَرِيضَةٌ", meaning: { en: "is an obligation", tr: "farzdır", fr: "est une obligation", ur: "فرض ہے", id: "adalah kewajiban" } },
    ],
  },
];

// ─── Level 3: Paragraphs (8 short paragraphs) ───────────

export const READING_PARAGRAPHS: ReadingParagraph[] = [
  {
    id: "p1", level: 3,
    source: "Al-Fatihah (1:1-4)",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝ اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ",
    transliteration: "bismillaahir-rahmaanir-raheem. alhamdu lillaahi rabbil-'aalameen. ar-rahmaanir-raheem. maaliki yawmid-deen",
    audioRef: "/audio/reading/fatiha-1-4.mp3",
    translation: {
      en: "In the name of God, the Most Gracious, the Most Merciful. All praise is due to God, Lord of all the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment.",
      tr: "Rahman ve Rahim olan Allah'ın adıyla. Hamd, alemlerin Rabbi olan Allah'a mahsustur. Rahman, Rahim. Din gününün sahibi.",
      fr: "Au nom de Dieu, le Tout Miséricordieux, le Très Miséricordieux. Louange à Dieu, Seigneur de l'univers. Le Tout Miséricordieux, le Très Miséricordieux. Maître du Jour du Jugement.",
      ur: "اللہ کے نام سے جو بے حد مہربان نہایت رحم والا ہے۔ تمام تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا رب ہے۔ بے حد مہربان نہایت رحم والا۔ روزِ جزا کا مالک۔",
      id: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan seluruh alam. Yang Maha Pengasih lagi Maha Penyayang. Pemilik hari pembalasan.",
    },
    words: [
      { arabic: "بِسْمِ", meaning: { en: "In the name of", tr: "Adıyla", fr: "Au nom de", ur: "کے نام سے", id: "Dengan nama" } },
      { arabic: "اللَّهِ", meaning: { en: "God", tr: "Allah", fr: "Dieu", ur: "اللہ", id: "Allah" } },
      { arabic: "الرَّحْمَنِ", meaning: { en: "the Most Gracious", tr: "Rahman", fr: "le Tout Miséricordieux", ur: "بے حد مہربان", id: "Yang Maha Pengasih" } },
      { arabic: "الرَّحِيمِ", meaning: { en: "the Most Merciful", tr: "Rahim", fr: "le Très Miséricordieux", ur: "نہایت رحم والا", id: "Maha Penyayang" } },
      { arabic: "اَلْحَمْدُ", meaning: { en: "All praise", tr: "Hamd", fr: "Louange", ur: "تمام تعریفیں", id: "Segala puji" } },
      { arabic: "رَبِّ", meaning: { en: "Lord of", tr: "Rabbi", fr: "Seigneur de", ur: "رب", id: "Tuhan" } },
      { arabic: "الْعَالَمِينَ", meaning: { en: "all the worlds", tr: "Alemler", fr: "l'univers", ur: "تمام جہان", id: "seluruh alam" } },
      { arabic: "مَالِكِ", meaning: { en: "Master of", tr: "Sahibi", fr: "Maître de", ur: "مالک", id: "Pemilik" } },
      { arabic: "يَوْمِ", meaning: { en: "Day of", tr: "Günü", fr: "Jour du", ur: "دن", id: "hari" } },
      { arabic: "الدِّينِ", meaning: { en: "Judgment", tr: "Din", fr: "Jugement", ur: "جزا", id: "pembalasan" } },
    ],
    questions: [
      {
        id: "p1-q1",
        question: {
          en: "What is the first phrase of this passage?",
          tr: "Bu pasajın ilk cümlesi nedir?",
          fr: "Quelle est la première phrase de ce passage ?",
          ur: "اس حصے کا پہلا جملہ کیا ہے؟",
          id: "Apa frasa pertama dari bagian ini?",
        },
        options: [
          { en: "All praise is due to God", tr: "Hamd Allah'a mahsustur", fr: "Louange à Dieu", ur: "تمام تعریفیں اللہ کے لیے ہیں", id: "Segala puji bagi Allah" },
          { en: "In the name of God", tr: "Allah'ın adıyla", fr: "Au nom de Dieu", ur: "اللہ کے نام سے", id: "Dengan nama Allah" },
          { en: "Master of the Day", tr: "Günün sahibi", fr: "Maître du Jour", ur: "دن کا مالک", id: "Pemilik hari" },
        ],
        correct: 1,
      },
      {
        id: "p1-q2",
        question: {
          en: "What are the two attributes of God mentioned?",
          tr: "Allah'ın bahsedilen iki sıfatı nedir?",
          fr: "Quels sont les deux attributs de Dieu mentionnés ?",
          ur: "اللہ کی دو صفات کون سی بیان کی گئی ہیں؟",
          id: "Apa dua sifat Allah yang disebutkan?",
        },
        options: [
          { en: "Gracious and Merciful", tr: "Rahman ve Rahim", fr: "Miséricordieux et Clément", ur: "مہربان اور رحم والا", id: "Pengasih dan Penyayang" },
          { en: "Strong and Mighty", tr: "Güçlü ve Kudretli", fr: "Fort et Puissant", ur: "طاقتور اور قدرت والا", id: "Kuat dan Perkasa" },
          { en: "Wise and Knowing", tr: "Hikmetli ve Bilen", fr: "Sage et Savant", ur: "حکیم اور جاننے والا", id: "Bijaksana dan Mengetahui" },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "p2", level: 3,
    source: "Al-Ikhlas (112:1-4)",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اَللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    transliteration: "qul huwallaahu ahad. allaahus-samad. lam yalid walam yuulad. walam yakun lahu kufuwan ahad",
    audioRef: "/audio/reading/ikhlas.mp3",
    translation: {
      en: "Say: He is God, the One. God, the Eternal Refuge. He neither begets nor is born. And there is none comparable to Him.",
      tr: "De ki: O, Allah'tır, bir tektir. Allah Samed'dir. Doğurmamış ve doğmamıştır. Hiçbir şey O'nun dengi değildir.",
      fr: "Dis : Il est Dieu, l'Unique. Dieu, le Refuge éternel. Il n'a ni engendré, ni été engendré. Et nul n'est égal à Lui.",
      ur: "کہو: وہ اللہ ہے، ایک۔ اللہ بے نیاز ہے۔ نہ اس نے کسی کو جنا نہ وہ جنا گیا۔ اور کوئی اس کا ہمسر نہیں۔",
      id: "Katakanlah: Dialah Allah, Yang Maha Esa. Allah tempat bergantung. Dia tidak beranak dan tidak diperanakkan. Dan tidak ada sesuatu yang setara dengan-Nya.",
    },
    words: [
      { arabic: "قُلْ", meaning: { en: "Say", tr: "De ki", fr: "Dis", ur: "کہو", id: "Katakanlah" } },
      { arabic: "هُوَ", meaning: { en: "He is", tr: "O", fr: "Il est", ur: "وہ ہے", id: "Dialah" } },
      { arabic: "أَحَدٌ", meaning: { en: "the One", tr: "bir tek", fr: "l'Unique", ur: "ایک", id: "Yang Maha Esa" } },
      { arabic: "الصَّمَدُ", meaning: { en: "Eternal Refuge", tr: "Samed", fr: "le Refuge éternel", ur: "بے نیاز", id: "tempat bergantung" } },
      { arabic: "يَلِدْ", meaning: { en: "begets", tr: "doğurmak", fr: "engendré", ur: "جنا", id: "beranak" } },
      { arabic: "يُولَدْ", meaning: { en: "is born", tr: "doğmak", fr: "été engendré", ur: "جنا گیا", id: "diperanakkan" } },
      { arabic: "كُفُوًا", meaning: { en: "comparable", tr: "denk", fr: "égal", ur: "ہمسر", id: "setara" } },
    ],
    questions: [
      {
        id: "p2-q1",
        question: {
          en: "What does 'As-Samad' mean?",
          tr: "'Es-Samed' ne demektir?",
          fr: "Que signifie 'As-Samad' ?",
          ur: "'الصمد' کا کیا مطلب ہے؟",
          id: "Apa arti 'Ash-Shamad'?",
        },
        options: [
          { en: "The Creator", tr: "Yaratıcı", fr: "Le Créateur", ur: "خالق", id: "Pencipta" },
          { en: "The Eternal Refuge", tr: "Samed", fr: "Le Refuge éternel", ur: "بے نیاز", id: "Tempat bergantung" },
          { en: "The Most High", tr: "En Yüce", fr: "Le Très-Haut", ur: "بلند ترین", id: "Yang Maha Tinggi" },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "p3", level: 3,
    source: "Al-Falaq (113:1-5)",
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    transliteration: "qul a'uudhu birabbil-falaq. min sharri maa khalaq. wamin sharri ghaasiqin idhaa waqab. wamin sharrin-naffaathaati fil-'uqad. wamin sharri haasidin idhaa hasad",
    audioRef: "/audio/reading/falaq.mp3",
    translation: {
      en: "Say: I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies.",
      tr: "De ki: Sabahın Rabbine sığınırım. Yarattığı şeylerin şerrinden. Karanlığı çöktüğünde gecenin şerrinden. Düğümlere üfleyenlerin şerrinden. Haset ettiğinde hasetçinin şerrinden.",
      fr: "Dis : Je cherche refuge auprès du Seigneur de l'aube. Contre le mal de ce qu'Il a créé. Contre le mal de l'obscurité quand elle s'installe. Contre le mal de celles qui soufflent sur les nœuds. Contre le mal d'un envieux quand il envie.",
      ur: "کہو: میں صبح کے رب کی پناہ مانگتا ہوں۔ اس کی مخلوقات کے شر سے۔ اور اندھیری رات کے شر سے جب چھا جائے۔ اور گرہوں میں پھونکنے والیوں کے شر سے۔ اور حسد کرنے والے کے شر سے جب حسد کرے۔",
      id: "Katakanlah: Aku berlindung kepada Tuhan yang menguasai subuh. Dari kejahatan makhluk-Nya. Dan dari kejahatan malam apabila telah gelap gulita. Dan dari kejahatan peniup-peniup pada buhul-buhul. Dan dari kejahatan orang yang dengki apabila ia dengki.",
    },
    words: [
      { arabic: "أَعُوذُ", meaning: { en: "I seek refuge", tr: "Sığınırım", fr: "Je cherche refuge", ur: "پناہ مانگتا ہوں", id: "Aku berlindung" } },
      { arabic: "بِرَبِّ", meaning: { en: "in the Lord of", tr: "Rabbine", fr: "auprès du Seigneur de", ur: "رب کی", id: "kepada Tuhan" } },
      { arabic: "الْفَلَقِ", meaning: { en: "daybreak", tr: "Sabah", fr: "l'aube", ur: "صبح", id: "subuh" } },
      { arabic: "شَرِّ", meaning: { en: "evil of", tr: "şerr", fr: "mal de", ur: "شر", id: "kejahatan" } },
      { arabic: "خَلَقَ", meaning: { en: "He created", tr: "yarattı", fr: "Il a créé", ur: "پیدا کیا", id: "Dia ciptakan" } },
      { arabic: "غَاسِقٍ", meaning: { en: "darkness", tr: "karanlık", fr: "obscurité", ur: "اندھیری رات", id: "malam" } },
      { arabic: "حَاسِدٍ", meaning: { en: "an envier", tr: "hasetçi", fr: "un envieux", ur: "حسد کرنے والا", id: "orang yang dengki" } },
    ],
    questions: [
      {
        id: "p3-q1",
        question: {
          en: "What does 'Al-Falaq' mean?",
          tr: "'El-Felak' ne demektir?",
          fr: "Que signifie 'Al-Falaq' ?",
          ur: "'الفلق' کا کیا مطلب ہے؟",
          id: "Apa arti 'Al-Falaq'?",
        },
        options: [
          { en: "The Night", tr: "Gece", fr: "La nuit", ur: "رات", id: "Malam" },
          { en: "The Daybreak", tr: "Sabah", fr: "L'aube", ur: "صبح", id: "Subuh" },
          { en: "The Star", tr: "Yıldız", fr: "L'étoile", ur: "ستارہ", id: "Bintang" },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "p4", level: 3,
    source: "An-Nas (114:1-6)",
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
    transliteration: "qul a'uudhu birabbin-naas. malikin-naas. ilaahin-naas. min sharril-waswaasil-khannaas. alladhee yuwaswisu fee suduurin-naas. minal-jinnati wan-naas",
    audioRef: "/audio/reading/nas.mp3",
    translation: {
      en: "Say: I seek refuge in the Lord of mankind. The Sovereign of mankind. The God of mankind. From the evil of the retreating whisperer. Who whispers in the breasts of mankind. From among the jinn and mankind.",
      tr: "De ki: İnsanların Rabbine sığınırım. İnsanların Melikine. İnsanların İlahına. Sinsi vesvesecinin şerrinden. O ki insanların göğüslerine vesvese verir. Cinlerden ve insanlardan.",
      fr: "Dis : Je cherche refuge auprès du Seigneur des hommes. Le Souverain des hommes. Le Dieu des hommes. Contre le mal du tentateur furtif. Qui souffle le mal dans les poitrines des hommes. Parmi les djinns et les hommes.",
      ur: "کہو: میں لوگوں کے رب کی پناہ مانگتا ہوں۔ لوگوں کے بادشاہ۔ لوگوں کے معبود۔ چھپ کر وسوسے ڈالنے والے کے شر سے۔ جو لوگوں کے سینوں میں وسوسے ڈالتا ہے۔ جنوں اور انسانوں میں سے۔",
      id: "Katakanlah: Aku berlindung kepada Tuhan manusia. Raja manusia. Sembahan manusia. Dari kejahatan bisikan yang tersembunyi. Yang membisikkan ke dalam dada manusia. Dari golongan jin dan manusia.",
    },
    words: [
      { arabic: "النَّاسِ", meaning: { en: "mankind", tr: "insanlar", fr: "les hommes", ur: "لوگ", id: "manusia" } },
      { arabic: "مَلِكِ", meaning: { en: "Sovereign", tr: "Melik", fr: "Souverain", ur: "بادشاہ", id: "Raja" } },
      { arabic: "إِلَهِ", meaning: { en: "God", tr: "İlah", fr: "Dieu", ur: "معبود", id: "Sembahan" } },
      { arabic: "الْوَسْوَاسِ", meaning: { en: "the whisperer", tr: "vesveseci", fr: "le tentateur", ur: "وسوسے ڈالنے والا", id: "pembisik" } },
      { arabic: "الْخَنَّاسِ", meaning: { en: "retreating", tr: "sinsi", fr: "furtif", ur: "چھپنے والا", id: "yang tersembunyi" } },
      { arabic: "صُدُورِ", meaning: { en: "breasts/hearts", tr: "göğüsler", fr: "poitrines", ur: "سینے", id: "dada" } },
      { arabic: "الْجِنَّةِ", meaning: { en: "the jinn", tr: "cinler", fr: "les djinns", ur: "جن", id: "jin" } },
    ],
    questions: [
      {
        id: "p4-q1",
        question: {
          en: "How many attributes of God are mentioned for 'the people'?",
          tr: "İnsanlar için Allah'ın kaç sıfatı zikredilmiştir?",
          fr: "Combien d'attributs de Dieu sont mentionnés pour 'les hommes' ?",
          ur: "'لوگوں' کے لیے اللہ کی کتنی صفات بیان کی گئی ہیں؟",
          id: "Berapa sifat Allah yang disebutkan untuk 'manusia'?",
        },
        options: [
          { en: "Two", tr: "İki", fr: "Deux", ur: "دو", id: "Dua" },
          { en: "Three", tr: "Üç", fr: "Trois", ur: "تین", id: "Tiga" },
          { en: "Four", tr: "Dört", fr: "Quatre", ur: "چار", id: "Empat" },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "p5", level: 3,
    source: "Ayat Al-Kursi (2:255) - excerpt",
    arabic: "اَللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۝ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
    transliteration: "allaahu laa ilaaha illaa huwal-hayyul-qayyuum. laa ta'khudhuhu sinatun walaa nawm",
    audioRef: "/audio/reading/ayat-kursi.mp3",
    translation: {
      en: "God - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.",
      tr: "Allah, O'ndan başka ilah yoktur. O Hayy'dır, Kayyum'dur. O'nu ne uyuklama ne de uyku tutar.",
      fr: "Dieu - il n'y a de divinité que Lui, le Vivant, le Subsistant. Ni somnolence ni sommeil ne Le saisissent.",
      ur: "اللہ - اس کے سوا کوئی معبود نہیں، زندہ، قائم رکھنے والا۔ نہ اسے اونگھ آتی ہے نہ نیند۔",
      id: "Allah - tidak ada tuhan selain Dia, Yang Maha Hidup, Yang terus-menerus mengurus. Tidak mengantuk dan tidak tidur.",
    },
    words: [
      { arabic: "لَا", meaning: { en: "no/not", tr: "yok", fr: "pas de", ur: "نہیں", id: "tidak" } },
      { arabic: "إِلَهَ", meaning: { en: "deity", tr: "ilah", fr: "divinité", ur: "معبود", id: "tuhan" } },
      { arabic: "إِلَّا", meaning: { en: "except", tr: "hariç", fr: "sauf", ur: "سوائے", id: "kecuali" } },
      { arabic: "الْحَيُّ", meaning: { en: "Ever-Living", tr: "Hayy", fr: "le Vivant", ur: "زندہ", id: "Yang Maha Hidup" } },
      { arabic: "الْقَيُّومُ", meaning: { en: "Sustainer", tr: "Kayyum", fr: "le Subsistant", ur: "قائم رکھنے والا", id: "Yang mengurus" } },
      { arabic: "سِنَةٌ", meaning: { en: "drowsiness", tr: "uyuklama", fr: "somnolence", ur: "اونگھ", id: "mengantuk" } },
      { arabic: "نَوْمٌ", meaning: { en: "sleep", tr: "uyku", fr: "sommeil", ur: "نیند", id: "tidur" } },
    ],
    questions: [
      {
        id: "p5-q1",
        question: {
          en: "What two states do not affect God?",
          tr: "Allah'ı hangi iki hal etkilemez?",
          fr: "Quels deux états n'affectent pas Dieu ?",
          ur: "کون سی دو حالتیں اللہ پر اثر نہیں کرتیں؟",
          id: "Dua keadaan apa yang tidak mempengaruhi Allah?",
        },
        options: [
          { en: "Hunger and thirst", tr: "Açlık ve susuzluk", fr: "Faim et soif", ur: "بھوک اور پیاس", id: "Lapar dan haus" },
          { en: "Drowsiness and sleep", tr: "Uyuklama ve uyku", fr: "Somnolence et sommeil", ur: "اونگھ اور نیند", id: "Mengantuk dan tidur" },
          { en: "Weakness and fatigue", tr: "Zayıflık ve yorgunluk", fr: "Faiblesse et fatigue", ur: "کمزوری اور تھکاوٹ", id: "Lemah dan lelah" },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "p6", level: 3,
    source: "Hadith - Bukhari",
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    transliteration: "khayrukum man ta'allamal-qur'aana wa 'allamahu",
    audioRef: "/audio/reading/hadith-quran.mp3",
    translation: {
      en: "The best of you are those who learn the Quran and teach it",
      tr: "Sizin en hayırlınız Kur'an'ı öğrenen ve öğretendir",
      fr: "Les meilleurs d'entre vous sont ceux qui apprennent le Coran et l'enseignent",
      ur: "تم میں سے بہتر وہ ہے جو قرآن سیکھے اور سکھائے",
      id: "Sebaik-baik kalian adalah yang mempelajari Al-Quran dan mengajarkannya",
    },
    words: [
      { arabic: "خَيْرُكُمْ", meaning: { en: "the best of you", tr: "en hayırlınız", fr: "les meilleurs d'entre vous", ur: "تم میں سے بہتر", id: "sebaik-baik kalian" } },
      { arabic: "مَنْ", meaning: { en: "those who", tr: "kim", fr: "ceux qui", ur: "جو", id: "yang" } },
      { arabic: "تَعَلَّمَ", meaning: { en: "learn", tr: "öğrenen", fr: "apprennent", ur: "سیکھے", id: "mempelajari" } },
      { arabic: "الْقُرْآنَ", meaning: { en: "the Quran", tr: "Kur'an", fr: "le Coran", ur: "قرآن", id: "Al-Quran" } },
      { arabic: "وَعَلَّمَهُ", meaning: { en: "and teach it", tr: "ve öğreten", fr: "et l'enseignent", ur: "اور سکھائے", id: "dan mengajarkannya" } },
    ],
    questions: [
      {
        id: "p6-q1",
        question: {
          en: "According to this hadith, who is the best?",
          tr: "Bu hadise göre en hayırlı kimdir?",
          fr: "Selon ce hadith, qui est le meilleur ?",
          ur: "اس حدیث کے مطابق بہتر کون ہے؟",
          id: "Menurut hadis ini, siapa yang terbaik?",
        },
        options: [
          { en: "The one who memorizes the Quran", tr: "Kur'an'ı ezberleyen", fr: "Celui qui mémorise le Coran", ur: "جو قرآن حفظ کرے", id: "Yang menghafal Al-Quran" },
          { en: "The one who learns and teaches it", tr: "Öğrenen ve öğreten", fr: "Celui qui apprend et enseigne", ur: "جو سیکھے اور سکھائے", id: "Yang mempelajari dan mengajarkannya" },
          { en: "The one who recites it beautifully", tr: "Güzel okuyan", fr: "Celui qui le récite magnifiquement", ur: "جو خوبصورت تلاوت کرے", id: "Yang membacanya dengan indah" },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "p7", level: 3,
    source: "Dua - Morning remembrance",
    arabic: "اَللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    transliteration: "allaahumma bika asbahnaa wabika amsaynaa wabika nahyaa wabika namuutu wa ilaykan-nushuur",
    audioRef: "/audio/reading/dua-morning.mp3",
    translation: {
      en: "O God, by You we enter the morning, and by You we enter the evening, and by You we live, and by You we die, and to You is the resurrection",
      tr: "Allah'ım, senin sayende sabahladık, senin sayende akşamladık, senin sayende yaşarız, senin sayende ölürüz ve diriliş sanadır",
      fr: "Ô Dieu, par Toi nous entrons dans le matin, par Toi nous entrons dans le soir, par Toi nous vivons, par Toi nous mourons, et vers Toi est la résurrection",
      ur: "اے اللہ! تیرے ہی ذریعے ہم نے صبح کی اور تیرے ہی ذریعے شام کی اور تیری بدولت ہم جیتے ہیں اور تیری بدولت مرتے ہیں اور تیری طرف لوٹنا ہے",
      id: "Ya Allah, dengan-Mu kami memasuki pagi dan dengan-Mu kami memasuki sore, dengan-Mu kami hidup dan dengan-Mu kami mati, dan kepada-Mu kebangkitan",
    },
    words: [
      { arabic: "اَللَّهُمَّ", meaning: { en: "O God", tr: "Allah'ım", fr: "Ô Dieu", ur: "اے اللہ", id: "Ya Allah" } },
      { arabic: "بِكَ", meaning: { en: "by You", tr: "senin sayende", fr: "par Toi", ur: "تیرے ذریعے", id: "dengan-Mu" } },
      { arabic: "أَصْبَحْنَا", meaning: { en: "we enter the morning", tr: "sabahladık", fr: "nous entrons dans le matin", ur: "ہم نے صبح کی", id: "kami memasuki pagi" } },
      { arabic: "أَمْسَيْنَا", meaning: { en: "we enter the evening", tr: "akşamladık", fr: "nous entrons dans le soir", ur: "ہم نے شام کی", id: "kami memasuki sore" } },
      { arabic: "نَحْيَا", meaning: { en: "we live", tr: "yaşarız", fr: "nous vivons", ur: "ہم جیتے ہیں", id: "kami hidup" } },
      { arabic: "نَمُوتُ", meaning: { en: "we die", tr: "ölürüz", fr: "nous mourons", ur: "ہم مرتے ہیں", id: "kami mati" } },
      { arabic: "النُّشُورُ", meaning: { en: "the resurrection", tr: "diriliş", fr: "la résurrection", ur: "لوٹنا", id: "kebangkitan" } },
    ],
    questions: [
      {
        id: "p7-q1",
        question: {
          en: "What is this dua about?",
          tr: "Bu dua ne hakkındadır?",
          fr: "De quoi parle cette invocation ?",
          ur: "یہ دعا کس بارے میں ہے؟",
          id: "Tentang apa doa ini?",
        },
        options: [
          { en: "Asking for wealth", tr: "Zenginlik istemek", fr: "Demander la richesse", ur: "دولت مانگنا", id: "Meminta kekayaan" },
          { en: "Acknowledging God's control over life", tr: "Hayat üzerinde Allah'ın kontrolünü kabul etmek", fr: "Reconnaître le contrôle de Dieu sur la vie", ur: "زندگی پر اللہ کے تسلط کا اعتراف", id: "Mengakui kendali Allah atas kehidupan" },
          { en: "Asking for forgiveness", tr: "Bağışlanma istemek", fr: "Demander le pardon", ur: "معافی مانگنا", id: "Meminta ampunan" },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "p8", level: 3,
    source: "Hadith - Muslim",
    arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    transliteration: "innamal-a'maalu bin-niyyaati wa innamaa likulli imri'in maa nawaa",
    audioRef: "/audio/reading/hadith-niyyat.mp3",
    translation: {
      en: "Actions are judged by intentions, and every person will get what they intended",
      tr: "Ameller niyetlere göredir ve herkes niyet ettiğini alır",
      fr: "Les actes ne valent que par les intentions et chaque personne n'obtient que ce qu'elle a visé",
      ur: "اعمال کا دارومدار نیتوں پر ہے اور ہر شخص کو وہی ملے گا جس کی اس نے نیت کی",
      id: "Sesungguhnya setiap amal tergantung pada niatnya dan setiap orang mendapat apa yang diniatkannya",
    },
    words: [
      { arabic: "إِنَّمَا", meaning: { en: "Indeed/only", tr: "Ancak", fr: "Certes", ur: "بے شک", id: "Sesungguhnya" } },
      { arabic: "الْأَعْمَالُ", meaning: { en: "actions", tr: "ameller", fr: "les actes", ur: "اعمال", id: "amal" } },
      { arabic: "بِالنِّيَّاتِ", meaning: { en: "by intentions", tr: "niyetlere göre", fr: "par les intentions", ur: "نیتوں سے", id: "dengan niat" } },
      { arabic: "لِكُلِّ", meaning: { en: "for every", tr: "herkes", fr: "pour chaque", ur: "ہر", id: "setiap" } },
      { arabic: "امْرِئٍ", meaning: { en: "person", tr: "kişi", fr: "personne", ur: "شخص", id: "orang" } },
      { arabic: "نَوَى", meaning: { en: "intended", tr: "niyet etti", fr: "a visé", ur: "نیت کی", id: "diniatkan" } },
    ],
    questions: [
      {
        id: "p8-q1",
        question: {
          en: "What determines the value of actions according to this hadith?",
          tr: "Bu hadise göre amellerin değerini ne belirler?",
          fr: "Qu'est-ce qui détermine la valeur des actes selon ce hadith ?",
          ur: "اس حدیث کے مطابق اعمال کی قدر کس چیز سے ہوتی ہے؟",
          id: "Apa yang menentukan nilai amal menurut hadis ini?",
        },
        options: [
          { en: "The result", tr: "Sonuç", fr: "Le résultat", ur: "نتیجہ", id: "Hasilnya" },
          { en: "The intention", tr: "Niyet", fr: "L'intention", ur: "نیت", id: "Niatnya" },
          { en: "The effort", tr: "Çaba", fr: "L'effort", ur: "کوشش", id: "Usahanya" },
        ],
        correct: 1,
      },
    ],
  },
];

// ─── Combined exports ───────────────────────────────────

export function getReadingItemsByLevel(level: ReadingLevel): ReadingItem[] {
  switch (level) {
    case 1:
      return READING_WORDS;
    case 2:
      return READING_SENTENCES;
    case 3:
      return READING_PARAGRAPHS;
  }
}

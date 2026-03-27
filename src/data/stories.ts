export interface LetterStory {
  letterId: string;
  letter: string;
  titleAr: string;
  title: Record<string, string>;
  storyAr: string;
  storyTranslation: Record<string, string>;
  keywords: { word: string; meaning: Record<string, string> }[];
  illustration: string;
}

export const LETTER_STORIES: LetterStory[] = [
  // 1. أ - Alif
  {
    letterId: "alif",
    letter: "أ",
    titleAr: "أَحْمَدُ الأَسَدُ الأَمِينُ",
    title: {
      en: "Ahmad the Trustworthy Lion",
      tr: "Ahmet Güvenilir Aslan",
      fr: "Ahmad le Lion Fidele",
      ur: "احمد امانتدار شیر",
      id: "Ahmad Singa yang Terpercaya",
    },
    storyAr: "أَحْمَدُ أَسَدٌ أَمِينٌ. يَأْكُلُ الأَرُزَّ تَحْتَ الأَشْجَارِ. يُحِبُّ أَصْدِقَاءَهُ كَثِيرًا.",
    storyTranslation: {
      en: "Ahmad is a trustworthy lion. He eats rice under the trees. He loves his friends very much.",
      tr: "Ahmet guvenilir bir aslandir. Agaclarin altinda pilav yer. Arkadaslarini cok sever.",
      fr: "Ahmad est un lion fidele. Il mange du riz sous les arbres. Il aime beaucoup ses amis.",
      ur: "احمد ایک امانتدار شیر ہے۔ وہ درختوں کے نیچے چاول کھاتا ہے۔ وہ اپنے دوستوں سے بہت محبت کرتا ہے۔",
      id: "Ahmad adalah singa yang terpercaya. Dia makan nasi di bawah pohon. Dia sangat menyayangi teman-temannya.",
    },
    keywords: [
      {
        word: "أَحْمَد",
        meaning: { en: "Ahmad", tr: "Ahmet", fr: "Ahmad", ur: "احمد", id: "Ahmad" },
      },
      {
        word: "أَسَد",
        meaning: { en: "Lion", tr: "Aslan", fr: "Lion", ur: "شیر", id: "Singa" },
      },
      {
        word: "أَرُزّ",
        meaning: { en: "Rice", tr: "Pilav", fr: "Riz", ur: "چاول", id: "Nasi" },
      },
      {
        word: "أَشْجَار",
        meaning: { en: "Trees", tr: "Agaclar", fr: "Arbres", ur: "درخت", id: "Pohon-pohon" },
      },
    ],
    illustration: "🦁",
  },

  // 2. ب - Ba
  {
    letterId: "baa",
    letter: "ب",
    titleAr: "بَيْتٌ بِجَانِبِ البَحْرِ",
    title: {
      en: "A House by the Sea",
      tr: "Deniz Kenarinda Bir Ev",
      fr: "Une Maison au Bord de la Mer",
      ur: "سمندر کے کنارے ایک گھر",
      id: "Rumah di Tepi Laut",
    },
    storyAr: "بَيْتُنَا بِجَانِبِ البَحْرِ. البَابُ كَبِيرٌ وَجَمِيلٌ. نَلْعَبُ بِالبَالُونَاتِ عَلَى البَلْكُونَةِ.",
    storyTranslation: {
      en: "Our house is by the sea. The door is big and beautiful. We play with balloons on the balcony.",
      tr: "Evimiz denizin yaninda. Kapi buyuk ve guzel. Balkonda balonlarla oynariz.",
      fr: "Notre maison est au bord de la mer. La porte est grande et belle. Nous jouons avec des ballons sur le balcon.",
      ur: "ہمارا گھر سمندر کے کنارے ہے۔ دروازہ بڑا اور خوبصورت ہے۔ ہم بالکونی پر غبارے سے کھیلتے ہیں۔",
      id: "Rumah kami di tepi laut. Pintunya besar dan indah. Kami bermain balon di balkon.",
    },
    keywords: [
      {
        word: "بَيْت",
        meaning: { en: "House", tr: "Ev", fr: "Maison", ur: "گھر", id: "Rumah" },
      },
      {
        word: "بَحْر",
        meaning: { en: "Sea", tr: "Deniz", fr: "Mer", ur: "سمندر", id: "Laut" },
      },
      {
        word: "بَاب",
        meaning: { en: "Door", tr: "Kapi", fr: "Porte", ur: "دروازہ", id: "Pintu" },
      },
      {
        word: "بَالُون",
        meaning: { en: "Balloon", tr: "Balon", fr: "Ballon", ur: "غبارہ", id: "Balon" },
      },
    ],
    illustration: "🏠",
  },

  // 3. ت - Ta
  {
    letterId: "taa",
    letter: "ت",
    titleAr: "تُفَّاحٌ وَتَمْرٌ لَذِيذٌ",
    title: {
      en: "Delicious Apples and Dates",
      tr: "Lezzetli Elmalar ve Hurmalar",
      fr: "Pommes et Dattes Delicieuses",
      ur: "لذیذ سیب اور کھجوریں",
      id: "Apel dan Kurma yang Lezat",
    },
    storyAr: "تَأْكُلُ تَالَا التُّفَّاحَ وَالتَّمْرَ. التُّفَّاحُ تَحْتَ التِّينَةِ. التَّمْرُ حُلْوٌ وَلَذِيذٌ.",
    storyTranslation: {
      en: "Tala eats apples and dates. The apples are under the fig tree. The dates are sweet and delicious.",
      tr: "Tala elma ve hurma yer. Elmalar incir agacinin altinda. Hurmalar tatli ve lezzetli.",
      fr: "Tala mange des pommes et des dattes. Les pommes sont sous le figuier. Les dattes sont sucrees et delicieuses.",
      ur: "تالا سیب اور کھجوریں کھاتی ہے۔ سیب انجیر کے درخت کے نیچے ہیں۔ کھجوریں میٹھی اور لذیذ ہیں۔",
      id: "Tala makan apel dan kurma. Apel ada di bawah pohon tin. Kurma manis dan lezat.",
    },
    keywords: [
      {
        word: "تُفَّاح",
        meaning: { en: "Apple", tr: "Elma", fr: "Pomme", ur: "سیب", id: "Apel" },
      },
      {
        word: "تَمْر",
        meaning: { en: "Dates", tr: "Hurma", fr: "Dattes", ur: "کھجور", id: "Kurma" },
      },
      {
        word: "تِين",
        meaning: { en: "Fig", tr: "Incir", fr: "Figue", ur: "انجیر", id: "Tin" },
      },
      {
        word: "تَحْت",
        meaning: { en: "Under", tr: "Altinda", fr: "Sous", ur: "نیچے", id: "Di bawah" },
      },
    ],
    illustration: "🍎",
  },

  // 4. ث - Tha
  {
    letterId: "thaa",
    letter: "ث",
    titleAr: "ثَعْلَبٌ وَثَلَاثَةُ أَثْوَابٍ",
    title: {
      en: "A Fox and Three Garments",
      tr: "Bir Tilki ve Uc Elbise",
      fr: "Un Renard et Trois Vetements",
      ur: "ایک لومڑی اور تین کپڑے",
      id: "Seekor Rubah dan Tiga Pakaian",
    },
    storyAr: "ثَعْلَبٌ لَدَيْهِ ثَلَاثَةُ أَثْوَابٍ. ثَوْبٌ أَبْيَضُ وَثَوْبٌ أَحْمَرُ وَثَوْبٌ أَخْضَرُ. الثَّعْلَبُ يُثَبِّتُ ثِيَابَهُ عَلَى الحَبْلِ.",
    storyTranslation: {
      en: "A fox has three garments. A white garment, a red garment, and a green garment. The fox hangs his clothes on the line.",
      tr: "Bir tilkinin uc elbisesi var. Beyaz bir elbise, kirmizi bir elbise ve yesil bir elbise. Tilki kiyafetlerini ipe asar.",
      fr: "Un renard a trois vetements. Un vetement blanc, un rouge et un vert. Le renard accroche ses habits sur la corde.",
      ur: "ایک لومڑی کے پاس تین کپڑے ہیں۔ ایک سفید، ایک سرخ اور ایک سبز کپڑا۔ لومڑی اپنے کپڑے رسی پر لٹکاتی ہے۔",
      id: "Seekor rubah punya tiga pakaian. Pakaian putih, pakaian merah, dan pakaian hijau. Rubah itu menjemur pakaiannya di tali.",
    },
    keywords: [
      {
        word: "ثَعْلَب",
        meaning: { en: "Fox", tr: "Tilki", fr: "Renard", ur: "لومڑی", id: "Rubah" },
      },
      {
        word: "ثَلَاثَة",
        meaning: { en: "Three", tr: "Uc", fr: "Trois", ur: "تین", id: "Tiga" },
      },
      {
        word: "ثَوْب",
        meaning: { en: "Garment", tr: "Elbise", fr: "Vetement", ur: "کپڑا", id: "Pakaian" },
      },
      {
        word: "ثِيَاب",
        meaning: { en: "Clothes", tr: "Kiyafetler", fr: "Habits", ur: "کپڑے", id: "Baju-baju" },
      },
    ],
    illustration: "🦊",
  },

  // 5. ج - Jim
  {
    letterId: "jiim",
    letter: "ج",
    titleAr: "جَمَلٌ فِي الجَبَلِ",
    title: {
      en: "A Camel on the Mountain",
      tr: "Dagdaki Deve",
      fr: "Un Chameau sur la Montagne",
      ur: "پہاڑ پر اونٹ",
      id: "Unta di Gunung",
    },
    storyAr: "جَمَلٌ جَمِيلٌ يَمْشِي فِي الجَبَلِ. يَجْلِسُ بِجَانِبِ الجَدْوَلِ. يُحِبُّ الجَزَرَ كَثِيرًا.",
    storyTranslation: {
      en: "A beautiful camel walks on the mountain. It sits by the stream. It loves carrots very much.",
      tr: "Guzel bir deve dagda yuruyor. Derenin yaninda oturuyor. Havucu cok seviyor.",
      fr: "Un beau chameau marche sur la montagne. Il s'assoit pres du ruisseau. Il adore les carottes.",
      ur: "ایک خوبصورت اونٹ پہاڑ پر چلتا ہے۔ ندی کے کنارے بیٹھتا ہے۔ اسے گاجر بہت پسند ہے۔",
      id: "Seekor unta yang indah berjalan di gunung. Dia duduk di tepi sungai kecil. Dia sangat suka wortel.",
    },
    keywords: [
      {
        word: "جَمَل",
        meaning: { en: "Camel", tr: "Deve", fr: "Chameau", ur: "اونٹ", id: "Unta" },
      },
      {
        word: "جَبَل",
        meaning: { en: "Mountain", tr: "Dag", fr: "Montagne", ur: "پہاڑ", id: "Gunung" },
      },
      {
        word: "جَدْوَل",
        meaning: { en: "Stream", tr: "Dere", fr: "Ruisseau", ur: "ندی", id: "Sungai kecil" },
      },
      {
        word: "جَزَر",
        meaning: { en: "Carrots", tr: "Havuc", fr: "Carottes", ur: "گاجر", id: "Wortel" },
      },
    ],
    illustration: "🐫",
  },

  // 6. ح - Ha
  {
    letterId: "haa",
    letter: "ح",
    titleAr: "حَدِيقَةُ الحَيَوَانَاتِ",
    title: {
      en: "The Animal Garden",
      tr: "Hayvanat Bahcesi",
      fr: "Le Jardin des Animaux",
      ur: "چڑیا گھر",
      id: "Kebun Binatang",
    },
    storyAr: "حَسَنٌ يَذْهَبُ إِلَى حَدِيقَةِ الحَيَوَانَاتِ. يَرَى حِصَانًا وَحَمَامَةً. الحَدِيقَةُ حُلْوَةٌ وَجَمِيلَةٌ.",
    storyTranslation: {
      en: "Hasan goes to the animal garden. He sees a horse and a dove. The garden is lovely and beautiful.",
      tr: "Hasan hayvanat bahcesine gidiyor. Bir at ve bir guvercin goruyor. Bahce hos ve guzel.",
      fr: "Hasan va au jardin des animaux. Il voit un cheval et une colombe. Le jardin est joli et beau.",
      ur: "حسن چڑیا گھر جاتا ہے۔ وہ ایک گھوڑا اور کبوتر دیکھتا ہے۔ باغ خوبصورت اور پیارا ہے۔",
      id: "Hasan pergi ke kebun binatang. Dia melihat kuda dan merpati. Taman itu indah dan cantik.",
    },
    keywords: [
      {
        word: "حَدِيقَة",
        meaning: { en: "Garden", tr: "Bahce", fr: "Jardin", ur: "باغ", id: "Taman" },
      },
      {
        word: "حَيَوَانَات",
        meaning: { en: "Animals", tr: "Hayvanlar", fr: "Animaux", ur: "جانور", id: "Binatang" },
      },
      {
        word: "حِصَان",
        meaning: { en: "Horse", tr: "At", fr: "Cheval", ur: "گھوڑا", id: "Kuda" },
      },
      {
        word: "حَمَامَة",
        meaning: { en: "Dove", tr: "Guvercin", fr: "Colombe", ur: "کبوتر", id: "Merpati" },
      },
    ],
    illustration: "🐴",
  },

  // 7. خ - Kha
  {
    letterId: "khaa",
    letter: "خ",
    titleAr: "خُبْزٌ فِي المَخْبَزِ",
    title: {
      en: "Bread at the Bakery",
      tr: "Firindan Ekmek",
      fr: "Du Pain a la Boulangerie",
      ur: "بیکری میں روٹی",
      id: "Roti di Toko Roti",
    },
    storyAr: "خَالِدٌ يَشْتَرِي خُبْزًا مِنَ المَخْبَزِ. الخُبْزُ طَازَجٌ وَخَفِيفٌ. يَأْخُذُهُ إِلَى الخَيْمَةِ.",
    storyTranslation: {
      en: "Khalid buys bread from the bakery. The bread is fresh and light. He takes it to the tent.",
      tr: "Halid firindan ekmek aliyor. Ekmek taze ve hafif. Onu cadira goturuyor.",
      fr: "Khalid achete du pain a la boulangerie. Le pain est frais et leger. Il l'emmene a la tente.",
      ur: "خالد بیکری سے روٹی خریدتا ہے۔ روٹی تازہ اور ہلکی ہے۔ وہ اسے خیمے میں لے جاتا ہے۔",
      id: "Khalid membeli roti dari toko roti. Rotinya segar dan ringan. Dia membawanya ke tenda.",
    },
    keywords: [
      {
        word: "خُبْز",
        meaning: { en: "Bread", tr: "Ekmek", fr: "Pain", ur: "روٹی", id: "Roti" },
      },
      {
        word: "خَالِد",
        meaning: { en: "Khalid", tr: "Halid", fr: "Khalid", ur: "خالد", id: "Khalid" },
      },
      {
        word: "مَخْبَز",
        meaning: { en: "Bakery", tr: "Firin", fr: "Boulangerie", ur: "بیکری", id: "Toko roti" },
      },
      {
        word: "خَيْمَة",
        meaning: { en: "Tent", tr: "Cadir", fr: "Tente", ur: "خیمہ", id: "Tenda" },
      },
    ],
    illustration: "🍞",
  },

  // 8. د - Dal
  {
    letterId: "daal",
    letter: "د",
    titleAr: "دُبٌّ فِي الدَّارِ",
    title: {
      en: "A Bear in the House",
      tr: "Evdeki Ayi",
      fr: "Un Ours dans la Maison",
      ur: "گھر میں ریچھ",
      id: "Beruang di Rumah",
    },
    storyAr: "دُبٌّ صَغِيرٌ يَدْخُلُ الدَّارَ. يَجِدُ دَفْتَرًا وَدَوَاةً. يَرْسُمُ دَجَاجَةً عَلَى الدَّفْتَرِ.",
    storyTranslation: {
      en: "A little bear enters the house. He finds a notebook and an inkwell. He draws a chicken on the notebook.",
      tr: "Kucuk bir ayi eve giriyor. Bir defter ve bir hokka buluyor. Deftere bir tavuk ciziyor.",
      fr: "Un petit ours entre dans la maison. Il trouve un cahier et un encrier. Il dessine un poulet sur le cahier.",
      ur: "ایک چھوٹا ریچھ گھر میں داخل ہوتا ہے۔ اسے ایک کاپی اور دوات ملتی ہے۔ وہ کاپی پر مرغی بناتا ہے۔",
      id: "Beruang kecil masuk ke rumah. Dia menemukan buku tulis dan tempat tinta. Dia menggambar ayam di buku tulis.",
    },
    keywords: [
      {
        word: "دُبّ",
        meaning: { en: "Bear", tr: "Ayi", fr: "Ours", ur: "ریچھ", id: "Beruang" },
      },
      {
        word: "دَار",
        meaning: { en: "House", tr: "Ev", fr: "Maison", ur: "گھر", id: "Rumah" },
      },
      {
        word: "دَفْتَر",
        meaning: { en: "Notebook", tr: "Defter", fr: "Cahier", ur: "کاپی", id: "Buku tulis" },
      },
      {
        word: "دَجَاجَة",
        meaning: { en: "Chicken", tr: "Tavuk", fr: "Poulet", ur: "مرغی", id: "Ayam" },
      },
    ],
    illustration: "🐻",
  },

  // 9. ذ - Dhal
  {
    letterId: "dhaal",
    letter: "ذ",
    titleAr: "ذَهَبٌ فِي الذَّاكِرَةِ",
    title: {
      en: "Gold in Memory",
      tr: "Hafizadaki Altin",
      fr: "De l'Or dans la Memoire",
      ur: "یاد میں سونا",
      id: "Emas dalam Ingatan",
    },
    storyAr: "ذَهَبَ ذِئْبٌ إِلَى الذُّرَةِ. وَجَدَ ذَهَبًا لَامِعًا. تَذَكَّرَ ذَلِكَ إِلَى الأَبَدِ.",
    storyTranslation: {
      en: "A wolf went to the cornfield. He found shiny gold. He remembered that forever.",
      tr: "Bir kurt misir tarlasina gitti. Parlak bir altin buldu. Bunu sonsuza dek hatirladi.",
      fr: "Un loup est alle au champ de mais. Il a trouve de l'or brillant. Il s'en est souvenu pour toujours.",
      ur: "ایک بھیڑیا مکئی کے کھیت میں گیا۔ اسے چمکدار سونا ملا۔ اس نے یہ ہمیشہ یاد رکھا۔",
      id: "Seekor serigala pergi ke ladang jagung. Dia menemukan emas berkilau. Dia mengingatnya selamanya.",
    },
    keywords: [
      {
        word: "ذَهَب",
        meaning: { en: "Gold", tr: "Altin", fr: "Or", ur: "سونا", id: "Emas" },
      },
      {
        word: "ذِئْب",
        meaning: { en: "Wolf", tr: "Kurt", fr: "Loup", ur: "بھیڑیا", id: "Serigala" },
      },
      {
        word: "ذُرَة",
        meaning: { en: "Corn", tr: "Misir", fr: "Mais", ur: "مکئی", id: "Jagung" },
      },
      {
        word: "ذَاكِرَة",
        meaning: { en: "Memory", tr: "Hafiza", fr: "Memoire", ur: "یاد", id: "Ingatan" },
      },
    ],
    illustration: "✨",
  },

  // 10. ر - Ra
  {
    letterId: "raa",
    letter: "ر",
    titleAr: "رَحْلَةٌ إِلَى الرِّيفِ",
    title: {
      en: "A Trip to the Countryside",
      tr: "Kirsal Kesime Gezi",
      fr: "Un Voyage a la Campagne",
      ur: "دیہات کا سفر",
      id: "Perjalanan ke Pedesaan",
    },
    storyAr: "رَامِي يُسَافِرُ إِلَى الرِّيفِ. يَرَى رُمَّانًا وَوَرْدًا. يَرْكَبُ الرَّاحِلَةَ مَعَ رِفَاقِهِ.",
    storyTranslation: {
      en: "Rami travels to the countryside. He sees pomegranates and roses. He rides the camel with his companions.",
      tr: "Rami kirsal kesime seyahat ediyor. Nar ve gul goruyor. Arkadaslariyla deveye biniyor.",
      fr: "Rami voyage a la campagne. Il voit des grenades et des roses. Il monte le chameau avec ses compagnons.",
      ur: "رامی دیہات کا سفر کرتا ہے۔ وہ انار اور گلاب دیکھتا ہے۔ وہ اپنے ساتھیوں کے ساتھ اونٹ پر سوار ہوتا ہے۔",
      id: "Rami bepergian ke pedesaan. Dia melihat delima dan mawar. Dia naik unta bersama teman-temannya.",
    },
    keywords: [
      {
        word: "رِيف",
        meaning: { en: "Countryside", tr: "Kirsal", fr: "Campagne", ur: "دیہات", id: "Pedesaan" },
      },
      {
        word: "رُمَّان",
        meaning: { en: "Pomegranate", tr: "Nar", fr: "Grenade", ur: "انار", id: "Delima" },
      },
      {
        word: "وَرْد",
        meaning: { en: "Roses", tr: "Gul", fr: "Roses", ur: "گلاب", id: "Mawar" },
      },
      {
        word: "رَاحِلَة",
        meaning: { en: "Riding camel", tr: "Binek devesi", fr: "Chameau de monte", ur: "سواری کا اونٹ", id: "Unta tunggang" },
      },
    ],
    illustration: "🌹",
  },

  // 11. ز - Zay
  {
    letterId: "zaay",
    letter: "ز",
    titleAr: "زَهْرَةٌ فِي الزِّرَاعَةِ",
    title: {
      en: "A Flower in the Farm",
      tr: "Ciftlikteki Cicek",
      fr: "Une Fleur dans la Ferme",
      ur: "کھیت میں پھول",
      id: "Bunga di Pertanian",
    },
    storyAr: "زَيْنَبُ تَزْرَعُ زَهْرَةً فِي الحَدِيقَةِ. الزَّهْرَةُ زَرْقَاءُ وَجَمِيلَةٌ. تَزُورُهَا كُلَّ يَوْمٍ بَعْدَ الزَّوَالِ.",
    storyTranslation: {
      en: "Zaynab plants a flower in the garden. The flower is blue and beautiful. She visits it every day after noon.",
      tr: "Zeynep bahceye bir cicek ekiyor. Cicek mavi ve guzel. Her gun ogleden sonra onu ziyaret ediyor.",
      fr: "Zaynab plante une fleur dans le jardin. La fleur est bleue et belle. Elle la visite chaque jour apres midi.",
      ur: "زینب باغ میں پھول لگاتی ہے۔ پھول نیلا اور خوبصورت ہے۔ وہ ہر روز دوپہر کے بعد اسے دیکھنے آتی ہے۔",
      id: "Zaynab menanam bunga di taman. Bunganya biru dan indah. Dia mengunjunginya setiap hari setelah siang.",
    },
    keywords: [
      {
        word: "زَهْرَة",
        meaning: { en: "Flower", tr: "Cicek", fr: "Fleur", ur: "پھول", id: "Bunga" },
      },
      {
        word: "زَيْنَب",
        meaning: { en: "Zaynab", tr: "Zeynep", fr: "Zaynab", ur: "زینب", id: "Zaynab" },
      },
      {
        word: "زَرْقَاء",
        meaning: { en: "Blue", tr: "Mavi", fr: "Bleu", ur: "نیلا", id: "Biru" },
      },
      {
        word: "زِرَاعَة",
        meaning: { en: "Farming", tr: "Tarim", fr: "Agriculture", ur: "کھیتی باڑی", id: "Pertanian" },
      },
    ],
    illustration: "🌸",
  },

  // 12. س - Sin
  {
    letterId: "siin",
    letter: "س",
    titleAr: "سَمَكَةٌ فِي السُّوقِ",
    title: {
      en: "A Fish at the Market",
      tr: "Pazardaki Balik",
      fr: "Un Poisson au Marche",
      ur: "بازار میں مچھلی",
      id: "Ikan di Pasar",
    },
    storyAr: "سَارَةُ تَذْهَبُ إِلَى السُّوقِ. تَشْتَرِي سَمَكَةً وَسَبَانِخَ. تَطْبُخُ سَلَطَةً لَذِيذَةً.",
    storyTranslation: {
      en: "Sarah goes to the market. She buys a fish and spinach. She cooks a delicious salad.",
      tr: "Sara pazara gidiyor. Balik ve ispanak aliyor. Lezzetli bir salata yapiyor.",
      fr: "Sarah va au marche. Elle achete un poisson et des epinards. Elle prepare une salade delicieuse.",
      ur: "سارہ بازار جاتی ہے۔ وہ مچھلی اور پالک خریدتی ہے۔ وہ مزیدار سلاد بناتی ہے۔",
      id: "Sarah pergi ke pasar. Dia membeli ikan dan bayam. Dia memasak salad yang lezat.",
    },
    keywords: [
      {
        word: "سَمَكَة",
        meaning: { en: "Fish", tr: "Balik", fr: "Poisson", ur: "مچھلی", id: "Ikan" },
      },
      {
        word: "سُوق",
        meaning: { en: "Market", tr: "Pazar", fr: "Marche", ur: "بازار", id: "Pasar" },
      },
      {
        word: "سَبَانِخ",
        meaning: { en: "Spinach", tr: "Ispanak", fr: "Epinards", ur: "پالک", id: "Bayam" },
      },
      {
        word: "سَلَطَة",
        meaning: { en: "Salad", tr: "Salata", fr: "Salade", ur: "سلاد", id: "Salad" },
      },
    ],
    illustration: "🐟",
  },

  // 13. ش - Shin
  {
    letterId: "shiin",
    letter: "ش",
    titleAr: "شَمْسٌ وَشَجَرَةٌ",
    title: {
      en: "Sun and Tree",
      tr: "Gunes ve Agac",
      fr: "Soleil et Arbre",
      ur: "سورج اور درخت",
      id: "Matahari dan Pohon",
    },
    storyAr: "الشَّمْسُ تُشْرِقُ عَلَى الشَّجَرَةِ. الشَّجَرَةُ فِي الشَّارِعِ. يَشْرَبُ النَّاسُ الشَّايَ تَحْتَهَا.",
    storyTranslation: {
      en: "The sun shines on the tree. The tree is on the street. People drink tea under it.",
      tr: "Gunes agacin uzerine doguyor. Agac sokakta. Insanlar altinda cay iciyor.",
      fr: "Le soleil brille sur l'arbre. L'arbre est dans la rue. Les gens boivent du the dessous.",
      ur: "سورج درخت پر چمکتا ہے۔ درخت سڑک پر ہے۔ لوگ اس کے نیچے چائے پیتے ہیں۔",
      id: "Matahari bersinar di atas pohon. Pohon itu di jalan. Orang-orang minum teh di bawahnya.",
    },
    keywords: [
      {
        word: "شَمْس",
        meaning: { en: "Sun", tr: "Gunes", fr: "Soleil", ur: "سورج", id: "Matahari" },
      },
      {
        word: "شَجَرَة",
        meaning: { en: "Tree", tr: "Agac", fr: "Arbre", ur: "درخت", id: "Pohon" },
      },
      {
        word: "شَارِع",
        meaning: { en: "Street", tr: "Sokak", fr: "Rue", ur: "سڑک", id: "Jalan" },
      },
      {
        word: "شَاي",
        meaning: { en: "Tea", tr: "Cay", fr: "The", ur: "چائے", id: "Teh" },
      },
    ],
    illustration: "☀️",
  },

  // 14. ص - Sad
  {
    letterId: "saad",
    letter: "ص",
    titleAr: "صَقْرٌ فِي الصَّحْرَاءِ",
    title: {
      en: "A Falcon in the Desert",
      tr: "Colde Bir Sahin",
      fr: "Un Faucon dans le Desert",
      ur: "صحرا میں باز",
      id: "Elang di Gurun",
    },
    storyAr: "صَقْرٌ يَطِيرُ فِي الصَّحْرَاءِ. يَصْطَادُ قُرْبَ الصُّخُورِ. الصَّقْرُ صَبُورٌ وَصَادِقٌ.",
    storyTranslation: {
      en: "A falcon flies in the desert. It hunts near the rocks. The falcon is patient and truthful.",
      tr: "Bir sahin colde ucuyor. Kayalarin yakininda av avliyor. Sahin sabirl ve guvenilir.",
      fr: "Un faucon vole dans le desert. Il chasse pres des rochers. Le faucon est patient et fidele.",
      ur: "ایک باز صحرا میں اڑتا ہے۔ چٹانوں کے قریب شکار کرتا ہے۔ باز صبر کرنے والا اور سچا ہے۔",
      id: "Seekor elang terbang di gurun. Dia berburu di dekat batu-batu. Elang itu sabar dan jujur.",
    },
    keywords: [
      {
        word: "صَقْر",
        meaning: { en: "Falcon", tr: "Sahin", fr: "Faucon", ur: "باز", id: "Elang" },
      },
      {
        word: "صَحْرَاء",
        meaning: { en: "Desert", tr: "Col", fr: "Desert", ur: "صحرا", id: "Gurun" },
      },
      {
        word: "صُخُور",
        meaning: { en: "Rocks", tr: "Kayalar", fr: "Rochers", ur: "چٹانیں", id: "Batu-batu" },
      },
      {
        word: "صَبُور",
        meaning: { en: "Patient", tr: "Sabirl", fr: "Patient", ur: "صابر", id: "Sabar" },
      },
    ],
    illustration: "🦅",
  },

  // 15. ض - Dad
  {
    letterId: "daad",
    letter: "ض",
    titleAr: "ضِفْدَعٌ فِي الضَّوْءِ",
    title: {
      en: "A Frog in the Light",
      tr: "Isikta Bir Kurbaga",
      fr: "Une Grenouille dans la Lumiere",
      ur: "روشنی میں مینڈک",
      id: "Katak di Cahaya",
    },
    storyAr: "ضِفْدَعٌ صَغِيرٌ يَقْفِزُ فِي الضَّوْءِ. يُضْحِكُ الأَطْفَالَ بِحَرَكَاتِهِ. الأَرْضُ خَضْرَاءُ حَوْلَهُ.",
    storyTranslation: {
      en: "A little frog jumps in the light. It makes the children laugh with its moves. The ground is green around it.",
      tr: "Kucuk bir kurbaga isikta zipliyor. Hareketleriyle cocuklari gulduruyor. Etrafindaki toprak yemyesil.",
      fr: "Une petite grenouille saute dans la lumiere. Elle fait rire les enfants avec ses mouvements. Le sol est vert autour d'elle.",
      ur: "ایک چھوٹا مینڈک روشنی میں کودتا ہے۔ اپنی حرکتوں سے بچوں کو ہنساتا ہے۔ اس کے ارد گرد زمین سبز ہے۔",
      id: "Seekor katak kecil melompat di cahaya. Dia membuat anak-anak tertawa dengan gerakannya. Tanah di sekitarnya hijau.",
    },
    keywords: [
      {
        word: "ضِفْدَع",
        meaning: { en: "Frog", tr: "Kurbaga", fr: "Grenouille", ur: "مینڈک", id: "Katak" },
      },
      {
        word: "ضَوْء",
        meaning: { en: "Light", tr: "Isik", fr: "Lumiere", ur: "روشنی", id: "Cahaya" },
      },
      {
        word: "أَرْض",
        meaning: { en: "Ground/Earth", tr: "Toprak", fr: "Terre", ur: "زمین", id: "Tanah" },
      },
      {
        word: "خَضْرَاء",
        meaning: { en: "Green", tr: "Yesil", fr: "Vert", ur: "سبز", id: "Hijau" },
      },
    ],
    illustration: "🐸",
  },

  // 16. ط - Taa
  {
    letterId: "taa_m",
    letter: "ط",
    titleAr: "طَبَّاخٌ يَطْبُخُ الطَّعَامَ",
    title: {
      en: "A Cook Prepares Food",
      tr: "Bir Asci Yemek Hazirlyor",
      fr: "Un Cuisinier Prepare le Repas",
      ur: "باورچی کھانا پکاتا ہے",
      id: "Koki Memasak Makanan",
    },
    storyAr: "الطَّبَّاخُ يَطْبُخُ طَعَامًا لَذِيذًا. يَقْطَعُ الطَّمَاطِمَ عَلَى الطَّاوِلَةِ. الطُّيُورُ تُغَرِّدُ حَوْلَ المَطْبَخِ.",
    storyTranslation: {
      en: "The cook prepares delicious food. He cuts tomatoes on the table. The birds sing around the kitchen.",
      tr: "Asci lezzetli yemek pisiyor. Masada domates kesiyor. Kuslar mutfagin etrafinda sakiryor.",
      fr: "Le cuisinier prepare un repas delicieux. Il coupe les tomates sur la table. Les oiseaux chantent autour de la cuisine.",
      ur: "باورچی لذیذ کھانا پکاتا ہے۔ وہ میز پر ٹماٹر کاٹتا ہے۔ پرندے باورچی خانے کے ارد گرد چہچہاتے ہیں۔",
      id: "Koki memasak makanan yang lezat. Dia memotong tomat di atas meja. Burung-burung berkicau di sekitar dapur.",
    },
    keywords: [
      {
        word: "طَبَّاخ",
        meaning: { en: "Cook", tr: "Asci", fr: "Cuisinier", ur: "باورچی", id: "Koki" },
      },
      {
        word: "طَعَام",
        meaning: { en: "Food", tr: "Yemek", fr: "Nourriture", ur: "کھانا", id: "Makanan" },
      },
      {
        word: "طَمَاطِم",
        meaning: { en: "Tomatoes", tr: "Domates", fr: "Tomates", ur: "ٹماٹر", id: "Tomat" },
      },
      {
        word: "طَاوِلَة",
        meaning: { en: "Table", tr: "Masa", fr: "Table", ur: "میز", id: "Meja" },
      },
    ],
    illustration: "👨‍🍳",
  },

  // 17. ظ - Dha
  {
    letterId: "dhaa",
    letter: "ظ",
    titleAr: "ظِلٌّ تَحْتَ الظَّهِيرَةِ",
    title: {
      en: "Shade Under the Noon Sun",
      tr: "Oglen Golgesi",
      fr: "Ombre sous le Soleil de Midi",
      ur: "دوپہر کا سایہ",
      id: "Bayangan di Siang Hari",
    },
    storyAr: "فِي وَقْتِ الظَّهِيرَةِ يَجْلِسُ الظَّبْيُ فِي الظِّلِّ. يَنْتَظِرُ حَتَّى يَظْهَرَ القَمَرُ. الظِّلُّ يَحْفَظُهُ مِنَ الحَرِّ.",
    storyTranslation: {
      en: "At noon the gazelle sits in the shade. It waits until the moon appears. The shade protects it from the heat.",
      tr: "Oglen vakti ceylan golgeleniyor. Ayin dogmasini bekliyor. Golge onu sicaktan koruyor.",
      fr: "A midi la gazelle s'assoit a l'ombre. Elle attend que la lune apparaisse. L'ombre la protege de la chaleur.",
      ur: "دوپہر کے وقت ہرن سائے میں بیٹھتا ہے۔ چاند نکلنے تک انتظار کرتا ہے۔ سایہ اسے گرمی سے بچاتا ہے۔",
      id: "Saat siang kijang duduk di bayangan. Dia menunggu sampai bulan muncul. Bayangan melindunginya dari panas.",
    },
    keywords: [
      {
        word: "ظِلّ",
        meaning: { en: "Shade/Shadow", tr: "Golge", fr: "Ombre", ur: "سایہ", id: "Bayangan" },
      },
      {
        word: "ظَهِيرَة",
        meaning: { en: "Noon", tr: "Oglen", fr: "Midi", ur: "دوپہر", id: "Siang" },
      },
      {
        word: "ظَبْي",
        meaning: { en: "Gazelle", tr: "Ceylan", fr: "Gazelle", ur: "ہرن", id: "Kijang" },
      },
      {
        word: "يَنْتَظِر",
        meaning: { en: "Waits", tr: "Bekler", fr: "Attend", ur: "انتظار کرتا ہے", id: "Menunggu" },
      },
    ],
    illustration: "🦌",
  },

  // 18. ع - Ayn
  {
    letterId: "ayn",
    letter: "ع",
    titleAr: "عُصْفُورٌ فِي العُشِّ",
    title: {
      en: "A Bird in the Nest",
      tr: "Yuvadaki Kus",
      fr: "Un Oiseau dans le Nid",
      ur: "گھونسلے میں چڑیا",
      id: "Burung di Sarang",
    },
    storyAr: "عُصْفُورٌ صَغِيرٌ يَعِيشُ فِي العُشِّ. يَأْكُلُ العِنَبَ وَالعَسَلَ. يُعَلِّمُ أَبْنَاءَهُ العِلْمَ.",
    storyTranslation: {
      en: "A little bird lives in the nest. It eats grapes and honey. It teaches its children knowledge.",
      tr: "Kucuk bir kus yuvada yasiyor. Uzum ve bal yiyor. Yavrularina bilgi ogretiyor.",
      fr: "Un petit oiseau vit dans le nid. Il mange du raisin et du miel. Il enseigne le savoir a ses petits.",
      ur: "ایک چھوٹی چڑیا گھونسلے میں رہتی ہے۔ وہ انگور اور شہد کھاتی ہے۔ اپنے بچوں کو علم سکھاتی ہے۔",
      id: "Seekor burung kecil tinggal di sarang. Dia makan anggur dan madu. Dia mengajarkan ilmu kepada anak-anaknya.",
    },
    keywords: [
      {
        word: "عُصْفُور",
        meaning: { en: "Bird", tr: "Kus", fr: "Oiseau", ur: "چڑیا", id: "Burung" },
      },
      {
        word: "عُشّ",
        meaning: { en: "Nest", tr: "Yuva", fr: "Nid", ur: "گھونسلا", id: "Sarang" },
      },
      {
        word: "عِنَب",
        meaning: { en: "Grapes", tr: "Uzum", fr: "Raisin", ur: "انگور", id: "Anggur" },
      },
      {
        word: "عَسَل",
        meaning: { en: "Honey", tr: "Bal", fr: "Miel", ur: "شہد", id: "Madu" },
      },
    ],
    illustration: "🐦",
  },

  // 19. غ - Ghayn
  {
    letterId: "ghayn",
    letter: "غ",
    titleAr: "غُرَابٌ فِي الغَابَةِ",
    title: {
      en: "A Crow in the Forest",
      tr: "Ormandaki Karga",
      fr: "Un Corbeau dans la Foret",
      ur: "جنگل میں کوا",
      id: "Gagak di Hutan",
    },
    storyAr: "غُرَابٌ يَطِيرُ فِي الغَابَةِ. يَبْحَثُ عَنْ غِذَاءٍ بَيْنَ الأَغْصَانِ. يُغَنِّي أُغْنِيَّةً جَمِيلَةً عِنْدَ الغُرُوبِ.",
    storyTranslation: {
      en: "A crow flies in the forest. It searches for food among the branches. It sings a beautiful song at sunset.",
      tr: "Bir karga ormanda ucuyor. Dallar arasinda yiyecek ariyor. Gun batiminda guzel bir sarki soyluyor.",
      fr: "Un corbeau vole dans la foret. Il cherche de la nourriture parmi les branches. Il chante une belle chanson au coucher du soleil.",
      ur: "ایک کوا جنگل میں اڑتا ہے۔ شاخوں میں کھانا تلاش کرتا ہے۔ غروب آفتاب پر خوبصورت گانا گاتا ہے۔",
      id: "Seekor gagak terbang di hutan. Dia mencari makanan di antara dahan. Dia menyanyikan lagu yang indah saat matahari terbenam.",
    },
    keywords: [
      {
        word: "غُرَاب",
        meaning: { en: "Crow", tr: "Karga", fr: "Corbeau", ur: "کوا", id: "Gagak" },
      },
      {
        word: "غَابَة",
        meaning: { en: "Forest", tr: "Orman", fr: "Foret", ur: "جنگل", id: "Hutan" },
      },
      {
        word: "غِذَاء",
        meaning: { en: "Food/Nourishment", tr: "Besin", fr: "Nourriture", ur: "غذا", id: "Makanan" },
      },
      {
        word: "غُرُوب",
        meaning: { en: "Sunset", tr: "Gun batimi", fr: "Coucher du soleil", ur: "غروب", id: "Matahari terbenam" },
      },
    ],
    illustration: "🌲",
  },

  // 20. ف - Fa
  {
    letterId: "faa",
    letter: "ف",
    titleAr: "فَرَاشَةٌ فِي الفَجْرِ",
    title: {
      en: "A Butterfly at Dawn",
      tr: "Safakta Kelebek",
      fr: "Un Papillon a l'Aube",
      ur: "فجر میں تتلی",
      id: "Kupu-kupu di Fajar",
    },
    storyAr: "فَرَاشَةٌ جَمِيلَةٌ تَطِيرُ فِي الفَجْرِ. تَقِفُ عَلَى الفَوَاكِهِ فِي الفِنَاءِ. فَرِحَتْ فَاطِمَةُ بِرُؤْيَتِهَا.",
    storyTranslation: {
      en: "A beautiful butterfly flies at dawn. It lands on the fruits in the courtyard. Fatima is happy to see it.",
      tr: "Guzel bir kelebek safakta ucuyor. Avludaki meyvelerin uzerine konuyor. Fatma onu gorunce seviniyor.",
      fr: "Un beau papillon vole a l'aube. Il se pose sur les fruits dans la cour. Fatima est heureuse de le voir.",
      ur: "ایک خوبصورت تتلی فجر میں اڑتی ہے۔ صحن میں پھلوں پر بیٹھتی ہے۔ فاطمہ اسے دیکھ کر خوش ہوتی ہے۔",
      id: "Seekor kupu-kupu cantik terbang di fajar. Dia hinggap di buah-buahan di halaman. Fatimah senang melihatnya.",
    },
    keywords: [
      {
        word: "فَرَاشَة",
        meaning: { en: "Butterfly", tr: "Kelebek", fr: "Papillon", ur: "تتلی", id: "Kupu-kupu" },
      },
      {
        word: "فَجْر",
        meaning: { en: "Dawn", tr: "Safak", fr: "Aube", ur: "فجر", id: "Fajar" },
      },
      {
        word: "فَوَاكِه",
        meaning: { en: "Fruits", tr: "Meyveler", fr: "Fruits", ur: "پھل", id: "Buah-buahan" },
      },
      {
        word: "فِنَاء",
        meaning: { en: "Courtyard", tr: "Avlu", fr: "Cour", ur: "صحن", id: "Halaman" },
      },
    ],
    illustration: "🦋",
  },

  // 21. ق - Qaf
  {
    letterId: "qaaf",
    letter: "ق",
    titleAr: "قِطَّةٌ تَحْتَ القَمَرِ",
    title: {
      en: "A Cat Under the Moon",
      tr: "Ayin Altindaki Kedi",
      fr: "Un Chat sous la Lune",
      ur: "چاند کے نیچے بلی",
      id: "Kucing di Bawah Bulan",
    },
    storyAr: "قِطَّةٌ تَجْلِسُ تَحْتَ القَمَرِ. تَقْرَأُ قِصَّةً قَصِيرَةً. تَقْفِزُ بِقُرْبِ القَلْعَةِ القَدِيمَةِ.",
    storyTranslation: {
      en: "A cat sits under the moon. She reads a short story. She jumps near the old castle.",
      tr: "Bir kedi ayin altinda oturuyor. Kisa bir hikaye okuyor. Eski kalenin yakininda zipliyor.",
      fr: "Un chat est assis sous la lune. Il lit une courte histoire. Il saute pres du vieux chateau.",
      ur: "ایک بلی چاند کے نیچے بیٹھتی ہے۔ ایک چھوٹی کہانی پڑھتی ہے۔ پرانے قلعے کے قریب کودتی ہے۔",
      id: "Seekor kucing duduk di bawah bulan. Dia membaca cerita pendek. Dia melompat di dekat benteng tua.",
    },
    keywords: [
      {
        word: "قِطَّة",
        meaning: { en: "Cat", tr: "Kedi", fr: "Chat", ur: "بلی", id: "Kucing" },
      },
      {
        word: "قَمَر",
        meaning: { en: "Moon", tr: "Ay", fr: "Lune", ur: "چاند", id: "Bulan" },
      },
      {
        word: "قِصَّة",
        meaning: { en: "Story", tr: "Hikaye", fr: "Histoire", ur: "کہانی", id: "Cerita" },
      },
      {
        word: "قَلْعَة",
        meaning: { en: "Castle", tr: "Kale", fr: "Chateau", ur: "قلعہ", id: "Benteng" },
      },
    ],
    illustration: "🐱",
  },

  // 22. ك - Kaf
  {
    letterId: "kaaf",
    letter: "ك",
    titleAr: "كَلْبٌ يَكْتُبُ كِتَابًا",
    title: {
      en: "A Dog Writes a Book",
      tr: "Kitap Yazan Kopek",
      fr: "Un Chien Ecrit un Livre",
      ur: "کتاب لکھنے والا کتا",
      id: "Anjing Menulis Buku",
    },
    storyAr: "كَلْبٌ كَبِيرٌ يَكْتُبُ كِتَابًا. يَجْلِسُ عَلَى الكُرْسِيِّ فِي المَكْتَبَةِ. الكِتَابُ عَنِ الكَوَاكِبِ.",
    storyTranslation: {
      en: "A big dog writes a book. He sits on the chair in the library. The book is about planets.",
      tr: "Buyuk bir kopek kitap yaziyor. Kutuphanede sandalyede oturuyor. Kitap gezegenler hakkinda.",
      fr: "Un grand chien ecrit un livre. Il est assis sur la chaise dans la bibliotheque. Le livre parle des planetes.",
      ur: "ایک بڑا کتا کتاب لکھتا ہے۔ لائبریری میں کرسی پر بیٹھتا ہے۔ کتاب سیاروں کے بارے میں ہے۔",
      id: "Seekor anjing besar menulis buku. Dia duduk di kursi di perpustakaan. Bukunya tentang planet.",
    },
    keywords: [
      {
        word: "كَلْب",
        meaning: { en: "Dog", tr: "Kopek", fr: "Chien", ur: "کتا", id: "Anjing" },
      },
      {
        word: "كِتَاب",
        meaning: { en: "Book", tr: "Kitap", fr: "Livre", ur: "کتاب", id: "Buku" },
      },
      {
        word: "كُرْسِيّ",
        meaning: { en: "Chair", tr: "Sandalye", fr: "Chaise", ur: "کرسی", id: "Kursi" },
      },
      {
        word: "كَوَاكِب",
        meaning: { en: "Planets", tr: "Gezegenler", fr: "Planetes", ur: "سیارے", id: "Planet-planet" },
      },
    ],
    illustration: "🐕",
  },

  // 23. ل - Lam
  {
    letterId: "laam",
    letter: "ل",
    titleAr: "لَيْلَةٌ جَمِيلَةٌ",
    title: {
      en: "A Beautiful Night",
      tr: "Guzel Bir Gece",
      fr: "Une Belle Nuit",
      ur: "ایک خوبصورت رات",
      id: "Malam yang Indah",
    },
    storyAr: "لَيْلَى تَلْعَبُ فِي اللَّيْلِ. تَنْظُرُ إِلَى اللَّوْنِ الأَزْرَقِ لِلسَّمَاءِ. تَأْكُلُ اللَّوْزَ وَاللَّبَنَ.",
    storyTranslation: {
      en: "Layla plays at night. She looks at the blue color of the sky. She eats almonds and yogurt.",
      tr: "Leyla gece oynuyor. Gokyuzunun mavi rengine bakiyor. Badem ve yoğurt yiyor.",
      fr: "Layla joue la nuit. Elle regarde la couleur bleue du ciel. Elle mange des amandes et du yaourt.",
      ur: "لیلیٰ رات کو کھیلتی ہے۔ آسمان کے نیلے رنگ کو دیکھتی ہے۔ بادام اور دہی کھاتی ہے۔",
      id: "Layla bermain di malam hari. Dia melihat warna biru langit. Dia makan almond dan yoghurt.",
    },
    keywords: [
      {
        word: "لَيْل",
        meaning: { en: "Night", tr: "Gece", fr: "Nuit", ur: "رات", id: "Malam" },
      },
      {
        word: "لَوْن",
        meaning: { en: "Color", tr: "Renk", fr: "Couleur", ur: "رنگ", id: "Warna" },
      },
      {
        word: "لَوْز",
        meaning: { en: "Almonds", tr: "Badem", fr: "Amandes", ur: "بادام", id: "Almond" },
      },
      {
        word: "لَبَن",
        meaning: { en: "Yogurt/Milk", tr: "Yogurt", fr: "Yaourt", ur: "دہی", id: "Yoghurt" },
      },
    ],
    illustration: "🌙",
  },

  // 24. م - Mim
  {
    letterId: "miim",
    letter: "م",
    titleAr: "مَدْرَسَةٌ فِي المَدِينَةِ",
    title: {
      en: "A School in the City",
      tr: "Sehirdeki Okul",
      fr: "Une Ecole dans la Ville",
      ur: "شہر میں مدرسہ",
      id: "Sekolah di Kota",
    },
    storyAr: "مَرْيَمُ تَذْهَبُ إِلَى المَدْرَسَةِ فِي المَدِينَةِ. تَشْرَبُ المَاءَ وَتَأْكُلُ المَوْزَ. المُعَلِّمَةُ مُمْتَازَةٌ.",
    storyTranslation: {
      en: "Maryam goes to school in the city. She drinks water and eats bananas. The teacher is excellent.",
      tr: "Meryem sehirdeki okula gidiyor. Su iciyor ve muz yiyor. Ogretmen mukemmel.",
      fr: "Maryam va a l'ecole dans la ville. Elle boit de l'eau et mange des bananes. L'enseignante est excellente.",
      ur: "مریم شہر کے مدرسے میں جاتی ہے۔ پانی پیتی ہے اور کیلا کھاتی ہے۔ استانی بہترین ہے۔",
      id: "Maryam pergi ke sekolah di kota. Dia minum air dan makan pisang. Gurunya sangat baik.",
    },
    keywords: [
      {
        word: "مَدْرَسَة",
        meaning: { en: "School", tr: "Okul", fr: "Ecole", ur: "مدرسہ", id: "Sekolah" },
      },
      {
        word: "مَدِينَة",
        meaning: { en: "City", tr: "Sehir", fr: "Ville", ur: "شہر", id: "Kota" },
      },
      {
        word: "مَاء",
        meaning: { en: "Water", tr: "Su", fr: "Eau", ur: "پانی", id: "Air" },
      },
      {
        word: "مَوْز",
        meaning: { en: "Bananas", tr: "Muz", fr: "Bananes", ur: "کیلا", id: "Pisang" },
      },
    ],
    illustration: "🏫",
  },

  // 25. ن - Nun
  {
    letterId: "nuun",
    letter: "ن",
    titleAr: "نَحْلَةٌ فِي النَّهَارِ",
    title: {
      en: "A Bee During the Day",
      tr: "Gunduz Bir Ari",
      fr: "Une Abeille Pendant le Jour",
      ur: "دن میں ایک مکھی",
      id: "Lebah di Siang Hari",
    },
    storyAr: "نَحْلَةٌ تَطِيرُ فِي النَّهَارِ بَيْنَ النُّجُومِ. تَجْمَعُ النَّكْتَارَ مِنَ النَّبَاتَاتِ. النَّحْلَةُ نَشِيطَةٌ وَنَظِيفَةٌ.",
    storyTranslation: {
      en: "A bee flies during the day among the flowers. She collects nectar from the plants. The bee is active and clean.",
      tr: "Bir ari gunduz cicekler arasinda ucuyor. Bitkilerden nektar topluyor. Ari caliskan ve temiz.",
      fr: "Une abeille vole pendant le jour parmi les fleurs. Elle recueille le nectar des plantes. L'abeille est active et propre.",
      ur: "ایک مکھی دن میں پھولوں کے درمیان اڑتی ہے۔ پودوں سے شہد جمع کرتی ہے۔ مکھی فعال اور صاف ہے۔",
      id: "Seekor lebah terbang di siang hari di antara bunga. Dia mengumpulkan nektar dari tanaman. Lebah itu aktif dan bersih.",
    },
    keywords: [
      {
        word: "نَحْلَة",
        meaning: { en: "Bee", tr: "Ari", fr: "Abeille", ur: "مکھی", id: "Lebah" },
      },
      {
        word: "نَهَار",
        meaning: { en: "Day/Daytime", tr: "Gunduz", fr: "Jour", ur: "دن", id: "Siang" },
      },
      {
        word: "نَبَاتَات",
        meaning: { en: "Plants", tr: "Bitkiler", fr: "Plantes", ur: "پودے", id: "Tanaman" },
      },
      {
        word: "نَظِيفَة",
        meaning: { en: "Clean", tr: "Temiz", fr: "Propre", ur: "صاف", id: "Bersih" },
      },
    ],
    illustration: "🐝",
  },

  // 26. ه - Ha (light)
  {
    letterId: "haa_light",
    letter: "ه",
    titleAr: "هِرَّةٌ وَهَدِيَّةٌ",
    title: {
      en: "A Cat and a Gift",
      tr: "Bir Kedi ve Bir Hediye",
      fr: "Un Chat et un Cadeau",
      ur: "بلی اور تحفہ",
      id: "Kucing dan Hadiah",
    },
    storyAr: "هِنْدٌ لَدَيْهَا هِرَّةٌ. تُعْطِيهَا هَدِيَّةً جَمِيلَةً. الهِرَّةُ تُحِبُّ الهُدُوءَ وَالهَوَاءَ.",
    storyTranslation: {
      en: "Hind has a cat. She gives it a beautiful gift. The cat loves calmness and fresh air.",
      tr: "Hind'in bir kedisi var. Ona guzel bir hediye veriyor. Kedi sessizligi ve temiz havayi seviyor.",
      fr: "Hind a un chat. Elle lui offre un beau cadeau. Le chat aime le calme et l'air frais.",
      ur: "ہند کے پاس ایک بلی ہے۔ وہ اسے خوبصورت تحفہ دیتی ہے۔ بلی سکون اور تازی ہوا پسند کرتی ہے۔",
      id: "Hind punya seekor kucing. Dia memberinya hadiah yang indah. Kucing itu suka ketenangan dan udara segar.",
    },
    keywords: [
      {
        word: "هِرَّة",
        meaning: { en: "Cat", tr: "Kedi", fr: "Chat", ur: "بلی", id: "Kucing" },
      },
      {
        word: "هَدِيَّة",
        meaning: { en: "Gift", tr: "Hediye", fr: "Cadeau", ur: "تحفہ", id: "Hadiah" },
      },
      {
        word: "هُدُوء",
        meaning: { en: "Calmness", tr: "Sessizlik", fr: "Calme", ur: "سکون", id: "Ketenangan" },
      },
      {
        word: "هَوَاء",
        meaning: { en: "Air", tr: "Hava", fr: "Air", ur: "ہوا", id: "Udara" },
      },
    ],
    illustration: "🎁",
  },

  // 27. و - Waw
  {
    letterId: "waaw",
    letter: "و",
    titleAr: "وَلَدٌ وَوَرْدَةٌ",
    title: {
      en: "A Boy and a Rose",
      tr: "Bir Cocuk ve Bir Gul",
      fr: "Un Garcon et une Rose",
      ur: "ایک لڑکا اور ایک گلاب",
      id: "Anak Laki-laki dan Bunga Mawar",
    },
    storyAr: "وَلَدٌ يَقِفُ فِي الوَادِي. يَجِدُ وَرْدَةً جَمِيلَةً بِجَانِبِ الوَادِي. يَضَعُهَا فِي وِعَاءٍ بِالمَاءِ.",
    storyTranslation: {
      en: "A boy stands in the valley. He finds a beautiful rose by the valley. He puts it in a vase with water.",
      tr: "Bir cocuk vadide duruyor. Vadinin yanininda guzel bir gul buluyor. Onu suyla dolu bir vazoye koyuyor.",
      fr: "Un garcon se tient dans la vallee. Il trouve une belle rose pres de la vallee. Il la met dans un vase avec de l'eau.",
      ur: "ایک لڑکا وادی میں کھڑا ہے۔ اسے وادی کے کنارے خوبصورت گلاب ملتا ہے۔ وہ اسے پانی والے برتن میں رکھتا ہے۔",
      id: "Seorang anak laki-laki berdiri di lembah. Dia menemukan mawar cantik di tepi lembah. Dia meletakkannya di vas berisi air.",
    },
    keywords: [
      {
        word: "وَلَد",
        meaning: { en: "Boy", tr: "Cocuk", fr: "Garcon", ur: "لڑکا", id: "Anak laki-laki" },
      },
      {
        word: "وَرْدَة",
        meaning: { en: "Rose", tr: "Gul", fr: "Rose", ur: "گلاب", id: "Mawar" },
      },
      {
        word: "وَادِي",
        meaning: { en: "Valley", tr: "Vadi", fr: "Vallee", ur: "وادی", id: "Lembah" },
      },
      {
        word: "وِعَاء",
        meaning: { en: "Vase/Container", tr: "Vazo", fr: "Vase", ur: "برتن", id: "Vas" },
      },
    ],
    illustration: "🌷",
  },

  // 28. ي - Ya
  {
    letterId: "yaa",
    letter: "ي",
    titleAr: "يَمَامَةٌ فِي اليَمَنِ",
    title: {
      en: "A Dove in Yemen",
      tr: "Yemen'de Bir Guvercin",
      fr: "Une Colombe au Yemen",
      ur: "یمن میں ایک فاختہ",
      id: "Merpati di Yaman",
    },
    storyAr: "يَمَامَةٌ تَطِيرُ فِي اليَمَنِ. تَأْكُلُ اليَقْطِينَ فِي اليَوْمِ. يَدُهَا اليُمْنَى تَحْمِلُ اليَاسَمِينَ.",
    storyTranslation: {
      en: "A dove flies in Yemen. It eats pumpkin during the day. Its right hand carries jasmine.",
      tr: "Bir guvercin Yemen'de ucuyor. Gunduz balkabagi yiyor. Sag eli yasemin tasiyor.",
      fr: "Une colombe vole au Yemen. Elle mange de la citrouille pendant la journee. Sa main droite porte du jasmin.",
      ur: "ایک فاختہ یمن میں اڑتی ہے۔ دن میں کدو کھاتی ہے۔ اس کے دائیں ہاتھ میں چنبیلی ہے۔",
      id: "Seekor merpati terbang di Yaman. Dia makan labu di siang hari. Tangan kanannya membawa melati.",
    },
    keywords: [
      {
        word: "يَمَامَة",
        meaning: { en: "Dove", tr: "Guvercin", fr: "Colombe", ur: "فاختہ", id: "Merpati" },
      },
      {
        word: "يَوْم",
        meaning: { en: "Day", tr: "Gun", fr: "Jour", ur: "دن", id: "Hari" },
      },
      {
        word: "يَقْطِين",
        meaning: { en: "Pumpkin", tr: "Balkabagi", fr: "Citrouille", ur: "کدو", id: "Labu" },
      },
      {
        word: "يَاسَمِين",
        meaning: { en: "Jasmine", tr: "Yasemin", fr: "Jasmin", ur: "چنبیلی", id: "Melati" },
      },
    ],
    illustration: "🕊️",
  },
];

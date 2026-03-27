import { ArabicLetter, Locale, QuizQuestion } from "@/types";

const IDENTIFY_TEMPLATES: Record<Locale, (letter: ArabicLetter) => string> = {
  en: (l) => `Which letter is "${l.name}"?`,
  tr: (l) => `"${l.name}" hangi harftir?`,
  fr: (l) => `Quelle lettre est "${l.name}" ?`,
  ur: (l) => `"${l.name}" کون سا حرف ہے؟`,
  id: (l) => `Huruf mana yang "${l.name}"?`,
};

const SOUND_TEMPLATES: Record<Locale, (l: ArabicLetter) => string> = {
  en: (l) => `Which letter makes the sound: ${l.phonetic.en.split(" ")[0]}?`,
  tr: (l) => `Hangi harf bu sesi çıkarır: ${l.phonetic.tr.split(" ")[0]}?`,
  fr: (l) => `Quelle lettre produit le son: ${l.phonetic.fr.split(" ")[0]} ?`,
  ur: (l) => `کون سا حرف یہ آواز نکالتا ہے: ${l.phonetic.ur.split(" ")[0]}؟`,
  id: (l) => `Huruf mana yang menghasilkan bunyi: ${l.phonetic.id.split(" ")[0]}?`,
};

const MAKHRAJ_TEMPLATES: Record<Locale, (l: ArabicLetter) => string> = {
  en: (l) => `Where is the makhraj of ${l.letter} (${l.name})?`,
  tr: (l) => `${l.letter} (${l.name}) harfinin mahreci neresidir?`,
  fr: (l) => `Où est le makhraj de ${l.letter} (${l.name}) ?`,
  ur: (l) => `حرف ${l.letter} (${l.name}) کا مخرج کہاں ہے؟`,
  id: (l) => `Di mana makhraj huruf ${l.letter} (${l.name})?`,
};

const EXAMPLE_TEMPLATES: Record<Locale, (l: ArabicLetter) => string> = {
  en: (l) => `What does "${l.example}" mean?`,
  tr: (l) => `"${l.example}" ne demektir?`,
  fr: (l) => `Que signifie "${l.example}" ?`,
  ur: (l) => `"${l.example}" کا مطلب کیا ہے؟`,
  id: (l) => `Apa arti "${l.example}"?`,
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(letters: ArabicLetter[], target: ArabicLetter, count: number): ArabicLetter[] {
  return shuffle(letters.filter((l) => l.id !== target.id)).slice(0, count);
}

export function generateQuiz(letters: ArabicLetter[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  for (const letter of letters) {
    const distractors = pickDistractors(letters, letter, 3);

    // Q1: Identify letter by name
    const identifyOptions = shuffle([letter, ...distractors]);
    const identifyCorrect = identifyOptions.findIndex((l) => l.id === letter.id);
    questions.push({
      type: "identify",
      questionKey: `identify_${letter.id}`,
      question: {
        en: IDENTIFY_TEMPLATES.en(letter),
        tr: IDENTIFY_TEMPLATES.tr(letter),
        fr: IDENTIFY_TEMPLATES.fr(letter),
        ur: IDENTIFY_TEMPLATES.ur(letter),
        id: IDENTIFY_TEMPLATES.id(letter),
      },
      options: identifyOptions.map((l) => l.letter),
      correct: identifyCorrect,
    });

    // Q2: Makhraj question
    const makhrajOptions = shuffle([letter, ...distractors]);
    const makhrajCorrect = makhrajOptions.findIndex((l) => l.id === letter.id);
    questions.push({
      type: "makhraj",
      questionKey: `makhraj_${letter.id}`,
      question: {
        en: MAKHRAJ_TEMPLATES.en(letter),
        tr: MAKHRAJ_TEMPLATES.tr(letter),
        fr: MAKHRAJ_TEMPLATES.fr(letter),
        ur: MAKHRAJ_TEMPLATES.ur(letter),
        id: MAKHRAJ_TEMPLATES.id(letter),
      },
      localizedOptions: {
        en: makhrajOptions.map((l) => l.makhraj.en),
        tr: makhrajOptions.map((l) => l.makhraj.tr),
        fr: makhrajOptions.map((l) => l.makhraj.fr),
        ur: makhrajOptions.map((l) => l.makhraj.ur),
        id: makhrajOptions.map((l) => l.makhraj.id),
      },
      options: makhrajOptions.map((l) => l.makhraj.en),
      correct: makhrajCorrect,
    });
  }

  // Add some example meaning questions (pick 3 random letters)
  const exampleLetters = shuffle(letters).slice(0, Math.min(3, letters.length));
  for (const letter of exampleLetters) {
    const distractors = pickDistractors(letters, letter, 3);
    const options = shuffle([letter, ...distractors]);
    const correct = options.findIndex((l) => l.id === letter.id);
    questions.push({
      type: "match",
      questionKey: `example_${letter.id}`,
      question: {
        en: EXAMPLE_TEMPLATES.en(letter),
        tr: EXAMPLE_TEMPLATES.tr(letter),
        fr: EXAMPLE_TEMPLATES.fr(letter),
        ur: EXAMPLE_TEMPLATES.ur(letter),
        id: EXAMPLE_TEMPLATES.id(letter),
      },
      localizedOptions: {
        en: options.map((l) => l.exampleMeaning.en),
        tr: options.map((l) => l.exampleMeaning.tr),
        fr: options.map((l) => l.exampleMeaning.fr),
        ur: options.map((l) => l.exampleMeaning.ur),
        id: options.map((l) => l.exampleMeaning.id),
      },
      options: options.map((l) => l.exampleMeaning.en),
      correct,
    });
  }

  return shuffle(questions).slice(0, Math.min(10, questions.length));
}

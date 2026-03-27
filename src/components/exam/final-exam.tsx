"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Locale, QuizQuestion } from "@/types";
import { LETTERS } from "@/data/letters";
import { generateQuiz } from "@/data/quiz-banks";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  Printer,
  Award,
  AlertTriangle,
} from "lucide-react";

interface FinalExamProps {
  locale: string;
}

const UI_TEXT: Record<string, Record<string, string>> = {
  en: {
    title: "Final Exam",
    subtitle: "Comprehensive assessment of your Arabic letter knowledge",
    startExam: "Start Exam",
    timeRemaining: "Time Remaining",
    question: "Question",
    of: "of",
    submit: "Submit Exam",
    results: "Results",
    score: "Score",
    certificate: "Certificate of Completion",
    congratulations: "Congratulations!",
    downloadCertificate: "Download Certificate",
    printCertificate: "Print Certificate",
    enterName: "Enter your name for the certificate",
    studentName: "Student Name",
    completionDate: "Completion Date",
    passed: "You passed the exam!",
    failed: "You need 80% to pass. Keep practicing!",
    examInfo:
      "This exam covers all Arabic letters, tashkeel, and makhraj points. You have 30 minutes to complete 20 questions.",
    minutes: "minutes",
    reviewAnswers: "Review Answers",
    flagQuestion: "Flag for review",
    unflagQuestion: "Remove flag",
    answered: "Answered",
    unanswered: "Unanswered",
    flagged: "Flagged",
    confirmSubmit: "Are you sure you want to submit? You have unanswered questions.",
    timeUp: "Time is up!",
    category: "Category",
    identify: "Letter Identification",
    makhraj: "Makhraj Points",
    match: "Word Meaning",
  },
  tr: {
    title: "Final Sınav",
    subtitle: "Arapça harf bilginizin kapsamlı değerlendirmesi",
    startExam: "Sınava Başla",
    timeRemaining: "Kalan Süre",
    question: "Soru",
    of: "/",
    submit: "Sınavı Gönder",
    results: "Sonuçlar",
    score: "Puan",
    certificate: "Tamamlama Sertifikası",
    congratulations: "Tebrikler!",
    downloadCertificate: "Sertifikayı İndir",
    printCertificate: "Sertifikayı Yazdır",
    enterName: "Sertifika için adınızı girin",
    studentName: "Öğrenci Adı",
    completionDate: "Tamamlanma Tarihi",
    passed: "Sınavı geçtiniz!",
    failed: "Geçmek için %80 gereklidir. Pratik yapmaya devam edin!",
    examInfo:
      "Bu sınav tüm Arapça harfleri, teşkil ve mahreç noktalarını kapsar. 20 soruyu tamamlamak için 30 dakikanız var.",
    minutes: "dakika",
    reviewAnswers: "Cevapları İncele",
    flagQuestion: "İşaretle",
    unflagQuestion: "İşareti kaldır",
    answered: "Cevaplanmış",
    unanswered: "Cevaplanmamış",
    flagged: "İşaretli",
    confirmSubmit: "Göndermek istediğinizden emin misiniz? Cevaplanmamış sorularınız var.",
    timeUp: "Süre doldu!",
    category: "Kategori",
    identify: "Harf Tanıma",
    makhraj: "Mahreç Noktaları",
    match: "Kelime Anlamı",
  },
  fr: {
    title: "Examen Final",
    subtitle: "Évaluation complète de vos connaissances des lettres arabes",
    startExam: "Commencer l'examen",
    timeRemaining: "Temps restant",
    question: "Question",
    of: "sur",
    submit: "Soumettre l'examen",
    results: "Résultats",
    score: "Score",
    certificate: "Certificat de réussite",
    congratulations: "Félicitations !",
    downloadCertificate: "Télécharger le certificat",
    printCertificate: "Imprimer le certificat",
    enterName: "Entrez votre nom pour le certificat",
    studentName: "Nom de l'étudiant",
    completionDate: "Date de fin",
    passed: "Vous avez réussi l'examen !",
    failed: "Il faut 80% pour réussir. Continuez à pratiquer !",
    examInfo:
      "Cet examen couvre toutes les lettres arabes, tashkeel et les points makhraj. Vous avez 30 minutes pour compléter 20 questions.",
    minutes: "minutes",
    reviewAnswers: "Revoir les réponses",
    flagQuestion: "Marquer pour révision",
    unflagQuestion: "Retirer le marquage",
    answered: "Répondu",
    unanswered: "Non répondu",
    flagged: "Marqué",
    confirmSubmit: "Êtes-vous sûr de vouloir soumettre ? Vous avez des questions sans réponse.",
    timeUp: "Le temps est écoulé !",
    category: "Catégorie",
    identify: "Identification des lettres",
    makhraj: "Points Makhraj",
    match: "Sens des mots",
  },
  ur: {
    title: "حتمی امتحان",
    subtitle: "عربی حروف کے علم کا جامع جائزہ",
    startExam: "امتحان شروع کریں",
    timeRemaining: "باقی وقت",
    question: "سوال",
    of: "میں سے",
    submit: "امتحان جمع کرائیں",
    results: "نتائج",
    score: "اسکور",
    certificate: "تکمیل کا سرٹیفکیٹ",
    congratulations: "مبارک ہو!",
    downloadCertificate: "سرٹیفکیٹ ڈاؤنلوڈ کریں",
    printCertificate: "سرٹیفکیٹ پرنٹ کریں",
    enterName: "سرٹیفکیٹ کے لیے اپنا نام درج کریں",
    studentName: "طالب علم کا نام",
    completionDate: "تکمیل کی تاریخ",
    passed: "آپ نے امتحان پاس کر لیا!",
    failed: "پاس ہونے کے لیے 80% ضروری ہے۔ مشق جاری رکھیں!",
    examInfo:
      "یہ امتحان تمام عربی حروف، تشکیل اور مخارج کا احاطہ کرتا ہے۔ 20 سوالات مکمل کرنے کے لیے آپ کے پاس 30 منٹ ہیں۔",
    minutes: "منٹ",
    reviewAnswers: "جوابات کا جائزہ لیں",
    flagQuestion: "نشان لگائیں",
    unflagQuestion: "نشان ہٹائیں",
    answered: "جواب دیا گیا",
    unanswered: "جواب نہیں دیا گیا",
    flagged: "نشان زد",
    confirmSubmit: "کیا آپ واقعی جمع کرانا چاہتے ہیں؟ آپ کے کچھ سوالات کے جوابات نہیں دیے گئے۔",
    timeUp: "وقت ختم!",
    category: "زمرہ",
    identify: "حروف کی شناخت",
    makhraj: "مخارج",
    match: "لفظ کا معنی",
  },
  id: {
    title: "Ujian Akhir",
    subtitle: "Penilaian komprehensif pengetahuan huruf Arab Anda",
    startExam: "Mulai Ujian",
    timeRemaining: "Waktu Tersisa",
    question: "Pertanyaan",
    of: "dari",
    submit: "Kirim Ujian",
    results: "Hasil",
    score: "Skor",
    certificate: "Sertifikat Penyelesaian",
    congratulations: "Selamat!",
    downloadCertificate: "Unduh Sertifikat",
    printCertificate: "Cetak Sertifikat",
    enterName: "Masukkan nama Anda untuk sertifikat",
    studentName: "Nama Siswa",
    completionDate: "Tanggal Penyelesaian",
    passed: "Anda lulus ujian!",
    failed: "Diperlukan 80% untuk lulus. Terus berlatih!",
    examInfo:
      "Ujian ini mencakup semua huruf Arab, tashkeel, dan titik makhraj. Anda memiliki 30 menit untuk menyelesaikan 20 pertanyaan.",
    minutes: "menit",
    reviewAnswers: "Tinjau Jawaban",
    flagQuestion: "Tandai untuk ditinjau",
    unflagQuestion: "Hapus tanda",
    answered: "Dijawab",
    unanswered: "Belum dijawab",
    flagged: "Ditandai",
    confirmSubmit: "Apakah Anda yakin ingin mengirim? Anda memiliki pertanyaan yang belum dijawab.",
    timeUp: "Waktu habis!",
    category: "Kategori",
    identify: "Identifikasi Huruf",
    makhraj: "Titik Makhraj",
    match: "Arti Kata",
  },
};

const EXAM_QUESTION_COUNT = 20;
const EXAM_DURATION_SECONDS = 30 * 60; // 30 minutes

type ExamPhase = "intro" | "exam" | "results" | "certificate";

export function FinalExam({ locale }: FinalExamProps) {
  const t = UI_TEXT[locale] || UI_TEXT.en;
  const isRtl = locale === "ur";

  const [phase, setPhase] = useState<ExamPhase>("intro");
  const [studentName, setStudentName] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
  const [showReview, setShowReview] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  // Generate 20 questions from all letters
  const generateExamQuestions = useCallback(() => {
    const allQuestions = generateQuiz(LETTERS);
    // generateQuiz returns up to 10, so we call it multiple times and deduplicate
    const pool: QuizQuestion[] = [];
    const seenKeys = new Set<string>();
    for (let i = 0; i < 5; i++) {
      const batch = generateQuiz(LETTERS);
      for (const q of batch) {
        if (!seenKeys.has(q.questionKey)) {
          seenKeys.add(q.questionKey);
          pool.push(q);
        }
      }
    }
    // Shuffle and take 20
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, EXAM_QUESTION_COUNT);
  }, []);

  // Timer
  useEffect(() => {
    if (phase !== "exam") return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  function startExam() {
    if (!studentName.trim()) return;
    const q = generateExamQuestions();
    setQuestions(q);
    setAnswers({});
    setFlagged(new Set());
    setQIdx(0);
    setTimeLeft(EXAM_DURATION_SECONDS);
    setPhase("exam");
  }

  function selectAnswer(optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [qIdx]: optionIndex }));
  }

  function toggleFlag() {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(qIdx)) {
        next.delete(qIdx);
      } else {
        next.add(qIdx);
      }
      return next;
    });
  }

  function handleSubmit() {
    if (timerRef.current) clearInterval(timerRef.current);

    const unansweredCount = questions.length - Object.keys(answers).length;
    if (unansweredCount > 0 && timeLeft > 0) {
      const confirmed = window.confirm(t.confirmSubmit);
      if (!confirmed) return;
    }

    setPhase("results");
  }

  // Computed score
  const score = useMemo(() => {
    return Object.entries(answers).filter(
      ([k, v]) => v === questions[Number(k)]?.correct
    ).length;
  }, [answers, questions]);

  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const passed = pct >= 80;

  // Score by category
  const categoryScores = useMemo(() => {
    const cats: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, i) => {
      const type = q.type;
      if (!cats[type]) cats[type] = { correct: 0, total: 0 };
      cats[type].total++;
      if (answers[i] === q.correct) cats[type].correct++;
    });
    return cats;
  }, [answers, questions]);

  function getCategoryLabel(type: string): string {
    return t[type] || type;
  }

  function handlePrint() {
    window.print();
  }

  const q = questions[qIdx];

  const getOptions = (question: QuizQuestion): string[] => {
    if (question.localizedOptions) {
      return (
        question.localizedOptions[locale as Locale] ||
        (question.options as string[])
      );
    }
    return question.options as string[];
  };

  const completionDate = new Date().toLocaleDateString(
    locale === "ur"
      ? "ur-PK"
      : locale === "tr"
      ? "tr-TR"
      : locale === "fr"
      ? "fr-FR"
      : locale === "id"
      ? "id-ID"
      : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  // ── INTRO SCREEN ──
  if (phase === "intro") {
    return (
      <div className="max-w-lg mx-auto" dir={isRtl ? "rtl" : "ltr"}>
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
          <p className="text-gray-500">{t.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {/* Exam info */}
          <div className="bg-green-50 rounded-xl p-5 mb-6 border border-green-200">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-green-700 mt-0.5 shrink-0" />
              <p className="text-green-800 text-sm leading-relaxed">
                {t.examInfo}
              </p>
            </div>
          </div>

          {/* Exam stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-green-800">20</div>
              <div className="text-xs text-gray-500">{t.question}s</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">30</div>
              <div className="text-xs text-gray-500">{t.minutes}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-amber-600">80%</div>
              <div className="text-xs text-gray-500">{t.passed.split(" ")[0]}</div>
            </div>
          </div>

          {/* Name input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.enterName}
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder={t.studentName}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-lg"
            />
          </div>

          {/* Start button */}
          <button
            onClick={startExam}
            disabled={!studentName.trim()}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              studentName.trim()
                ? "bg-gradient-to-r from-green-700 to-green-800 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {t.startExam}
          </button>
        </div>
      </div>
    );
  }

  // ── EXAM SCREEN ──
  if (phase === "exam" && q) {
    const answeredCount = Object.keys(answers).length;
    const isTimeWarning = timeLeft < 300; // less than 5 minutes

    return (
      <div className="max-w-3xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
        {/* Top bar: timer + progress */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-bold text-sm ${
              isTimeWarning
                ? "bg-red-100 text-red-700 animate-pulse"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <Clock size={16} />
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-gray-500">
            {answeredCount}/{questions.length} {t.answered}
          </div>
        </div>

        {/* Question navigation grid */}
        <div className="bg-white rounded-xl p-3 mb-4 shadow-sm">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {questions.map((_, i) => {
              const isAnswered = answers[i] !== undefined;
              const isFlagged = flagged.has(i);
              const isCurrent = i === qIdx;

              let bg = "bg-gray-100 text-gray-500";
              if (isCurrent) bg = "bg-green-800 text-white ring-2 ring-green-300";
              else if (isFlagged && isAnswered)
                bg = "bg-amber-400 text-white";
              else if (isFlagged) bg = "bg-amber-200 text-amber-800";
              else if (isAnswered) bg = "bg-green-200 text-green-800";

              return (
                <button
                  key={i}
                  onClick={() => setQIdx(i)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${bg} hover:scale-110`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl p-7 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">
              {t.question} {qIdx + 1} {t.of} {questions.length}
            </span>
            <button
              onClick={toggleFlag}
              className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full transition-all ${
                flagged.has(qIdx)
                  ? "bg-amber-100 text-amber-700"
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100"
              }`}
            >
              <Flag size={14} />
              {flagged.has(qIdx) ? t.unflagQuestion : t.flagQuestion}
            </button>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            {q.question[locale as Locale]}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {getOptions(q).map((opt, i) => {
              const isSel = answers[qIdx] === i;

              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className={`p-4 rounded-xl border-2 text-center text-lg transition-all cursor-pointer ${
                    isSel
                      ? "border-green-500 bg-green-50 text-green-800 font-semibold"
                      : "border-transparent bg-gray-50 text-gray-700 hover:bg-gray-100"
                  } ${
                    (opt as string).length <= 2
                      ? "font-[family-name:var(--font-arabic)] text-2xl"
                      : ""
                  }`}
                >
                  {opt}
                  {isSel && (
                    <CheckCircle2 className="inline ml-2 text-green-600" size={20} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation & submit */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setQIdx(Math.max(0, qIdx - 1))}
              disabled={qIdx === 0}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl font-semibold transition-all ${
                qIdx > 0
                  ? "text-gray-600 hover:bg-gray-100"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={18} />
            </button>

            {qIdx === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 transition-all shadow-md"
              >
                {t.submit}
              </button>
            ) : (
              <button
                onClick={() => setQIdx(Math.min(questions.length - 1, qIdx + 1))}
                className="px-6 py-2 rounded-xl font-semibold text-green-800 hover:bg-green-50 transition-all"
              >
                {t.question} {qIdx + 2} <ChevronRight className="inline" size={18} />
              </button>
            )}

            <button
              onClick={() => setQIdx(Math.min(questions.length - 1, qIdx + 1))}
              disabled={qIdx === questions.length - 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl font-semibold transition-all ${
                qIdx < questions.length - 1
                  ? "text-gray-600 hover:bg-gray-100"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS SCREEN ──
  if (phase === "results") {
    return (
      <div className="max-w-2xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{passed ? "🏆" : "📚"}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.results}</h1>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          {/* Score circle */}
          <div className="w-48 h-48 mx-auto relative mb-6">
            <svg viewBox="0 0 100 100" className="-rotate-90">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={passed ? "#4CAF50" : "#f44336"}
                strokeWidth="8"
                strokeDasharray={`${(score / questions.length) * 264} 264`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-gray-800">{pct}%</div>
              <div className="text-sm text-gray-500">
                {score}/{questions.length}
              </div>
            </div>
          </div>

          {/* Pass/Fail message */}
          <div
            className={`text-center p-4 rounded-xl mb-6 ${
              passed
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-700"
            }`}
          >
            <p className="font-bold text-lg">
              {passed ? t.congratulations : ""} {passed ? t.passed : t.failed}
            </p>
          </div>

          {/* Category breakdown */}
          <h3 className="font-bold text-gray-700 mb-3">{t.score} - {t.category}</h3>
          <div className="space-y-2 mb-6">
            {Object.entries(categoryScores).map(([type, data]) => {
              const catPct =
                data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
              return (
                <div key={type} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-40 shrink-0">
                    {getCategoryLabel(type)}
                  </span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        catPct >= 80
                          ? "bg-green-500"
                          : catPct >= 60
                          ? "bg-yellow-500"
                          : "bg-red-400"
                      }`}
                      style={{ width: `${catPct}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-700 w-20 text-right">
                    {data.correct}/{data.total} ({catPct}%)
                  </span>
                </div>
              );
            })}
          </div>

          {/* Review answers */}
          <button
            onClick={() => setShowReview(!showReview)}
            className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors mb-4"
          >
            {t.reviewAnswers}
          </button>

          {showReview && (
            <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
              {questions.map((question, i) => {
                const userAnswer = answers[i];
                const isCorrect = userAnswer === question.correct;
                const opts = getOptions(question);
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border ${
                      isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800 mb-1">
                          {i + 1}. {question.question[locale as Locale]}
                        </p>
                        {!isCorrect && (
                          <p className="text-xs text-gray-500">
                            {userAnswer !== undefined
                              ? `Your answer: ${opts[userAnswer]}`
                              : t.unanswered}{" "}
                            → Correct: {opts[question.correct]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Certificate button (only if passed) */}
          {passed && (
            <button
              onClick={() => setPhase("certificate")}
              className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Award size={22} />
              {t.certificate}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── CERTIFICATE SCREEN ──
  if (phase === "certificate") {
    return (
      <div className="max-w-3xl mx-auto" dir="ltr">
        {/* Print button */}
        <div className="flex justify-center gap-3 mb-6 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-green-800 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-md"
          >
            <Printer size={18} />
            {t.printCertificate}
          </button>
          <button
            onClick={() => setPhase("results")}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            ← {t.results}
          </button>
        </div>

        {/* Certificate */}
        <div
          ref={certificateRef}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none"
        >
          {/* Decorative border */}
          <div className="border-[12px] border-double border-amber-500 m-2 rounded-xl">
            <div className="border-2 border-amber-300 m-1 rounded-lg">
              {/* Certificate content */}
              <div className="p-12 text-center">
                {/* Top ornament */}
                <div className="text-amber-500 text-3xl mb-2">✦ ✦ ✦</div>

                {/* Arabic calligraphy header */}
                <div className="font-[family-name:var(--font-arabic)] text-4xl text-green-800 mb-1">
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </div>

                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-4" />

                {/* Title */}
                <h1 className="text-lg tracking-[0.3em] uppercase text-gray-400 mb-1">
                  Itqan Learn
                </h1>
                <h2 className="text-3xl font-bold text-green-800 mb-1">
                  {t.certificate}
                </h2>
                <div className="font-[family-name:var(--font-arabic)] text-2xl text-green-700 mb-6">
                  شَهَادَةُ إِتْقَان
                </div>

                <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />

                {/* Student name */}
                <p className="text-gray-500 text-sm mb-1">
                  This certifies that
                </p>
                <h3 className="text-3xl font-bold text-gray-800 mb-1 font-serif">
                  {studentName}
                </h3>
                <div className="w-64 h-px bg-gray-300 mx-auto mb-6" />

                {/* Achievement */}
                <p className="text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
                  has successfully completed the Itqan Arabic Letters course,
                  demonstrating proficiency in letter identification, makhraj
                  articulation points, and tashkeel marks.
                </p>

                {/* Score */}
                <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-50 to-amber-50 px-8 py-4 rounded-2xl border border-green-200 mb-6">
                  <div>
                    <div className="text-sm text-gray-500">{t.score}</div>
                    <div className="text-3xl font-bold text-green-800">
                      {pct}%
                    </div>
                  </div>
                  <div className="w-px h-12 bg-gray-300" />
                  <div>
                    <div className="text-sm text-gray-500">
                      {t.completionDate}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">
                      {completionDate}
                    </div>
                  </div>
                </div>

                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-6" />

                {/* Seal / Badge */}
                <div className="inline-flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-4 border-amber-500 flex items-center justify-center bg-gradient-to-br from-amber-50 to-green-50">
                    <Award size={36} className="text-amber-600" />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 tracking-wider uppercase">
                    Certificate of Excellence
                  </p>
                </div>

                {/* Bottom ornament */}
                <div className="text-amber-500 text-2xl mt-4">
                  ❈ ❈ ❈
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback loading
  return (
    <div className="max-w-lg mx-auto text-center p-8">
      <div className="animate-spin text-4xl">⏳</div>
    </div>
  );
}

import { setRequestLocale } from "next-intl/server";
import { FinalExam } from "@/components/exam/final-exam";

export default async function ExamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <FinalExam locale={locale} />
    </div>
  );
}

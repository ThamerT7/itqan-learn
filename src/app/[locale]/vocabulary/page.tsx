import { setRequestLocale } from "next-intl/server";
import { VocabTrainer } from "@/components/vocabulary/vocab-trainer";

export default async function VocabularyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <VocabTrainer />
    </div>
  );
}

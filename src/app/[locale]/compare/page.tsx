import { setRequestLocale } from "next-intl/server";
import LetterComparison from "@/components/comparison/letter-comparison";

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <LetterComparison locale={locale} />
    </div>
  );
}

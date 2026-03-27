import { setRequestLocale } from "next-intl/server";
import { DictationMode } from "@/components/dictation/dictation-mode";

export default async function DictationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <DictationMode locale={locale} />
    </div>
  );
}

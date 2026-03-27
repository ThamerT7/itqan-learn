import { setRequestLocale } from "next-intl/server";
import { SyllableBuilder } from "@/components/spelling/syllable-builder";

export default async function SpellingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SyllableBuilder />
    </div>
  );
}

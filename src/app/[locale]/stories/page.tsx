import { setRequestLocale } from "next-intl/server";
import { LetterStories } from "@/components/stories/letter-stories";

export default async function StoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <LetterStories locale={locale} />
    </div>
  );
}

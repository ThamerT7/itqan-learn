import { setRequestLocale } from "next-intl/server";
import { DailyChallenge } from "@/components/daily/daily-challenge";

export default async function DailyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <DailyChallenge locale={locale} />
    </div>
  );
}

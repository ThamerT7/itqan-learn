import { setRequestLocale } from "next-intl/server";
import { GradedReader } from "@/components/reading/graded-reader";

export default async function ReadingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <GradedReader />
    </div>
  );
}

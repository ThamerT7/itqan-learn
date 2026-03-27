import { setRequestLocale } from "next-intl/server";
import { TajweedExplorer } from "@/components/tajweed/tajweed-explorer";

export default async function TajweedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <TajweedExplorer locale={locale} />
    </div>
  );
}

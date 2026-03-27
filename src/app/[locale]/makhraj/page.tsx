import { setRequestLocale } from "next-intl/server";
import MakhrajMap from "@/components/makhraj/makhraj-map";

export default async function MakhrajPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <MakhrajMap locale={locale} />
    </div>
  );
}

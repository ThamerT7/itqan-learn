import { setRequestLocale } from "next-intl/server";
import { TracingPageClient } from "./tracing-page-client";

export default async function TracingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TracingPageClient locale={locale} />;
}

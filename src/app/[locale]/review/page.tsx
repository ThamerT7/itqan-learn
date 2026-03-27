import { setRequestLocale } from "next-intl/server";
import { ReviewPageClient } from "./review-page-client";

export default async function ReviewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ReviewPageClient locale={locale} />;
}

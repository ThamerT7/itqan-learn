import { redirect } from "next/navigation";

export default async function UnitDetailPage({
  params,
}: {
  params: Promise<{ locale: string; unitId: string }>;
}) {
  const { locale, unitId } = await params;
  redirect(`/${locale}/units/${unitId}/flashcards`);
}

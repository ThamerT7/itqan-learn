import { setRequestLocale } from "next-intl/server";
import ListeningMode from "@/components/listening/listening-mode";
import { LETTERS } from "@/data/letters";

export default async function ListeningPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const letters = LETTERS.map((l) => ({
    id: l.id,
    letter: l.letter,
    name: l.name,
    audioFile: l.audioFile,
    phonetic: l.phonetic as Record<string, string>,
  }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ListeningMode letters={letters} locale={locale} />
    </div>
  );
}

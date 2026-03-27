import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { UNITS } from "@/data/units";
import { getLettersByIds } from "@/data/letters";

export default async function UnitsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("units");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t("title")}</h1>
        <p className="text-gray-500">{t("subtitle")}</p>
      </div>

      <div className="grid gap-6">
        {UNITS.map((unit) => {
          const letters = getLettersByIds(unit.letterIds);

          return (
            <div
              key={unit.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Unit info */}
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      {t("unit")} {unit.order}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 font-[family-name:var(--font-arabic)] mb-3">
                    {unit.titleAr}
                  </h2>

                  {/* Letters preview */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    {letters.map((letter) => (
                      <span
                        key={letter.id}
                        className="w-12 h-12 rounded-xl bg-green-50 text-green-800 font-[family-name:var(--font-arabic)] text-2xl flex items-center justify-center border border-green-100"
                      >
                        {letter.letter}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-gray-500">
                    {letters.length} {t("letters")}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2 p-6 md:border-l border-t md:border-t-0 border-gray-100 justify-center">
                  <Link
                    href={`/${locale}/units/${unit.id}/flashcards`}
                    className="px-5 py-2.5 bg-green-800 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors text-center"
                  >
                    {t("startFlashcards")}
                  </Link>
                  <Link
                    href={`/${locale}/units/${unit.id}/quiz`}
                    className="px-5 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-semibold hover:bg-orange-500 transition-colors text-center"
                  >
                    {t("startQuiz")}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

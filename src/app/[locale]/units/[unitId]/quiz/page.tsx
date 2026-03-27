"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getUnitById } from "@/data/units";
import { getLettersByIds } from "@/data/letters";
import { QuizContainer } from "@/components/quiz/quiz-container";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function QuizPage() {
  const params = useParams();
  const locale = params.locale as string;
  const unitId = params.unitId as string;
  const t = useTranslations("quiz");
  const tc = useTranslations("common");
  const tu = useTranslations("units");

  const unit = getUnitById(unitId);
  if (!unit) return <div className="p-8 text-center">Unit not found</div>;

  const letters = getLettersByIds(unit.letterIds);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href={`/${locale}/units`}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={16} /> {tc("backToUnits")}
        </Link>
      </div>

      <div className="text-center mb-6">
        <span className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
          {tu("unit")} {unit.order} - {t("title")}
        </span>
        <h1 className="text-xl font-bold text-gray-800 mt-3 font-[family-name:var(--font-arabic)]">
          {unit.titleAr}
        </h1>
      </div>

      <QuizContainer letters={letters} unitId={unitId} />
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="bg-[#58cc02] text-white py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center">
          <div className="font-[family-name:var(--font-arabic)] text-3xl font-extrabold mb-2">
            {t("appNameAr")}
          </div>
          <div className="text-white/80 font-bold mb-4">{t("subtitle")}</div>
          <div className="text-white/60 text-sm">Designed for itqanq.com</div>
        </div>
      </div>
    </footer>
  );
}

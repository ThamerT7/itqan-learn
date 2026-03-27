"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="text-center py-8 text-gray-400 text-sm">
      <div className="font-[family-name:var(--font-arabic)] text-lg text-green-800 mb-1">
        {t("appNameAr")}
      </div>
      <div>{t("subtitle")}</div>
      <div className="mt-1">Designed for itqanq.com</div>
    </footer>
  );
}

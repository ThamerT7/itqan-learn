import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const messageImports = {
  en: () => import("../../messages/en.json"),
  tr: () => import("../../messages/tr.json"),
  fr: () => import("../../messages/fr.json"),
  ur: () => import("../../messages/ur.json"),
  id: () => import("../../messages/id.json"),
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await messageImports[locale as keyof typeof messageImports]()).default,
  };
});

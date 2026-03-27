import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr", "fr", "ur", "id"],
  defaultLocale: "en",
});

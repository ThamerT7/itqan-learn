export const BRAND_COLORS = {
  green: {
    primary: "#1B5E20",
    secondary: "#2E7D32",
    light: "#4CAF50",
    bg: "#f0f7f0",
  },
  orange: {
    primary: "#E65100",
    secondary: "#FF8F00",
    light: "#FFA726",
    bg: "#fff8f0",
  },
};

export const RTL_LOCALES = ["ur"];

export const LANGUAGES = [
  { code: "en" as const, label: "English", flag: "\u{1F1EC}\u{1F1E7}", dir: "ltr" as const },
  { code: "tr" as const, label: "T\u00FCrk\u00E7e", flag: "\u{1F1F9}\u{1F1F7}", dir: "ltr" as const },
  { code: "fr" as const, label: "Fran\u00E7ais", flag: "\u{1F1EB}\u{1F1F7}", dir: "ltr" as const },
  { code: "ur" as const, label: "\u0627\u0631\u062F\u0648", flag: "\u{1F1F5}\u{1F1F0}", dir: "rtl" as const },
  { code: "id" as const, label: "Indonesia", flag: "\u{1F1EE}\u{1F1E9}", dir: "ltr" as const },
];

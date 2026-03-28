import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Noto_Sans_Arabic } from "next/font/google";
import { RTL_LOCALES } from "@/lib/constants";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProgressProvider } from "@/providers/progress-provider";

const arabicFont = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className={`${arabicFont.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ProgressProvider>
            <div className="min-h-screen flex flex-col bg-white">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ProgressProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

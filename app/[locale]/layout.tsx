import './globals.css'
import React from "react";
import {NextIntlClientProvider, useLocale} from "next-intl";
import {Header} from "@/components/organisms/Header";
import {Footer} from "@/components/organisms/Footer";
import {notFound} from "next/navigation";

export const metadata = {
   title: 'וואלק - מה שעולה לראש',
   description: 'וואלק',
};

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   let messages;
   const locale = useLocale();
   try {
      messages = (await import(`../../messages/${locale}.json`)).default;
   } catch (error) {
      console.log("error", error);
      notFound();
   }

   return (
      <html lang={locale}>
      <body>
      <main>
         <NextIntlClientProvider locale={locale} messages={messages}>
            <Header/>
            {children}
            <Footer/>
         </NextIntlClientProvider>
      </main>
      </body>
      </html>
   );
}

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
        <head>
            <meta charSet="utf-8"/>
            <title>{metadata.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
            <meta name="description" content={metadata.description}/>
            <meta property="og:title" content={metadata.title}/>
            <meta property="og:description" content={metadata.description}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://nextjs.org/learn"/>
            <meta property="og:site_name" content={metadata.title}/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content="@vercel"/>
            <meta name="twitter:title" content={metadata.title}/>
            <meta name="twitter:description" content={metadata.description}/>
        </head>
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

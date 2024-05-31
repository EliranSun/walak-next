import './globals.css'
import React from "react";
import {getLocale} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";
import {Header} from "@/components/organisms/Header";
import {Footer} from "@/components/organisms/Footer";
import {notFound} from "next/navigation";

const locales = ['en', 'he'];


export default async function RootLayout({
                                             children,
                                             params,
                                         }: {
    children: React.ReactNode,
    params: { postId: string, postName: string },
}) {
    const locale = await getLocale();

    if (!locales.includes(locale as any)) notFound();
    const messages = (await import(`../../messages/${locale}.json`)).default;

    return (
        <html lang="en">
        <head>
            <title>וואלק - מה שעולה לראש</title>
            <meta name="theme-color" content="#f1f5f9"/>
            <meta property="og:image:width" content="1200"/>
            <meta property="og:image:height" content="666"/>
            <meta property="og:image:type" content="image/jpeg"/>
            <meta property="og:site_name" content="וואלק"/>
            <meta property="og:locale" content="he_IL"/>
            <meta property="og:type" content="article"/>
            <meta property="twitter:site" content="@Walak"/>
            <meta property="twitter:creator" content="@Walak"/>
            <meta property="twitter:card" content="summary_large_image"/>
            <meta name="twitter:label1" content="Written by"/>
            <meta name="twitter:data1" content="Eliran Shemesh & Ofir Cohen"/>
            <meta name="twitter:label2" content="Est. reading time"/>
            <meta name="twitter:data2" content="3 minutes"/>
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

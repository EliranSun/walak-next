import './globals.css'
import React from "react";
// import {NextIntlClientProvider, useLocale} from "next-intl";
import {Header} from "@/components/organisms/Header";
import {Footer} from "@/components/organisms/Footer";
import {notFound} from "next/navigation";
import {getPost} from "@/utils/posts";

// export const metadata = {
//    title: 'וואלק - מה שעולה לראש',
//    description: 'וואלק',
// };

export default async function RootLayout({
   children,
   params,
}: {
   children: React.ReactNode,
   params: { postId: string, postName: string },
}) {
   let messages;
   const locale = useLocale();
   try {
      messages = (await import(`../../messages/${locale}.json`)).default;
   } catch (error) {
      console.log("error", error);
      notFound();
   }

   console.log({params})
   // const {post, error} = await getPost(Number(params.postId));


   return (
      <html lang={locale}>
      <head>
         {/*<title>וואלק | {post.title}</title>*/}
         {/*<meta name="theme-color" content="#f1f5f9"/>*/}
         {/*<meta property="description" content={post.excerpt}/>*/}
         {/*<meta property="og:title" content={`וואלק | ${post.title}`}/>*/}
         {/*<meta property="og:description" content={post.excerpt}/>*/}
         {/*<meta property="og:image" content={post.metadataImageSrc || post.imageSrc}/>*/}
         {/*<meta property="og:image:width" content="1200"/>*/}
         {/*<meta property="og:image:height" content="666"/>*/}
         {/*<meta property="og:image:type" content="image/jpeg"/>*/}
         {/*<meta property="og:url" content={`https://walak-next.vercel.app/he/posts/${post.id}/the-swiss-watch`}/>*/}
         {/*<meta property="og:site_name" content="וואלק"/>*/}
         {/*<meta property="og:locale" content="he_IL"/>*/}
         {/*<meta property="og:type" content="article"/>*/}
         {/*<meta property="twitter:site" content="@Walak"/>*/}
         {/*<meta property="twitter:creator" content="@Walak"/>*/}
         {/*<meta property="twitter:card" content="summary_large_image"/>*/}
         {/*<meta name="twitter:image" content={post.metadataImageSrc || post.imageSrc}/>*/}
         {/*<meta name="twitter:label1" content="Written by"/>*/}
         {/*<meta name="twitter:data1" content="Eliran Shemesh & Ofir Cohen"/>*/}
         {/*<meta name="twitter:label2" content="Est. reading time"/>*/}
         {/*<meta name="twitter:data2" content="3 minutes"/>*/}
      </head>
      <body>
      <main>
         {/*<NextIntlClientProvider locale={locale} messages={messages}>*/}
            <Header/>
            {children}
            <Footer/>
         {/*</NextIntlClientProvider>*/}
      </main>
      </body>
      </html>
   );
}

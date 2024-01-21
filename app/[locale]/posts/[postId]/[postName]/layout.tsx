import '@/app/[locale]/globals.css';
import React from "react";
import {getPost} from "@/utils/posts";
import {Metadata} from "next";

export async function generateMetadata(
   {params}: { params: { postId: string, postName: string } },
): Promise<Metadata> {
   const postName = decodeURI(params.postName).replace(/-/g, ' ');
   const {post, error} = await getPost(Number(params.postId));

   return {
      title: `וולאק | ${post.title}`,
      description: `${post.excerpt}`,
      openGraph: {
         title: `וואלק | ${post.title}`,
         description: `${post.excerpt}`,
         locale: "he_IL",
         type: "article",
         images: [
            {
               url: post.metadataImageSrc || post.imageSrc,
               width: 1200,
               height: 666,
               alt: post.title,
            },
         ],
      },
      twitter: {
         site: "@Walak",
         creator: "Eliran Shemesh & Ofir Cohen",
         card: "summary_large_image",
         description: "Est. reading time: 3 minutes",
      },
      
   }
}

export default function RootLayout({
   children,
   params,
}: {
   children: React.ReactNode,
   params: { postId: string, postName: string },
}) {
   return children;
}

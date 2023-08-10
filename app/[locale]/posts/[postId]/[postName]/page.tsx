import React from "react";
// import {Metadata} from 'next';
import {trackPostViews, getPost} from "@/utils/posts";
import {Tags} from "@/components/molecules/Tags";
import Author from "@/components/molecules/Author";
import {PostFooterMessage} from "@/components/atoms/PostFooterMessage";
import {PrintViewButton} from "@/components/molecules/PrintViewButton";
import {ShareButton} from "@/components/molecules/ShareButton";
import {PostContent} from "@/components/organisms/PostContent";
import Authors from "@/components/molecules/Authors";
import {SocialFeed} from "@/components/organisms/SocialFeed";

// export async function generateMetadata(
//    {params}: { params: { postId: string, postName: string } },
// ): Promise<Metadata> {
//    const postName = decodeURI(params.postName).replace(/-/g, ' ');
//
//    return {
//       title: `וואלק | ${postName}`,
//       description: `פלטפורמה לפרסום מאמרים, סיפורים קצרים, דעות ובעיקר רעיונות.`,
//    }
// }

export default async function Index({params}: { params: { postId: string, postName: string } }) {
   const {post, error} = await getPost(Number(params.postId));

   if (error || !post) {
      console.log(error, post);

      return (
         <div className="w-full flex flex-col items-center">
            <p className="text-2xl">Error</p>
         </div>
      );
   }

   trackPostViews(post);

   return (
      <>
         <head>
            <title>{post.title}</title>
            <meta property="description" content={post.excerpt}/>
            <meta property="og:title" content={post.title}/>
            <meta property="og:description" content={post.excerpt}/>
            <meta property="og:image" content={post.imageSrc}/>
            <meta property="og:image:width" content="1200"/>
            <meta property="og:image:height" content="630"/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="og:url" content={`https://walak-next.vercel.app/he/posts/${post.id}/${post.name}`}/>
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
         <div className="w-full flex flex-col items-center post" dir="rtl">
            <div
               className="w-full h-[70vh] overflow-hidden relative bg-cover bg-fixed bg-[center_bottom_5rem] flex items-end justify-center"
               style={{
                  backgroundImage: `url(${post.upscaledImageSrc || post.imageSrc})`
               }}>
               <div className="w-full bg-yellow-500 text-center py-8 text-white z-10">
                  <h1 className="text-6xl open-sans tracking-wider">{post.title}</h1>
                  <h2 className="text-xl open-sans">{post.excerpt}</h2>
               </div>
            </div>
            <div className="flex items-start my-8 justify-center">
               <PostContent post={post}/>
               <div className="w-44 mr-8 flex justify-end flex gap-2 flex-col box-border items-center">
                  {post.authors.length > 1
                     ? <Authors authors={post.authors}/>
                     : <Author author={post.authors[0].author}/>}
                  {post.createdAt && (
                     <div className="border-b border-gray-300 w-full pb-2 opacity-60 text-xs">
                        {new Date(post.createdAt).toLocaleString("he-IL", {
                           weekday: "long",
                           year: "numeric",
                           month: "long",
                           day: "numeric",
                        })}
                     </div>
                  )}
                  <Tags tags={post.tags || []} isInteractive={post.isInteractive} hasVideo={post.hasVideo}/>
                  <div className="border-b border-dotted border-gray-400 w-full h-1"/>
                  <div className="w-full flex flex-col gap-2">
                     <PrintViewButton/>
                     <ShareButton/>
                  </div>
               </div>
            </div>
            <hr/>
            <PostFooterMessage/>
            <SocialFeed/>
         </div>
      </>
   );
};
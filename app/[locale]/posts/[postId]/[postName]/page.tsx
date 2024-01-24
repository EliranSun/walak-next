import React from "react";
import {trackPostViews, getPost} from "@/utils/posts";
import {Tags} from "@/components/molecules/Tags";
import {PostFooterMessage} from "@/components/atoms/PostFooterMessage";
import {PrintViewButton} from "@/components/molecules/PrintViewButton";
import {ShareButton} from "@/components/molecules/ShareButton";
import {PostContent} from "@/components/organisms/PostContent";
import Authors from "@/components/molecules/Authors";
import {SocialFeed} from "@/components/organisms/SocialFeed";
import {Metadata} from "next";
import {DateLocaleString} from "@/components/atoms/DateLocaleString";
import {PostCoverImage} from "@/components/atoms/PostCoverImage";

// TODO: Layout here is a bit redundant, can be moved to page.tsx
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
export default async function Index({params}: { params: { postId: string, postName: string } }) {
   const {post, error} = await getPost(Number(params.postId));

   if (error || !post) {
      throw error || new Error("Post not found");
   }

   await trackPostViews(post);

   return (
      <div className="w-full flex flex-col items-center post" dir="rtl">
         <PostCoverImage imageSrc={post.upscaledImageSrc || post.imageSrc}>
            <div className="w-full bg-yellow-500 text-center py-8 text-white open-sans">
               <h1 className="text-6xl tracking-wider">{post.title}</h1>
               <h2 className="text-xl">{post.excerpt}</h2>
            </div>
         </PostCoverImage>
         <div className="flex-col-reverse md:flex-row flex items-start my-8 justify-center">
            <PostContent post={post}/>
            <div className="w-full md:w-44 mr-8 md:justify-end flex gap-2 md:flex-col box-border items-center">
               <Authors authors={post.authors}/>
               <DateLocaleString date={post.createdAt}/>
               <Tags tags={post.tags || []} isInteractive={post.isInteractive} hasVideo={post.hasVideo}/>
               <div className="hidden md:inline border-b border-dotted border-gray-400 w-full h-1"/>
               <div className="hidden md:flex w-full flex-col gap-2">
                  <PrintViewButton/>
                  <ShareButton/>
               </div>
            </div>
         </div>
         <hr/>
         <PostFooterMessage/>
         <div className="m-auto">
            <SocialFeed/>
         </div>
      </div>
   );
};
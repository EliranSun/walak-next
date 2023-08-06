import React from "react";
import {Metadata} from 'next';
import {trackPostViews, getPost} from "@/utils/posts";
import {Tags} from "@/components/molecules/Tags";
import Author from "@/components/molecules/Author";
import {PostFooterMessage} from "@/components/atoms/PostFooterMessage";
import {PrintViewButton} from "@/components/molecules/PrintViewButton";
import {ShareButton} from "@/components/molecules/ShareButton";
import {PostContent} from "@/components/organisms/PostContent";
import Authors from "@/components/molecules/Authors";

export async function generateMetadata(
   {params}: { params: { postId: string, postName: string } },
): Promise<Metadata> {
   const postName = decodeURI(params.postName).replace(/-/g, ' ');

   return {
      title: `וואלק | ${postName}`
   }
}

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
               {/*<div className="flex flex-wrap w-1/6 m-4 px-4 gap-2">*/}

               {/*</div>*/}
               <PostContent post={post}/>
               <div className="w-44 mr-8 flex justify-end flex gap-2 flex-col box-border items-center">
                  {post.authors.length > 1
                     ? <Authors authors={post.authors}/>
                     : <Author author={post.authors[0]}/>}
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
         </div>
      </>
   );
};
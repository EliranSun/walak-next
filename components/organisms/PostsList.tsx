'use client';
import Post from "@/types/Post";
import {PostCard} from "@/components/molecules/PostCard";
import {useTranslations} from "next-intl";

export const PostsList = ({posts, type}: { posts: Post[], type?: "articles" | "stories" | "ideas" | "opinions" }) => {
   const t = useTranslations('PostsList');

   if (!posts.length) return null;

   return (
      <section className="p-10 pb-0">
         {type && <h1 className="text-3xl open-sans my-4 font-bold">{t(type)}</h1>}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Post) => {
               return (
                  <PostCard key={post.id} post={post}/>
               );
            })}
         </div>
      </section>
   )
};

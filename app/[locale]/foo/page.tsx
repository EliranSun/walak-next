import {MainTitle} from "@/components/atoms/Title";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import Post from "@/types/Post";
import {Categories} from "@/constants/categories";
import {PostsList} from "@/components/organisms/PostsList";
import {PostsListSkeleton} from "@/components/molecules/PostsListSkeleton";

export default async function Index() {
   const supabase = createServerComponentClient({cookies})
   const {data, error} = await supabase.from('posts').select().order('createdAt', {ascending: false});
   const posts = data as Post[];
   const articles = posts.filter((post: Post) => post.categoryId === Categories.ARTICLE);

   if (error) {
      return (
         <div className="w-full flex flex-col items-center">
            <p className="text-2xl">Error</p>
         </div>
      );
   }

   return (
      <div className="flex flex-col items-center text-center">
         {/*<img src="/loading.gif" className="w-40 h-auto grayscale" alt="Loading..."/>*/}
         <MainTitle translationKey="articles"/>
         <PostsListSkeleton/>
      </div>
   );

   return (
      <section className="flex flex-col items-center text-center">
         <MainTitle translationKey={'articles'}/>
         <div className="md:max-w-5xl mb-28" dir="rtl">
            <PostsList posts={articles}/>
         </div>
      </section>
   )
};

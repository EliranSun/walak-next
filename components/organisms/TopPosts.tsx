import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import Post from "@/types/Post";
import {PostCard} from "@/components/molecules/PostCard";

export const TopPosts = async ({posts}: { posts: Post[] }) => {
   const supabase = createServerComponentClient({cookies})

   const {data, error} = await supabase
      .from('postsViews')
      .select(`postId, count`)
      .order('count', {ascending: false})
      .neq('postId', posts[0].id)
      .limit(3);


   const topPosts = (data || []).map(({postId, count}) => {
      return {
         ...posts.find(post => post.id === postId) as Post,
         views: count || 0
      }
   }).sort((a, b) => b.views - a.views);

   if (!topPosts.length) return null;

   if (error) {
      console.log(error);

      return (
         <div className="w-full flex flex-col items-center">
            <p className="text-2xl">Error</p>
         </div>
      );
   }

   return (
      <div className="w-full flex flex-col box-border" dir="rtl">
         <h2 className="open-sans text-2xl font-bold mb-4">הכי נקראים</h2>
         <div className="flex flex-col gap-4">
            {topPosts?.map((post: Post) => {
               return (
                  <PostCard post={post} key={post.id} isLean/>
               );
            })}
         </div>
      </div>
   );
}
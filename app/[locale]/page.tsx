import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers';
import {Header} from "@/components/organisms/Header";
import {PostsList} from "@/components/organisms/PostsList";
import {calculateReadingTime} from "@/utils/posts";

export default async function Index() {
   const supabase = createServerComponentClient({cookies})
   const {data, error} = await supabase.from('posts').select();

   const posts = (data || []).map((post: any) => {
      return {
         ...post,
         timeToRead: calculateReadingTime(post.content)
      }
   });

   if (error) {
      console.log(error);

      return (
         <div className="w-full flex flex-col items-center">
            <p className="text-2xl">Error</p>
         </div>
      );
   }

   return (
      <div className="w-full flex flex-col items-center" dir="rtl">
         <Header/>
         <PostsList posts={posts}/>
      </div>
   )
}

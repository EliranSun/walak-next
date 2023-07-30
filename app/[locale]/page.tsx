import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers';
import Post from "@/types/Post";
import {Header} from "@/components/organisms/Header";
import {PostCard} from "@/components/molecules/PostCard";

export default async function Index() {
   const supabase = createServerComponentClient({cookies})
   const {data: posts, error} = await supabase.from('posts').select();
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
         {(posts || []).map((post: Post) => {
            return (
               <PostCard
                  title={post.title}
                  imgSrc={post.imageSrc}
                  excerpt={post.excerpt}/>
            );
         })}
      </div>
   )
}

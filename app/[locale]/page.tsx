import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers';
import {Header} from "@/components/organisms/Header";
import {PostsList} from "@/components/organisms/PostsList";
import {calculateReadingTime} from "@/utils/posts";
import {AboutParagraph} from "@/components/atoms/AboutParagraph";
import {NewsLetterSubscribe} from "@/components/molecules/NewsLetterSubscribe";
import {Footer} from "@/components/organisms/Footer";

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
      <div className="w-full flex flex-col items-center box-border" dir="rtl">
         <Header/>
         <div className="flex">
            <PostsList posts={posts}/>
            <div className="border-r border-gray-300 my-8"/>
            <div className="my-8 p-8 flex flex-col gap-8">
               <AboutParagraph/>
               <NewsLetterSubscribe/>
            </div>
         </div>
         <Footer/>
      </div>
   )
}

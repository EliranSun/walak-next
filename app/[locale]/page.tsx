import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers';
import {PostsList} from "@/components/organisms/PostsList";
import {calculateReadingTime} from "@/utils/posts";
import {AboutParagraph} from "@/components/atoms/AboutParagraph";
import {NewsLetterSubscribe} from "@/components/molecules/NewsLetterSubscribe";
import {TopPosts} from "@/components/organisms/TopPosts";
import Post from "@/types/Post";
import {PostCard} from "@/components/molecules/PostCard";
import {useLocale} from "next-intl";
import {SocialFeed} from "@/components/organisms/SocialFeed";
import {Categories} from "@/constants/categories";

export default async function Index() {
   const locale = useLocale();
   const dir = locale === 'he' ? 'rtl' : 'ltr';
   const supabase = createServerComponentClient({cookies})
   const {data, error} = await supabase.from('posts').select().order('createdAt', {ascending: false});

   const posts = (data || []).map((post: any) => {
      return {
         ...post,
         timeToRead: calculateReadingTime(post.content)
      }
   });
   const firstPost = posts[0];
   const restOfPosts = posts.slice(1);

   const articles = restOfPosts.filter((post: Post) => post.categoryId === Categories.ARTICLE).slice(0, 6);
   const stories = restOfPosts.filter((post: Post) => post.categoryId === Categories.STORY).slice(0, 6);
   const opinions = restOfPosts.filter((post: Post) => post.categoryId === Categories.OPINION).slice(0, 3);
   const ideas = restOfPosts.filter((post: Post) => post.categoryId === Categories.IDEA).slice(0, 3);

   if (error) {
      console.log(error);

      return (
         <div className="w-full flex flex-col items-center">
            <p className="text-2xl">Error</p>
         </div>
      );
   }

   return (
      <div className="w-full flex items-start justify-center box-border" dir={dir}>
         <div className="md:max-w-5xl mb-28">
            <div className="mt-10 mx-10">
               <PostCard post={firstPost} isLarge/>
            </div>
            <PostsList posts={articles} type="articles"/>
            <PostsList posts={stories} type="stories"/>
            <PostsList posts={opinions} type="opinions"/>
            <PostsList posts={ideas} type="ideas"/>
         </div>
         <div className="w-px h-[1900px] inline-block border-l border-gray-300"/>
         <div className="my-8 p-8 flex flex-col gap-8 md:w-96">
            <AboutParagraph/>
            <NewsLetterSubscribe isBordered/>
            <TopPosts posts={posts}/>
            {/*<SocialFeed/>*/}
         </div>
      </div>
   )
}

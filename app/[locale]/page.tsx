import {PostsList} from "@/components/organisms/PostsList";
import {AboutParagraph} from "@/components/atoms/AboutParagraph";
import {NewsLetterSubscribe} from "@/components/molecules/NewsLetterSubscribe";
import {TopPosts} from "@/components/organisms/TopPosts";
import Post from "@/types/Post";
import {PostCard} from "@/components/molecules/PostCard";
import {useLocale} from "next-intl";
import {getPosts} from "@/utils/posts";
import {Categories} from "@/constants/categories";
import {SocialFeed} from "@/components/organisms/SocialFeed";

export default async function Index() {
   const {posts, error} = await getPosts();
   const locale = useLocale();
   const dir = locale === 'he' ? 'rtl' : 'ltr';
   const firstPost = posts[0];
   const restOfPosts = posts.slice(1);
   
   const postsByCategory = {
      [Categories.ARTICLE]: [] as Post[],
      [Categories.STORY]: [] as Post[],
      [Categories.OPINION]: [] as Post[],
      [Categories.IDEA]: [] as Post[],
   } as Record<string, Post[]>;
   
   restOfPosts.forEach((post: Post) => {
      postsByCategory[post.categoryId].push(post);
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
         <div className="w-full flex items-start justify-center box-border" dir={dir}>
            <div className="md:max-w-5xl mb-28">
               <div className="mx-5 mt-5 md:mt-10 md:mx-10">
                  <PostCard post={firstPost} isLarge/>
               </div>
               <div className="m-5 md:m-10 pb-0">
                  <PostsList posts={postsByCategory[Categories.ARTICLE]} type="articles"/>
                  <PostsList posts={postsByCategory[Categories.STORY]} type="stories"/>
                  <PostsList posts={postsByCategory[Categories.OPINION]} type="opinions"/>
                  <PostsList posts={postsByCategory[Categories.IDEA]} type="ideas"/>
               </div>
            </div>
            <div className="hidden md:inline-block w-px h-[1900px]  border-l border-gray-300"/>
            <div className="hidden md:flex my-10 px-10  flex-col gap-8 md:w-96">
               <AboutParagraph/>
               <NewsLetterSubscribe isBordered/>
               <TopPosts posts={posts}/>
               {/*<SocialFeed/>*/}
            </div>
         </div>
   );
}

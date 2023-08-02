import {PostsList} from "@/components/organisms/PostsList";
import {AboutParagraph} from "@/components/atoms/AboutParagraph";
import {NewsLetterSubscribe} from "@/components/molecules/NewsLetterSubscribe";
import {TopPosts} from "@/components/organisms/TopPosts";
import Post from "@/types/Post";
import {PostCard} from "@/components/molecules/PostCard";
import {useLocale} from "next-intl";
import {getPosts} from "@/utils/posts";
import {Categories} from "@/constants/categories";

export default async function Index() {
   const locale = useLocale();
   const dir = locale === 'he' ? 'rtl' : 'ltr';
   const {posts, error} = await getPosts();
   const firstPost = posts[0];
   const restOfPosts = posts.slice(1);

   // TODO: a query that returns 6 posts of each category? is it possible? and not complex?
   const articles = [] as Post[];
   const stories = [] as Post[];
   const opinions = [] as Post[];
   const ideas = [] as Post[];

   restOfPosts.forEach((post: Post) => {
      switch (post.categoryId) {
         case Categories.ARTICLE:
            if (articles.length >= 6) break;
            articles.push(post);
            break;

         case Categories.STORY:
            if (stories.length >= 6) break;
            stories.push(post);
            break;

         case Categories.OPINION:
            if (opinions.length >= 6) break;
            opinions.push(post);
            break;

         case Categories.IDEA:
            if (ideas.length >= 6) break;
            ideas.push(post);
            break;
      }
   })

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

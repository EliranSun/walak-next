import {MainTitle} from "@/components/atoms/Title";
import Post from "@/types/Post";
import {Categories} from "@/constants/categories";
import {PostsList} from "@/components/organisms/PostsList";
import {getPosts} from "@/utils/posts";

export default async function Index() {
   const {posts, error} = await getPosts();
   const articles = posts.filter((post: Post) => post.categoryId === Categories.ARTICLE);

   if (error) {
      return (
         <div className="w-full flex flex-col items-center">
            <p className="text-2xl">Error</p>
         </div>
      );
   }

   return (
      <section className="flex flex-col items-center text-center">
         <MainTitle translationKey={'articles'}/>
         <div className="md:max-w-5xl mb-28" dir="rtl">
            <PostsList posts={articles}/>
         </div>
      </section>
   )
};

import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import Post from "@/types/Post";
import {calculateReadingTime} from "@/utils/posts";
import {Tags} from "@/components/molecules/Tags";
import Author from "@/components/molecules/Author";
import {PostFooterMessage} from "@/components/atoms/PostFooterMessage";
import {PrintViewButton} from "@/components/molecules/PrintViewButton";
import {ShareButton} from "@/components/molecules/ShareButton";
import {PostContent} from "@/components/organisms/PostContent";

export default async function Index({params}: { params: { postId: string, postName: string } }) {
   const supabase = createServerComponentClient({cookies})
   const {data, error} = await supabase
      .from('posts')
      .select(`* , authors(*)`)
      .eq('id', Number(params.postId));

   let post = data?.[0] as Post;
   const author = post?.author as Author;

   if (error || !post) {
      console.log(error, post);

      return (
         <div className="w-full flex flex-col items-center">
            <p className="text-2xl">Error</p>
         </div>
      );
   }

   post = {
      ...post,
      timeToRead: calculateReadingTime(post.content)
   }

   supabase
      .from('postsViews')
      .select()
      .eq('postId', post.id)
      .then(({data}) => {
         supabase
            .from('postsViews')
            .upsert({
               count: (data && data[0]?.count || 0) + 1,
               postId: post.id
            })
            .eq('postId', post.id)
            .then(({data, error}) => {
               if (error) {
                  console.log(error);
               }
            })
      });

   return (
      <div className="w-full flex flex-col items-center post" dir="rtl">
         <div
            className="w-full h-[66vh] overflow-hidden relative bg-cover bg-fixed bg-[center_bottom_5rem] flex items-end justify-center"
            style={{
               backgroundImage: `url(${post.upscaledImageSrc || post.imageSrc})`
            }}>
            <div className="w-full bg-yellow-500 text-center py-8 text-white z-10">
               <h1 className="text-6xl open-sans tracking-wider">{post.title}</h1>
               <h2 className="text-xl open-sans">{post.excerpt}</h2>
            </div>
         </div>
         <div className="flex items-start my-8 justify-center">
            <div className="w-1/6 px-4 flex justify-end flex flex-col box-border items-center">
               {author && <Author author={author} post={post}/>}
            </div>
            <PostContent post={post}/>
            <div className="flex flex-wrap w-1/6 m-4 px-4 gap-2">
               <Tags tags={post.tags || []} isInteractive={post.isInteractive} hasVideo={post.hasVideo}/>
               <div className="border-b border-dotted border-gray-400 w-full h-1"/>
               <div className="flex flex-col gap-2 my-2">
                  <PrintViewButton/>
                  <ShareButton/>
               </div>
               <div className="border-b border-dotted border-gray-400 w-full h-1"/>
               {/*<img*/}
               {/*    className="mt-10 w-40"*/}
               {/*    alt="Advertisement"*/}
               {/*    src="https://d2r55xnwy6nx47.cloudfront.net/uploads/2021/09/2021PodcastAd_Article_160.jpg"*/}
               {/*/>*/}
            </div>
         </div>
         <hr/>
         <PostFooterMessage/>
      </div>
   );
};
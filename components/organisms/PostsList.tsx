import Post from "@/types/Post";
import {PostCard} from "@/components/molecules/PostCard";

export const PostsList = ({posts}: { posts: Post[] }) => {
   return (
      <div className="md:max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 p-8 gap-8">
         {(posts || []).map((post: Post) => {
            return (
               <PostCard
                  title={post.title}
                  imgSrc={post.imageSrc}
                  timeToRead={post.timeToRead}
                  excerpt={post.excerpt}/>
            );
         })}
      </div>
   )
};

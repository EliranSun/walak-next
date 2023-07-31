import Post from "@/types/Post";
import {PostCard} from "@/components/molecules/PostCard";

export const PostsList = ({posts}: { posts: Post[] }) => {
    return (
        <div className="md:max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 p-10 gap-8">
            {(posts || []).map((post: Post) => {
                return (
                    <PostCard key={post.id} post={post}/>
                );
            })}
        </div>
    )
};

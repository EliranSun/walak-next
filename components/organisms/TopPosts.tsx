import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import Post from "@/types/Post";
import {PostCard} from "@/components/molecules/PostCard";

export const TopPosts = async ({posts}: { posts: Post[] }) => {
    const supabase = createServerComponentClient({cookies})

    // select postViews and join with posts
    const {data, error} = await supabase
        .from('postsViews')
        .select(`
            postId,
            count,
            posts (*)
        `)
        .order('count', {ascending: false})
        .limit(3);

    if (error) {
        console.log(error);

        return (
            <div className="w-full flex flex-col items-center">
                <p className="text-2xl">Error</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col box-border" dir="rtl">
            <h2 className="open-sans text-2xl font-bold mb-4">הכי נקראים</h2>
            <div className="flex flex-col gap-4">
                {data?.map((item: { postId: number, count: number, posts: Post }) => {
                    return (
                        <PostCard isLean post={item.posts} key={item.postId}/>
                    );
                })}
            </div>
        </div>
    );
}
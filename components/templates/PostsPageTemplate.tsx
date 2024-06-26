import {getPosts} from "@/utils/posts";
import Post from "@/types/Post";
import {MainTitle} from "@/components/atoms/Title";
import {PostsList} from "@/components/organisms/PostsList";

export const PostsPageTemplate = async ({
                                            categoryId,
                                            categoryKey
                                        }: {
    categoryKey: string,
    categoryId: number
}) => {
    const {posts, error} = await getPosts();
    const filteredPosts = posts.filter((post: Post) => post.categoryId === categoryId);

    if (error) {
        return (
            <div className="w-full flex flex-col items-center">
                <p className="text-2xl">Error</p>
            </div>
        );
    }

    return (
        <section className="flex flex-col items-center text-center">
            <MainTitle translationKey={categoryKey}/>
            <div className="md:max-w-5xl mt-4 mb-28" dir="rtl">
                <PostsList posts={filteredPosts}/>
            </div>
        </section>
    )
}
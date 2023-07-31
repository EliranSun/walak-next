import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import Post from "@/types/Post";
import {calculateReadingTime} from "@/utils/posts";
import {Tags} from "@/components/molecules/Tags";
import Author from "@/components/molecules/Author";

const replaceDashesWithSpaces = (str: string) => str.replace(/-/g, ' ');

export default async function Index({params}: { params: { postId: string, postName: string } }) {
    const supabase = createServerComponentClient({cookies})
    const {data, error} = await supabase
        .from('posts')
        .select(`* , authors (*)`)
        .eq('id', Number(params.postId));

    let post = data?.[0] as Post;
    const author = post?.authors;

    console.log({data});

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
            <div className="w-full h-[66vh] overflow-hidden relative bg-cover bg-fixed bg-[center_bottom_5rem] flex items-end justify-center"
                 style={{
                     backgroundImage: `url(${post.upscaledImageSrc || post.imageSrc})`
                 }}>
                <div className="w-full bg-yellow-500 text-center py-8 text-white z-10">
                    <h1 className="text-6xl open-sans">{post.title}</h1>
                    <h2 className="text-xl open-sans">{post.excerpt}</h2>
                </div>
            </div>
            <div className="flex items-start my-8">
                <div className="w-1/4 flex justify-end">
                    {author &&
                        // @ts-ignore TODO: fix this
                        <Author author={author} postDate={post.createdAt} postTags={post.tags || []}/>}
                </div>
                <div
                    className="my-4 max-w-2xl text-xl leading-relaxed bg-white p-16 box-content content"
                    dangerouslySetInnerHTML={{__html: post.content}}/>
                <div className="flex flex-wrap w-1/4 m-4">
                    <Tags tags={post.tags || []}/>
                </div>
            </div>
            <hr/>
            <p>
                אהבתם? תשתפו! לא אהבתם? תנו ב"לייק" תפרגנו מה קרה?!
            </p>
        </div>
    );
};
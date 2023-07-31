import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import Post from "@/types/Post";
import {calculateReadingTime} from "@/utils/posts";

const replaceDashesWithSpaces = (str: string) => str.replace(/-/g, ' ');

export default async function Index({params}: { params: { postId: string, postName: string } }) {
    const supabase = createServerComponentClient({cookies})
    const title = replaceDashesWithSpaces(decodeURI(params.postName));
    console.log({title});
    const {data, error} = await supabase.from('posts').select().eq('id', Number(params.postId));
    let post = data?.[0] as Post;

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

    return (
        <div className="w-full flex flex-col items-center post" dir="rtl">
            <div className="w-full h-[66vh] overflow-hidden relative bg-cover bg-fixed bg-[center_bottom_3rem] flex items-end justify-center"
                 style={{
                     backgroundImage: `url(${post.upscaledImageSrc || post.imageSrc})`
                 }}>
                {/*<img*/}
                {/*    className="w-full absolute top-0 z-[-1]"*/}
                {/*    src={post.imageSrc}*/}
                {/*    alt={`${post.title}-${post.excerpt}`}/>*/}
                <div className="w-full bg-yellow-500 text-center py-8 text-white">
                    <h1 className="text-6xl open-sans">{post.title}</h1>
                    <h2 className="text-xl open-sans">{post.excerpt}</h2>
                </div>
            </div>

            <div
                className="max-w-2xl text-xl leading-relaxed bg-white p-16 box-content first-letter:text-9xl first-letter:font-bold first-letter:text-slate-900 first-letter:ml-3 first-letter:float-right first-letter:leading-[0.7] first-letter:rubik"
                dangerouslySetInnerHTML={{__html: post.content}}/>
        </div>
    );
};
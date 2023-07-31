import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import Post from "@/types/Post";
import {calculateReadingTime} from "@/utils/posts";

const replaceDashesWithSpaces = (str: string) => str.replace(/-/g, ' ');
const generateRandomColorByText = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }

    return color;
};

export default async function Index({params}: { params: { postId: string, postName: string } }) {
    const supabase = createServerComponentClient({cookies})
    const title = replaceDashesWithSpaces(decodeURI(params.postName));
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
                <div className="w-full bg-yellow-500 text-center py-8 text-white">
                    <h1 className="text-6xl open-sans">{post.title}</h1>
                    <h2 className="text-xl open-sans">{post.excerpt}</h2>
                </div>
            </div>
            <div className="flex items-start">
                <div className="w-1/4"></div>
                <div
                    className="my-4 max-w-2xl text-xl leading-relaxed bg-white p-16 box-content content"
                    dangerouslySetInnerHTML={{__html: post.content}}/>
                <div className="flex flex-wrap w-1/4 m-4">
                    {(post.tags || []).map(tag => (
                        <span
                            key={tag}
                            style={{backgroundColor: generateRandomColorByText(tag)}}
                            className="text-sm text-white rounded p-1 m-1 grayscale">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <hr/>
            <p>
                אהבתם? תשתפו! לא אהבתם? תנו ב"לייק" תפרגנו מה קרה?!
            </p>
        </div>
    );
};
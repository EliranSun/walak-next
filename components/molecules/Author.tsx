import {useTranslations} from "next-intl";
import Author from "@/types/Author";
import Post from "@/types/Post";

const Author = ({author, post}: { author: Author, post: Post }) => {
    const t = useTranslations('Author');

    return (
        <div className="py-4 flex flex-col items-center w-full box-border">
            <div>
                <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img
                        className="grayscale bright"
                        src={author.imageSrc}
                        alt={t("image.alt", {name: author.name})}
                    />
                </div>
            </div>
            <div className="text-right flex flex-col items-center justify-center w-full h-full border-b border-gray-300">
                <h3 className="text-3xl font-bold open-sans">
                    {author.name || t('by.anon')}
                </h3>
                <div className="opacity-70 mb-2">{author.title}</div>
            </div>
            {post.createdAt && (
                <div className="border-b border-gray-300 w-full text-center">
                    <div className="py-2 opacity-60 text-xs">
                        {new Date(post.createdAt).toLocaleString("he-IL", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Author;

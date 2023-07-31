import Icon from "@/components/atoms/Icon";
import {useTranslations} from "next-intl";
import Author from "@/types/Author";
import {Tags} from "@/components/molecules/Tags";

const Author = ({author, postDate, postTags}: { author: Author, postDate: Date, postTags: string[] }) => {
    const t = useTranslations('Author');

    return (
        <div className="px-8 py-4 flex flex-col items-center w-80">
            <div>
                <div className="w-24 h-24 rounded-full overflow-hidden bg-red-400">
                    <img
                        className="grayscale bright"
                        src={author.imageSrc}
                        alt={t("author.image")}
                    />
                </div>
            </div>
            <div className="text-right flex flex-col items-center justify-center w-full h-full border-b border-gray-300">
                <h3 className="text-3xl font-bold open-sans">
                    {author.name || t('by.anon')}
                </h3>
                <div className="opacity-70 mb-2">{author.title}</div>
            </div>
            {postDate && (
                <div className="border-b border-gray-300 w-full text-center">
                    <div className="py-2 opacity-60 text-xs">
                        {new Date(postDate).toLocaleString("he-IL", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                </div>
            )}
            <div className="flex m-t-8 m-b-8">
                <Icon name="Printer"/>
                {t('print')}
            </div>
            <div className="divider-dotted"/>
            <Tags tags={postTags}/>
            <img
                className="mt-10 w-40"
                alt="Advertisement"
                src="https://d2r55xnwy6nx47.cloudfront.net/uploads/2021/09/2021PodcastAd_Article_160.jpg"
            />
        </div>
    );
};

export default Author;

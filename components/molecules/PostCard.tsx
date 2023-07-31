'use client';
import {useTranslations} from "next-intl";
import Icon from "@/components/atoms/Icon";
import Link from "next/link";
import Post from "@/types/Post";

const replaceAllSpacesWithDashes = (str: string) => str.replace(/\s/g, '-');

export const PostCard = ({
    post
}: {
    post: Post
}) => {
    const t = useTranslations('PostCard');
    const {id, title, excerpt, imageSrc, timeToRead, isInteractive} = post;

    return (
        <Link href={`/posts/${id}/${replaceAllSpacesWithDashes(title)}`}>
            <div className="w-full flex flex-col items-center bg-white text-right hover:text-blue-500 cursor-pointer shadow-sm">
                <div className="aspect-[9/5] overflow-hidden">
                    <img src={imageSrc} alt={title} className="w-full"/>
                </div>
                <div className="p-1 text-right w-full flex flex-col justify-between px-4 py-2">
                    <div className="mb-2">
                        <h1 className="text-xl font-bold open-sans">{title}</h1>
                        <p className="text-base leading-tight">{excerpt}</p>
                    </div>
                    <div className="flex gap-1">
                        {isInteractive && <span className="text-xs bg-yellow-400 rounded p-1">{t('interactive')}</span>}
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Icon name="Clock" size={Icon.Sizes.SMALL}/>
                            {timeToRead} {t('minRead')}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

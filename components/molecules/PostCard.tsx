'use client';
import {useTranslations} from "next-intl";
import Icon from "@/components/atoms/Icon";
import Link from "next/link";
import Post from "@/types/Post";
import classNames from "classnames";
import {className} from "postcss-selector-parser";

const replaceAllSpacesWithDashes = (str: string) => str.replace(/\s/g, '-');

export const PostCard = ({
    post,
    isLean
}: {
    post: Post
    isLean?: boolean
}) => {
    const t = useTranslations('PostCard');
    const {id, title, excerpt, imageSrc, timeToRead, isInteractive} = post;

    return (
        <Link href={`/posts/${id}/${replaceAllSpacesWithDashes(title)}`}>
            <div className={classNames("flex flex-col items-center text-right hover:text-blue-500 cursor-pointer", {
                "bg-white shadow-sm w-full": !isLean,
                "w-60": isLean
            })}>
                <div className={classNames("overflow-hidden aspect-[9/5]")}>
                    <img src={imageSrc} alt={title} className={classNames("w-full")}/>
                </div>
                <div className={classNames("text-right w-full flex flex-col justify-between py-2", {
                    "px-4": !isLean
                })}>
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

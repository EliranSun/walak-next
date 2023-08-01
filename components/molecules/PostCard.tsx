'use client';
import {useTranslations} from "next-intl";
import Icon from "@/components/atoms/Icon";
import Link from "next/link";
import Post from "@/types/Post";
import classNames from "classnames";
import {className} from "postcss-selector-parser";
import {InteractiveTag} from "@/components/atoms/InteractiveTag";
import {VideoTag} from "@/components/atoms/VideoTag";

const replaceAllSpacesWithDashes = (str: string) => str.replace(/\s/g, '-');

export const PostCard = ({
    post,
    isLean,
    isLarge
}: {
    post: Post
    isLean?: boolean
    isLarge?: boolean
}) => {
    const t = useTranslations('PostCard');
    const {id, title, excerpt, imageSrc, timeToRead, isInteractive, hasVideo} = post;

    return (
        <Link href={`/posts/${id}/${replaceAllSpacesWithDashes(title)}`}>
            <div className={classNames("flex flex-col items-center text-right hover:text-blue-500 cursor-pointer", {
                "bg-white shadow-sm w-full": !isLean && !isLarge,
                "w-60": isLean,
                "border-b border-gray-300": isLarge
            })}>
                <div className={classNames("overflow-hidden", {
                    "h-[50vh]": isLarge,
                    "aspect-[9/5]": !isLarge
                })}>
                    <img src={imageSrc} alt={title} className="object-cover object-center w-full"/>
                </div>
                <div className={classNames("text-right w-full flex  justify-between py-2", {
                    "flex-col": !isLarge,
                    "px-4": !isLean && !isLarge,
                    "items-center h-full": isLarge
                })}>
                    <div className={classNames({
                        "my-4": isLarge,
                        "mb-2": !isLarge
                    })}>
                        <h1 className={classNames("font-bold open-sans", {
                            "text-3xl": isLarge,
                            "text-lg": !isLarge
                        })}>{title}</h1>
                        <p className="text-base leading-tight">{excerpt}</p>
                    </div>
                    <div className={classNames("flex", {
                        "items-center gap-2": isLarge,
                        "gap-1": !isLarge
                    })}>
                        {isInteractive && <InteractiveTag/>}
                        {hasVideo && <VideoTag/>}
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

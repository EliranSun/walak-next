'use client';

import {useTranslations} from "next-intl";
import Icon from "@/components/atoms/Icon";
import {InteractiveTag} from "@/components/atoms/InteractiveTag";
import {VideoTag} from "@/components/atoms/VideoTag";
import {Tag} from "@/components/atoms/Tag";

export const Tags = ({
                         tags,
                         isInteractive,
                         hasVideo
                     }: { tags: string[], isInteractive?: boolean, hasVideo?: boolean }) => {
    const t = useTranslations('Tags');

    return (
        <div className="hidden md:inline w-full box-border flex flex-wrap gap-2">
            <div className="flex gap-1">
                {tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </div>
            {isInteractive && <InteractiveTag/>}
            {hasVideo && <VideoTag/>}
            <div className="flex gap-1">
                {t('more')} <Icon name="ArrowLeft"/>
            </div>
        </div>
    );
};
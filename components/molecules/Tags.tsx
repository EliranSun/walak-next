'use client';

import {useTranslations} from "next-intl";
import Icon from "@/components/atoms/Icon";

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

export const Tags = ({tags}: { tags: string[] }) => {
    const t = useTranslations('Tags');

    return (
        <div className="w-full box-border">
            <div className="flex flex-wrap">
                {tags.map(tag => (
                    <span
                        key={tag}
                        style={{backgroundColor: generateRandomColorByText(tag)}}
                        className="text-sm text-white rounded p-1 m-1 grayscale">
                    {tag}
                </span>
                ))}
            </div>
            <span className="flex gap-1">
                {t('more')} <Icon name="ArrowLeft"/>
            </span>
        </div>
    );
};
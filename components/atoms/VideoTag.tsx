'use client';
import {useTranslations} from "next-intl";

export const VideoTag = () => {
    const t = useTranslations();
    return <span className="bg-blue-500 text-xs text-white rounded p-1">{t('video')}</span>;
};

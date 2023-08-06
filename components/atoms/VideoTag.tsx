'use client';
import {useTranslations} from "next-intl";

export const VideoTag = () => {
   const t = useTranslations("Tags");
   return <span className="bg-red-500 text-xs text-white rounded p-1">{t('video')}</span>;
};

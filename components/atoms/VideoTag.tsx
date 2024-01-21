'use client';
import {useTranslations} from "next-intl";

export const VideoTag = ({ isActive }: { isActive?: boolean }) => {
   const t = useTranslations("Tags");
   
   if (!isActive)
      return null;
   
   return <span className="bg-red-500 text-xs text-white rounded p-1">{t('video')}</span>;
};

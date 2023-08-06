'use client';
import {useTranslations} from "next-intl";

export const InteractiveTag = () => {
   const t = useTranslations("Tags");
   return <span className="bg-yellow-400 text-xs text-white rounded p-1">{t('interactive')}</span>;
};

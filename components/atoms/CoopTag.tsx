'use client';
import {useTranslations} from "next-intl";

export const CoopTag = () => {
   const t = useTranslations("Tags");
   return <span className="bg-blue-500 text-xs text-white rounded p-1">{t('coop')}</span>;
};

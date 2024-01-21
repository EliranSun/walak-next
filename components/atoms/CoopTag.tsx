'use client';
import {useTranslations} from "next-intl";

export const CoopTag = ({isActive}: {isActive?: boolean}) => {
   const t = useTranslations("Tags");
   
   if (!isActive)
      return null;
   
   return <span className="bg-blue-500 text-xs text-white rounded p-1">{t('coop')}</span>;
};

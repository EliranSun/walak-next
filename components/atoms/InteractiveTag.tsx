'use client';
import {useTranslations} from "next-intl";

export const InteractiveTag = ({ isActive }: { isActive?: boolean }) => {
   const t = useTranslations("Tags");
   
   if (!isActive)
      return null;
   
   return <span className="bg-yellow-400 text-xs text-white rounded p-1">{t('interactive')}</span>;
};

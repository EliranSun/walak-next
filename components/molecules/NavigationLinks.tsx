'use client';
import {useTranslations} from "next-intl";

export const NavigationLinks = () => {
   const t = useTranslations('NavigationLinks');

   return (
      <ul className="flex gap-4 open-sans text-sm">
         <li className="cursor-pointer hover:text-blue-500">{t('articles')}</li>
         <span>•</span>
         <li className="cursor-pointer hover:text-blue-500">{t('stories')}</li>
         <span>•</span>
         <li className="cursor-pointer hover:text-blue-500">{t('thoughts')}</li>
         <span>•</span>
         <li className="cursor-pointer hover:text-blue-500">{t('about')}</li>
      </ul>
   )
};

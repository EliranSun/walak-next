'use client';
import {useTranslations} from "next-intl";
import {Link} from "@/components/atoms/Link";

export const NavigationLinks = () => {
   const t = useTranslations('NavigationLinks');

   return (
      <ul className="flex gap-4 open-sans text-sm">
         <li className="cursor-pointer hover:text-blue-500">
            <Link href="/articles">{t('articles')}</Link>
         </li>
         <span>•</span>
         <li className="cursor-pointer hover:text-blue-500">{t('stories')}</li>
         <span>•</span>
         <li className="cursor-pointer hover:text-blue-500">{t('opinions')}</li>
         <span>•</span>
         <li className="cursor-pointer hover:text-blue-500">{t('ideas')}</li>
         <span>•</span>
         <li className="cursor-pointer hover:text-blue-500">{t('writers')}</li>
         <span>•</span>
         <li className="cursor-pointer hover:text-blue-500">{t('about')}</li>
      </ul>
   )
};

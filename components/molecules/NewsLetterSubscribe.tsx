'use client';
import {useTranslations} from "next-intl";

export const NewsLetterSubscribe = () => {
   const t = useTranslations('NewsLetterSubscribe');

   return (
      <div className="open-sans">
         <h1 className="font-black">{t('title')}</h1>
         <p className="text-sm">{t('description')}</p>
         <input
            className="w-full h-10 p-4 my-4"
            type="email" placeholder={t('input.placeholder')}/>
      </div>
   );
}
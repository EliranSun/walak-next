'use client';

import {useTranslations} from "next-intl";
import Icon from "@/components/atoms/Icon";

export const PostCard = ({
   title,
   imgSrc,
   excerpt,
   timeToRead
}: {
   title: string,
   imgSrc: string,
   excerpt?: string,
   timeToRead?: number
}) => {
   const t = useTranslations('PostCard');

   return (
      <div className="w-full flex flex-col items-center bg-white text-right hover:text-blue-500 cursor-pointer">
         <img src={imgSrc} alt={title} className="w-full"/>
         <div className="p-1 text-right w-full flex flex-col justify-between px-4 py-2">
            <div className="mb-2">
               <h1 className="text-xl font-bold open-sans">{title}</h1>
               <p className="text-base leading-tight">{excerpt}</p>
            </div>
            <p className="text-xs text-gray-400 flex items-center gap-1">
               <Icon name="Clock" size={Icon.Sizes.SMALL}/>
               {timeToRead} {t('minRead')}
            </p>
         </div>
      </div>
   );
};

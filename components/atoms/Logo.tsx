'use client';
import {useTranslations} from 'next-intl';
import {useState} from "react";
import {Link} from "@/components/atoms/Link";


export const Logo = ({withTitle = false}: { withTitle?: boolean }) => {
   const [isHovered, setIsHovered] = useState(false);
   const t = useTranslations('Header.logo');
   return (
      <Link href={'/'}>
         <div
            className="flex flex-col cursor-pointer text-yellow-950/90 hover:text-blue-500"
            onMouseLeave={() => setIsHovered(false)}
            onMouseEnter={() => setIsHovered(true)}>
            <img
               src={isHovered ? "/logo-blue.png" : "/logo.png"}
               className="w-28"
               alt={t('alt')}
            />
            {withTitle && (
               <span className="text-xs -mt-3 tracking-wider">
					{t('title')}
				</span>
            )}
         </div>
      </Link>
   );
};
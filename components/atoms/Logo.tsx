'use client';
import {useTranslations} from 'next-intl';

export const Logo = ({withTitle = false}: { withTitle?: boolean }) => {
   const t = useTranslations('Header.logo');
   return (
      <div className="flex flex-col">
         <img
            src="/logo.png"
            className="w-28"
            alt={t('alt')}
         />
         {withTitle && (
            <span className="text-yellow-950/90 text-xs -mt-3 tracking-wider">
					{t('title')}
				</span>
         )}
      </div>
   );
};
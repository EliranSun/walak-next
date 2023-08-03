import React from 'react';
import NextIntlLink from 'next-intl/link';

export const Link = ({
   href,
   children,
   locale
}: {
   href: string,
   children: React.ReactNode,
   locale?: string
}) => {
   return (
      <NextIntlLink href={href} locale={locale}>
            <span className="cursor-pointer hover:text-blue-500">
                {children}
            </span>
      </NextIntlLink>
   );
};

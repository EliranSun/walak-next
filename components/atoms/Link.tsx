import React from 'react';
import NextIntlLink from 'next-intl/link';

export const Link = ({
   href,
   children,
   locale,
   target
}: {
   href: string,
   children: React.ReactNode,
   locale?: string,
   target?: string
}) => {
   return (
      <NextIntlLink href={href} locale={locale} target={target}>
            <span className="cursor-pointer hover:text-blue-500">
                {children}
            </span>
      </NextIntlLink>
   );
};

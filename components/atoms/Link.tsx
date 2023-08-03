import React from 'react';
import NextIntlLink from 'next-intl/link';

export const Link = ({
   href,
   children
}: {
   href: string,
   children: React.ReactNode,
}) => {
   return (
      <NextIntlLink href={href}>
            <span className="cursor-pointer hover:text-blue-500">
                {children}
            </span>
      </NextIntlLink>
   );
};

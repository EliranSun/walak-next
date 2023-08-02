import NextLink from 'next/link';

export const Link = ({href, children, className}: { href: string, children: React.ReactNode, className?: string }) => {
    return (
        <NextLink href={href}>
            <span className="cursor-pointer hover:text-blue-500">
                {children}
            </span>
        </NextLink>
    );
};

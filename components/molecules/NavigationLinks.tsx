'use client';
import {useTranslations} from "next-intl";
import {Link} from "@/components/atoms/Link";

const links = [
    'articles',
    'stories',
    'opinions',
    'ideas',
    'writers',
    'about',
]

export const NavigationLinks = () => {
    const t = useTranslations('NavigationLinks');

    return (
        <ul className="hidden md:flex gap-4 open-sans text-sm">
            {links.map((link, index) => {
                return (
                    <div key={index} className="cursor-pointer hover:text-blue-500">
                        <Link href={`/${link}`}>{t(link)}</Link>
                    </div>
                )
            })}
        </ul>
    );
}

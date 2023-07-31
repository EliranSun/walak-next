'use client';
import {useTranslations} from "next-intl";

export const NewsLetterSubscribe = () => {
    const t = useTranslations('NewsLetterSubscribe');

    return (
        <div className="open-sans border-dashed border-2 border-yellow-600 p-4">
            <h1 className="font-black">{t('title')}</h1>
            <p className="text-sm">{t('description')}</p>
            <input
                className="w-full h-10 p-4 my-4"
                type="email" placeholder={t('input.placeholder')}/>
        </div>
    );
}
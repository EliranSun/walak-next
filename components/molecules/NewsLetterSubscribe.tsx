'use client';
import {useTranslations} from "next-intl";
import classNames from "classnames";

export const NewsLetterSubscribe = ({isBordered}: { isBordered?: boolean }) => {
    const t = useTranslations('NewsLetterSubscribe');

    return (
        <div className={classNames("open-sans", {
            "border-t border-b border-gray-300 py-4": isBordered
        })}>
            <h1 className="font-black">{isBordered ? t('titleAttention') : t('title')}</h1>
            {!isBordered && <p className="text-sm">{t('description')}</p>}
            <input
                className="w-full h-10 p-4 mt-2"
                type="email" placeholder={t('input.placeholder')}/>
        </div>
    );
}
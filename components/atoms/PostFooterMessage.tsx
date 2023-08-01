'use client'
import {useTranslations} from "next-intl";

export const PostFooterMessage = () => {
    const t = useTranslations('PostFooterMessage');
    return <p>{t('message')}</p>;
}
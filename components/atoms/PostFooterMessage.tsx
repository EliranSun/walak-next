'use client'
import {useTranslations} from "next-intl";

export const PostFooterMessage = () => {
    const t = useTranslations('PostFooterMessage');
    
    return (
       <div className="border-t border-b w-full py-4">
            <p>{t('message')}</p>
       </div>
    );
}
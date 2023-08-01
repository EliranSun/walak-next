'use client';
import Icon from "@/components/atoms/Icon";
import {useTranslations} from "next-intl";

export const ShareButton = () => {
    const t = useTranslations('ShareButton');
    return (
        <div className="flex m-t-8 m-b-8 gap-1">
            <Icon name="Share"/>
            {t('label')}
        </div>
    )
}
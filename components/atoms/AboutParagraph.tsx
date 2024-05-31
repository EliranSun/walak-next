'use client';
import {useTranslations} from "next-intl";
import {useMemo} from "react";

export const AboutParagraph = ({isShort}: { isShort?: boolean }) => {
    const t = useTranslations('About');
    const text = useMemo(() => {
        let key = 'full';
        if (isShort) {
            key = 'short';
        }

        return t.rich(key, {
            div: (chunks) => <div>{chunks}</div>,
            p: (chunks) => <p className="mb-2">{chunks}</p>,
            strong: (chunks) => <strong>{chunks}</strong>
        });
    }, [isShort]);

    return (
        <div className="max-w-sm text-sm">
            {text}
        </div>
    )
}
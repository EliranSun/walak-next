import {NextResponse} from "next/server";

const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate({
    key: "AIzaSyA455yJXOa8oAcpnXQZkR_F4rxEye-1sZY"
});

const HEBREW_TARGET_LANGUAGE = 'he';
const KOREAN_TARGET_LANGUAGE = 'ko';
const JAPANESE_TARGET_LANGUAGE = 'ja';

const TargetLanguages = {
    [HEBREW_TARGET_LANGUAGE]: HEBREW_TARGET_LANGUAGE,
    [KOREAN_TARGET_LANGUAGE]: KOREAN_TARGET_LANGUAGE,
    [JAPANESE_TARGET_LANGUAGE]: JAPANESE_TARGET_LANGUAGE
};

enum TargetLanguage {
    HE = 'he',
    KO = 'ko',
    JA = 'ja'
}

export async function POST(request: Request) {
    try {
        const requestJSON = await request.json();
        const {content, targetLanguages}: { content: string, targetLanguages: TargetLanguage[] } = requestJSON;

        if (!content || !targetLanguages || targetLanguages.length === 0) {
            return NextResponse.json({
                error: "content and targetLanguages are required"
            });
        }

        let translations = {
            [TargetLanguage.HE]: "",
            [TargetLanguage.KO]: "",
            [TargetLanguage.JA]: "",
        }

        let translationsResp;
        for (const targetLanguage of targetLanguages) {
            translationsResp = await translate.translate(content, TargetLanguages[targetLanguage]);

            translationsResp = Array.isArray(translationsResp) ? translationsResp : [translationsResp];
            translationsResp.forEach((t: string) => {
                if (typeof t === 'string') {
                    translations[targetLanguage] += `${t}\n`;
                }
            });
        }

        return NextResponse.json({
            [TargetLanguage.HE]: translations[TargetLanguage.HE],
            [TargetLanguage.KO]: translations[TargetLanguage.KO],
            [TargetLanguage.JA]: translations[TargetLanguage.JA],
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({error: "Something went wrong. Please try again. Is that OK?"});
    }
}
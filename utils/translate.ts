const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate({
    key: "AIzaSyA455yJXOa8oAcpnXQZkR_F4rxEye-1sZY"
});

const TARGET_LANGUAGE = 'he';

export const getTranslation = async (content: string) => {
    let result = "";
    let translationsResp = await translate.translate(content, TARGET_LANGUAGE);

    translationsResp = Array.isArray(translationsResp) ? translationsResp : [translationsResp];
    translationsResp.forEach((t: string) => {
        if (typeof t === 'string') {
            result += `${t}\n`;
        }
    });

    return result;
}
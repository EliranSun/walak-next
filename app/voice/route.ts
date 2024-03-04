import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

const API_URL = "https://api.elevenlabs.io/v1/text-to-speech";
const MALE_VOICE_ID = "pNInz6obpgDQGcFmaJgB" // adam
const FEMALE_VOICE_ID = "ThT5KcBeYPX3keUQqHPh" // dorothy
const MODEL_V1 = "eleven_multilingual_v1";
const MODEL_V2 = "eleven_multilingual_v2";

const encodeFileName = (text: string, name: string, gender: string) => {
    // return encodeURIComponent(`${text.slice(0, 20)}-${name}-${gender}`);
    return `${text.slice(0, 20)}-${name}-${gender}`;
};

const jsonResponse = (data: any) => {
    return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://html-classic.itch.zone",
        }
    });
}

const downloadAudioFromUrl = async (url: string) => {
    const response = await fetch(url);
    const audioBlob = await response.blob();

    return new NextResponse(audioBlob, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://html-classic.itch.zone",
        }
    });
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const gender = searchParams.get("gender");
    const text = searchParams.get("text");
    const name = searchParams.get("name");

    if (!gender || !text || !name) {
        return jsonResponse({
            error: "text, name and gender are required fields"
        });
    }

    const fileName = encodeFileName(text, name, gender);
    const path = `games/ryan-is-cold/${fileName}.mp3`;

    const { blobs } = await list();

    for (const blob of blobs) {
        if (blob.pathname === path) {
            // return downloadAudioFromUrl(blob.downloadUrl);
            return jsonResponse({
                downloadUrl: blob.downloadUrl,
                audioClipLength: 5
            });
        }
    }

    const voiceId = gender.toLowerCase() === "male"
        ? MALE_VOICE_ID
        : FEMALE_VOICE_ID;

    const modelId = voiceId === MALE_VOICE_ID
        ? MODEL_V2
        : MODEL_V1;

    const response = await fetch(`${API_URL}/${voiceId}`, {
        method: "POST",
        body: JSON.stringify({
            model_id: modelId,
            text,
            voice_settings: {
                similarity_boost: 0.52,
                stability: 0.71,
                style: 0,
                use_speaker_boost: true
            }
        }),
        headers: {
            "Content-Type": "application/json",
            "xi-api-key": "3fa9af49ce49fb0e324cce37f59ae4f2"
        }
    });

    const results = await response.blob();
    const { downloadUrl } = await put(path, results, {
        access: 'public',
        contentType: 'audio/mpeg'
    });

    // return downloadAudioFromUrl(downloadUrl);
    return jsonResponse({
        downloadUrl,
        audioClipLength: 5
    });
}

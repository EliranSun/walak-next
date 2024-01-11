export const generateNewChapter = async ({
    siblingName,
    genre,
    theme,
    previousChapters,
    readerChoice,
}: {
    siblingName: string;
    genre: string;
    theme: string;
    previousChapters: string;
    readerChoice: number;
}, {
    onSuccess,
    onError,
}: {
    onSuccess: ({content, translation}: { content: string, translation: string }) => void;
    onError: (error: string) => void;
}) => {
    try {
        const params = {
            siblingName,
            genre,
            theme,
            previousChapters,
            readerChoice,
        };
        console.log({params});

        const response = await fetch("/story/v2/chapter", {
            method: "POST",
            body: JSON.stringify(params)
        });
        const results = await response.json();
        onSuccess({
            content: results.content,
            translation: results.translation
        });
    } catch (error) {
        console.error(error);
        onError("Something went wrong. Please try again.");
    }
};

export const saveNewChapters = async ({title, chapters, personName, genre, theme}: {
    title: string;
    personName: string;
    genre: string;
    theme: string;
    chapters: {
        translation: string;
        content: string;
    }[]
}) => {
    try {
        await fetch("/story/v2/chapter", {
            method: "PUT",
            body: JSON.stringify({
                personName,
                title,
                genre,
                theme,
                chapters
            }),
        });

        return true;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong. Please try again.");
    }
};
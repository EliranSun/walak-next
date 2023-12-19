'use client';
import {RadioButton} from "@/components/atoms/RadioButton";
import {generateNewChapter, saveNewChapters} from "@/utils/chapter";
import {useState} from "react";

export const NewChapter = ({
    personName,
    theStoryThusFar = "",
    theme = "",
    genre = "",
    title = ""
}: {
    personName: string,
    theStoryThusFar: string,
    theme: string,
    genre: string,
    title: string,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [lastPlayerChoice, setLastPlayerChoice] = useState(0);
    const [newChapter, setNewChapter] = useState<{
        content: string,
        translation: string,
    }>({
        content: '',
        translation: '',
    });

    return (
        <div>
            <div className="w-full">
                <h2 className="text-5xl w-full text-center">{personName.toUpperCase()} CHOOSE:</h2>
                <div className="flex gap-4">
                    <RadioButton label="Option 1" value={1} name="choice" onClick={() => setLastPlayerChoice(1)}/>
                    <RadioButton label="Option 2" value={2} name="choice" onClick={() => setLastPlayerChoice(2)}/>
                </div>
            </div>
            <label>
                The new chapter will be a part of the story <span className="text-3xl">{title.toUpperCase()}</span>; in
                the{' '}
                <span className="text-3xl">{genre.toUpperCase()}</span> genre and the theme will be{' '}
                of <span className="text-3xl">{theme.toUpperCase()}</span>.
            </label>
            <button
                className="mt-10 mb-20 m-auto bg-black text-white p-4 rounded-lg hover:bg-white hover:text-black border border-black w-1/2"
                onClick={async () => {
                    setIsLoading(true);
                    try {
                        if (!lastPlayerChoice) {
                            alert('Please choose an option.');
                        }

                        await generateNewChapter({
                            siblingName: personName,
                            genre,
                            theme,
                            previousChapters: theStoryThusFar,
                            readerChoice: lastPlayerChoice,
                        }, {
                            onSuccess: (results) => {
                                setIsLoading(false);
                                setNewChapter({
                                    content: results.content,
                                    translation: results.translation,
                                });
                            },
                            onError: (error) => {
                                console.error(error);
                                setIsLoading(false);
                            }
                        });
                    } catch (error) {
                        console.error(error);
                        setIsLoading(false);
                    }
                }}>
                {isLoading ? 'LOADING...' : 'GENERATE CHAPTER'}
            </button>
            {newChapter.content ? <textarea value={newChapter.content} onChange={(e) => setNewChapter(prev => {
                return {
                    ...prev,
                    content: e.target.value,
                };
            })}/> : null}
            {newChapter.translation ? <textarea value={newChapter.translation} onChange={(e) => setNewChapter(prev => {
                return {
                    ...prev,
                    translation: e.target.value,
                };
            })}/> : null}
            {newChapter.content ?
                <button
                    className="mt-10 mb-20 m-auto bg-black text-white p-4 rounded-lg hover:bg-white hover:text-black border border-black w-1/2"
                    onClick={async () => {
                        await saveNewChapters({
                            title,
                            personName,
                            genre,
                            theme,
                            chapters: [
                                {
                                    content: newChapter.content,
                                    translation: newChapter.translation,
                                }
                            ]
                        })
                    }}>
                    SAVE CHAPTER
                </button> : null}
            <div className="flex gap-4">
                <p className="max-w-[700px] p-8 whitespace-pre-wrap">{theStoryThusFar}</p>
            </div>
        </div>
    );
};
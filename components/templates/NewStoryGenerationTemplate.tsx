'use client';
import {useRouter, usePathname, useSearchParams} from "next/navigation";
import {RadioButton} from "@/components/atoms/RadioButton";
import {useState, useEffect} from "react";
import {Spinner} from "@phosphor-icons/react";
import {generateNewChapter} from "@/utils/chapter";

const Themes = [
    "overcoming adversity",
    "the quest for identity",
    "the power of love",
    "corruption of power",
    "human vs. the machine",
    "sacrifice and redemption",
    "triumph of of the underdog",
    "revenge and betrayal",
    "complexity of family dynamics",
    "danger of overreaching ambition",
    "the folly of youth",
    "the loss of innocence",
];

const Genres = [
    "action",
    "comedy",
    "crime",
    "drama",
    "fantasy",
    "horror",
    "mystery",
    "romance",
    "thriller",
    "western",
    "sci-fi",
    "animation",
    "documentary",
    "musical",
];

export const NewStoryGenerationTemplate = ({personName}: { personName: string }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [title, setTitle] = useState<string>(searchParams.get("title") || "");
    const [selectedGenre, setSelectedGenre] = useState<string>(searchParams.get("genre") || "");
    const [selectedTheme, setSelectedTheme] = useState<string>(searchParams.get("theme") || "");
    const [storyThusFar, setStoryThusFar] = useState<string>(searchParams.get("storyThusFar") || "");
    const [lastReaderChoice, setLastReaderChoice] = useState<number>(parseInt(searchParams.get("lastReaderChoice") || "0"));
    const [newChapter, setNewChapter] = useState<string>("");
    const [newTranslation, setNewTranslation] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("genre", selectedGenre);
        params.set("theme", selectedTheme);
        params.set("storyThusFar", storyThusFar);
        params.set("lastReaderChoice", lastReaderChoice.toString());
        params.set("title", title);

        router.replace(`${pathname}?${params.toString()}`, {
            // @ts-ignore-next-line
            scroll: false,
        });
    }, [selectedGenre, selectedTheme, storyThusFar, lastReaderChoice, title]);

    return (
        <>
            <div className="p-10">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3">
                        <h2 className="text-4xl">Choose story genre:</h2>
                        <div className="flex flex-wrap md:text-3xl">
                            {Genres.map((genre) => {
                                return (
                                    <RadioButton
                                        key={genre}
                                        onClick={() => setSelectedGenre(genre)}
                                        isChecked={genre === selectedGenre}
                                        label={genre}
                                        value={genre}
                                        name="genre"/>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-full md:w-2/3">
                        <h2 className="text-4xl">Choose story theme:</h2>
                        <div className="flex flex-wrap md:text-3xl">
                            {Themes.map((theme) => {
                                return (
                                    <RadioButton
                                        key={theme}
                                        label={theme}
                                        value={theme}
                                        isChecked={theme === selectedTheme}
                                        onClick={() => setSelectedTheme(theme)}
                                        name="theme"/>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-5xl">
                        If you have the start of a story, add it here. Separate chapters with four dashes (----).
                    </h2>
                    <textarea
                        className="text-xl w-[700px] h-[33vh] border border-black p-4"
                        placeholder="The story thus far..."
                        value={storyThusFar}
                        onChange={(event) => setStoryThusFar(event.target.value)}
                    />
                    <div className="text-5xl flex w-full gap-8 items-center">
                        <input type="text"
                               placeholder="TITLE"
                               value={title}
                               onChange={event => setTitle(event.target.value)}/>
                        <div className="flex flex-col">
                            <button
                                className="bg-black text-white p-4 rounded-lg hover:bg-white hover:text-black border border-black"
                                onClick={async () => {
                                    setIsLoading(true);

                                    try {
                                        const response = await fetch("/story/v2/title", {
                                            method: "POST",
                                            body: JSON.stringify({
                                                personName,
                                                content: storyThusFar,
                                                genre: selectedGenre,
                                                theme: selectedTheme,
                                            })
                                        });
                                        const results = await response.json();
                                        setTitle(results.title);
                                    } catch (error) {
                                        console.error(error);
                                    } finally {
                                        setIsLoading(false);
                                    }
                                }}>
                                {isLoading ? <Spinner size={32} className="animate-spin"/> : "GENERATE TITLE"}
                            </button>
                            <label className="text-sm">
                                You can either generate the title before the story or after. They affect each
                                other.<br/>
                                It is best to generate after setting the story theme & genre though.
                            </label>
                        </div>
                    </div>
                    <h2 className="text-4xl">
                        Given a story, you must select what the reader chose on the last chapter provided:
                    </h2>
                    <RadioButton
                        onClick={() => setLastReaderChoice(1)}
                        label="Option 1"
                        isChecked={lastReaderChoice === 1}
                        value={1}
                        name="player-choice"/>
                    <RadioButton
                        onClick={() => setLastReaderChoice(2)}
                        label="Option 2"
                        isChecked={lastReaderChoice === 2}
                        value={2}
                        name="player-choice"/>
                </div>
                <button
                    className="text-5xl bg-black text-white p-4 rounded-lg hover:bg-white hover:text-black border border-black"
                    onClick={async () => {
                        setIsLoading(true);
                        try {
                            await generateNewChapter({
                                siblingName: personName,
                                genre: selectedGenre,
                                theme: selectedTheme,
                                previousChapters: storyThusFar,
                                readerChoice: lastReaderChoice,
                            }, {
                                onSuccess: (results) => {
                                    setNewChapter(results.content);
                                    setNewTranslation(results.translation);
                                    setIsLoading(false);
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
                    }}
                >
                    {isLoading ? <Spinner size={32} className="animate-spin"/> : "GENERATE STORY"}
                </button>
                {newChapter ?
                    <textarea
                        className="text-xl w-[700px] h-[33vh] border border-black p-4"
                        placeholder="The story thus far..."
                        value={newChapter}
                        onChange={(event) => setNewChapter(event.target.value)}/> : null}
                {newChapter ?
                    <button
                        className="text-5xl bg-black text-white p-4 rounded-lg hover:bg-white hover:text-black border border-black"
                        onClick={async () => {
                            const chapters = storyThusFar.split("----").filter(Boolean).map((chapter) => ({
                                content: chapter.trim(),
                                translation: ""
                            }));
                            setIsLoading(true);

                            const params = {
                                personName,
                                title,
                                genre: selectedGenre,
                                theme: selectedTheme,
                                chapters: chapters.concat({
                                    content: newChapter.trim(),
                                    translation: newTranslation.trim()
                                })
                            };

                            console.log({params});

                            try {
                                await fetch("/story/v2/chapter", {
                                    method: "PUT",
                                    body: JSON.stringify(params),
                                });
                            } catch (error) {
                                console.error(error);
                            } finally {
                                setIsLoading(false);
                            }
                        }}>SAVE CHAPTERS</button> : null}
            </div>
        </>
    )
};


/*
**Chapter 1: Betrayal among stars**

I watched as Eliran, my boyfriend, tinkered with our spaceship's console. As an intergalactic botanist, he claimed his interest lay in space flora, but these days he was more absorbed in AI systems. That evening, our spaceship received a mysterious transmission which changed colors on Eliran's usually stoic face. Fiddling with the cryptic message, Eliran decoded it to say, "Galaxy 12B heading for self-destruction. Reason... Betrayal."

I suppressed my surprise, wondering who could betray us in this vast space. Was it someone we knew? Or did the betrayal come from within our own spaceship?

 1. *Investigate the source of this peculiar transmission.*
 2. *Ignoring the threat, continue the journey mapping extraterrestrial plants.*

----

**Chapter 2: Shadows of Suspicion**

Choosing to investigate, I confronted Eliran about the strange message. Shocked, he admitted it came from his ex-lover and research partner, Delara. Despite their bitter past, she was warning us of a conspiracy within our crew.

 1. *Nofar confronts our crew members about the supposed conspiracy.*
 2. *Nofar privately investigate our crew to determine the traitor.*

----


* */
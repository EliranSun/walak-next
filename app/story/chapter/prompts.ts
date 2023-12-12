export const firstChapterPrompt = ({
    title,
    siblingName,
    siblingType,
    feeling,
    genre,
    currentTime
}: {
    title: string,
    siblingName: string,
    siblingType: string,
    feeling: string,
    genre: string,
    currentTime: string
}) => {
    const timeHour = currentTime.split(":")[0];
    const isMorning = Number(timeHour) < 12 && Number(timeHour) > 6;
    // const timeMessage = `In addition include the current time - ${currentTime} - somehow in the chapter.`;

    return `
   You are a storyteller. 
   Create a short first chapter for a story with a title of "${title}".
   This is chapter 1 out of 7.
   The chapter will include me, Eliran, and my ${siblingType} ${siblingName}.
   The chapter should encapsulate the feeling of being ${feeling} and the genre should be ${genre}.
   
   The chapter should take place in the ${isMorning ? "morning" : "night"}.

   Most importantly - at the end of the chapter present two options for the reader to choose from. 
   These choices will affect the rest of the story. Return these options in the following format:
      [*option 1*] 
      [*option 2*]
   
   Limit the chapter to around 400 characters.
   Use simple language/terminology!
   Output nothing but the story chapter!`;
};
export const nthChapterPrompt = ({
    title,
    chapterNumber,
    theStoryThusFar,
    siblingType,
    siblingName,
    currentTime,
    feeling,
    genre,
    chosenOption
}: {
    title: string,
    chapterNumber: number,
    theStoryThusFar: string,
    siblingType: string,
    siblingName: string,
    currentTime: string,
    feeling: string,
    genre: string,
    chosenOption: number
}) => {
    const timeHour = currentTime.split(":")[0];
    const isMorning = Number(timeHour) < 12 && Number(timeHour) > 6;
    let storyExtraDirection = "";
    switch (chapterNumber) {
        case 5:
            storyExtraDirection = "The story is past the middle point now. It should present a conflict or a problem.";
            break;

        case 6:
            storyExtraDirection = "The story will be resolved in the next chapter. Start to wrap things up.";
            break;

        case 7:
            storyExtraDirection = "This is the final chapter. The story should be resolved now.";
            break;
    }

    // const timeMessage = `In addition include the current time - ${currentTime} - somehow in the chapter.`;
    const optionsMessage = `
    Most importantly - at the end of the chapter present two options for the reader to choose from. 
    These choices will affect the rest of the story. Return these options in the following format:
      [*option 1*] 
      [*option 2*]
   `;

    return `
   You are a storyteller.
   Create a chapter for a story based on the title "${title}", based of the story thus far below, and based on a previous
   choice made by the reader. The reader chose option number ${chosenOption}. The choice is out of two options from the 
   previous chapter, written below. Based on the given choice, continue the story and write this current chapter.
   
   The chapter should take place in the ${isMorning ? "morning of the following day." : "night of the same day"} and
   the events occurring in this chapter should make sense based on the time passed since the previous chapter.   

    This chapter should include me, Eliran, and my ${siblingType} ${siblingName}.
    The chapter should encapsulate the feeling of being ${feeling} and the genre should be ${genre}.
    This is chapter number ${chapterNumber} out of 7.
   ${storyExtraDirection}
    
     ${chapterNumber < 7 && optionsMessage}
    
    Limit the chapter to around 400 characters.
    Use simple language/terminology!
    Output nothing but the story chapter!
   
    The story thus far:
    ${theStoryThusFar}`
};
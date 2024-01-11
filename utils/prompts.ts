const CHAPTER_CHARACTER_LIMIT_MAX = 800;
const CHAPTER_CHARACTER_LIMIT_MIN = 600;

const storyLimitMessage = `The chapter must be between ${CHAPTER_CHARACTER_LIMIT_MIN} and ${CHAPTER_CHARACTER_LIMIT_MAX} characters long!`;

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
   You are a professional storyteller.
    
   Write a short first chapter for a story using simple and clear English with a title of "${title}".
   This is chapter 1 out of 7.
   The chapter will include me, Eliran, and my ${siblingType} ${siblingName}.
   The chapter should encapsulate the feeling of being ${feeling} and the genre should be ${genre}.
   
   The story should start in the ${isMorning ? "morning" : "night"}.

   Most importantly - at the end of the chapter present two options for the reader to choose from. 
   These choices will affect the rest of the story. Return these options in the following format:
      [*option 1*] 
      [*option 2*]
   
   ${storyLimitMessage}
   
   The language should be easy to understand, avoiding complex sentences and idioms, making it accessible for people who are learning English.
   
   Output nothing but the story chapter!`;
};
export const nthChapterPrompt = ({
   title,
   chapterNumber,
   theStoryThusFar,
   siblingType,
   siblingName,
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
   You are a professional storyteller.
   Write a chapter for a story using simple and clear English, based on the title "${title}", based of the story thus far below, and based on a previous
   choice made by the reader. 
   
   The reader chose option number ${chosenOption}. The choice is out of two options from the 
   previous chapter, written below. Based on the given choice, continue the story and write this current chapter. 
   Do not mention the choice or the reader - just continue the story as usual.
   
   This chapter should include me, Eliran, and my ${siblingType} ${siblingName}.
   The chapter should encapsulate the feeling of being ${feeling} and the genre should be ${genre}.
   This is chapter number ${chapterNumber} out of 7.
   ${storyExtraDirection}
   
   ${chapterNumber < 7 && optionsMessage}
    
   ${storyLimitMessage}

    The language should be easy to understand, avoiding complex sentences and idioms, making it accessible for people who are learning English.

    Output nothing but the story chapter!
   
    The story thus far:
    ${theStoryThusFar}`
};

export const getFirstChapterPrompt = ({
   genre = 'sci-fi',
   theme = 'betrayal',
   siblingName = ''
}: {
   genre: string,
   theme: string,
   siblingName: string
}) => {
   const relation = siblingName.toLowerCase() === 'nofar' ? 'girlfriend' : 'sibling';
   return `
You are a professional storyteller.
Create a first short chapter in a story that will have 7 chapters. The genre of the chapter should be ${genre} and the theme of the story should be ${theme}. 
The story should involve me, Eliran and my ${relation} ${siblingName} The story should be told from the perspective of ${siblingName}. 

${storyLimitMessage}

Most importantly - at the end of the chapter, Generate two options for the story to follow the reader will have to choose from.

Output nothing but the story chapter!
    `;
};

export const getNewChapterPrompt = ({
   genre = 'sci-fi',
   theme = 'betrayal',
   previousChapters,
   readerChoice,
}: {
   siblingName: string,
   genre: string,
   theme: string,
   previousChapters: string,
   readerChoice: string,
}) => {
   return `
You are a professional storyteller. 
Continue a short story by creating a new chapter for it, based on the previous chapters, and based on the reader's choice provided. 
The story should conclude at chapter 7. This is chapter number ${previousChapters.length + 1}.
The story genre is ${genre}, and the theme of the story is ${theme}. 

${storyLimitMessage}

Most importantly - at the end of the chapter, Generate two options for the story to follow the reader will have to choose from.

Output nothing but the story chapter! 

=== Previous chapters=== 
${previousChapters.trim()}

===
Reader's choose option number: ${readerChoice}
    `
};

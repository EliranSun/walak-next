const AVERAGE_HUMAN_READING_SPEED = 190;

export const calculateReadingTime = (text: string) => {
   const words = text.split(" ");
   const minutes = words.length / AVERAGE_HUMAN_READING_SPEED;
   return Math.round(minutes);
};
import { LibraryWord } from "models/library";
import { WordsValues } from "models/main";

export const normalizeLibraryWords = (word: LibraryWord): WordsValues => {
  return {
    english: word.word,
    russia: word.translate[0],
    isActive: true,
  };
};

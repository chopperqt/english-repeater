import { WordsValues } from "models/main";

export const getNormalizeWords = (words: WordsValues[]) => {
  return words.reduce((acc: WordsValues[], word) => {
    if (!word) {
      return acc
    }

    const {
      english,
      russia,
    } = word

    if (!english && !russia) {
      return acc
    }

    return [
      ...acc,
      word,
    ]
  }, [])
}
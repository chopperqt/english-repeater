import { StatusTranslate } from "services/game/game";

export const checkTranslate = (word: string, translate: string): StatusTranslate => {
  const formattedWord = word
    .replaceAll(' ', '')
    .toLowerCase()

  const formattedTranslate = translate
    .replaceAll(' ', '')
    .toLowerCase()

  if (formattedWord === formattedTranslate) {
    return 'COMPLETE'
  }

  return 'ERROR'
}
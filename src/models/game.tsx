export interface GameForm {
  word: string
}
export interface GameErrorWords {
  word: GameForm['word']
  translate: GameForm['word']
  enteredWord: GameForm['word']
}
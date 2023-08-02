export interface LibraryWord {
  id: number;
  userID: string;
  word: string;
  translate: string[];
  pined: boolean;
  createdAt: Date | string;
}

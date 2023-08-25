import { array, boolean, date, number, object, Output, string } from "valibot";

export const WordSchema = object({
  id: number(),
  userID: string(),
  word: string(),
  translate: array(string()),
  pinded: boolean(),
  createdAt: date(),
});

export type LibraryWord = Output<typeof WordSchema>;

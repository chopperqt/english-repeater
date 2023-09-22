import { array, date, number, object, Output, string } from "valibot";

export const StatisticSchema = object({
  id: number(),
  user_id: string(),
  created_at: date(),
  correct: number(),
  errors: number(),
  error_words: array(object({
    word: string(),
    translate: string(),
    enter: string(),
  })),
  correct_words: array(object({
    word: string(),
    translate: string(),
    enter: string(),
  })),
});

export type StatisticModel = Output<typeof StatisticSchema>;

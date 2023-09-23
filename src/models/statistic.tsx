import { date, number, object, Output, string } from "valibot";

export const StatisticSchema = object({
  id: number(),
  user_id: string(),
  created_at: date(),
  correct: number(),
  errors: number(),
  error_words: string(),
  correct_words: string(),
});

export type StatisticModel = Output<typeof StatisticSchema>;

export type StatisticModelWrite = Omit<StatisticModel, 'id' | 'created_at'>

import supabase from "api";

import { StatisticModel, StatisticModelWrite } from "models/statistic";

/**
 * Записывание статистики по результатом повтороа в БД
 * @param body - Статистика
 */
export const postStatistic = async (body: StatisticModelWrite): Promise<StatisticModel | null> => {
  try {
    const { data } = await supabase
      .from("statistic")
      .insert(body)

    return data
  } catch (_) {
    return null
  }
}

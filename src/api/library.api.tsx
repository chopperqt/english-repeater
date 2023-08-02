import supabase from "api";

import type { LibraryWord } from "models/library";

/**
 * Событие получения закрепленных слов из БД
 * @param userID - Идентификатор пользователя
 */
export const getPinWords = async (
  userID: string
): Promise<LibraryWord[] | null> => {
  try {
    const { data, error } = await supabase
      .from("library")
      .select("*")
      .limit(15)
      .match({
        userID,
        pined: true,
      });

    if (error) {
      return null;
    }

    return data;
  } catch (_) {
    return null;
  }
};

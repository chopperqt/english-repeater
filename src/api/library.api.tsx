import supabase from "api";
import { normalizeLibraryWords } from "helpers/normalizeLibraryWords";

import type { LibraryWord } from "models/library";
import { setWords } from "services/game/game";
import { store } from "services/store";

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

    const normalizedPinWords = data.map(normalizeLibraryWords);

    store.dispatch(setWords(normalizedPinWords));

    return data;
  } catch (_) {
    return null;
  }
};

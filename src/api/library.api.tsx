import supabase from "api";
import { normalizeLibraryWords } from "helpers/normalizeLibraryWords";

import { setOnlyWords } from "services/settings/settings";
import { store } from "services/store";

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

    const normalizedPinWords = data.map(normalizeLibraryWords);

    store.dispatch(setOnlyWords(normalizedPinWords));

    return data;
  } catch (_) {
    return null;
  }
};

export const getRandomWords = async (limit = 15) => {
  try {
    const { data, error } = await supabase.from("random_words").select("*");

    if (error) {
      return null;
    }

    const normalizedData = data.map(normalizeLibraryWords);

    store.dispatch(setOnlyWords(normalizedData));

    return normalizedData;
  } catch (_) {
    return null;
  }
};

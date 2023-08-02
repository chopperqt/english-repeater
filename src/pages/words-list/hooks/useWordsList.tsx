import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { WordsForm } from "models/main";
import { nextStep, setWords } from "services/settings/settings";
import { RootState } from "services/store";
import { getPinWords } from "api/library.api";

import { getNormalizeWords } from "../helpers/getNormalizedWords";

const defaultValue = {
  words: [],
};

interface UseWordList {
  userId: string | null;
}

const useWordsList = ({ userId }: UseWordList) => {
  const dispatch = useDispatch();
  const valuesFromLocal = localStorage.getItem("settings");
  const words = useSelector((state: RootState) => state.settings.words).filter(
    Boolean
  ).length;
  const wordsFromLocal = valuesFromLocal
    ? JSON.parse(valuesFromLocal)
    : defaultValue;

  const handleChange = ({ }, allValues: WordsForm) => {
    const normalizedWords = getNormalizeWords(allValues.words);

    const valuesToJSON = JSON.stringify({
      words: normalizedWords,
    });

    dispatch(setWords(allValues));

    localStorage.setItem("settings", valuesToJSON);
  };

  const handleFinish = (values: WordsForm) => {
    const settingsToJSON = JSON.stringify(values);

    dispatch(setWords(values));

    localStorage.setItem("settings", settingsToJSON);

    dispatch(nextStep());
  };

  const handleGetPinWords = async () => {
    console.log("userId", userId);
    if (!userId) return;

    const res = await getPinWords(userId);

    console.log(res);
  };

  const hasDisabled = useMemo(() => {
    if (!words) {
      return true;
    }

    return false;
  }, [words]);

  useEffect(() => {
    dispatch(setWords(wordsFromLocal));
  }, []);

  return {
    handleChange,
    handleFinish,
    handleGetPinWords,
    hasDisabled,
    wordsFromLocal,
  };
};

export default useWordsList;

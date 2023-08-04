import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { WordsForm, WordsValues } from "models/main";
import { nextStep, setWords } from "services/settings/settings";
import { getPinWords } from "api/library.api";

import { getNormalizeWords } from "../helpers/getNormalizedWords";

const defaultValue = {
  words: [],
};

interface UseWordList {
  userId: string | null;
  words: WordsValues[];
  setFieldsValue: (value: any) => void;
}

const useWordsList = ({ userId, words, setFieldsValue }: UseWordList) => {
  const dispatch = useDispatch();

  const valuesFromLocal = localStorage.getItem("settings");
  const amountOfWords = words.length;

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

  useEffect(() => {
    setFieldsValue({ words });
  }, [words]);

  const handleFinish = (values: WordsForm) => {
    const settingsToJSON = JSON.stringify(values);

    dispatch(setWords(values));

    localStorage.setItem("settings", settingsToJSON);

    dispatch(nextStep());
  };

  const handleGetPinWords = async () => {
    if (!userId) return;

    const res = await getPinWords(userId);

    console.log(res);
  };

  const hasDisabled = !amountOfWords;

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

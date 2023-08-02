import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { WordsForm } from "models/main";
import { nextStep, setWords } from "services/settings/settings";
import { RootState } from "services/store";
import { getNormalizeWords } from "./helpers/getNormalizedWords";
import { getPinWords } from "api/library.api";

const defaultValue = {
  words: [],
};

const useWordsList = () => {
  const dispatch = useDispatch();
  const valuesFromLocal = localStorage.getItem("settings");
  const words = useSelector((state: RootState) => state.settings.words).filter(
    Boolean
  ).length;
  const wordsFromLocal = valuesFromLocal
    ? JSON.parse(valuesFromLocal)
    : defaultValue;

  const handleChange = ({}, allValues: WordsForm) => {
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
    const res = await getPinWords("2e2f22fd-41d3-4c62-a558-9700e2f65d0a");

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

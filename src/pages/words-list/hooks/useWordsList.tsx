import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { WordsForm, WordsValues } from "models/main";
import { nextStep, setOnlyWords, setWords } from "services/settings/settings";
import { getPinWords, getRandomWords } from "api/library.api";

import { ApiController } from "utils/api-controller";
import { LibraryWord } from "models/library";

interface UseWordList {
  userId: string | null;
  words: WordsValues[];
  setFieldsValue: (value: any) => void;
}

const useWordsList = ({ userId, words, setFieldsValue }: UseWordList) => {
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(5);

  useEffect(() => {
    setFieldsValue({
      words,
    });
  }, [words]);

  const amountOfWords = words.length;

  const handleChange = ({ }, allValues: WordsForm) => {
    dispatch(setWords(allValues));
  };

  const handleFinish = (values: WordsForm) => {
    dispatch(setWords(values));
    dispatch(nextStep());
  };

  const { isLoading: isLoadingPinWords, handleRequest: handleLoadPinWords } =
    ApiController<LibraryWord[] | null>({
      callback: () => getPinWords(userId || ""),
    });

  const {
    isLoading: isLoadingRandomWords,
    handleRequest: handleLoadRandomWords,
  } = ApiController<WordsValues[] | null>({
    callback: () => getRandomWords(limit),
  });

  const handleChangeLimit = (newLimit: number) => {
    setLimit(newLimit);
  };

  const handleReset = () => {
    dispatch(setOnlyWords([]));
  };

  const hasDisabled = !amountOfWords;

  return {
    handleChange,
    handleFinish,
    handleLoadPinWords,
    handleLoadRandomWords,
    isLoadingRandomWords,
    handleChangeLimit,
    handleReset,
    limit,
    hasDisabled,
    isLoadingPinWords,
  };
};

export default useWordsList;

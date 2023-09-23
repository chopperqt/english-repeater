import { useEffect } from 'react'
import {
  useDispatch,
  useSelector,
} from 'react-redux'

import { postStatistic } from 'api/statistic.api'
import {
  getAmountOfCompleteWords,
  getAmountOfErrorWords,
  getEnglishCorrectWords,
  getEnglishErrorWords,
  getRussiaErrorWords,
  repeatGame,
  resetGame,
} from 'services/game/game'
import {
  repeatSettings,
  resetSettings,
} from 'services/settings/settings'
import { RootState } from 'services/store'

export const useResult = () => {
  const dispatch = useDispatch()

  const userId = useSelector((state: RootState) => state.user.userId);
  const mode = useSelector((state: RootState) => state.settings.mode)
  const amountOfErrors = useSelector(getAmountOfErrorWords)
  const amountOfCorrect = useSelector(getAmountOfCompleteWords)
  const correctWords = useSelector(getEnglishCorrectWords)

  let selectedErrorMode = getEnglishErrorWords

  if (mode === 'rusToEng') {
    selectedErrorMode = getRussiaErrorWords
  }

  const errorWords = useSelector(selectedErrorMode)

  const handleReset = () => {
    dispatch(resetSettings())
    dispatch(resetGame())
  }

  const handleRepeat = () => {
    dispatch(repeatSettings())
    dispatch(repeatGame())
  }

  useEffect(() => {
    if (!userId) {
      return
    }

    let error_words = "";
    let correct_words = "";

    if (errorWords.length) {
      error_words = JSON.stringify(errorWords)
    }

    if (correctWords.length) {
      correct_words = JSON.stringify(correctWords)
    }

    postStatistic({
      user_id: userId,
      correct: amountOfCorrect,
      errors: amountOfErrors,
      error_words,
      correct_words,
    })
  }, [])

  return {
    errorWords,
    handleRepeat,
    handleReset,
  }
}

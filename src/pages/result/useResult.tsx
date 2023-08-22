import {
  useDispatch,
  useSelector,
} from 'react-redux'

import {
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

const useResult = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state: RootState) => state.settings.mode)

  const selectedErrorMode = mode === 'engToRus'
    ? getRussiaErrorWords
    : getEnglishErrorWords

  const errorWords = useSelector(selectedErrorMode) as []

  const handleReset = () => {
    dispatch(resetSettings())
    dispatch(resetGame())
  }

  const handleRepeat = () => {
    dispatch(repeatSettings())
    dispatch(repeatGame())
  }

  return {
    errorWords,
    handleRepeat,
    handleReset,
  }
}

export default useResult
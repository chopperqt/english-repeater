import { useEffect } from 'react'
import {
  useDispatch,
  useSelector,
} from "react-redux"
import { setWords } from 'services/game/game'

import {
  getActiveOptions,
  nextStep,
} from "services/settings/settings"
import { RootState } from "services/store"

const useGame = () => {
  const dispatch = useDispatch()
  const {
    words,
    currentWord,
  } = useSelector((state: RootState) => state.game)
  const activeOptions = useSelector(getActiveOptions)

  useEffect(() => {
    if (currentWord < activeOptions.length) {
      return
    }

    dispatch(nextStep())
  }, [
    currentWord,
    activeOptions,
    dispatch,
  ])

  useEffect(() => {
    dispatch(setWords(activeOptions))
  }, [])

  return { words }
}

export default useGame
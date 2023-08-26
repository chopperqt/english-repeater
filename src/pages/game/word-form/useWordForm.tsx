import {
  useDispatch,
  useSelector
} from 'react-redux'
import { Form } from 'antd'

import { RootState } from 'services/store'
import {
  RulesEnglishField,
  RulesRussiaField,
} from 'assets/rules'
import normalizeWord from 'helpers/normalizeWord'
import { GameForm } from 'models/game'
import { checkTranslate } from '../helpers/checkTransalate'
import { resetSettings } from 'services/settings/settings'
import {
  nextWords,
  resetGame,
  setWord,
} from 'services/game/game'
import { SKIP_WORD_TEXT } from 'language/ru'

const useWordForm = () => {
  const dispatch = useDispatch()
  const currentWord = useSelector((state: RootState) => state.game.currentWord)
  const words = useSelector((state: RootState) => state.game.words)
  const mode = useSelector((state: RootState) => state.settings.mode)
  const [form] = Form.useForm()
  const hasWords = !!words?.length

  const rule = mode === 'rusToEng'
    ? RulesEnglishField
    : RulesRussiaField

  let word = words[currentWord]?.english
  let translateWord = words[currentWord]?.russia

  if (mode === 'rusToEng') {
    word = words[currentWord]?.russia
    translateWord = words[currentWord]?.english
  }

  const normalizedWord = normalizeWord(word)
  const normalizedTranslateWord = normalizeWord(translateWord)

  const handleSubmit = (value: GameForm) => {
    const {
      russia,
      english,
    } = words[currentWord]
    let word = russia

    if (mode === 'rusToEng') {
      word = english
    }

    const status = checkTranslate(word, value.word)

    dispatch(setWord({
      ...words[currentWord],
      status,
      enteredWord: value.word,
    }))

    form.resetFields()

    dispatch(nextWords())
  }

  const handleSkip = () => {
    const word = words[currentWord]
    dispatch(setWord({
      ...word,
      status: 'ERROR',
      enteredWord: SKIP_WORD_TEXT,
    }))

    form.resetFields()

    dispatch(nextWords())
  }

  const handleReset = () => {
    dispatch(resetSettings())
    dispatch(resetGame())
  }

  return {
    normalizedWord,
    handleSkip,
    handleSubmit,
    handleReset,
    form,
    rule,
    hasWords,
    normalizedTranslateWord,
  }
}

export default useWordForm
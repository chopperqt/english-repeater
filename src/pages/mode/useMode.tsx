import { useDispatch } from "react-redux"

import { ModeForm } from "models/mode"
import {
  nextStep,
  setMode,
} from "services/settings/settings"

const defaultValue = {
  mode: ''
}

const useMode = () => {
  const dispatch = useDispatch()
  const settings = localStorage.getItem('settings')
  const settingsFromLocal = settings
    ? JSON.parse(settings)
    : defaultValue

  const handleFinish = (values: ModeForm) => {
    const formattedSettings = {
      ...settingsFromLocal,
      ...values,
    }
    const settingsToJSON = JSON.stringify(formattedSettings)

    localStorage.setItem('settings', settingsToJSON)

    dispatch(setMode({
      mode: values.mode,
    }))

    dispatch(nextStep())
  }

  return {
    handleFinish,
  }
}

export default useMode
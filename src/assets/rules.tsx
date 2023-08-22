import {
  onlyCyrillic,
  onlyLatinica,
} from "helpers/patterns"
import {
  RequiredText,
  OnlyCyrillicText,
  OnlyLatinicaText,
} from "helpers/validateMessages"

export const RulesEnglishField = [
  {
    required: true,
    message: RequiredText
  },
  {
    pattern: onlyLatinica,
    message: OnlyLatinicaText
  }
]

export const RulesRussiaField = [
  {
    required: true,
    message: RequiredText,
  },
  {
    pattern: onlyCyrillic,
    message: OnlyCyrillicText,
  }
]
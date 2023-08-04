import { createSlice, createSelector } from "@reduxjs/toolkit";
import { WordsForm, WordsValues } from "models/main";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "services/store";
import { ModeForm } from "models/mode";

export interface SettingsStore extends WordsForm {
  step: number;
}

const initialState: SettingsStore = {
  words: [],
  mode: "",
  step: 0,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setOnlyWords: (state, action: PayloadAction<WordsValues[]>) => {
      state.words = action.payload;
    },
    setWords: (state, action: PayloadAction<WordsForm>) => {
      const { words } = action.payload;

      state.words = words;
    },
    setMode: (state, action: PayloadAction<ModeForm>) => {
      const { mode } = action.payload;

      state.mode = mode;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    setState: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    resetSettings: (state) => {
      state.step = 0;
    },
    repeatSettings: (state) => {
      state.step = 2;
    },
  },
});

export const {
  setWords,
  setOnlyWords,
  setMode,
  nextStep,
  resetSettings,
  repeatSettings,
} = settingsSlice.actions;

export const getActiveOptions = createSelector(
  (state: RootState) => state.settings.words,
  (words) => {
    return words
      .map((word) => {
        if (word?.isActive === false) {
          return null;
        }

        return word;
      })
      .filter(Boolean) as WordsValues[];
  }
);

export default settingsSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";

import settingsReducer from "./settings/settings";
import gameReducer from "./game/game";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    game: gameReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

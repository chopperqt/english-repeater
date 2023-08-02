import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserStore {
  userId: string | null;
}

const initialState: UserStore = {
  userId: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      const userId = action.payload;

      state.userId = userId;
    },
  },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;

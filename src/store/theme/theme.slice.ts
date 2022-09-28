import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';

import { ThemeState, ThemePayload } from './types';

const slice = createSlice({
  name: 'theme',
  initialState: { theme: 'default', darkMode: null } as ThemeState,
  reducers: {
    changeTheme: (state, { payload: { theme, darkMode } }: ThemePayload) => {
      if (typeof theme !== 'undefined') {
        state.theme = theme;
      }
      if (typeof darkMode !== 'undefined') {
        state.darkMode = darkMode;
      }
    },
    setDefaultTheme: (
      state,
      { payload: { theme, darkMode } }: ThemePayload,
    ) => {
      if (!state.theme) {
        if (typeof theme !== 'undefined') {
          state.theme = theme;
        }
        if (typeof darkMode !== 'undefined') {
          state.darkMode = darkMode;
        }
      }
    },
  },
});

export const { changeTheme, setDefaultTheme } = slice.actions;

export const selectThemes = (state: RootState) => state.theme;

export default slice.reducer;

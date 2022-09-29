import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

interface InitState {
  isFirstInstall: boolean;
}

const initialState: InitState = {
  isFirstInstall: true,
};

const initSlice = createSlice({
  name: 'init',
  initialState: initialState,
  reducers: {
    setFirstInstall: (state, action: PayloadAction<boolean>) => {
      state.isFirstInstall = action.payload;
    },
  },
});

export const { setFirstInstall } = initSlice.actions;

export const selectIsFirstInstall = (state: RootState) =>
  state.init.isFirstInstall;

export default initSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Options } from '../../types/options';

const passwordSlice = createSlice({
  name: 'PasswordSlice',
  initialState: {
    options: [] as Options,
  },
  reducers: {
    setOptions: (state, action: PayloadAction<Options>) => {
      state.options = action.payload
    },
  },
})

export const {
  reducer: PasswordReducer,
  actions: PasswordActions,
} = passwordSlice

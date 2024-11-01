import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const serachSlice = createSlice({
  name: 'SearchSlice',
  initialState: {
    value: '',
  },
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const {
  reducer: SearchReducer,
  actions: SearchActions,
} = serachSlice

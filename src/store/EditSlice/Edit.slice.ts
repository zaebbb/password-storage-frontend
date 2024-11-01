import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Validation } from '../../types/options';

const editSlice = createSlice({
  name: 'EditSlice',
  initialState: {
    id: 0,
    values: {
      name: '',
      password: '',
      content: '',
    },
    validation: {
      name: '',
      password: '',
      content: '',
    },
    
  },
  reducers: {
    setNameValue: (state, action: PayloadAction<string>) => {
      state.values.name = action.payload
      state.validation.name = '';
    },
    setPasswordValue: (state, action: PayloadAction<string>) => {
      state.values.password = action.payload
      state.validation.password = '';
    },
    setContentValue: (state, action: PayloadAction<string>) => {
      state.values.content = action.payload
      state.validation.content = '';
    },
    setValidation: (state, action: PayloadAction<Validation>) => {
      state.validation = action.payload;
    },
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
})

export const {
  reducer: EditReducer,
  actions: EditActions,
} = editSlice

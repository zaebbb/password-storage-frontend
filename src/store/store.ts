import { configureStore } from '@reduxjs/toolkit'
import {SearchReducer} from "./SearchSlice/Search.slice";
import { EditReducer } from './EditSlice/Edit.slice';
import { PasswordReducer } from './PasswordSlice/Password.slice';

export const store = configureStore({
  reducer: {
    search: SearchReducer,
    edit: EditReducer,
    password: PasswordReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

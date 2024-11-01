import { allPasswords } from "../api/allPasswords";
import { useAppDispatch } from "../store/hooks";
import { PasswordActions } from "../store/PasswordSlice/Password.slice";

export interface UseGetPasswordsResult {
  getPasswords: () => Promise<void>
}

export const useGetPasswords = (): UseGetPasswordsResult => {
  const dispatch = useAppDispatch();

  const getPasswords = async () => {
    const res = await allPasswords();

    dispatch(PasswordActions.setOptions(res.items));
  }

  return {
    getPasswords,
  }
}
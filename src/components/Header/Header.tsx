import cls from './Header.module.scss'
import AddImg from './../../assets/plus.svg'
import React from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {SearchActions} from "../../store/SearchSlice/Search.slice";
import CreatePasswordDialog from '../EditPasswordDialog/EditPasswordDialog';

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const value = useAppSelector((state) => state.search.value)
  const dispatch = useAppDispatch()

  const onChangeSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(SearchActions.setValue(e.target.value))
  }, [dispatch])

  const onModalOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <header className={cls.Header}>
        <p className={cls.Logo}>
          OR / PASSWORDS
        </p>

        <input
          className={cls.Search}
          type="text"
          placeholder={'Проект / Система'}
          value={value}
          onChange={onChangeSearch}
        />

        <button
          className={cls.AddPasswordButton}
          onClick={onModalOpen}
        >
          <img
            src={AddImg}
            alt="Создать пароль"
          />
        </button>
      </header>

      <CreatePasswordDialog 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}

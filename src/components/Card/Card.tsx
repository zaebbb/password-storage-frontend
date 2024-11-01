import {Option} from "../../types/options";
import {toast} from "react-toastify";
import cls from './Card.module.scss'
import {CardInfo} from "../CardInfo/CardInfo";
import EditImg from './../../assets/edit.svg';
import DeleteImg from './../../assets/delete.svg';
import { toastConfig } from "../../config/toastConfig";
import { deletePassword } from "../../api/deletePassword";
import { useGetPasswords } from "../../hooks/useGetPasswords";
import EditPasswordDialog from "../EditPasswordDialog/EditPasswordDialog";
import React from "react";
import { PasswordActions } from "../../store/PasswordSlice/Password.slice";
import { EditActions } from "../../store/EditSlice/Edit.slice";
import { useAppDispatch } from "../../store/hooks";

interface Props {
  data: Option
}

export const Card = (props: Props) => {
  const {
    data
  } = props
  const { getPasswords } = useGetPasswords();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = React.useState(false);

  const onDeleteHandler = async () => {
    const res = await deletePassword(data.id);
    
    if (res.success) {
      toast('Успешно удалено', toastConfig(1000));
    } else {
      toast('Элемент не найден', toastConfig(1000));
    }

    getPasswords();
  }

  const copyPassword = async () => {
    await navigator.clipboard.writeText(data.password)
    toast('Скопировано', toastConfig(1000))
  }

  const openDialogHandler = React.useCallback(() => {
    setIsOpen(true);

    dispatch(EditActions.setId(data.id));
    dispatch(EditActions.setNameValue(data.name));
    dispatch(EditActions.setContentValue(data.content ?? ''));
    dispatch(EditActions.setPasswordValue(data.password));
  }, [data.content, data.id, data.name, data.password, dispatch]);

  return (
    <>
      <article className={cls.Card}>
        <div className={cls.CardActions}>
          <button
            onClick={copyPassword}
            className={cls.Badge}
          >
            Копировать
          </button>

          <div className={cls.CardActionButtons}>
            <button 
              className={cls.CardActionButton}
              onClick={openDialogHandler}
            >
              <img 
                src={EditImg}
                alt="Редактировать" 
              />
            </button>
            
            <button
              onClick={onDeleteHandler} 
              className={cls.CardActionButton}
            >
              <img 
                src={DeleteImg}
                alt="Удалить" 
              />
            </button>
          </div>
          
        </div>

        <h3 className={cls.CardTitle}>
          {data.name}
        </h3>

        {data.content && (
          <CardInfo text={data.content} />
        )}
      </article>

      <EditPasswordDialog 
        isOpen={isOpen}
        id={data.id}
        setIsOpen={setIsOpen}
      />
    </>
  )
}

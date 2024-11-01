import { 
  Dialog, 
  DialogPanel, 
  DialogTitle,
  Field,
  Input, 
} from '@headlessui/react'
import React from 'react'
import cls from './EditPasswordDialog.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CreatePasswordImg from './../../assets/create-password.svg'
import { toastConfig } from '../../config/toastConfig';
import { toast } from 'react-toastify';
import { EditActions } from '../../store/EditSlice/Edit.slice';
import { generate } from 'generate-password-browser';
import { createPassword } from '../../api/createPassword';
import { useGetPasswords } from '../../hooks/useGetPasswords';
import { updatePassword } from '../../api/updatePassword';

type Props = {
  id?: number
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const EditPasswordDialog = (props: Props) => {
  const {
    isOpen,
    setIsOpen,
    id,
  } = props

  const { getPasswords } = useGetPasswords();

  const values = useAppSelector((state) => state.edit.values);
  const validation = useAppSelector((state) => state.edit.validation);
  const dispatch = useAppDispatch();

  const onClose = React.useCallback(() => {
    setIsOpen(false);

    dispatch(EditActions.setPasswordValue(''));
    dispatch(EditActions.setNameValue(''));
    dispatch(EditActions.setContentValue(''));
  }, [dispatch, setIsOpen]);

  const onChangeNameHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(EditActions.setNameValue(e.target.value));
  }, [dispatch]);

  const onChangePasswordHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(EditActions.setPasswordValue(e.target.value));
  }, [dispatch]);

  const onChangeContentHandler = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(EditActions.setContentValue(e.target.value));
  }, [dispatch]);

  const onSubmit = React.useCallback(async () => {
    const res =  !id ? await createPassword(values) : await updatePassword(id, values);

    if (res.validation) {
      dispatch(EditActions.setValidation(res.validation));
    }

    if (res.success) {
      getPasswords();
      onClose();

      toast('Пароль успешно создан', toastConfig(1000))
    }
  }, [dispatch, getPasswords, id, onClose, values]);

  const generatePassword = async () => {
    const password = generate({
      numbers: true,
      lowercase: true,
      uppercase: true,
      length: 15,
      symbols: true,
      strict: true,
    })

    dispatch(EditActions.setPasswordValue(password));

    toast(
      `Пароль успешно ${id ? 'обновлен' : 'сохранен'}`, 
      toastConfig(1000)
    );
  }
  
  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
      as="div"
      className={cls.Dialog}
    >
      <DialogPanel
        transition
        className={cls.DialogContent}
      >
        <DialogTitle className={cls.Title}>
          {id ? 'Редактировать пароль' : 'Создать пароль'}
        </DialogTitle>

        <div className={cls.InputGroup}>
          <Field>
            <Input
              className={cls.Input} 
              type="text"
              value={values.name}
              placeholder="Введите название"
              onChange={onChangeNameHandler}
            />

            {validation.name && (
              <div className={cls.Validation}>
                {validation.name}
              </div>
            )}
          </Field>
          
          <Field>
            <div className={cls.InputActions}>
              <Input
                className={cls.Input} 
                type="text"
                value={values.password}
                placeholder="Введите пароль"
              onChange={onChangePasswordHandler}
              />

              <button
                className={cls.InputButton}
                onClick={generatePassword}
              >
                <img 
                  src={CreatePasswordImg}
                  alt="Сгенерировать пароль"
                />
              </button>
            </div>

            {validation.password && (
              <div className={cls.Validation}>
                {validation.password}
              </div>
            )}
          </Field>

          <Field>
            <textarea
              className={cls.Textarea}
              value={values.content}
              placeholder="Введите описание (опционально)"
              onChange={onChangeContentHandler}
            ></textarea>
          </Field>

          <Field className={cls.DialogActions}>
            <button 
              className={cls.DialogActionButton}
              onClick={onClose}
            >
              Отменить
            </button>
            
            <button 
              className={cls.DialogActionButton}
              onClick={onSubmit}
            >
              Сохранить
            </button>
          </Field>
        </div>
      </DialogPanel>
    </Dialog>
  )
}

export default EditPasswordDialog
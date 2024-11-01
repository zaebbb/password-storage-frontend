import React from "react";
import {Options} from "../../types/options";
import {Card} from "../Card/Card";
import cls from './Cards.module.scss'
import {useAppSelector} from "../../store/hooks";
import { useGetPasswords } from "../../hooks/useGetPasswords";

export const Cards = () => {
  const { getPasswords } = useGetPasswords();
  const value = useAppSelector((state) => state.search.value)
  const options = useAppSelector((state) => state.password.options)
  const [currentOptions, setCurrentOptions] = React.useState<Options>([]);
  const [isInit, setIsInit] = React.useState(false);

  React.useEffect(() => {
    if (value) {
      const sanitizeValue = value.trim().toLowerCase()

      const filterOptions = options
        .filter(option => option.name
          .toLowerCase()
          .includes(sanitizeValue)
        )

      setCurrentOptions(filterOptions)
    } else {
      setCurrentOptions(options)
    }
  }, [options, value]);

  React.useEffect(() => {
    setCurrentOptions(options);
  }, [options]);

  React.useEffect(() => {
    if (!isInit) {
      setIsInit(true);
      getPasswords();
    }
  }, [getPasswords, isInit]);

  return (
    <div className={cls.Cards}>
      {currentOptions.map(option => (
        <Card
          key={option.id}
          data={option}
        />
      ))}
    </div>
  )
}

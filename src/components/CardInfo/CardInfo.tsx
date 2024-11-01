import cls from "./CardInfo.module.scss";
import {links} from "../../utils/link";
import {tabs} from "../../utils/tabs";
import React from "react";

type Props = {
  text: string
}

export const CardInfo = (props: Props) => {
  const {
    text
  } = props

  const formatLinks = links(text)
  const formatTabs = tabs(formatLinks)

  return (
    <p
      className={cls.CardInfo}
      dangerouslySetInnerHTML={{
        __html: formatTabs
      }}
    />
  )
}

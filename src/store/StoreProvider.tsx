import {Provider} from "react-redux";
import {store} from "./store";
import React from "react";

type Props = React.PropsWithChildren

export const StoreProvider = ({ children }: Props) => (
  <Provider store={store}>
    {children}
  </Provider>
)

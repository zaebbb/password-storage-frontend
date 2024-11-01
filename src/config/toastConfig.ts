import { Bounce, ToastOptions } from "react-toastify";

export const toastConfig = (autoClose: number): ToastOptions => ({
  position: "top-center",
  autoClose: autoClose,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
});